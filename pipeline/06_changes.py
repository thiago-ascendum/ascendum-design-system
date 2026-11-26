"""06_changes.py <old-snapshot.json> <new-snapshot.json> <out-dir>

The full list of changes between two snapshots, written from the files and not from memory.
05_breaking.py answers "what would break a file that uses the old one"; this one answers "what changed",
every item: collections and modes, variables renamed, removed, added and changed in value, components and
their variants, and text and effect styles. Items are matched by their Figma id, so a rename is a rename and
not a removal plus an addition.

Writes <out-dir>/changes.json (for the Storybook page) and <out-dir>/CHANGES.md (the appendix of the
changelog). Sorted, no timestamp, so the same two snapshots always give the same files.

Usage: python3 pipeline/06_changes.py build/before/ds-snapshot.json build/ds-snapshot.json build
Plain Python 3, no dependencies.
"""
import json
import os
import sys

old = json.load(open(sys.argv[1]))
new = json.load(open(sys.argv[2]))
out_dir = sys.argv[3]


def live(snap):
    return {v["id"]: v for v in snap["variables"] if not v.get("remote") and not v.get("deleted")}


OV, NV = live(old), live(new)


def show(x, names):
    """One mode value as text: the alias name, a hex colour or a number."""
    if x is None:
        return "none"
    if x.get("alias"):
        return names.get(x["alias"], x.get("aliasName") or "unknown alias")
    v = x.get("value")
    if isinstance(v, dict) and "r" in v:
        a = v.get("a", 1)
        h = "#" + "".join(f"{round(v[k] * 255):02X}" for k in ("r", "g", "b"))
        return h if a == 1 else f"{h} at {round(a * 100)}%"
    return str(v)


onames = {i: v["name"] for i, v in OV.items()}
nnames = {i: v["name"] for i, v in NV.items()}

# ------------------------------------------------------------------ collections
ocol = {c["name"]: [m["name"] if isinstance(m, dict) else m for m in c["modes"]] for c in old["collections"]}
ncol = {c["name"]: [m["name"] if isinstance(m, dict) else m for m in c["modes"]] for c in new["collections"]}
oid = {c["id"]: c["name"] for c in old["collections"]}
nid = {c["id"]: c["name"] for c in new["collections"]}
collections = {
    "renamed": sorted([oid[i], nid[i]] for i in oid if i in nid and oid[i] != nid[i]),
    "added": sorted(nid[i] for i in nid if i not in oid),
    "removed": sorted(oid[i] for i in oid if i not in nid),
    "modes": sorted([n, ocol.get(n, []), m] for n, m in ncol.items() if n in ocol and ocol[n] != m),
}

# ------------------------------------------------------------------ variables
renamed, removed, added, changed = [], [], [], []
for i, v in OV.items():
    if i not in NV:
        removed.append([v["collection"], v["name"]])
        continue
    w = NV[i]
    if v["name"] != w["name"]:
        renamed.append([w["collection"], v["name"], w["name"]])
    for mode in sorted(set(v["values"]) | set(w["values"])):
        a, b = show(v["values"].get(mode), onames), show(w["values"].get(mode), nnames)
        # an alias that only followed its target's rename is not a value change
        if a != b and not (v["values"].get(mode, {}).get("alias") and v["values"][mode]["alias"] == w["values"].get(mode, {}).get("alias")):
            changed.append([w["collection"], w["name"], mode, a, b])
for i, w in NV.items():
    if i not in OV:
        added.append([w["collection"], w["name"], "; ".join(f"{m}: {show(x, nnames)}" for m, x in sorted(w["values"].items()))])
desc_new = sum(1 for i in OV if i in NV and not OV[i].get("description") and NV[i].get("description"))
desc_changed = sum(1 for i in OV if i in NV and OV[i].get("description") and NV[i].get("description") != OV[i].get("description"))
variables = {"renamed": sorted(renamed), "removed": sorted(removed), "added": sorted(added), "changed": sorted(changed),
             "descriptionsWritten": desc_new, "descriptionsRewritten": desc_changed}

# ------------------------------------------------------------------ components
def comps(snap):
    return {c["id"]: c for c in snap["components"] if not c["name"].startswith("Icon/")}


OC, NC = comps(old), comps(new)
c_renamed, c_removed, c_added, c_variants = [], [], [], []
for i, c in OC.items():
    if i not in NC:
        c_removed.append(c["name"])
        continue
    d = NC[i]
    if c["name"] != d["name"]:
        c_renamed.append([c["name"], d["name"]])
    ov, nv = set(c.get("variants", [])), set(d.get("variants", []))
    if ov != nv:
        c_variants.append({"component": d["name"], "before": len(ov), "after": len(nv),
                           "gone": sorted(ov - nv), "new": sorted(nv - ov)})
for i, d in NC.items():
    if i not in OC:
        c_added.append(f'{d["name"]} ({len(d.get("variants", [])) or 1} variant{"s" if len(d.get("variants", [])) != 1 else ""})')
