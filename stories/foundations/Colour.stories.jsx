import tokens from '../../build/tokens.json';
import { Page } from '../_shared/Doc.jsx';

const flat = (o, p = []) => Object.entries(o).flatMap(([k, v]) => (k.startsWith('$') ? [] : v && typeof v === 'object' && '$value' in v ? [{ name: [...p, k].join('/'), ...v }] : flat(v, [...p, k])));
const code = (t) => t.$extensions?.['com.ascendum.ds']?.code;
const colours = (group) => flat(tokens[group] || {}).filter((t) => t.$type === 'color');

// Same groups and order as the Colour page in Figma (Semantic roles).
const GROUPS = [
  ['Surfaces', 'Backgrounds of the page and of everything that sits on it.', ['surface', 'surface-container-low', 'surface-container', 'surface-container-high', 'surface-container-highest', 'inverse-surface']],
  ['Text and icons', 'The on- colours. Each one is meant for the surfaces listed in the contrast check.', ['on-surface', 'on-surface-variant', 'on-surface-placeholder', 'inverse-on-surface', 'inverse-on-surface-variant', 'on-accent-container']],
  ['Outlines', 'Borders, dividers and the focus ring.', ['outline', 'outline-medium', 'outline-variant', 'focus', 'inverse-outline', 'inverse-outline-variant']],
  ['Main action', 'The Solid button, links and selected controls, with their pointer states.', ['primary', 'on-primary', 'primary-hover', 'primary-pressed', 'inverse-primary', 'inverse-on-primary', 'inverse-primary-hover', 'inverse-primary-pressed']],
  ['Pointer states', 'Neutral elements and unselected controls under the pointer.', ['surface-hover', 'surface-pressed', 'transparent']],
  ['Messages', 'Status only, never decoration. The plain role is the solid fill and also text on any surface; on- goes on it; -container is the message background with on-X-container on top.', ['error', 'on-error', 'error-container', 'on-error-container', 'on-surface-error', 'warning', 'on-warning', 'warning-container', 'on-warning-container', 'on-surface-warning', 'success', 'on-success', 'success-container', 'on-success-container', 'on-surface-success', 'info', 'on-info', 'info-container', 'on-info-container', 'on-surface-info']],
  ['Accents', 'Brand accents for tags and avatars. Text on them is on-accent-container.', ['accent-red-container', 'accent-purple-container', 'accent-blue-container', 'accent-stone-container']],
];

const RULES = [
  'Pick the role by what the element does, never by how the colour looks.',
  'on-X goes on X: on-surface on surface, on-primary on primary, error on error-container.',
  'Surfaces climb in steps: surface is the page, then container-low, container, container-high and container-highest.',
  'Light and Dark change the value, never the name. There are no dark or inverted copies of a role.',
  'A dark band on a light page sets the Context mode to Inverted (data-context="inverted" in code). Everything inside uses ctx-* and follows.',
  'Bind a role or a ctx token, never a primitive. If no role fits, propose a new role.',
];

function Swatch({ t }) {
  return (
    <div className="dsx-swatch">
      <div className="dsx-chip" style={{ background: `var(${code(t)})` }} />
      <div className="dsx-name">{t.name}</div>
      <code>{code(t)}</code>
      {t.$description ? <div className="dsx-muted">{t.$description}</div> : null}
    </div>
  );
}
const Grid = ({ list }) => (
  <div className="dsx-swatches">
    {list.map((t) => <Swatch key={t.name} t={t} />)}
  </div>
);

export default {
  title: 'Foundations/Colour',
  parameters: { layout: 'padded', docs: { description: { component: 'Read live from build/tokens.json. Colours are named by their job, like Material 3. Switch the theme in the toolbar: the values change, the names do not.' } } },
};

export const SemanticRoles = {
  name: 'Semantic roles (bind to these)',
  render: () => {
    const all = colours('Semantic');
    const byName = Object.fromEntries(all.map((t) => [t.name, t]));
    const listed = new Set(GROUPS.flatMap((g) => g[2]));
    const rest = all.filter((t) => !listed.has(t.name));
    return (
      <Page title="Semantic roles" lead="Bind to these. Each role has a light and a dark value, so the page follows the theme in the toolbar.">
        <h3>How to use colour</h3>
        <ol>{RULES.map((r) => <li key={r}>{r}</li>)}</ol>
        {GROUPS.map(([title, lead, names]) => (
          <section key={title}>
            <h3>{title}</h3>
            <p className="dsx-muted">{lead}</p>
            <Grid list={names.map((n) => byName[n]).filter(Boolean)} />
          </section>
        ))}
        {rest.length ? (<section><h3>Not grouped yet</h3><Grid list={rest} /></section>) : null}
      </Page>
    );
  },
};
export const ContextBands = {
  name: 'Context (bands)',
  render: () => (
    <Page title="Context" lead="Two modes. Default points each ctx token to its role; Inverted points it to the inverse role. Put data-context=&quot;inverted&quot; on a section and everything inside follows.">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div><p className="dsx-muted">Default</p><Grid list={colours('Context')} /></div>
        <div data-context="inverted" style={{ background: 'var(--ctx-surface)', padding: 16 }}><p style={{ color: 'var(--ctx-on-surface)' }}>Inverted</p><Grid list={colours('Context')} /></div>
      </div>
    </Page>
  ),
};
export const Primitives = {
  name: 'Primitives (private)',
  render: () => (
    <Page title="Primitives" lead="These sit behind the roles and do not change with the theme. Do not bind to them.">
      <Grid list={colours('Primitives')} />
    </Page>
  ),
};
export const TonalPalettes = {
  name: 'Tonal palettes (status)',
  render: () => {
    const prim = colours('Primitives');
    const TONES = [10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 98];
    return (
      <Page title="Tonal palettes" lead="Each status colour is one hue in 11 tones. The number is the lightness (CIE L*): two tones 50 apart pass 4.5:1. Roles pick a tone: solid 40 in Light and 80 in Dark, label white and 20, container 95 and 20, text on the container 30 and 90. Tones 40, 95, 20 and 60 are the colours already approved; the rest are drawn between them.">
        {['error', 'warning', 'success', 'info'].map((h) => (
          <section key={h}>
            <h3>{h}</h3>
            <Grid list={TONES.map((t) => prim.find((p) => p.name === `${h}/${t}`)).filter(Boolean)} />
          </section>
        ))}
      </Page>
    );
  },
};
