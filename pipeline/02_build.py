"""02_build.py <ds-snapshot.json> <governance-dir> <out-dir>

One command, four outputs, all generated from the same snapshot:
  tokens.json     design tokens (W3C design-tokens format, modes kept)
  tokens.css      CSS custom properties (light/dark, desktop/mobile)
  report.json/.js every check with its count, evidence and the owner's next step
  AI-CONTRACT.md  what an AI tool may use, and what it must never use

Exit code 1 if any BLOCK check fails: that is the gate a pipeline uses to stop a publish.
"""
import collections
import json
import os
import re
import sys

snap_path, gov_dir, out_dir = sys.argv[1], sys.argv[2], sys.argv[3]
S = json.load(open(snap_path))
GOV = json.load(open(os.path.join(gov_dir, "governance.json")))
os.makedirs(out_dir, exist_ok=True)

V = {v["id"]: v for v in S["variables"]}
local = {k: v for k, v in V.items() if not v["remote"] and not v["deleted"]}
layers = S["layers"]
_ign = [p.lower() for p in GOV["ignoredPages"]]
# out of scope: internal and deprecated pages, and artwork that is used as supplied (governance: artwork)
_artp = [p.lower() for p in GOV.get("artworkPages", [])]
layers = [L for L in layers if not any(p in L["page"].lower() for p in _ign) and not L.get("art") and not (L.get("component") or "").lower().startswith(("icon/", "logo", "ascendum logo", "ascedum icon")) and not any(L["page"].lower().endswith(p) for p in _artp)]
S["components"] = [c for c in S["components"] if not any(p in c["page"].lower() for p in _ign)]
ignored = [p.lower() for p in GOV["ignoredPages"]]


def in_component(L):
    """Structural, not by page name: a layer belongs to the product if it sits inside a component."""
    return bool(L["component"]) and not any(p in L["page"].lower() for p in ignored)


# ---------------------------------------------------------------- usage graph
uses = collections.defaultdict(list)          # variable id -> layers that bind it
for L in layers:
    for vid in L["vars"]:
        uses[vid].append(L)
alias_users = collections.defaultdict(set)    # variable id -> variables that alias it
for k, v in V.items():
    for m in v["values"].values():
        if m.get("alias") and m.get("resolves"):
            alias_users[m["alias"]].add(k)


def dependents(vid):
    """Every variable that changes when `vid` changes (walks alias chains upward)."""
    seen, todo = set(), [vid]
    while todo:
        x = todo.pop()
        for u in alias_users.get(x, ()):
            if u not in seen:
                seen.add(u)
                todo.append(u)
    return seen


def impact(vid):
    chain = dependents(vid)
    comp, pages, n, product = collections.Counter(), collections.Counter(), 0, 0
    for x in {vid} | chain:
        for L in uses.get(x, ()):
            n += 1
            if in_component(L):
                product += 1
                comp[L["component"]] += 1
            else:
                comp["(documentation, not a component)"] += 1
            pages[L["page"]] += 1
    return {"aliases": sorted(V[c]["name"] for c in chain), "layers": n, "productLayers": product,
            "components": comp.most_common(), "pages": pages.most_common(8)}


# ---------------------------------------------------------------- colour maths
def resolve(vid, mode, depth=0):
    v = V.get(vid)
    if not v or depth > 12:
        return None
    vals = v["values"]
    m = vals.get(mode) or next(iter(vals.values()), None)
    if not m:
        return None
    if m.get("alias"):
        return resolve(m["alias"], mode, depth + 1) if m.get("resolves") else None
    return m.get("value")


def rgb(h):
    h = h.lstrip("#")
    a = int(h[6:8], 16) / 255 if len(h) == 8 else 1.0
    return [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)], a


def lum(c):
    f = lambda x: x / 12.92 if x <= 0.03928 else ((x + 0.055) / 1.055) ** 2.4
    return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2])


