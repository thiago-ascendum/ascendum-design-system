"""figma_component_brief.py "<Figma component name>": everything needed to build that component in code, read
from the files the pipeline already generates. Read only.

Prints: the Figma properties and options (build/components.json), the documentation frame words (rows of
named variants, measures, key tokens, accessibility, use; build/figma-docs.json), and every layer of the
component with the variables it binds (build/ds-snapshot.json), in CSS names. The picture of the Figma page
is stories/figma-only/img/<slug>.jpg while the component has no code.
"""
import json, os, re, sys
from collections import Counter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
name = sys.argv[1]
key = lambda s: re.sub(r"[^a-z]", "", s.lower())
comps = json.load(open(os.path.join(ROOT, "build", "components.json")))
c = next((x for x in comps if key(x["name"]) == key(name)), None)
docs = json.load(open(os.path.join(ROOT, "build", "figma-docs.json")))["docs"]
d = next((v for k, v in docs.items() if key(k) == key(name)), None)
snap = json.load(open(os.path.join(ROOT, "build", "ds-snapshot.json")))
var = {v["id"]: v for v in snap["variables"]}
css = lambda v: (v.get("codeSyntax") or "").replace("var(", "").replace(")", "") or v["name"]

print(f"# {name}")
slug = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
print(f"Picture of the Figma page: stories/figma-only/img/{slug}.jpg")
if c:
    print(f"\n## Properties ({c['variantCount']} variants)")
    for p in c.get("properties", []):
        print(f"- {p['name']} ({p['type']})" + (f": {p.get('options')}" if p.get("options") else ""))
    print("Variants:", c["variants"][:40])
    print("Description:", c.get("description", ""))
if d:
    print("\n## Documentation frame")
    print("Lead:", d["lead"]); print("Chips:", d["chips"]); print("Text defaults:", d.get("defaults"))
    for r in d["rows"]:
        print(f"Row '{r['title']}'{' (inverted)' if r['inverted'] else ''}: " + " | ".join(f"{x['label']}={x['variant']}" for x in r["cells"]))
    for b in d["side"]:
        print(f"\n### {b['title']}")
        for it in b["items"]:
            print("  -", " · ".join(str(v) for k, v in it.items() if k != "kind" and v))
    print("In use frames:", [u["name"] for u in d["inUse"]])

ids = set()
for comp in snap["components"]:
    if key(comp["name"]) == key(name):
        ids.add(comp["id"])
pages = {comp["page"] for comp in snap["components"] if comp["id"] in ids}
layers = [l for l in snap["layers"] if l.get("component") in ids or l["id"] in ids or (l.get("page") in pages and l.get("component"))]
print(f"\n## Layers and bound variables ({len(layers)} layers; first variant of each name shown once)")
seen = Counter()
for l in layers:
    names = sorted({css(var[v]) for v in l.get("vars", []) if v in var})
    k = (l["name"], tuple(names))
    seen[k] += 1
    if seen[k] == 1 and (names or l["type"] in ("TEXT", "INSTANCE")):
        print(f"- {l['type']:9} {l['name'][:40]:40} {', '.join(names)}")
