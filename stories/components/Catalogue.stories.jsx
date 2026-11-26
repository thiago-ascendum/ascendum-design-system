import components from '../../build/components.json';
import { Badge } from '../../src/components/Badge.jsx';

// Counted from the files that exist in src/components, so the status is never typed by hand.
const IN_CODE = Object.keys(import.meta.glob('../../src/components/*.jsx')).map((p) => p.split('/').pop().replace('.jsx', ''));
const key = (n) => n.replace(/\s+/g, '').toLowerCase();
const coded = new Set(IN_CODE.map(key));
const isCoded = (c) => coded.has(key(c.name));

const th = { textAlign: 'left', padding: 'var(--space-3xs) var(--space-2xs)', borderBottom: '1px solid var(--border-default)', font: '700 14px/1.3 Barlow, sans-serif', color: 'var(--text-muted)' };
const td = { padding: 'var(--space-3xs) var(--space-2xs)', borderBottom: '1px solid var(--border-default)', font: '400 15px/1.3 Barlow, sans-serif', color: 'var(--text)', verticalAlign: 'top' };

function Count({ n, label }) {
  return (
    <div style={{ padding: 'var(--space-2xs)', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-card)', minWidth: 160 }}>
      <div style={{ font: '700 44px/1 Barlow, sans-serif', color: 'var(--text)' }}>{n}</div>
      <div style={{ font: '700 14px/1.3 Barlow, sans-serif', color: 'var(--text-muted)' }}>{label}</div>
    </div>
  );
}

export default {
  title: 'Components/Catalogue',
  parameters: { layout: 'padded', docs: { description: { component: 'Every component of the Figma library, read from build/components.json, which is generated from the Figma snapshot.' } } },
};

export const EveryComponent = {
  name: 'Every component in the Figma library',
  render: () => {
    const nCode = components.filter(isCoded).length;
    return (
      <div style={{ display: 'grid', gap: 'var(--space-xs)', width: 'min(1100px, 92vw)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-2xs)', flexWrap: 'wrap' }}>
          <Count n={components.length} label="Components in the library" />
          <Count n={nCode} label="In code" />
          <Count n={components.length - nCode} label="Still Figma only" />
        </div>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr><th style={th}>Component</th><th style={th}>Figma page</th><th style={th}>Variants</th><th style={th}>Description</th><th style={th}>Status</th></tr>
          </thead>
          <tbody>
            {components.map((c) => (
              <tr key={c.name}>
                <td style={{ ...td, fontWeight: 700 }}>{c.name}</td>
                <td style={td}>{c.page}</td>
                <td style={td}>{c.variantCount}</td>
                <td style={{ ...td, color: 'var(--text-muted)' }}>{c.description}</td>
                <td style={td}>{isCoded(c) ? <Badge tone="success" label="In code" /> : <Badge tone="neutral" label="Figma only" />}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
};