def contrast(fg, bg):
    (f, fa), (b, _) = rgb(fg), rgb(bg)
    f = [fa * f[i] + (1 - fa) * b[i] for i in range(3)]
    a, c = lum(f), lum(b)
    return (max(a, c) + 0.05) / (min(a, c) + 0.05)


name_to_id = {}
for k, v in local.items():
    name_to_id.setdefault(v["name"], k)
palette = set()
for k, v in V.items():
    for m in v["values"].values():
        if isinstance(m.get("value"), str) and m["value"].startswith("#"):
            palette.add(m["value"][:7])

findings = []


def add(id_, level, title, count, summary, evidence=None, gary=None, fix=None, kind="A"):
    findings.append({"id": id_, "level": level, "title": title, "count": count, "summary": summary,
                     "evidence": evidence or [], "gary": gary or [], "fix": fix, "kind": kind,
                     "pass": level != "decision" and count == 0})


def top(counter, n=8):
    return [f"{a} ({b})" for a, b in counter.most_common(n)]


# ================================================================ BLOCK checks
broken = [(v["name"], mode) for v in local.values() for mode, m in v["values"].items()
          if (m.get("alias") and not m.get("resolves")) or m.get("external")]
add("alias-integrity", "block", "Every token alias resolves", len(broken),
    "A token that points to nothing renders as nothing. The CSS this library was migrated from had exactly this bug.",
    [f"{a} [{b}]" for a, b in broken[:10]], gary=[3], fix="Repoint or delete the alias before publishing.")

dep_rules = GOV["deprecated"]
dep_vars = [v for v in local.values() if any(v["name"].startswith(p) for d in dep_rules for p in d["prefixes"])]
dep_layers = collections.Counter()
for v in dep_vars:
    for L in uses.get(v["id"], ()):
        dep_layers[L["component"] or L["page"]] += 1
dep_values = set(x.lower() for d in dep_rules for x in d.get("variantValues", []))
dep_axes = set(x.lower() for d in dep_rules for x in d.get("variantAxes", []))
dep_variants = collections.Counter()
for c in S["components"]:
    for name in c["variants"]:
        for part in name.split(","):
            if "=" in part:
                ax, val = [p.strip().lower() for p in part.split("=", 1)]
                if ax in dep_axes and val in dep_values:
                    dep_variants[c["name"]] += 1
add("deprecated-still-shipped", "block", "Nothing marked for removal is still published",
    len(dep_vars) + sum(dep_variants.values()),
    f"The file's own note says to remove department colours. {len(dep_vars)} of those tokens are still there, "
    f"{sum(dep_layers.values())} layers still bind them and {sum(dep_variants.values())} variants are still named after departments. "
    "Anything an AI tool can see, it will use again.",
    ["tokens: " + ", ".join(sorted(v["name"] for v in dep_vars)),
     "layers still bound, by component: " + (", ".join(top(dep_layers)) or "none"),
     "department variants, by component: " + (", ".join(top(dep_variants)) or "none")],
    gary=[7, 18], fix="Move to the deprecated list with a removal date, migrate the consumers shown here, then delete.")

off_comp = collections.Counter()
off_comp_where = collections.Counter()
raw_all, raw_where, off_all, raw_split = collections.Counter(), collections.Counter(), collections.Counter(), collections.Counter()
bound_total = 0
for L in layers:
    bound_total += L["paints"]["bound"]
    for h in L["paints"]["raw"]:
        raw_all[h] += 1
        raw_where[("component: " + L["component"]) if in_component(L) else ("page: " + L["page"])] += 1
        raw_split["inside components" if in_component(L) else "documentation and internal pages"] += 1
        if h not in palette:
            off_all[h] += 1
            if in_component(L):
                off_comp[h] += 1
                off_comp_where[L["component"]] += 1
