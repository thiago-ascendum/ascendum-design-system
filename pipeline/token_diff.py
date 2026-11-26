"""token_diff.py <old-snapshot> <new-snapshot>: the token changes between two snapshots, as Markdown lines.
Compared by collection and name, aliases shown by name. Used for the pull request that send_to_code.sh opens."""
import json
import sys


def load(p):
    s = json.load(open(p))
    V = {v["id"]: v for v in s["variables"]}
    out = {}
    for v in s["variables"]:
        if v.get("remote") or v.get("deleted"):
            continue
        out[v["collection"] + " / " + v["name"]] = {m: (V[x["alias"]]["name"] if x.get("alias") and x["alias"] in V else x.get("value")) for m, x in v["values"].items()}
    return out


a, b = load(sys.argv[1]), load(sys.argv[2])
lines = [f"- added `{k}`" for k in sorted(set(b) - set(a))]
lines += [f"- removed `{k}`" for k in sorted(set(a) - set(b))]
for k in sorted(set(a) & set(b)):
    for m in b[k]:
        if a[k].get(m) != b[k][m]:
            lines.append(f"- `{k}` [{m}]: {a[k].get(m)} → {b[k][m]}")
print("\n".join(lines) if lines else "- no token changes")
print(f"TOTAL {len(lines)}", file=sys.stderr)
