import styles from '../../build/text-styles.json';
import { Page } from '../_shared/Doc.jsx';

const WEIGHT = { Regular: 400, SemiBold: 600, Bold: 700 };
const pct = (p) => (p && p[1] === 'PERCENT' ? `${p[0]}%` : p ? `${p[0]}` : '');

export default {
  title: 'Foundations/Typography',
  parameters: { layout: 'padded', docs: { description: { component: 'Every text style of the system, read from build/text-styles.json, which is generated from the Figma snapshot. One typeface: Barlow.' } } },
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
            <div style={{ fontFamily: `${s.family}, sans-serif`, fontSize: s.size, fontWeight: WEIGHT[s.weight] || 400, lineHeight: pct(s.lineHeight), letterSpacing: `${s.letterSpacing[0] / 100}em`, color: 'var(--on-surface)' }}>
              Design that holds together
            </div>
          </div>
        ))}
      </div>
    </Page>
  ),
};

// Text at 200%: the same content at the normal size and inside [data-text-scale="200"], the block tokens.css emits for the
// Accessibility mode "Text 200%". Sizes are rem, so browser zoom gives the same result without the attribute.
import { Alert } from '../../src/components/Alert.jsx';
import { Button } from '../../src/components/Button.jsx';
import { Input } from '../../src/components/Input.jsx';

const Sample = () => (
  <div style={{ display: 'grid', gap: 16, padding: 24, border: 'var(--border-width-hairline) solid var(--outline-variant)', borderRadius: 16, background: 'var(--surface-container)' }}>
    <h5 style={{ margin: 0, font: '700 var(--text-h5-size)/1.3 Barlow, sans-serif', color: 'var(--on-surface)' }}>Discard your changes?</h5>
    <p style={{ margin: 0, font: '400 var(--text-body-size)/1.25 Barlow, sans-serif', color: 'var(--on-surface-variant)' }}>You have edits to this project that are not saved yet.</p>
    <Alert tone="info" title="Heads up" text="Your changes were saved to the project." />
    <Input placeholder="Project name" aria-label="Project name" />
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Button variant="solid" label="Save changes" />
      <Button variant="ghost" label="Back" />
    </div>
  </div>
);

export const TextAt200 = {
  name: 'Text at 200%',
  render: () => (
    <Page title="Text at 200%" lead="WCAG 1.4.4: text can be doubled without losing content. On the left the normal size; on the right the same content inside data-text-scale=&quot;200&quot;, which doubles every size token, as browser zoom does. Nothing may be cut or overlap.">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' }}>
        <div><p className="dsx-muted">Default</p><Sample /></div>
        <div data-text-scale="200"><p className="dsx-muted">Text 200%</p><Sample /></div>
      </div>
    </Page>
  ),
};

// The size layer and the roles, read from build/tokens.json (generated from the Figma snapshot).
import tokens from '../../build/tokens.json';

const ext = (t) => t?.$extensions?.['com.ascendum.ds'] || {};
const sizeOf = (ref) => { const m = String(ref).match(/type-size\.(\d+)/); return m ? Number(m[1]) : Number(ref); };
const rem = (n) => `${Math.round((n / 16) * 1000) / 1000}rem`;

export const SizeLayer = {
  name: 'Size layer and roles',
  render: () => {
    const sizes = Object.entries(tokens.Accessibility?.['type-size'] || {}).sort((a, b) => Number(a[0]) - Number(b[0]));
    const roles = Object.entries(tokens.Dimension?.['font-size'] || {})
      .map(([name, t]) => ({ name, t, desktop: sizeOf(t.$value), mobile: sizeOf(ext(t).modes?.Mobile ?? t.$value) }))
      .sort((a, b) => b.desktop - a.desktop);
    return (
      <Page title="Size layer and roles" lead="Three layers, as in Figma. A text style reads its size from a role (font-size/*), and the role points to one size in the Accessibility layer (type-size/*). Text 200% doubles every size, as browser zoom does (WCAG 1.4.4). In code every size is rem.">
        <h3>Roles, biggest first</h3>
        <table className="dsx-table">
          <thead><tr><th>Role</th><th>CSS</th><th>Desktop</th><th>Mobile</th><th>Used by</th></tr></thead>
          <tbody>
            {roles.map(({ name, t, desktop, mobile }) => (
              <tr key={name}>
                <td><b>font-size/{name}</b></td>
                <td><code>{ext(t).code}</code></td>
                <td>{desktop}px · {rem(desktop)}</td>
                <td>{mobile}px · {rem(mobile)}</td>
                <td className="dsx-muted">{(t.$description || '').replace(/^Font size of /, '').replace(/\.$/, '')}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>The size layer</h3>
        <table className="dsx-table">
          <thead><tr><th>Size</th><th>CSS</th><th>Default</th><th>Text 200%</th></tr></thead>
          <tbody>
            {sizes.map(([n, t]) => (
              <tr key={n}><td><b>type-size/{n}</b></td><td><code>{ext(t).code}</code></td><td>{n}px</td><td>{ext(t).modes?.['Text 200%'] ?? n * 2}px</td></tr>
            ))}
          </tbody>
        </table>
      </Page>
    );
  },
};