add("off-palette-in-component", "block", "No colour inside a component comes from outside the palette", sum(off_comp.values()),
    "A colour that exists in no token cannot be themed, cannot switch to dark mode and cannot be traced to a decision.",
    ["colours: " + (", ".join(top(off_comp, 12)) or "none"), "components: " + (", ".join(top(off_comp_where, 12)) or "none")],
    gary=[8, 18, 27], fix="Bind to an existing token, or propose a new token through the gate.")

css_name = {}
collisions = []


def css_var(v):
    if v["codeSyntax"]:
        m = re.match(r"var\((--[^)]+)\)", v["codeSyntax"])
        if m:
            return m.group(1)
    return "--" + re.sub(r"[^a-z0-9]+", "-", v["name"].lower()).strip("-")


for v in local.values():
    n = css_var(v)
    if n in css_name and css_name[n]["id"] != v["id"]:
        collisions.append(f'{n}: {css_name[n]["name"]} ({css_name[n]["collection"]}) and {v["name"]} ({v["collection"]})')
    css_name.setdefault(n, v)
add("code-name-collision", "block", "Every token has its own name in code", len(collisions),
    "Two tokens that export to the same CSS property silently overwrite each other in code.",
    collisions[:12], gary=[3], fix="Give each token a unique code name before the export runs.")

low = []
for mode in ("Light", "Dark"):
    for fg, bg, minimum in GOV["contrastPairs"]:
        if fg in name_to_id and bg in name_to_id:
            a, b = resolve(name_to_id[fg], mode), resolve(name_to_id[bg], mode)
            if isinstance(a, str) and isinstance(b, str):
                r = contrast(a, b)
                if r < minimum:
                    low.append((r, f"{fg} on {bg} [{mode}] = {r:.2f}:1 (needs {minimum}:1) · {a} on {b}"))
low.sort()
add("contrast", "block", "Text tokens meet WCAG AA contrast on their surfaces", len(low),
    "Checked from the tokens themselves, in light and dark, so a failing pair is caught before any screen is drawn.",
    [x for _, x in low], gary=[18], fix="Adjust the token value, or restrict where the pair may be used in the contract.")

# ================================================================ WARN checks
add("raw-colour", "warn", "Every colour is bound to a token or a style", sum(raw_all.values()),
    f"{sum(raw_all.values())} of {bound_total + sum(raw_all.values())} visible solid paints are typed in by hand. "
    f"{sum(off_all.values())} of them use {len(off_all)} colours that exist in no token.",
    ["split: " + ", ".join(top(raw_split)), "where: " + ", ".join(top(raw_where, 14)),
     "off-palette colours: " + ", ".join(top(off_all, 12))],
    gary=[8, 27], fix="Bind in bulk; what cannot be bound is a missing token or a mistake.")

_ref = tuple(GOV.get("referenceOnly", []))
unused = [v for v in local.values() if not uses.get(v["id"]) and not alias_users.get(v["id"]) and not v["name"].startswith(_ref)]
unused_ids = {v["id"] for v in unused}
doc_only = [v for v in local.values() if v["id"] not in unused_ids and not v["name"].startswith(_ref) and impact(v["id"])["productLayers"] == 0]
ug = collections.Counter(v["name"].split("/")[0] for v in unused)
dg = collections.Counter(v["name"].split("/")[0] for v in doc_only)
add("unused-token", "warn", "Every token is used by a component", len(unused) + len(doc_only),
    f"Of {len(local)} tokens, {len(unused)} are bound by nothing at all, and {len(doc_only)} more are used only by "
    "their own swatch on a documentation page, never by a component.",
    ["bound by nothing, by group: " + ", ".join(top(ug, 12)), "names: " + ", ".join(sorted(v["name"] for v in unused)),
     "documentation-only, by group: " + ", ".join(top(dg, 12)), "names: " + ", ".join(sorted(v["name"] for v in doc_only)[:60])],
    gary=[6, 7], fix="Delete, or record why it is kept (for example: reference-only values behind a gradient style).")

