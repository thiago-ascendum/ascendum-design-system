#!/usr/bin/env bash
# send_to_code.sh "<what changed>" [Collection,Collection]
#
# "Send to code" in one command. From the Figma file to a pull request:
#   1. reads the file through the Figma Plugin API and saves a named Figma version (its id goes into the snapshot)
#   2. optional: takes only the named collections, when another one is still being edited (scoped sync)
#   3. regenerates tokens, contracts, changes, breaking report and the migration, and runs every check
#   4. opens a pull request with the token diff and the Figma version. CI runs the gate again: red stops it.
# If Figma and Git already match, it stops and opens nothing.
#
# Needs: the Figma file open with the BridgeUX plugin (any Figma plan), git, gh, python3, node.
# Env:   BUX   path to bux.sh            (default: ~/AI Agents/BridgeUX/bux.sh)
#        FIGMA_FILE  file key             (default: the Ascendum DS file)
#        GH    gh command                 (default: gh)
set -euo pipefail
# The whole script is one block, read before it runs: switching branches below rewrites this file on disk.
{

MSG="${1:?usage: send_to_code.sh \"<what changed>\" [Collection,Collection]}"
ONLY="${2:-}"
BUX="${BUX:-$HOME/AI Agents/BridgeUX/bux.sh}"
FIGMA_FILE="${FIGMA_FILE:-5lhRMZkLHZijqgdigjk3J1}"
GH="${GH:-gh}"
cd "$(dirname "$0")/.."

git fetch -q origin main
BRANCH="figma/$(date -u +%Y%m%d-%H%M%S)"
git switch -q -c "$BRANCH" origin/main
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

echo "1/4 Reading Figma and saving a version: Send to code: $MSG"
TITLE="Send to code: ${MSG//\"/}"
sed "s|^const SOURCE_VERSION = .*|const SOURCE_VERSION = \"$TITLE\";|" pipeline/01b_snapshot_plugin_api.js > "$TMP/snap.js"
(cd "$(dirname "$BUX")" && BRIDGEUX_FILE="$FIGMA_FILE" ./bux.sh eval - 400000 < "$TMP/snap.js" > "$TMP/raw.json" 2>/dev/null)
python3 pipeline/01d_unwrap.py "$TMP/raw.json" "$TMP/fresh.json" > /dev/null
cp build/ds-snapshot.json "$TMP/git.json"

if [ -n "$ONLY" ]; then
  echo "2/4 Taking only: $ONLY"
  python3 pipeline/01c_take_collections.py build/ds-snapshot.json "$TMP/fresh.json" build/ds-snapshot.json ${ONLY//,/ }
else
  echo "2/4 Taking the whole file"
  cp "$TMP/fresh.json" build/ds-snapshot.json
fi
DIFF="$(python3 pipeline/token_diff.py "$TMP/git.json" build/ds-snapshot.json 2>/dev/null)"
VERSION="$(python3 - "$TMP/fresh.json" <<'PY'
import json, sys
v = json.load(open(sys.argv[1]))["meta"]["figmaVersion"]
print(f'{v["id"]} "{v["title"]}"')
PY
)"

echo "3/4 Regenerating and checking"
GATE=ok
python3 pipeline/02_build.py build/ds-snapshot.json governance build > "$TMP/gate.txt" || GATE=red
python3 pipeline/04_catalogue.py build/ds-snapshot.json build > /dev/null
python3 pipeline/05_breaking.py build/before/ds-snapshot.json build/ds-snapshot.json build/breaking.json governance/accepted-breaking.json > "$TMP/breaking.txt" || GATE=red
python3 pipeline/06_changes.py build/before/ds-snapshot.json build/ds-snapshot.json build > /dev/null
python3 pipeline/06_code_checks.py build/tokens.css src/components > /dev/null || GATE=red
python3 pipeline/09_migrate.py build/before/ds-snapshot.json build/ds-snapshot.json governance/accepted-breaking.json build > /dev/null
node pipeline/tests/migrate_sim.mjs build/before/ds-snapshot.json build/ds-snapshot.json build/migrate.figma.js > /dev/null || GATE=red
python3 pipeline/03_compare.py build/before/report.json build/report.json build/compare.js > /dev/null

GENERATED="build/ds-snapshot.json build/tokens.json build/tokens.css build/AI-CONTRACT.md build/components.json build/text-styles.json build/contracts.json build/breaking.json build/report.json build/report.js build/compare.js build/CHANGES.md build/changes.json build/migration-plan.json build/migrate.figma.js"
# The first line of tokens.css names the Figma version, so it changes on every read: compare the rest.
if git diff --quiet -- build/tokens.json build/contracts.json build/components.json build/text-styles.json \
   && diff -q <(git show HEAD:build/tokens.css | tail -n +2) <(tail -n +2 build/tokens.css) > /dev/null; then
  echo "Figma and Git already match (version $VERSION). Nothing to send."
  git checkout -q -- build; git switch -q -; git branch -q -D "$BRANCH"
  exit 0
fi

echo "4/4 Opening the pull request"
git add -- $GENERATED
git commit -q -m "Send to code: $MSG (Figma version $VERSION)"
git push -q -u origin "$BRANCH"
BODY="$TMP/body.md"
{
  echo "From Figma, by send_to_code.sh. Figma version $VERSION."
  [ -n "$ONLY" ] && echo "Collections taken: $ONLY. Everything else stays as it is in Git."
  echo; echo "**Token changes**"; echo "$DIFF"
  echo; echo "**Local gate: $GATE.** CI runs it again on this pull request. Red means it cannot be merged or published."
  echo; echo "$(head -1 "$TMP/gate.txt")"; echo "$(tail -1 "$TMP/breaking.txt")"
} > "$BODY"
$GH pr create --base main --head "$BRANCH" --title "Send to code: $MSG" --body-file "$BODY"
git switch -q -
exit 0
}
