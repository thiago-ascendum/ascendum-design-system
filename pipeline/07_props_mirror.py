"""07_props_mirror.py <components.json> <src/components> [governance/props-mirror.json]

Code mirrors Figma, name for name. For every component that exists in code, each Figma
property must exist as a prop with the same name and the same options. Blocking: exit 1 on any gap.

The rule, in one place:
  Figma property name -> prop name in camelCase       "Leading icon" -> leadingIcon, "Style" -> style
  Figma option        -> lower case, spaces to hyphens "Line Large" -> line-large, "LG" -> lg
  True/False variant  -> a prop of the same name; any type ("Count" carries the number itself)
  State               -> only the states a person sets. Hover, Focus, Pressed and Filled come from
                         the browser, so they are not options in code.
  Extra props in code are allowed only when they are plumbing: events, ids, form wiring, children,
  ariaX for accessibility, and defaultX for an X that Figma has. The list is in governance/props-mirror.json.
"""
import json, os, re, sys

comps_path, src_dir = sys.argv[1], sys.argv[2]
gov_path = sys.argv[3] if len(sys.argv) > 3 else os.path.join(os.path.dirname(comps_path), "..", "governance", "props-mirror.json")
gov = json.load(open(gov_path)) if os.path.exists(gov_path) else {}
BROWSER = set(gov.get("browserStates", ["hover", "focus", "pressed", "filled"]))
PLUMBING = set(gov.get("plumbing", []))

key = lambda s: re.sub(r"[^a-z]", "", s.lower())
camel = lambda s: (lambda w: w[0].lower() + "".join(x[:1].upper() + x[1:] for x in w[1:]))(re.split(r"[\s_-]+", s.strip()))
opt = lambda s: re.sub(r"\s+", "-", s.strip().lower())

comps = {key(c["name"]): c for c in json.load(open(comps_path))}
fails, checked = [], 0
for f in sorted(os.listdir(src_dir)):
    if not f.endswith(".jsx"):
        continue
    name = f[:-4]
    c = comps.get(key(name))
    if not c:
        fails.append(f"{name}: in code but not in Figma")
        continue
    src = open(os.path.join(src_dir, f)).read()
    block = re.search(r"\.propTypes\s*=\s*\{(.*?)\n\};", src, re.S)
    types = dict(re.findall(r"^\s*(\w+):\s*(PropTypes[^\n]*?),?\s*$", block.group(1), re.M)) if block else {}
    props = c.get("properties")
    if props is None:
        fails.append(f"{name}: the snapshot has no properties for it; take a new snapshot")
        continue
    checked += 1
    figma_names = set()
    for p in props:
        pn = camel(p["name"]); figma_names.add(pn)
        if pn not in types:
            fails.append(f"{name}: Figma '{p['name']}' needs prop '{pn}'")
            continue
        if p["type"] != "VARIANT":
            continue
        opts = {opt(o) for o in p.get("options", [])}
        if opts <= {"true", "false"}:
            continue
        if p["name"].strip().lower() == "state":
            opts -= BROWSER
        code = {a or b for a, b in re.findall(r"'([^']+)'|\b(true|false)\b", types[pn])} if "oneOf(" in types[pn] else None
        if code is None:
            fails.append(f"{name}.{pn}: Figma has {sorted(opts)}; code is not a list of options")
        elif code != opts:
            fails.append(f"{name}.{pn}: Figma has {sorted(opts)}; code has {sorted(code)}")
    for pn in types:
        if pn in figma_names or pn in PLUMBING or pn.startswith("aria"):
            continue
        if pn.startswith("default") and (pn[7:8].lower() + pn[8:]) in figma_names:
            continue
        fails.append(f"{name}: prop '{pn}' is not in Figma")

print(f"PROPS MIRROR {'OK' if not fails else 'FAILED'} · {checked} components checked against Figma · {len(fails)} gaps")
for x in fails:
    print("  " + x)
sys.exit(1 if fails else 0)
