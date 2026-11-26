"""01c_take_collections.py <base-snapshot> <figma-snapshot> <out-snapshot> <collection> [<collection> ...]

Scoped sync. Takes only the named collections from a fresh Figma snapshot and keeps everything else as it is in
Git. Use it when one collection is ready to ship and another is still being edited in the same Figma file.
The result records the Figma version it came from and which collections were taken.

Usage: python3 pipeline/01c_take_collections.py build/ds-snapshot.json fresh.json build/ds-snapshot.json Component
"""
import json
import sys

base_path, fresh_path, out_path, names = sys.argv[1], sys.argv[2], sys.argv[3], set(sys.argv[4:])
base, fresh = json.load(open(base_path)), json.load(open(fresh_path))
taken = {v["id"]: v for v in fresh["variables"] if v["collection"] in names}
missing = [n for n in names if n not in {c["name"] for c in fresh["collections"]}]
if missing:
    sys.exit(f"not in the Figma snapshot: {missing}")
kept = [v for v in base["variables"] if v["collection"] not in names]
base["variables"] = kept + sorted(taken.values(), key=lambda v: v["id"])
ids = {v["id"] for v in base["variables"]}
for v in base["variables"]:
    for x in v["values"].values():
        if x.get("alias"):
            x["resolves"] = x["alias"] in ids
base["aliases"] = [a for a in fresh.get("aliases", []) if a["from"].endswith(tuple(" · " + n for n in names))] + \
                  [a for a in base.get("aliases", []) if not a["from"].endswith(tuple(" · " + n for n in names))]
base["meta"]["figmaVersion"] = dict(fresh["meta"]["figmaVersion"], collectionsTaken=sorted(names))
base["meta"]["aliasCount"] = len(base["aliases"])
json.dump(base, open(out_path, "w"), ensure_ascii=False)

print(f"took {len(taken)} tokens from {sorted(names)}, Figma version {fresh['meta']['figmaVersion']['id']}")
