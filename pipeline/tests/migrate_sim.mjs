// migrate_sim.mjs <old-snapshot> <new-snapshot> <migrate.figma.js>
// Proves the migration without touching Figma: it builds a fake Figma file from the OLD snapshot (same ids,
// names, modes and values), runs the generated script on it with APPLY = true, then compares the result with
// the NEW snapshot. Exit code 1 if any variable differs, or if a renamed variable lost its id.
import { readFileSync } from "node:fs";

const [oldPath, newPath, scriptPath] = process.argv.slice(2);
const OLD = JSON.parse(readFileSync(oldPath, "utf8"));
const NEW = JSON.parse(readFileSync(newPath, "utf8"));
const hexOf = (c) => "#" + [c.r, c.g, c.b].map((x) => Math.round(x * 255).toString(16).padStart(2, "0")).join("").toUpperCase() + (c.a < 0.999 ? Math.round(c.a * 255).toString(16).padStart(2, "0").toUpperCase() : "");
const rgba = (hex) => { const h = hex.replace("#", ""); const n = (i) => parseInt(h.slice(i, i + 2), 16) / 255; return { r: n(0), g: n(2), b: n(4), a: h.length === 8 ? n(6) : 1 }; };

let seq = 0;
const collections = new Map(), variables = new Map();
function makeCollection(id, name, modeNames) {
  const c = { id, name, modes: modeNames.map((m, i) => ({ modeId: `${id}:m${i}`, name: m })),
    renameMode(modeId, name) { this.modes.find((m) => m.modeId === modeId).name = name; },
    addMode(name) { const modeId = `${this.id}:m${this.modes.length}`; this.modes.push({ modeId, name }); return modeId; } };
  collections.set(id, c); return c;
}
function makeVariable(id, name, collectionId, type) {
  const v = { id, name, variableCollectionId: collectionId, resolvedType: type, valuesByMode: {}, codeSyntax: {}, description: "", scopes: ["ALL_SCOPES"],
    setValueForMode(modeId, x) { this.valuesByMode[modeId] = x; },
    setVariableCodeSyntax(p, x) { this.codeSyntax[p] = x; }, removeVariableCodeSyntax(p) { delete this.codeSyntax[p]; } };
  variables.set(id, v); return v;
}
for (const c of OLD.collections) if (!c.remote) makeCollection(c.id, c.name, c.modes);
for (const v of OLD.variables) {
  if (v.remote || v.deleted) continue;
  const x = makeVariable(v.id, v.name, v.collectionId, v.type);
  x.description = v.description || ""; x.scopes = v.scopes || ["ALL_SCOPES"]; if (v.codeSyntax) x.codeSyntax.WEB = v.codeSyntax;
  const col = collections.get(v.collectionId);
  for (const [mode, val] of Object.entries(v.values)) {
    const m = col.modes.find((mm) => mm.name === mode);
    x.valuesByMode[m.modeId] = val.alias ? { type: "VARIABLE_ALIAS", id: val.alias } : typeof val.value === "string" && val.value.startsWith("#") ? rgba(val.value) : val.value;
  }
}
const figma = { variables: {
  getLocalVariableCollectionsAsync: async () => [...collections.values()],
  getLocalVariablesAsync: async () => [...variables.values()],
  createVariableCollection: (name) => makeCollection(`New:${++seq}`, name, ["Mode 1"]),
  createVariable: (name, col, type) => makeVariable(`NewVar:${++seq}`, name, col.id, type),
  createVariableAlias: (v) => ({ type: "VARIABLE_ALIAS", id: v.id }),
} };

const body = readFileSync(scriptPath, "utf8").replace("const APPLY = false;", "const APPLY = true;");
const run = new Function("figma", `return (async () => { ${body} })();`);
const report = JSON.parse(await run(figma));

// Compare by collection and name, with aliases as names, against the NEW snapshot.
const nameOf = (id) => { const v = variables.get(id); return v ? collections.get(v.variableCollectionId).name + "/" + v.name : "missing " + id; };
const got = new Map();
for (const v of variables.values()) {
  const col = collections.get(v.variableCollectionId);
  const values = {};
  for (const m of col.modes) { const x = v.valuesByMode[m.modeId]; values[m.name] = x == null ? null : x.type === "VARIABLE_ALIAS" ? "→ " + nameOf(x.id) : typeof x === "object" ? hexOf(x) : x; }
  got.set(col.name + "/" + v.name, { values, code: v.codeSyntax.WEB || null, description: v.description || "", scopes: [...v.scopes].sort(), id: v.id });
}
const NV = new Map(NEW.variables.filter((v) => !v.remote && !v.deleted).map((v) => [v.id, v]));
const want = new Map();
for (const v of NV.values()) {
  const values = {};
  for (const [mode, x] of Object.entries(v.values)) values[mode] = x.alias ? "→ " + (NV.get(x.alias) ? NV.get(x.alias).collection + "/" + NV.get(x.alias).name : "missing") : x.value;
  want.set(v.collection + "/" + v.name, { values, code: v.codeSyntax || null, description: v.description || "", scopes: [...(v.scopes || ["ALL_SCOPES"])].sort(), id: v.id });
}
const diffs = [];
for (const [k, w] of want) {
  const g = got.get(k);
  if (!g) { diffs.push(`missing ${k}`); continue; }
  for (const f of ["values", "code", "description", "scopes"]) if (JSON.stringify(g[f]) !== JSON.stringify(w[f])) diffs.push(`${k} ${f}: got ${JSON.stringify(g[f])} want ${JSON.stringify(w[f])}`);
}
const oldIds = new Set(OLD.variables.map((v) => v.id));
let kept = 0, lost = [];
for (const [k, w] of want) if (oldIds.has(w.id)) { if (got.get(k) && got.get(k).id === w.id) kept++; else lost.push(k); }
const extra = [...got.keys()].filter((k) => !want.has(k));
// Figma does not allow two variables with one name in a collection, and no temporary name may be left behind.
const seen = new Map();
for (const v of variables.values()) { const k = v.variableCollectionId + "/" + v.name; seen.set(k, (seen.get(k) || 0) + 1); }
for (const [k, n] of seen) if (n > 1) diffs.push(`${k} name used ${n} times`);
for (const v of variables.values()) if (v.name.startsWith("__migrating__")) diffs.push(`${v.name} left with a temporary name`);

console.log(`MIGRATION SIMULATION (old file -> script -> compared with new file)`);
console.log(`  changes applied ${report.changes}, already there ${report.alreadyThere}, not found ${report.notFound.length}`);
console.log(`  variables in the new file: ${want.size}; matching after migration: ${want.size - new Set(diffs.map((d) => d.split(" ")[0])).size}`);
console.log(`  identities kept: ${kept} of ${kept + lost.length} variables that existed before (layers stay bound)`);
console.log(`  left for review, not deleted: ${extra.length}`);
for (const d of diffs.slice(0, 20)) console.log("  DIFF " + d);
for (const l of lost.slice(0, 10)) console.log("  LOST ID " + l);
for (const n of report.notFound.slice(0, 10)) console.log("  NOT FOUND " + n);
process.exit(diffs.length || lost.length || report.notFound.length ? 1 : 0);
