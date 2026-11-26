import tokens from '../../build/tokens.json';

const flat = (o, p = []) => Object.entries(o).flatMap(([k, v]) => (k.startsWith('$') ? [] : v && typeof v === 'object' && '$value' in v ? [{ name: [...p, k].join('/'), ...v }] : flat(v, [...p, k])));
const ext = (t) => t.$extensions?.['com.ascendum.ds'] || {};
const dim = flat(tokens.Dimension);
const row = { display: 'grid', gridTemplateColumns: '180px 1fr 160px', gap: 16, alignItems: 'center', font: '400 15px/1.3 Barlow, sans-serif', color: 'var(--text)' };
const wrap = { display: 'grid', gap: 16, width: 'min(900px, 92vw)' };
const note = (t) => (ext(t).modes ? `desktop ${ext(t).modes.Desktop}, mobile ${ext(t).modes.Mobile}` : `${t.$value}`);

export default {
  title: 'Foundations/Spacing, radius and type',
  parameters: { layout: 'padded', docs: { description: { component: 'The shared scale of the system, read live from build/tokens.json. Resize the window under 768px: the mobile values take over.' } } },
};

export const Spacing = {
  render: () => (
    <div style={wrap}>
      {dim.filter((t) => t.name.startsWith('space/')).map((t) => (
        <div key={t.name} style={row}><b>{t.name}</b><div style={{ height: 16, width: `var(${ext(t).code})`, maxWidth: '100%', background: 'var(--bg-accent-blue)' }} /><span style={{ color: 'var(--text-muted)' }}>{note(t)}</span></div>
      ))}
    </div>
  ),
};
export const Radius = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {dim.filter((t) => t.name.startsWith('radius/')).map((t) => (
        <div key={t.name} style={{ display: 'grid', gap: 8, font: '400 14px/1.3 Barlow, sans-serif', color: 'var(--text)' }}>
          <div style={{ width: 120, height: 80, background: 'var(--container-fill)', border: '2px solid var(--border-strong)', borderRadius: `var(${ext(t).code})` }} />
          <b>{t.name}</b><span style={{ color: 'var(--text-muted)' }}>{t.$value}px</span>
        </div>
      ))}
    </div>
  ),
};
export const TypeSizes = {
  name: 'Type sizes',
  render: () => (
    <div style={wrap}>
      {dim.filter((t) => t.name.startsWith('font-size/')).sort((a, b) => b.$value - a.$value).map((t) => (
        <div key={t.name} style={{ display: 'grid', gap: 4 }}>
          <span style={{ font: '400 13px/1.3 Barlow, sans-serif', color: 'var(--text-muted)' }}>{t.name} · {note(t)}</span>
          <span style={{ font: `700 var(${ext(t).code})/1.1 Barlow, sans-serif`, color: 'var(--text)' }}>Develop beyond</span>
        </div>
      ))}
    </div>
  ),
};
