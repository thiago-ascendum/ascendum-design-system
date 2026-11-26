"""05_breaking.py <old-snapshot.json> <new-snapshot.json> <out.json>

Breaking change detection. Compares two snapshots of the design system and lists what a file or a
codebase that uses the old one would lose: tokens, components, properties, property values and text styles
that are no longer there. Additions are counted, not listed: they break nothing.

Removing something can be the right decision; the point is that nobody finds out by accident. So it blocks
(exit code 1) when a break is not written down in governance/accepted-breaking.json. Accepting a break is a
reviewed change to that file, in the same pull request, with the release that announces it.
The list is the input for the "Does this break my file?" table of the changelog.

Usage: python3 pipeline/05_breaking.py build/before/ds-snapshot.json build/ds-snapshot.json build/breaking.json [governance/accepted-breaking.json]
Plain Python 3, no dependencies. The output is sorted and carries no timestamp.
"""
import json
import sys


def load(path):
    snap = json.load(open(path))
    published = {c["name"] for c in snap.get("collections", []) if c.get("published", True)}
    # Only published collections reach a consumer. Primitives are private: renaming them breaks nobody.
    tokens = {v["name"]: v for v in snap.get("variables", []) if v.get("collection") in published and not v.get("remote") and not v.get("deleted")}
    comps = {}
    for c in snap.get("components", []):
        name = c["name"]
        if name.startswith("Icon/") or "(removed" in name:
            continue
        axes = {}
        for variant in c.get("variants", []):
            for part in variant.split(", "):
                if "=" in part:
                    key, value = part.split("=", 1)
                    axes.setdefault(key, set()).add(value)
        comps[name] = axes
    styles = {s["name"] for s in snap.get("styles", []) if s.get("kind") == "TEXT"}
    return tokens, comps, styles


old_tokens, old_comps, old_styles = load(sys.argv[1])
new_tokens, new_comps, new_styles = load(sys.argv[2])

removed_tokens = sorted(set(old_tokens) - set(new_tokens))
retyped_tokens = sorted(n for n in set(old_tokens) & set(new_tokens) if old_tokens[n].get("type") != new_tokens[n].get("type"))
removed_components = sorted(set(old_comps) - set(new_comps))
removed_properties, removed_values = [], []
for name in sorted(set(old_comps) & set(new_comps)):
    for prop in sorted(old_comps[name]):
        if prop not in new_comps[name]:
            removed_properties.append({"component": name, "property": prop, "values": sorted(old_comps[name][prop])})
            continue
        for value in sorted(old_comps[name][prop] - new_comps[name][prop]):
            removed_values.append({"component": name, "property": prop, "value": value})
removed_styles = sorted(old_styles - new_styles)

report = {
    "breaking": len(removed_tokens) + len(retyped_tokens) + len(removed_components) + len(removed_properties) + len(removed_values) + len(removed_styles),
    "removedTokens": removed_tokens,
    "retypedTokens": retyped_tokens,
    "removedComponents": removed_components,
    "removedProperties": removed_properties,
    "removedValues": removed_values,
    "removedTextStyles": removed_styles,
    "added": {
        "tokens": len(set(new_tokens) - set(old_tokens)),
        "components": len(set(new_comps) - set(old_comps)),
        "textStyles": len(new_styles - old_styles),
    },
}
with open(sys.argv[3], "w") as f:
    json.dump(report, f, ensure_ascii=False, indent=2, sort_keys=True)
    f.write("\n")

print(f"BREAKING CHANGES: {report['breaking']}")
print(f"  tokens removed        {len(removed_tokens)}")
print(f"  tokens that changed type  {len(retyped_tokens)}")
print(f"  components removed    {len(removed_components)}" + (": " + ", ".join(removed_components) if removed_components else ""))
print(f"  properties removed    {len(removed_properties)}" + (": " + ", ".join(f"{p['component']}.{p['property']}" for p in removed_properties) if removed_properties else ""))
print(f"  property values removed  {len(removed_values)}")
print(f"  text styles removed   {len(removed_styles)}" + (": " + ", ".join(removed_styles) if removed_styles else ""))


def keys(r):
    out = [f"token removed: {t}" for t in r["removedTokens"]] + [f"token type changed: {t}" for t in r["retypedTokens"]]
    out += [f"component removed: {c}" for c in r["removedComponents"]]
    out += [f"property removed: {p['component']}.{p['property']}" for p in r["removedProperties"]]
    out += [f"value removed: {v['component']}.{v['property']}={v['value']}" for v in r["removedValues"]]
    out += [f"text style removed: {t}" for t in r["removedTextStyles"]]
    return out


unaccepted = []
if len(sys.argv) > 4:
    accepted = set(json.load(open(sys.argv[4]))["accepted"])
    unaccepted = [k for k in keys(report) if k not in accepted]
print(f"  added, not breaking: {report['added']['tokens']} tokens, {report['added']['components']} components, {report['added']['textStyles']} text styles")
if len(sys.argv) > 4:
    print(f"  {'ok ' if not unaccepted else 'BLOCK'}  breaks not accepted in {sys.argv[4]}: {len(unaccepted)}")
    for k in unaccepted:
        print("        " + k)
    sys.exit(1 if unaccepted else 0)
