"""06_code_checks.py <tokens.css> <components-dir>

The gate on the code side. Two rules, both blocking (exit code 1):
  1. No colour is typed by hand in a component stylesheet: no #hex, rgb() or hsl(). Colour comes from a token.
  2. Every var(--name) a component uses is defined, in tokens.css or in a component stylesheet.
     An undefined property renders as nothing, silently. This already happened once (--button-fill-solid).

Usage: python3 pipeline/06_code_checks.py build/tokens.css src/components
Plain Python 3, no dependencies.
"""
import glob
import os
import re
import sys

tokens_css, comp_dir = sys.argv[1], sys.argv[2]
defined = set(re.findall(r"(--[a-z0-9-]+)\s*:", open(tokens_css).read()))
files = sorted(glob.glob(os.path.join(comp_dir, "**", "*.css"), recursive=True))
sources = {f: open(f).read() for f in files}
for text in sources.values():
    defined |= set(re.findall(r"(--[a-z0-9-]+)\s*:", text))

colour = re.compile(r"#[0-9a-fA-F]{3,8}\b|\b(?:rgb|rgba|hsl|hsla)\(")
hand, undefined = [], []
for f, text in sources.items():
    for n, line in enumerate(text.splitlines(), 1):
        code = re.sub(r"/\*.*?\*/", "", line)
        if colour.search(code):
            hand.append(f"{f}:{n}: {code.strip()}")
        for name in re.findall(r"var\((--[a-z0-9-]+)", code):
            if name not in defined:
                undefined.append(f"{f}:{n}: {name}")

print(f"CODE CHECKS on {len(files)} stylesheets")
print(f"  {'ok ' if not hand else 'BLOCK'}  colours typed by hand: {len(hand)}")
for x in hand:
    print("        " + x)
print(f"  {'ok ' if not undefined else 'BLOCK'}  undefined custom properties: {len(undefined)}")
for x in undefined:
    print("        " + x)
sys.exit(1 if hand or undefined else 0)
