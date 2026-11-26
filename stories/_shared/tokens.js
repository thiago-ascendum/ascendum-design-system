// Values of the tokens per mode, read from build/tokens.json, and WCAG contrast. Shared by the foundations pages,
// so every number on them is measured from the tokens the code uses, never typed by hand.
import tokens from '../../build/tokens.json';

const flat = (o, p = []) => Object.entries(o).flatMap(([k, v]) => (k.startsWith('$') ? [] : v && typeof v === 'object' && '$value' in v ? [{ name: [...p, k].join('/'), ...v }] : flat(v, [...p, k])));
export const all = Object.fromEntries(Object.entries(tokens).filter(([k]) => !k.startsWith('$')).map(([c, o]) => [c, flat(o)]));
const byRef = {};
for (const [c, list] of Object.entries(all)) for (const t of list) byRef[`${c}.${t.name.replace(/\//g, '.')}`] = t;
export const byName = Object.fromEntries(Object.values(all).flat().map((t) => [t.name, t]));

/** The value of a token in a mode ('Light' or 'Dark'), aliases followed to the end. */
export function value(name, mode = 'Light') {
  let t = byName[name];
  for (let i = 0; t && i < 8; i++) {
    const modes = t.$extensions?.['com.ascendum.ds']?.modes;
    const v = (modes && (modes[mode] ?? Object.values(modes)[0])) ?? t.$value;
    const m = typeof v === 'string' && v.match(/^\{(.+)\}$/);
    if (!m) return typeof v === 'string' ? v.toUpperCase() : v;
    t = byRef[m[1]];
  }
  return null;
}
/** The value of a Semantic token per mode. A token with one value for both modes has no modes list: it is both. */
export const modesOf = (t) => t.$extensions?.['com.ascendum.ds']?.modes || { Light: t.$value, Dark: t.$value };
/** Which Semantic roles point at a primitive, per mode: "surface-container-low (light)". */
export function usedBy(primitiveName) {
  const ref = `{Primitives.${primitiveName.replace(/\//g, '.')}}`;
  const out = [];
  for (const t of all.Semantic || []) {
    const modes = modesOf(t);
    const hit = Object.keys(modes).filter((m) => modes[m] === ref);
    if (hit.length === 2) out.push(t.name);
    else for (const m of hit) out.push(`${t.name} (${m.toLowerCase()})`);
  }
  return out;
}
export const cssVar = (name) => byName[name]?.$extensions?.['com.ascendum.ds']?.code || '--' + name.replace(/\//g, '-');

const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const lum = (hex) => { const h = hex.replace('#', ''); const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)); return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b); };
export function contrast(a, b) {
  if (!a || !b || a.length < 7 || b.length < 7) return null;
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}
export const fmt = (r) => (r == null ? '–' : `${Math.round(r * 10) / 10}:1`);
export const grade = (r, min = 4.5) => (r == null ? '' : r >= 7 ? 'AAA' : r >= min ? (min === 3 ? 'pass for borders (3:1)' : 'AA') : 'decorative, never text');
