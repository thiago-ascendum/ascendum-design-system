# Send to code, the Figma plugin

One button in Figma. The designer writes what changed and clicks Send to code.

1. The plugin reads the variables and components (the same code as `pipeline/01b_snapshot_plugin_api.js`) and saves a named Figma version.
2. It pushes the snapshot to a new branch `figma/...` in GitHub.
3. `.github/workflows/figma-sync.yml` regenerates tokens, contracts, changes and the migration, and opens the pull request with the token diff.
4. The checks run on the pull request. Red: it cannot be merged and nothing is published. Green: a person approves and the site is published.

Works on any Figma plan. It runs inside Figma, so someone has to click it: reading variables from a server needs the Enterprise plan.

## Install, once per person
1. Figma desktop app: Plugins, Development, Import plugin from manifest, choose `figma-plugin/manifest.json`.
2. Create a fine-grained GitHub token for this repository with Contents: read and write. Paste it in the plugin the first time. It stays on that computer (Figma client storage).

## Change the plugin
Edit `code.template.js` or `ui.html`, then `node figma-plugin/build.mjs`. Never edit `code.js` by hand.
