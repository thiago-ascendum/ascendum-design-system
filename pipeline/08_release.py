"""08_release.py <snapshot> <figma-versions.json> <commit> <out release.json>

Writes the release record: which commit, which Figma version, which checks. A release in GitHub points to a
commit; this file points that commit back to Figma.

Usage: python3 pipeline/08_release.py build/ds-snapshot.json governance/figma-versions.json <sha> build/release.json
"""
import json
import sys

snap = json.load(open(sys.argv[1]))["meta"]
fv = json.load(open(sys.argv[2]))
pkg = json.load(open("package.json"))
breaking = json.load(open("build/breaking.json"))
report = json.load(open("build/report.json"))
blocks = [f for f in report["findings"] if f["level"] == "block"]
release = {
    "version": pkg["version"],
    "tag": "v" + pkg["version"],
    "commit": sys.argv[3],
    "figma": {
        "fileKey": fv["fileKey"],
        "release": next((v for v in fv["versions"] if v["title"] == "Colour roles"), None),
        "snapshotVersion": snap.get("figmaVersion") or {"id": None, "status": "read before the snapshot recorded versions", "generatedAt": snap["generatedAt"]},
        "versions": fv["versions"],
    },
    "checks": {"blocking": len(blocks), "blockingFailing": sum(1 for f in blocks if f["count"]), "breakingAccepted": breaking["breaking"]},
}
with open(sys.argv[4], "w") as f:
    json.dump(release, f, indent=2, ensure_ascii=False)
    f.write("\n")
print(json.dumps({k: release[k] for k in ("tag", "commit")}), "figma release version:", release["figma"]["release"]["title"])
