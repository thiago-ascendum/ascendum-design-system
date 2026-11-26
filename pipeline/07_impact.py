"""07_impact.py <report.json> <components-dir> <token name> [...]

"What moves if I change this token?" in one answer, for Figma and for code:
  Figma: the tokens that alias it, the layers bound to it, by component and by page (from the impact map of 02_build).
  Code:  every component stylesheet that uses its CSS property, or the property of a token that aliases it.

Usage: python3 pipeline/07_impact.py build/report.json src/components component/button/padding-h
"""
import glob
import json
import os
import sys

report, comp_dir, names = json.load(open(sys.argv[1])), sys.argv[2], sys.argv[3:]
by_name = {}
for entry in report["impact"].values():
    by_name.setdefault(entry["name"], entry)
code_of = {e["name"]: e["code"] for e in report["impact"].values()}
sheets = {f: open(f).read() for f in sorted(glob.glob(os.path.join(comp_dir, "*.css")))}
for name in names:
    e = by_name.get(name)
    if not e:
        print(f"{name}: not a token")
        continue
    props = [e["code"]] + [code_of[a] for a in e["aliases"] if a in code_of]
    files = sorted({os.path.basename(f) for f, t in sheets.items() for p in props if f"var({p})" in t})
    print(f"{name}  ({e['collection']}, {e['code']}, values {e['values']})")
    print(f"  Figma: {len(e['aliases'])} tokens alias it, {e['layers']} layers bound, {e['productLayers']} of them inside components")
    print("    components: " + ", ".join(f"{c} {n}" for c, n in e["components"] if not c.startswith("(")))
    print(f"  Code: {len(files)} stylesheets use it: " + (", ".join(files) or "none"))
