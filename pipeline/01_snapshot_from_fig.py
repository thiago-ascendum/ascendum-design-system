"""01_snapshot_from_fig.py <decoded-fig.json> <ds-snapshot.json>

Turns a decoded Figma file into a small, neutral "design system snapshot":
collections, variables, styles, components and what every layer consumes.

Every later step (tokens, checks, AI contract, impact map) reads ONLY the snapshot,
never Figma. So the snapshot can come from any reader:
  - this offline reader (fast, no Figma seat needed), or
  - the Figma Plugin API through the official Figma MCP (see 01b_snapshot_plugin_api.js).
Read-only. Nothing is written back to the design file.
"""
import collections
import datetime
import hashlib
import html
import json
import re
import sys

src, out = sys.argv[1], sys.argv[2]
raw = open(src, "rb").read()
N = json.loads(raw)["msg"]["nodeChanges"]


def gid(g):
    return f'{g["sessionID"]}:{g["localID"]}' if g else None


by = {gid(n["guid"]): n for n in N}
parent = {gid(n["guid"]): gid(n["parentIndex"]["guid"]) for n in N if n.get("parentIndex")}
children = collections.defaultdict(list)
for k, p in parent.items():
    children[p].append(k)


def clean(s):
    return (s or "").strip(" -—–↳")


def page_of(k):
    while k in parent and by[k].get("type") != "CANVAS":
        k = parent[k]
    return clean(by[k].get("name", "?")) if k in by else "?"


def component_of(k):
    """Nearest component set (or single component) that owns this layer."""
    single = None
    while k in parent:
        n = by[k]
        if n.get("isStateGroup"):
            return n.get("name")
        if n.get("type") == "SYMBOL" and single is None:
            single = n.get("name")
        k = parent[k]
    return single


def text_of(s):
    """Descriptions arrive HTML-escaped (sometimes twice) and sometimes wrapped in tags."""
    s = s or ""
    for _ in range(3):
        s = html.unescape(s)
    return re.sub(r"<[^>]+>", " ", s).strip()


def hexa(c):
    h = "#" + "".join(f"{round(max(0, min(1, c[x])) * 255):02X}" for x in "rgb")
    a = c.get("a", 1.0)
    return h if a >= 0.999 else h + f"{round(a * 255):02X}"


# ---------- collections and variables
sets = {gid(n["guid"]): n for n in N if n.get("type") == "VARIABLE_SET"}
var_nodes = {gid(n["guid"]): n for n in N if n.get("type") == "VARIABLE"}
mode_name = {}
collections_out = []
for k, s in sets.items():
    modes = []
    for m in s.get("variableSetModes", []):
        mode_name[(k, gid(m["id"]))] = m.get("name")
        modes.append(m.get("name"))
    collections_out.append({
        "id": k, "name": s.get("name"), "modes": modes,
        "remote": bool(s.get("sourceLibraryKey")), "published": bool(s.get("isPublishable")),
        "library": (s.get("sourceLibraryKey") or "")[:14] or None,
    })

variables_out = []
for k, v in var_nodes.items():
    sid = (v.get("variableSetID") or {}).get("guid")
    set_id = gid(sid) if sid else None
    remote = bool(v.get("key")) or set_id not in sets
    values = {}
    for i, e in enumerate(v.get("variableDataValues", {}).get("entries", [])):
        mname = mode_name.get((set_id, gid(e["modeID"]))) or f"mode-{i}"
        val = e["variableData"].get("value", {})
        if "alias" in val:
            a = val["alias"]
            if a.get("guid"):
                t = gid(a["guid"])
                values[mname] = {"alias": t, "resolves": t in var_nodes}
            else:
                values[mname] = {"alias": None, "external": True}
        elif "colorValue" in val:
            values[mname] = {"value": hexa(val["colorValue"])}
        elif "floatValue" in val:
            values[mname] = {"value": round(val["floatValue"], 4)}
        elif "boolValue" in val:
            values[mname] = {"value": val["boolValue"]}
        elif "textValue" in val:
            values[mname] = {"value": val["textValue"]}
        else:
            values[mname] = {"value": None}
    web = next((c.get("value") for c in v.get("codeSyntax", {}).get("entries", []) if c.get("platform") == "WEB"), None)
    variables_out.append({
        "id": k, "name": v["name"], "collection": sets[set_id]["name"] if set_id in sets else None,
        "collectionId": set_id, "type": v.get("variableResolvedType"), "remote": remote,
        "deleted": bool(v.get("isSoftDeleted")), "description": text_of(v.get("description")),
        "scopes": v.get("variableScopes") or [], "codeSyntax": web, "values": values,
    })

