"""03_compare.py <report-before.json> <report-after.json> <out.js>

Two reports in, one small diff out: for every check, the count before and after.
This is the same idea the changelog should be built on: the difference between two snapshots,
not somebody's memory of what they changed.
"""
import json
import sys

before, after = json.load(open(sys.argv[1])), json.load(open(sys.argv[2]))
b = {f["id"]: f for f in before["findings"]}
rows = []
for f in after["findings"]:
    o = b.get(f["id"])
    rows.append({"id": f["id"], "title": f["title"], "level": f["level"],
                 "before": o["count"] if o else None, "after": f["count"]})
gone = [{"id": k, "title": v["title"], "level": v["level"], "before": v["count"], "after": None}
        for k, v in b.items() if k not in {f["id"] for f in after["findings"]}]
out = {"gate": {"before": before["meta"]["gate"], "after": after["meta"]["gate"]},
       "summary": {"before": before["meta"]["summary"], "after": after["meta"]["summary"]},
       "totals": {"before": before["meta"]["totals"], "after": after["meta"]["totals"]},
       "rows": rows + gone}
open(sys.argv[3], "w").write("window.DS_COMPARE = " + json.dumps(out, ensure_ascii=False) + ";\n")
print("gate", out["gate"])
for r in out["rows"]:
    print(f"  {r['level']:<8} {str(r['before']):>5} -> {str(r['after']):<5} {r['title']}")
