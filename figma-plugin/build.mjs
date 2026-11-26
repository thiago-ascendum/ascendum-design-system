// Builds code.js: the snapshot code of the pipeline (pipeline/01b_snapshot_plugin_api.js) inside the plugin,
// so the button and the pipeline always read the file the same way. Run: node figma-plugin/build.mjs
import { readFileSync, writeFileSync } from "node:fs";
const here = new URL(".", import.meta.url);
let snap = readFileSync(new URL("../pipeline/01b_snapshot_plugin_api.js", here), "utf8");
const line = /^const SOURCE_VERSION = .*$/m;
if (!line.test(snap)) throw new Error("01b has no SOURCE_VERSION line");
snap = snap.replace(line, "const SOURCE_VERSION = SOURCE_VERSION_ARG;");
const out = readFileSync(new URL("code.template.js", here), "utf8").replace("/*SNAPSHOT*/", snap);
writeFileSync(new URL("code.js", here), out);
console.log("figma-plugin/code.js", out.length, "bytes");