# ---------- styles
styles = [n for n in N if n.get("styleType")]
text_styles = {gid(n["guid"]): n for n in styles if n.get("styleType") == "TEXT"}
styles_out = []
for n in styles:
    s = {"id": gid(n["guid"]), "name": n.get("name"), "kind": n.get("styleType")}
    if n.get("styleType") == "TEXT":
        lh = n.get("lineHeight") or {}
        ls = n.get("letterSpacing") or {}
        s.update({"family": (n.get("fontName") or {}).get("family"), "weight": (n.get("fontName") or {}).get("style"),
                  "size": n.get("fontSize"), "lineHeight": [lh.get("value"), lh.get("units")],
                  "letterSpacing": [ls.get("value"), ls.get("units")]})
    styles_out.append(s)

# ---------- components
components_out = []
for n in N:
    k = gid(n["guid"])
    if n.get("isStateGroup"):
        variants = [by[h].get("name") for h in children[k] if by[h].get("type") == "SYMBOL"]
        components_out.append({"id": k, "name": n.get("name"), "page": page_of(k), "set": True, "variants": variants,
                               "description": text_of(n.get("symbolDescription") or n.get("description"))})
    elif n.get("type") == "SYMBOL" and not by.get(parent.get(k), {}).get("isStateGroup"):
        components_out.append({"id": k, "name": n.get("name"), "page": page_of(k), "set": False, "variants": [],
                               "description": text_of(n.get("symbolDescription") or n.get("description"))})


# ---------- what each layer consumes
def aliases_in(o, acc):
    if isinstance(o, dict):
        a = o.get("alias")
        if isinstance(a, dict) and a.get("guid"):
            acc.append(gid(a["guid"]))
        for kk, vv in o.items():
            if kk not in ("guid", "parentIndex"):
                aliases_in(vv, acc)
    elif isinstance(o, list):
        for vv in o:
            aliases_in(vv, acc)


SKIP = ("VARIABLE", "VARIABLE_SET", "DOCUMENT", "CANVAS")
layers_out = []
for n in N:
    if n.get("type") in SKIP:
        continue
    k = gid(n["guid"])
    acc = []
    aliases_in(n, acc)
    L = {"id": k, "type": n.get("type"), "name": n.get("name"), "page": page_of(k), "component": component_of(k),
         "isStyle": n.get("styleType") or None, "vars": sorted(set(a for a in acc if a in var_nodes))}
    raw_solid, raw_gradient, bound = [], 0, 0
    # the dashed purple outline of a component set is editor chrome drawn by Figma, not a design colour
    paint_fields = () if n.get("isStateGroup") else (("fillPaints", "styleIdForFill"), ("strokePaints", "styleIdForStrokeFill"))
    for field, style_field in paint_fields:
        styled = bool(n.get(style_field))
        for p in n.get(field) or []:
            if p.get("visible") is False:
                continue
            if p.get("type") == "SOLID":
                if p.get("colorVar") or styled:
                    bound += 1
                else:
                    raw_solid.append(hexa(p["color"])[:7])
            elif str(p.get("type", "")).startswith("GRADIENT") and not styled:
                raw_gradient += 1
    L["paints"] = {"bound": bound, "raw": raw_solid, "rawGradients": raw_gradient}
    if n.get("type") == "TEXT" and not n.get("styleType"):
        sid = (n.get("styleIdForText") or {}).get("guid")
        st = text_styles.get(gid(sid)) if sid else None
        chars = (n.get("textData") or {}).get("characters") or ""
        t = chars.strip()
        L["text"] = {
            "chars": t[:140], "style": st.get("name") if st else None,
            # a text style overrides the layer's own stale font fields, so resolve through the style
            "family": ((st or n).get("fontName") or {}).get("family"), "size": (st or n).get("fontSize"),
            "typedUpper": len(t) > 3 and t.isupper() and any(c.isalpha() for c in t),
            "forcedCase": n.get("textCase") if n.get("textCase") not in (None, "ORIGINAL") else None,
        }
    if n.get("effects"):
        L["effects"] = {"count": len(n["effects"]), "styled": bool(n.get("styleIdForEffect"))}
    layers_out.append(L)

snap = {
    "meta": {
        "schema": "ds-snapshot/1", "reader": "offline .fig reader",
        "sourceFile": "Ascendum Design System.fig", "sourceSha256": hashlib.sha256(raw).hexdigest()[:16],
        "generatedAt": datetime.datetime.now().astimezone().isoformat(timespec="seconds"),
        "nodes": len(N), "pages": sum(1 for n in N if n.get("type") == "CANVAS"),
    },
    "collections": collections_out, "variables": variables_out, "styles": styles_out,
    "components": components_out, "layers": layers_out,
}
json.dump(snap, open(out, "w"), ensure_ascii=False)
print(f"snapshot: {len(collections_out)} collections, {len(variables_out)} variables, {len(styles_out)} styles, "
      f"{len(components_out)} components, {len(layers_out)} layers -> {out}")