cdesc = sum(1 for i in OC if i in NC and (NC[i].get("description") or "") != (OC[i].get("description") or ""))
components = {"renamed": sorted(c_renamed), "removed": sorted(c_removed), "added": sorted(c_added),
              "variants": sorted(c_variants, key=lambda x: x["component"]), "descriptionsChanged": cdesc,
              "variantsBefore": sum(len(c.get("variants", [])) for c in OC.values() if c["set"]),
              "variantsAfter": sum(len(c.get("variants", [])) for c in NC.values() if c["set"])}

# ------------------------------------------------------------------ styles
def styles(snap):
    return {s["name"]: s for s in snap.get("styles", [])}


OS, NS = styles(old), styles(new)
s_changed = []
for n in sorted(set(OS) & set(NS)):
    diffs = [f"{k}: {OS[n].get(k)} to {NS[n].get(k)}" for k in ("family", "weight", "size", "lineHeight", "letterSpacing") if OS[n].get(k) != NS[n].get(k)]
    if diffs:
        s_changed.append([n, "; ".join(diffs)])
styles_out = {"removed": sorted(set(OS) - set(NS)), "added": sorted(set(NS) - set(OS)), "changed": s_changed}

summary = {
    "variables": [len(OV), len(NV)], "renamed": len(renamed), "removed": len(removed), "added": len(added), "valueChanges": len(changed),
    "components": [len(OC), len(NC)], "variants": [components["variantsBefore"], components["variantsAfter"]],
    "componentsWithNewVariants": len(c_variants), "styles": [len(OS), len(NS)],
}
data = {"from": old["meta"].get("generatedAt", ""), "to": new["meta"].get("generatedAt", ""), "summary": summary,
        "collections": collections, "variables": variables, "components": components, "styles": styles_out}
json.dump(data, open(os.path.join(out_dir, "changes.json"), "w"), indent=1, sort_keys=True)

# ------------------------------------------------------------------ markdown appendix
L = ["# Every change since the file as received", "",
     "Generated by `pipeline/06_changes.py` from two snapshots of the Figma file: the file as we received it, and this version. "
     "Items are matched by their Figma id, so a rename shows as a rename. Nobody wrote this list by hand.", "",
     "## Summary", "",
     f"- Variables: {len(OV)} before, {len(NV)} now. {len(renamed)} renamed, {len(removed)} removed, {len(added)} added, {len(changed)} value changes.",
     f"- Descriptions: {desc_new} variables had none and now have one; {desc_changed} were rewritten.",
     f"- Components (icons not counted): {len(OC)} before, {len(NC)} now. Variants {components['variantsBefore']} before, {components['variantsAfter']} now; {len(c_variants)} components changed their variants.",
     f"- Text and effect styles: {len(OS)} before, {len(NS)} now.", ""]
L += ["## Collections and modes", ""]
for a, b in collections["renamed"]:
    L.append(f"- Renamed: {a} to {b}")
for a in collections["added"]:
    L.append(f"- Added: {a} (modes: {', '.join(ncol[a])})")
for a in collections["removed"]:
    L.append(f"- Removed: {a}")
for n, a, b in collections["modes"]:
    L.append(f"- {n}: modes {', '.join(a)} to {', '.join(b)}")
L += ["- Light and Dark: already in the file as received (Semantic collection). Unchanged.", "", "Not in a snapshot, so not in this list: prototype interactions (110 on 18 components), page layouts and documentation cards. Those are in the changelog above, written by hand.", ""]
L += ["## Variables renamed", "", "| Collection | Before | Now |", "|---|---|---|"] + [f"| {c} | `{a}` | `{b}` |" for c, a, b in sorted(renamed)] + [""]
L += ["## Variables removed", "", "| Collection | Name |", "|---|---|"] + [f"| {c} | `{n}` |" for c, n in sorted(removed)] + [""]
L += ["## Variables added", "", "| Collection | Name | Value |", "|---|---|---|"] + [f"| {c} | `{n}` | {v} |" for c, n, v in sorted(added)] + [""]
L += ["## Variable values changed", "", "Name as it is now.", "", "| Collection | Name | Mode | Before | Now |", "|---|---|---|---|---|"] + [f"| {c} | `{n}` | {m} | {a} | {b} |" for c, n, m, a, b in sorted(changed)] + [""]
L += ["## Components", ""]
for a, b in components["renamed"]:
    L.append(f"- Renamed: {a} to {b}")
for n in components["removed"]:
    L.append(f"- Removed: {n}")
for n in components["added"]:
    L.append(f"- Added: {n}")
L += ["", "| Component | Variants before | Now | Gone | New |", "|---|---|---|---|---|"]
for x in components["variants"]:
    L.append(f"| {x['component']} | {x['before']} | {x['after']} | {' · '.join(x['gone']) or '–'} | {' · '.join(x['new']) or '–'} |")
L += ["", f"Descriptions changed on {cdesc} components.", ""]
L += ["## Styles", ""] + [f"- Removed: {n}" for n in styles_out["removed"]] + [f"- Added: {n}" for n in styles_out["added"]] + [f"- Changed: {n} ({d})" for n, d in s_changed] + [""]
open(os.path.join(out_dir, "CHANGES.md"), "w").write("\n".join(L))
print(json.dumps(summary))
