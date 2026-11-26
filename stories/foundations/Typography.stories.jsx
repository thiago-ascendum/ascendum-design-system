import styles from '../../build/text-styles.json';

const WEIGHT = { Regular: 400, SemiBold: 600, Bold: 700 };
const pct = (p) => (p && p[1] === 'PERCENT' ? `${p[0]}%` : p ? `${p[0]}` : '');
const head = { font: '700 14px/1.3 Barlow, sans-serif', color: 'var(--text-muted)' };

export default {
  title: 'Foundations/Typography',
  parameters: { layout: 'padded', docs: { description: { component: 'The 16 text styles of the system, read from build/text-styles.json, which is generated from the Figma snapshot. One typeface: Barlow.' } } },
};

export const TextStyles = {
  name: 'Text styles',
  render: () => (
    <div style={{ display: 'grid', width: 'min(1100px, 92vw)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 'var(--space-2xs)', paddingBottom: 'var(--space-3xs)', borderBottom: '1px solid var(--border-default)', ...head }}>
        <span>Style</span><span>Specimen</span>
      </div>
      {styles.map((s) => (
        <div key={s.name} style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 'var(--space-2xs)', alignItems: 'baseline', padding: 'var(--space-2xs) 0', borderBottom: '1px solid var(--border-default)' }}>
          <div style={{ display: 'grid', gap: 4 }}>
            <b style={{ font: '700 14px/1.3 Barlow, sans-serif', color: 'var(--text)' }}>{s.name}</b>
            <span style={{ font: '400 13px/1.3 Barlow, sans-serif', color: 'var(--text-muted)' }}>
              {s.size}px, {s.weight}, line height {pct(s.lineHeight)}, letter spacing {pct(s.letterSpacing)}
            </span>
          </div>
          <div style={{ fontFamily: `${s.family}, sans-serif`, fontSize: s.size, fontWeight: WEIGHT[s.weight] || 400, lineHeight: pct(s.lineHeight), letterSpacing: `${s.letterSpacing[0] / 100}em`, color: 'var(--text)' }}>
            Design that holds together
          </div>
        </div>
      ))}
    </div>
  ),
};
