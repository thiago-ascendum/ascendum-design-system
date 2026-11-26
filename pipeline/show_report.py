"""show_report.py <report.json> [finding-id ...]: print findings with their evidence (all, or only the ids given)."""
import json
import sys

R = json.load(open(sys.argv[1]))
want = set(sys.argv[2:])
print(R["meta"]["gate"], R["meta"]["summary"], R["meta"]["totals"])
for c in R["collections"]:
    print("  collection", c)
for f in R["findings"]:
    if want and f["id"] not in want:
        continue
    print(f"\n[{f['level']}] {f['id']} · {f['count']} · {f['title']}\n  {f['summary']}")
    for e in f["evidence"]:
        print("   -", e[:700])
