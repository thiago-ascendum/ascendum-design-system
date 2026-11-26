"""09_migrate.py <old-snapshot.json> <new-snapshot.json> <accepted-breaking.json> <out-dir>

Migration that keeps identities. A file that uses the old library (or a copy of the published library) is
brought to the new one by changing what is there, never by deleting and recreating it:

  rename    a variable that kept its Figma id but changed its name is renamed in place.
            Every layer bound to it stays bound: nothing has to be rebound by hand.
  update    values, aliases, code names, descriptions and scopes are set on the existing variable.
  create    only what is really new (a new id) is created: collections, modes and variables.
  review    what is gone is never deleted by the script. It is listed for a person, and marked
            "accepted" when governance/accepted-breaking.json already accepts it.

Matching is by Figma id, the same rule as 06_changes.py. In the target file a variable is found by its id
first, then by its old collection and old name (a copy of the file can give new ids).

Writes:
  <out-dir>/migration-plan.json  the plan, sorted, no timestamp
  <out-dir>/migrate.figma.js     a Figma Plugin API script with the plan inside. It runs in dry run by
                                 default: it reports what it would do and changes nothing. Set APPLY = true
                                 to apply it, on a copy first.

Usage: python3 pipeline/09_migrate.py build/before/ds-snapshot.json build/ds-snapshot.json governance/accepted-breaking.json build
Plain Python 3, no dependencies.
"""
import json
import os
import sys

old, new = json.load(open(sys.argv[1])), json.load(open(sys.argv[2]))
accepted = set(json.load(open(sys.argv[3]))["accepted"])
out_dir = sys.argv[4]


def live(snap):
    return {v["id"]: v for v in snap["variables"] if not v.get("remote") and not v.get("deleted")}


OV, NV = live(old), live(new)
OC = {c["id"]: c for c in old["collections"]}
NC = {c["id"]: c for c in new["collections"]}


def value(x, names):
    """One mode value in the plan: an alias by collection and name, or a plain value."""
    if x.get("alias"):
        return {"alias": names.get(x["alias"])}
    return {"value": x.get("value")}


new_names = {i: [v["collection"], v["name"]] for i, v in NV.items()}
old_names = {i: [v["collection"], v["name"]] for i, v in OV.items()}

plan = {"collections": {"create": [], "rename": [], "addModes": []}, "variables": {"rename": [], "update": [], "create": [], "review": []}}

for cid, c in sorted(NC.items()):
    if c.get("remote"):
        continue
    if cid not in OC:
        plan["collections"]["create"].append({"id": cid, "name": c["name"], "modes": c["modes"]})
        continue
    if OC[cid]["name"] != c["name"]:
        plan["collections"]["rename"].append({"id": cid, "from": OC[cid]["name"], "to": c["name"]})
    for m in c["modes"]:
        if m not in OC[cid]["modes"]:
            plan["collections"]["addModes"].append({"collection": c["name"], "mode": m})

moved = set()
for vid, v in sorted(NV.items(), key=lambda kv: (kv[1]["collection"], kv[1]["name"])):
    o = OV.get(vid)
    if o and o["collectionId"] != v["collectionId"]:
        moved.add(vid)  # Figma cannot move a variable to another collection: it is created there, and the old one goes to review
        o = None
    target = {"id": vid, "collection": v["collection"], "name": v["name"]}
    if o is None:
        plan["variables"]["create"].append(dict(target, type=v["type"]))
    elif o["name"] != v["name"]:
        plan["variables"]["rename"].append({"id": vid, "collection": v["collection"], "oldCollection": o["collection"], "from": o["name"], "to": v["name"]})
    fields = {}
    for mode, x in v["values"].items():
        nx = value(x, new_names)
        ox = value(o["values"][mode], old_names) if o and mode in o["values"] else None
        # an alias is the same when it points to the same id, even if that id was renamed
        same = ox is not None and ((x.get("alias") and o["values"][mode].get("alias") == x["alias"]) or (not x.get("alias") and ox == nx))
        if not same:
            fields.setdefault("values", {})[mode] = nx
    for f in ("codeSyntax", "description", "scopes"):
        if o is None or (o.get(f) or None) != (v.get(f) or None):
            fields[f] = v.get(f)
    if fields:
        plan["variables"]["update"].append(dict(target, **fields))

for vid, o in sorted(OV.items(), key=lambda kv: (kv[1]["collection"], kv[1]["name"])):
    if vid in NV and vid not in moved:
        continue
    published = next((c.get("published", True) for c in old["collections"] if c["id"] == o["collectionId"]), True)
    taken = next((v for v in NV.values() if v["collection"] == o["collection"] and v["name"] == o["name"]), None)
    if f"token removed: {o['name']}" in accepted:
        status = "accepted"
    else:
        status = "private" if not published else "needs a decision"
    item = {"id": vid, "collection": o["collection"], "name": o["name"], "status": status,
            "replacedBy": new_names[vid] if vid in moved else None}
    if taken:
        # Its name now belongs to another variable (a rename or a new one). It is moved out of the way, never deleted.
        item["parkAs"] = "_review/" + o["name"]
        item["nameNowUsedBy"] = taken["id"]
    plan["variables"]["review"].append(item)

plan["summary"] = {
    "collectionsCreated": len(plan["collections"]["create"]), "collectionsRenamed": len(plan["collections"]["rename"]),
    "modesAdded": len(plan["collections"]["addModes"]), "variablesRenamed": len(plan["variables"]["rename"]),
    "variablesUpdated": len(plan["variables"]["update"]), "variablesCreated": len(plan["variables"]["create"]),
    "toReview": len(plan["variables"]["review"]),
    "toReviewNeedingDecision": sum(1 for r in plan["variables"]["review"] if r["status"] == "needs a decision"),
}
os.makedirs(out_dir, exist_ok=True)
with open(os.path.join(out_dir, "migration-plan.json"), "w") as f:
    json.dump(plan, f, indent=1, ensure_ascii=False, sort_keys=True)
    f.write("\n")

script = open(os.path.join(os.path.dirname(__file__), "09_migrate.template.js")).read()
with open(os.path.join(out_dir, "migrate.figma.js"), "w") as f:
    f.write(script.replace("/*PLAN*/null", json.dumps(plan, ensure_ascii=False, separators=(",", ":"))))

s = plan["summary"]
print("MIGRATION PLAN (identities kept: matched by Figma id)")
print(f"  collections  create {s['collectionsCreated']}, rename {s['collectionsRenamed']}, modes added {s['modesAdded']}")
print(f"  variables    rename {s['variablesRenamed']}, update {s['variablesUpdated']}, create {s['variablesCreated']}")
print(f"  review       {s['toReview']} gone ({s['toReviewNeedingDecision']} need a decision; never deleted by the script)")
