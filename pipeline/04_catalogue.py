"""04_catalogue.py <ds-snapshot.json> <out-dir>

One snapshot in, two small files out, so the Storybook pages are read from data and not typed by hand:
  <out-dir>/text-styles.json  every text style: name, family, weight, size, lineHeight, letterSpacing
  <out-dir>/components.json   every component of the library except icons and removed ones:
                              name, page, number of variants, variant names, description

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

for fname, data in (("text-styles.json", styles), ("components.json", components)):
    with open(os.path.join(out_dir, fname), "w") as f:
        json.dump(data, f, ensure_ascii=False, indent=2, sort_keys=True)
        f.write("\n")
print(f"{len(styles)} text styles, {len(components)} components -> {out_dir}")