remote = [v for v in V.values() if v["remote"]]
remote_libs = sorted({c["library"] for c in S["collections"] if c["remote"] and c["library"]})
remote_used = sum(len(uses.get(v["id"], ())) for v in remote)
add("foreign-leftovers", "warn", "The library carries nothing from other libraries", len(remote),
    f"{len(remote)} variables from {len(remote_libs)} other library files are still attached to this file "
    f"({remote_used} layers use them). They are invisible in the Figma UI, which is why nobody removed them.",
    [", ".join(sorted({v['name'] for v in remote}))], gary=[16],
    fix="Detach. A source of truth should not depend on files nobody can name.")

ghosts = [v["name"] for v in V.values() if v["deleted"] and not v["remote"]]
add("deleted-but-present", "warn", "Deleted tokens are really gone", len(ghosts),
    "Tokens deleted in the UI but still stored in the file.", ghosts, fix="Re-save after cleanup; verify on the next snapshot.")

texts = [L for L in layers if L.get("text")]
no_style = [L for L in texts if not L["text"]["style"]]
ns_pages = collections.Counter(L["component"] or L["page"] for L in no_style)
ns_sizes = collections.Counter(L["text"]["size"] for L in no_style if L["text"]["size"] is not None)
add("text-without-style", "warn", "Every text layer uses a text style", len(no_style),
    f"{len(no_style)} of {len(texts)} text layers have no text style, in {len(ns_sizes)} different sizes.",
    ["where: " + ", ".join(top(ns_pages, 12)), "sizes (px): " + ", ".join(f"{a:g} ({b})" for a, b in ns_sizes.most_common(10))],
    gary=[9], fix="Apply the nearest style; a size with no style is a missing role or drift.")

tstyles = [s for s in S["styles"] if s["kind"] == "TEXT"]
norm = collections.defaultdict(list)
for s in tstyles:
    norm[re.sub(r"[^a-z]", "", s["name"].lower().replace("body", "").replace("default", "")) or s["name"]].append(s["name"])
by_spec = collections.defaultdict(list)
for s in tstyles:
    by_spec[(s["family"], s["weight"], s["size"], tuple(s["lineHeight"]), tuple(s["letterSpacing"]))].append(s["name"])
dups = [sorted(v) for v in by_spec.values() if len(v) > 1]
add("duplicate-text-style", "warn", "No two text styles say the same thing", sum(len(d) - 1 for d in dups),
    f"{len(tstyles)} text styles in the file; {len(dups)} groups are identical in font, weight, size, line height and tracking.",
    [" = ".join(d) for d in dups[:10]], gary=[9], fix="Keep one, remap the others, delete.")

fx = [L for L in layers if L.get("effects")]
fx_raw = [L for L in fx if not L["effects"]["styled"]]
add("effect-without-style", "warn", "Every shadow uses an elevation style", len(fx_raw),
    f"{len(fx_raw)} of {len(fx)} layers with effects do not use an effect style.",
    top(collections.Counter(L["component"] or L["page"] for L in fx_raw)), gary=[13], fix="Apply Elevation/* or remove.")

prim_ids = {k for k, v in local.items() if v["collection"] in GOV["privateCollections"]}
prim_direct = collections.Counter()
prim_which = collections.Counter()
for L in layers:
    if in_component(L):
        for vid in L["vars"]:
            if vid in prim_ids:
                prim_direct[L["component"]] += 1
                prim_which[V[vid]["name"]] += 1
add("primitive-bound-directly", "warn", "Components bind semantic tokens, never raw primitives", sum(prim_direct.values()),
    "The file's own rule: primitives are private, components bind the semantic layer. Where a component skips it, light/dark switching breaks.",
    ["components: " + ", ".join(top(prim_direct, 12)), "primitives: " + ", ".join(top(prim_which, 12))],
    gary=[8, 18], fix="Rebind to the semantic token; if none fits, that is a missing semantic role.")

