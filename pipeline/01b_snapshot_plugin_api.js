// 01b_snapshot_plugin_api.js
// The official route to the same snapshot: Figma Plugin API, run through the Figma MCP
// (or pasted into any plugin console). Read-only: it changes nothing in the file.
//
// STATUS: run against the Figma file on 25 and 26 November 2026. Both reports in build/ come from it.
//
// If the result is too large for one call, run it per page: set ONLY_PAGE to a page name.
const ONLY_PAGE = null;
// Every snapshot names the Figma version it was read from. The snapshot saves a named version first
// and stores its id and title, so any token in Git can be traced back to one point in the file history.
// Set SOURCE_VERSION to null to read without saving a version (then the snapshot says "unsaved").
const SOURCE_VERSION = "Snapshot for Git";

const hex = (c, a = 1) => {
  const h = "#" + [c.r, c.g, c.b].map((x) => Math.round(Math.max(0, Math.min(1, x)) * 255).toString(16).padStart(2, "0")).join("").toUpperCase();
  return a >= 0.999 ? h : h + Math.round(a * 255).toString(16).padStart(2, "0").toUpperCase();
};

await figma.loadAllPagesAsync();
const cols = await figma.variables.getLocalVariableCollectionsAsync();
const vars = await figma.variables.getLocalVariablesAsync();
const colById = Object.fromEntries(cols.map((c) => [c.id, c]));
const varIds = new Set(vars.map((v) => v.id));
const varName = Object.fromEntries(vars.map((v) => [v.id, v.name + " · " + (colById[v.variableCollectionId] || {}).name]));

const collections = cols.map((c) => ({
  id: c.id, name: c.name, modes: c.modes.map((m) => m.name), remote: c.remote, published: !c.hiddenFromPublishing, library: null,
}));

const variables = vars.map((v) => {
  const c = colById[v.variableCollectionId];
  const values = {};
  for (const m of c ? c.modes : []) {
    const x = v.valuesByMode[m.modeId];
    if (x && x.type === "VARIABLE_ALIAS") values[m.name] = { alias: x.id, aliasName: varName[x.id] || null, resolves: varIds.has(x.id) };
    else if (x && typeof x === "object" && "r" in x) values[m.name] = { value: hex(x, x.a) };
    else values[m.name] = { value: typeof x === "number" ? Math.round(x * 1e4) / 1e4 : x };
  }
  return {
    id: v.id, name: v.name, collection: c ? c.name : null, collectionId: v.variableCollectionId, type: v.resolvedType,
    remote: v.remote, deleted: false, description: v.description || "", scopes: v.scopes,
    codeSyntax: (v.codeSyntax && v.codeSyntax.WEB) || null, values,
  };
});

const textStyles = await figma.getLocalTextStylesAsync();
const styles = [
  ...textStyles.map((s) => ({ id: s.id, name: s.name, kind: "TEXT", family: s.fontName.family, weight: s.fontName.style, size: s.fontSize,
    lineHeight: [s.lineHeight.value ?? null, s.lineHeight.unit], letterSpacing: [s.letterSpacing.value, s.letterSpacing.unit] })),
  ...(await figma.getLocalPaintStylesAsync()).map((s) => ({ id: s.id, name: s.name, kind: "FILL" })),
  ...(await figma.getLocalEffectStylesAsync()).map((s) => ({ id: s.id, name: s.name, kind: "EFFECT" })),
];
const textStyleName = Object.fromEntries(textStyles.map((s) => [s.id, s.name]));

const componentOf = (n) => {
  let single = null;
  for (let p = n; p && p.type !== "PAGE"; p = p.parent) {
    if (p.type === "COMPONENT_SET") return p.name;
    if (p.type === "COMPONENT" && !single) single = p.name;
  }
  return single;
};
// Artwork (the logo, the brand illustrations) is used as supplied: it is not themed and not restyled.
const isArt = (n) => { for (let p = n; p && p.type !== "PAGE"; p = p.parent) if (p.type !== "FRAME" && p.type !== "GROUP" && /^(logo|icon\/|ascendum logo|ascedum icon|\.avatar base)/i.test(p.name)) return true; return false; };
const boundIds = (n) => {
  const out = new Set();
  const walk = (o) => {
    if (!o || typeof o !== "object") return;
    if (o.type === "VARIABLE_ALIAS" && o.id) out.add(o.id);
    for (const k in o) walk(o[k]);
  };
  walk(n.boundVariables);
  for (const f of ["fills", "strokes", "effects"]) if (Array.isArray(n[f])) n[f].forEach((p) => walk(p.boundVariables));
  return [...out].filter((id) => varIds.has(id)).sort();
};

