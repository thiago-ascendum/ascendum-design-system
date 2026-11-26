"""04_catalogue.py <ds-snapshot.json> <out-dir>

One snapshot in, three small files out, so the Storybook pages are read from data and not typed by hand:
  <out-dir>/text-styles.json  every text style: name, family, weight, size, lineHeight, letterSpacing
  <out-dir>/components.json   every component of the library except icons and removed ones:
                              name, page, number of variants, variant names, description
  <out-dir>/contracts.json    one contract per component for AI tools: when to use it, properties and values,
                              states, the tokens it binds and two rules

Usage: python3 pipeline/04_catalogue.py build/ds-snapshot.json build
The output is sorted and carries no timestamp, so the same snapshot always gives the same bytes.
"""
import json
import os
import sys


def tidy(pair):
    """[129.99999523162842, "PERCENT"] -> [130, "PERCENT"]"""
    if isinstance(pair, list) and len(pair) == 2 and isinstance(pair[0], (int, float)):
        v = round(pair[0], 2)
        return [int(v) if v == int(v) else v, pair[1]]
    return pair


snapshot = json.load(open(sys.argv[1]))
out_dir = sys.argv[2]

styles = [
    {"name": s["name"], "family": s.get("family"), "weight": s.get("weight"), "size": s.get("size"),
     "lineHeight": tidy(s.get("lineHeight")), "letterSpacing": tidy(s.get("letterSpacing"))}
    for s in snapshot["styles"] if s.get("kind") == "TEXT"
]
styles.sort(key=lambda s: (-s["size"], s["name"]))

components = [
    {"name": c["name"], "page": c.get("page"), "variantCount": len(c.get("variants", [])),
     "variants": sorted(c.get("variants", [])), "description": c.get("description", "")}
    for c in snapshot["components"]
    if not c["name"].startswith("Icon/") and "(removed" not in c["name"]
]
components.sort(key=lambda c: c["name"])

# ---------------------------------------------------------------- component contracts (what an AI tool may use)
# One entry per component: when to use it, the properties and values that exist, its states and the tokens it binds.
# Everything here is read from the snapshot. Nothing is typed by hand.
var_by_id = {v["id"]: v for v in snapshot["variables"]}
bound = {}
for layer in snapshot["layers"]:
    comp = layer.get("component")
    if not comp:
        continue
    for vid in layer.get("vars", []):
        v = var_by_id.get(vid)
        if v:
            code = (v.get("codeSyntax") or "").replace("var(", "").replace(")", "") or v["name"]
            bound.setdefault(comp, set()).add(code)


def axes(variants):
    out = {}
    for name in variants:
        for part in name.split(", "):
            if "=" in part:
                k, val = part.split("=", 1)
                if val not in out.setdefault(k, []):
                    out[k].append(val)
    return out


contracts = []
for c in components:
    ax = axes(c["variants"])
    contracts.append({
        "component": c["name"],
        "use": c["description"],
        "figmaPage": c["page"],
        "properties": ax,
        "states": ax.get("State", []),
        "variants": c["variantCount"],
        "tokens": sorted(bound.get(c["name"], [])),
        "rules": [
            "Use only the properties and values listed here. To add one, propose it.",
            "Bind only the tokens listed here. Never type a raw colour, size or spacing value.",
        ],
    })

for fname, data in (("text-styles.json", styles), ("components.json", components), ("contracts.json", contracts)):
    with open(os.path.join(out_dir, fname), "w") as f:
        json.dump(data, f, ensure_ascii=False, indent=2, sort_keys=True)
        f.write("\n")
print(f"{len(styles)} text styles, {len(components)} components, {len(contracts)} contracts -> {out_dir}")