no_code = [v["name"] for v in local.values() if not v["codeSyntax"]]
add("token-without-code-name", "warn", "Every token names its code equivalent", len(no_code),
    f"The file says 'every variable carries a code syntax entry'. {len(no_code)} of {len(local)} do not.",
    [", ".join(sorted(no_code)[:30])], gary=[2], fix="Generate the code name from the token name in the export step.")

no_desc = [c["name"] for c in S["components"] if not c["description"] and not c["name"].startswith("Icon/")]
add("component-without-description", "warn", "Every component says when to use it", len(no_desc),
    "A component with no description gives an AI tool nothing to decide with.", [", ".join(no_desc[:20])],
    gary=[19, 20], fix="Write the 'use when / do not use when' line; the contract is generated from it.")

# documentation drift: numbers the file states about itself vs what is in it
actual = {c["name"]: sum(1 for v in local.values() if v["collectionId"] == c["id"]) for c in S["collections"] if not c["remote"]}
icons = sum(1 for c in S["components"] if c["name"].startswith("Icon/"))
sets_n = sum(1 for c in S["components"] if c["set"])
variants_n = sum(len(c["variants"]) for c in S["components"])
effects_n = sum(1 for s in S["styles"] if s["kind"] == "EFFECT")
claims = {}
for L in texts:
    if "changelog" in L["page"].lower():
        continue  # a changelog is history: old numbers there are correct
    t = L["text"]["chars"]
    for name, n in re.findall(r"(Dimension|Primitives|Semantic|Component) \((\d+)", t):
        claims[f"{name} variables"] = (int(n), actual.get(name))
    for n in re.findall(r"(\d+) text styles", t):
        claims.setdefault(f"text styles (claim: {n})", (int(n), len(tstyles)))
    for n in re.findall(r"(\d+) icon components", t):
        claims.setdefault("icon components", (int(n), icons))
    for n in re.findall(r"(\d+) effect styles", t):
        claims.setdefault("effect styles", (int(n), effects_n))
    for n in re.findall(r"(\d+) atom component sets", t):
        claims.setdefault("component sets", (int(n), sets_n))
drift = [f"{k}: page says {a}, file has {b}" for k, (a, b) in sorted(claims.items()) if a != b]
add("documentation-drift", "warn", "The documentation matches the file", len(drift),
    "Numbers the library states about itself, compared with what is actually in it. Hand-written documentation goes stale the day after it is written.",
    drift, gary=[2, 5], fix="Stop writing these by hand: generate the overview and the changelog from the snapshot diff.")

# ================================================================ DECISIONS (measured, owner decides)
upper = [L for L in texts if (L["text"]["typedUpper"] or L["text"]["forcedCase"]) and not re.match(r"^[A-Z]+-\d+$", L["text"]["chars"]) and not L["text"]["chars"].startswith("#")]
add("uppercase-labels", "decision", "Uppercase labels: rule or exception?", len(upper),
    f"{len(upper)} text layers are typed in capitals. The file documents this as intentional for UI/Tag and UI/Eyebrow; the audit calls it against the typography rule. Both cannot be right.",
    ["where: " + ", ".join(top(collections.Counter(L["component"] or L["page"] for L in upper), 12)),
     "styles: " + ", ".join(top(collections.Counter(L["text"]["style"] or "(no style)" for L in upper)))],
    gary=[26, 33], kind="B", fix="Decide once, write it in governance.json, and the check enforces whichever answer you choose.")

axes = []
for c in sorted((c for c in S["components"] if c["set"]), key=lambda c: -len(c["variants"])):
    ax = collections.defaultdict(set)
    for name in c["variants"]:
        for part in name.split(","):
            if "=" in part:
                a, b = [p.strip() for p in part.split("=", 1)]
                ax[a].add(b)
    axes.append({"name": c["name"], "variants": len(c["variants"]), "axes": {a: sorted(b) for a, b in ax.items()}})
