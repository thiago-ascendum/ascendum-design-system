import tokens from '../../build/tokens.json';

const flat = (o, p = []) => Object.entries(o).flatMap(([k, v]) => (k.startsWith('$') ? [] : v && typeof v === 'object' && '$value' in v ? [{ name: [...p, k].join('/'), ...v }] : flat(v, [...p, k])));
const code = (t) => t.$extensions?.['com.ascendum.ds']?.code;
const colours = (group) => flat(tokens[group]).filter((t) => t.$type === 'color');

function Swatch({ t }) {
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <div style={{ height: 64, borderRadius: 'var(--radius-surface)', background: `var(${code(t)})`, border: '1px solid var(--border-default)' }} />
      <div style={{ font: '700 14px/1.3 Barlow, sans-serif', color: 'var(--text)' }}>{t.name}</div>
      <code style={{ fontSize: 12, color: 'var(--text-muted)' }}>{code(t)}</code>
      {t.$description ? <div style={{ font: '400 13px/1.3 Barlow, sans-serif', color: 'var(--text-muted)' }}>{t.$description}</div> : null}
    </div>
  );
}
const Grid = ({ list }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 24, width: 'min(1100px, 92vw)' }}>
    {list.map((t) => <Swatch key={t.name} t={t} />)}
  </div>
);

export default {
  title: 'Foundations/Colour',
  parameters: { layout: 'padded', docs: { description: { component: 'Read live from build/tokens.json. Bind to the Semantic roles; the primitives sit behind them. Switch the theme in the toolbar: roles change, primitives do not.' } } },
};

export const SemanticRoles = { name: 'Semantic roles (bind to these)', render: () => <Grid list={colours('Semantic')} /> };
export const Primitives = { name: 'Primitives (private)', render: () => <Grid list={colours('Primitives')} /> };
