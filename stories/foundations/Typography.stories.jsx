import styles from '../../build/text-styles.json';
import { Page } from '../_shared/Doc.jsx';

const WEIGHT = { Regular: 400, SemiBold: 600, Bold: 700 };
const pct = (p) => (p && p[1] === 'PERCENT' ? `${p[0]}%` : p ? `${p[0]}` : '');

export default {
  title: 'Foundations/Typography',
  parameters: { layout: 'padded', docs: { description: { component: 'The 16 text styles of the system, read from build/text-styles.json, which is generated from the Figma snapshot. One typeface: Barlow.' } } },
};

export const TextStyles = {
  name: 'Text styles',
  render: () => (
    <Page title="Text styles" lead="Every text style of the system, set in its own size and weight. One typeface: Barlow.">
      <div>
        <div className="dsx-type-row dsx-type-row--head"><span>Style</span><span>Specimen</span></div>
        {styles.map((s) => (
          <div key={s.name} className="dsx-type-row">
            <div className="dsx-type-meta">
              <b className="dsx-name">{s.name}</b>
              <span className="dsx-muted">
                {s.size}px, {s.weight}, line height {pct(s.lineHeight)}, letter spacing {pct(s.letterSpacing)}
              </span>
            </div>
            <div style={{ fontFamily: `${s.family}, sans-serif`, fontSize: s.size, fontWeight: WEIGHT[s.weight] || 400, lineHeight: pct(s.lineHeight), letterSpacing: `${s.letterSpacing[0] / 100}em`, color: 'var(--text)' }}>
              Design that holds together
            </div>
          </div>
        ))}
      </div>
    </Page>
  ),
};