budget = GOV["variantBudget"]
over = [a for a in axes if a["variants"] > budget]
add("variant-budget", "decision", f"Components over the variant budget ({budget})", len(over),
    f"{sum(a['variants'] for a in axes)} variants across {len(axes)} component sets. The audit says 'probably half can go'. "
    "This lists each set with its axes, so the cut is a decision per axis, not a redesign.",
    [f"{a['name']}: {a['variants']} = " + " x ".join(f"{k}({len(v)})" for k, v in a["axes"].items()) for a in axes[:12]],
    gary=[20, 21, 22, 23, 32], kind="B", fix="Set the budget in governance.json; the gate then stops a set from growing past it.")

ramp = []
for v in sorted((v for v in local.values() if v["name"].startswith("neutral/")), key=lambda v: int(re.sub(r"\D", "", v["name"]) or 0)):
    i = impact(v["id"])
    ramp.append((v["name"], resolve(v["id"], "Value"), len(i["aliases"]), i["productLayers"]))
weak = [r for r in ramp if r[3] <= GOV["rampMinimumUses"]]
add("neutral-ramp", "decision", "Neutral ramp: which steps earn their place?", len(weak),
    f"{len(ramp)} neutral steps. {len(weak)} of them reach {GOV['rampMinimumUses']} component layers or fewer, "
    "even counting every semantic token that points to them.",
    [f"{n} {h}: {a} tokens alias it, {t} component layers reached" for n, h, a, t in ramp],
    gary=[6], kind="B", fix="Merge the weak steps into their neighbour; the impact map shows exactly what moves.")

tones = collections.defaultdict(set)
for a in axes:
    for k, vals in a["axes"].items():
        if k.lower() in ("tone", "state"):
            for val in vals:
                if val in ("Danger", "Error"):
                    tones[val].add(a["name"])
add("danger-vs-error", "decision", "'Danger' and 'Error' name the same thing", 1 if len(tones) > 1 else 0,
    "Two words for one meaning across components. An AI tool has no way to know they are the same.",
    [f"{k}: " + ", ".join(sorted(v)) for k, v in sorted(tones.items())], gary=[19], kind="B",
    fix="Choose one word; record the other as a forbidden alias in the contract.")

# ================================================================ tokens.json (W3C design tokens)
TYPE = {"COLOR": "color", "FLOAT": "number", "STRING": "string", "BOOLEAN": "boolean"}


def ref(vid):
    t = V[vid]
    return "{" + ".".join([t["collection"] or "external"] + t["name"].split("/")) + "}"


def tok_value(m):
    if m.get("alias"):
        return ref(m["alias"]) if m.get("resolves") else None
    return m.get("value")


tokens = {"$description": f"Generated from {S['meta']['sourceFile']} (snapshot {S['meta']['sourceSha256']}). Do not edit by hand."}
for v in sorted(local.values(), key=lambda v: (v["collection"], v["name"])):
    node = tokens.setdefault(v["collection"], {})
    parts = v["name"].split("/")
    for p in parts[:-1]:
        node = node.setdefault(p, {})
    modes = {mode: tok_value(m) for mode, m in v["values"].items()}
    first = next(iter(modes.values()))
    leaf = {"$type": TYPE.get(v["type"], "string"), "$value": first}
    if v["description"]:
        leaf["$description"] = v["description"]
    ext = {"code": css_var(v)}
    if len(set(json.dumps(x) for x in modes.values())) > 1:
        ext["modes"] = modes
    if any(v["name"].startswith(p) for d in dep_rules for p in d["prefixes"]):
        leaf["$deprecated"] = True
    leaf["$extensions"] = {"com.ascendum.ds": ext}
    node[parts[-1]] = leaf