// Every component property, so code can mirror Figma name for name: VARIANT with its options, TEXT, BOOLEAN, INSTANCE_SWAP.
const propsOf = (n) => { let d = {}; try { d = n.componentPropertyDefinitions || {}; } catch (e) { return []; } return Object.entries(d).map(([k, v]) => (v.type === "VARIANT" ? { name: k.split("#")[0], type: v.type, options: v.variantOptions } : { name: k.split("#")[0], type: v.type })); };
const components = [], layers = [];
for (const page of figma.root.children) {
  if (ONLY_PAGE && page.name !== ONLY_PAGE) continue;
  const pageName = page.name.replace(/^[\s\-—–↳]+|[\s\-—–↳]+$/g, "");
  for (const n of page.findAll(() => true)) {
    if (n.type === "COMPONENT_SET") {
      components.push({ id: n.id, name: n.name, page: pageName, set: true, variants: n.children.filter((c) => c.type === "COMPONENT").map((c) => c.name), properties: propsOf(n), description: n.description || "" });
    } else if (n.type === "COMPONENT" && (!n.parent || n.parent.type !== "COMPONENT_SET")) {
      components.push({ id: n.id, name: n.name, page: pageName, set: false, variants: [], properties: propsOf(n), description: n.description || "" });
    }
    const L = { id: n.id, type: n.type, name: n.name, page: pageName, component: componentOf(n), isStyle: null, vars: boundIds(n), art: isArt(n) };
    const raw = []; let bound = 0, rawGradients = 0;
    if (n.type !== "COMPONENT_SET") {
      for (const [field, styleField] of [["fills", "fillStyleId"], ["strokes", "strokeStyleId"]]) {
        const paints = n[field];
        if (!Array.isArray(paints)) continue;
        const styled = typeof n[styleField] === "string" && n[styleField] !== "";
        for (const p of paints) {
          if (p.visible === false) continue;
          if (p.type === "SOLID") { if (styled || (p.boundVariables && p.boundVariables.color)) bound++; else raw.push(hex(p.color)); }
          else if (String(p.type).startsWith("GRADIENT") && !styled) rawGradients++;
        }
      }
    }
    L.paints = { bound, raw, rawGradients };
    if (n.type === "TEXT") {
      const t = n.characters.trim();
      const styleId = typeof n.textStyleId === "string" ? n.textStyleId : "";
      L.text = { chars: t.slice(0, 140), style: n.textStyleId === figma.mixed ? "(several styles)" : (textStyleName[styleId] || null),
        family: n.fontName === figma.mixed ? "(mixed)" : n.fontName.family, size: n.fontSize === figma.mixed ? null : n.fontSize,
        typedUpper: t.length > 3 && t === t.toUpperCase() && /[A-Za-z]/.test(t),
        forcedCase: n.textCase !== figma.mixed && n.textCase !== "ORIGINAL" ? n.textCase : null };
    }
    if (Array.isArray(n.effects) && n.effects.length) L.effects = { count: n.effects.length, styled: typeof n.effectStyleId === "string" && n.effectStyleId !== "" };
    layers.push(L);
  }
}

// Alias graph: one edge per token, per mode, that points to another token. This is what the impact map walks.
const aliases = [];
for (const v of variables) for (const [mode, x] of Object.entries(v.values)) if (x.alias)
  aliases.push({ from: varName[v.id], mode, to: x.aliasName, resolves: x.resolves });

let figmaVersion = { id: null, title: null, savedAt: null, status: "unsaved" };
if (SOURCE_VERSION) {
  const saved = await figma.saveVersionHistoryAsync(SOURCE_VERSION, "Read by pipeline/01b_snapshot_plugin_api.js. Git keeps this id in build/ds-snapshot.json.");
  figmaVersion = { id: saved.id, title: SOURCE_VERSION, savedAt: new Date().toISOString(), status: "saved" };
}

return JSON.stringify({
  meta: { schema: "ds-snapshot/1", reader: "Figma Plugin API", sourceFile: figma.root.name, sourceSha256: figma.fileKey || "live",
    generatedAt: new Date().toISOString(), nodes: layers.length, pages: figma.root.children.length,
    fileKey: figma.fileKey || null, figmaVersion, aliasCount: aliases.length },
  collections, variables, aliases, styles, components, layers,
});