json.dump(tokens, open(os.path.join(out_dir, "tokens.json"), "w"), indent=2, ensure_ascii=False)


# ================================================================ tokens.css
def css_val(v, m):
    if m.get("alias"):
        return f"var({css_var(V[m['alias']])})" if m.get("resolves") else None
    x = m.get("value")
    if v["type"] == "FLOAT":
        unit = "" if any(s in v["name"] for s in ("opacity", "weight", "line-height")) else "px"
        return f"{x:g}{unit}"
    return str(x).lower() if isinstance(x, str) and x.startswith("#") else str(x)


base, dark, mobile, surface = [], [], [], []  # surface: tokens that follow the Context mode (Default / Inverted)
for v in sorted(local.values(), key=lambda v: (GOV["collectionOrder"].index(v["collection"]) if v["collection"] in GOV["collectionOrder"] else 9, v["name"])):
    if css_name.get(css_var(v), v)["id"] != v["id"]:
        continue  # collision: first one wins here, and the gate reports it
    items = list(v["values"].items())
    d0 = css_val(v, items[0][1])
    if d0 is None:
        continue
    base.append(f"  {css_var(v)}: {d0};")
    for mode, m in items[1:]:
        x = css_val(v, m)
        if x is not None and x != d0:
            (dark if mode == "Dark" else surface if mode == "Inverted" else mobile).append(f"  {css_var(v)}: {x};")
_fv = S["meta"].get("figmaVersion") or {}
_src = S["meta"]["sourceSha256"] + (f', Figma version {_fv["id"]} "{_fv["title"]}"' if _fv.get("id") else "")
css = ["/* Generated from the design system snapshot " + _src + ". Do not edit by hand. */",
       ":root {", *base, "}", '[data-theme="dark"] {', *dark, "}", '[data-context="inverted"] {', *surface, "}",
       f"@media (max-width: {GOV['mobileBreakpoint'] - 1}px) {{", "  :root {", *["  " + x for x in mobile], "  }", "}", ""]
open(os.path.join(out_dir, "tokens.css"), "w").write("\n".join(css))

# ================================================================ impact map (the answer to "what breaks if I change this?")
impact_map = {}
for v in local.values():
    i = impact(v["id"])
    impact_map[v["name"] + " · " + v["collection"]] = {
        "name": v["name"], "collection": v["collection"], "type": v["type"], "code": css_var(v),
        "values": {m: (V[x["alias"]]["name"] if x.get("alias") and x.get("resolves") else x.get("value")) for m, x in v["values"].items()},
        "direct": len(uses.get(v["id"], ())), **i,
    }

# ================================================================ report
levels = collections.Counter()
for f in findings:
    if f["level"] == "decision":
        levels["decision"] += 1
    else:
        levels[f["level"] + ("-pass" if f["pass"] else "-fail")] += 1
gate_open = levels["block-fail"] == 0
report = {
    "meta": {**S["meta"], "gate": "OPEN" if gate_open else "CLOSED",
             "summary": dict(levels),
             "totals": {"tokens": len(local), "collections": sum(1 for c in S["collections"] if not c["remote"]),
                        "componentSets": sets_n, "variants": variants_n, "icons": icons, "textStyles": len(tstyles),
                        "textLayers": len(texts), "paints": bound_total + sum(raw_all.values()),
                        "fonts": dict(collections.Counter(L["text"]["family"] for L in texts))}},
    "collections": [{"name": c["name"], "modes": c["modes"], "tokens": actual.get(c["name"]), "published": c["published"]}
                    for c in S["collections"] if not c["remote"]],
    "findings": findings, "components": axes, "impact": impact_map,
}
json.dump(report, open(os.path.join(out_dir, "report.json"), "w"), indent=1, ensure_ascii=False)
open(os.path.join(out_dir, "report.js"), "w").write("window.DS_REPORT = " + json.dumps(report, ensure_ascii=False) + ";\n")

# ================================================================ AI-CONTRACT.md
sem = [v for v in local.values() if v["collection"] in GOV["publicCollections"] and not any(v["name"].startswith(p) for d in dep_rules for p in d["prefixes"])]
C = ["# Ascendum Design System · contract for AI tools", "",
     f"Generated from snapshot `{S['meta']['sourceSha256']}` on {S['meta']['generatedAt'][:10]}. Do not edit by hand: change the design system, then regenerate.",
     "", "Read this file instead of the Figma pages. The pages are documentation for people; their layout is not a pattern to copy.", "",
     "## 1. You may use", "",
     "- Only the tokens listed in section 4, by their code name.",
     "- Only the components and variants listed in section 5.",
     f"- One typeface: {GOV['typeface']}.", "",
     "## 2. You must never", "",
     "- Write a raw colour, size or spacing value. If no token fits, stop and ask; do not invent one.",
     "- Use a token from a private collection (" + ", ".join(GOV["privateCollections"]) + "). They exist only to feed the semantic layer."]
for d in dep_rules:
    C.append(f"- Use {d['what']}: {d['reason']}")
for rule in GOV["neverRules"]:
    C.append(f"- {rule}")
C += ["", "## 3. What to take from the Figma file, and what to ignore", ""]
for rule in GOV["readingRules"]:
    C.append(f"- {rule}")
C += ["", "## 4. Tokens", "", "| Code name | Token | Light / Desktop | Dark / Mobile | Use |", "|---|---|---|---|---|"]
for v in sorted(sem, key=lambda v: (v["collection"], v["name"])):
    if v["collection"] == "Component" and not any(v["name"].startswith(f"component/{s}/") for s in GOV["sliceTokens"]):
        continue
    vals = [resolve(v["id"], m) for m in v["values"]]
    a = vals[0]
    b = vals[1] if len(vals) > 1 and vals[1] != vals[0] else ""
    fmt = lambda x: "" if x == "" else (f"{x:g}" if isinstance(x, float) else str(x))
    C.append(f"| `{css_var(v)}` | {v['name']} | {fmt(a)} | {fmt(b)} | {v['description'].split('. ')[0][:90]} |")
C += ["", "## 5. Components in this slice", ""]
for a in axes:
    if a["name"] in GOV["sliceComponents"]:
        comp = next(c for c in S["components"] if c["name"] == a["name"] and c["set"])
        C += [f"### {a['name']}", "", comp["description"].split("\n")[0][:400], ""]
        for k, vals in a["axes"].items():
            allowed = [x for x in vals if x not in GOV["sliceComponents"][a["name"]].get("drop", {}).get(k, [])]
            dropped = [x for x in vals if x not in allowed]
            C.append(f"- **{k}**: {', '.join(allowed)}" + (f"  ·  not allowed: {', '.join(dropped)}" if dropped else ""))
        for line in GOV["sliceComponents"][a["name"]].get("use", []):
            C.append(f"- {line}")
        C.append("")
C += ["## 6. Before you hand anything back", "",
      "- Run the checks. If a BLOCK check fails, your change is not ready.",
      "- Say which tokens and components you used. If you needed something that does not exist, list it as a proposal; a person decides.", ""]
open(os.path.join(out_dir, "AI-CONTRACT.md"), "w").write("\n".join(C))

# ================================================================ console
print(f"GATE {report['meta']['gate']}  ·  block {levels['block-fail']} failing / {levels['block-pass']} passing  ·  "
      f"warn {levels['warn-fail']} failing / {levels['warn-pass']} passing  ·  {levels['decision']} decisions for the owner")
for f in findings:
    mark = {"block": "BLOCK", "warn": "warn ", "decision": "ask  "}[f["level"]]
    print(f"  {'ok ' if f['pass'] else '   '} {mark} {f['count']:>4}  {f['title']}")
sys.exit(0 if gate_open else 1)
