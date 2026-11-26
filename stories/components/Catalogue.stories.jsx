import components from '../../build/components.json';
import { Badge } from '../../src/components/Badge.jsx';
import { Page } from '../_shared/Doc.jsx';

// Counted from the files that exist in src/components, so the status is never typed by hand.
const IN_CODE = Object.keys(import.meta.glob('../../src/components/*.jsx')).map((p) => p.split('/').pop().replace('.jsx', ''));
const key = (n) => n.replace(/\s+/g, '').toLowerCase();
const coded = new Set(IN_CODE.map(key));
const isCoded = (c) => coded.has(key(c.name));

function Count({ n, label }) {
  return (
    <div className="dsx-count">
      <b>{n}</b>
      <span>{label}</span>
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
      <Page title="Every component in the Figma library" lead="Read from the Figma snapshot. The status of each one is counted from the files in code, never typed by hand.">
        <div className="dsx-counts">
          <Count n={components.length} label="Components in the library" />
          <Count n={nCode} label="In code" />
          <Count n={components.length - nCode} label="Still Figma only" />
        </div>
        <div className="dsdoc-tablewrap">
          <table className="dsdoc-table">
            <thead>
              <tr><th>Component</th><th>Figma page</th><th>Variants</th><th>Description</th><th>Status</th></tr>
            </thead>
            <tbody>
              {components.map((c) => (
                <tr key={c.name}>
                  <td className="dsx-name">{c.name}</td>
                  <td>{c.page}</td>
                  <td>{c.variantCount}</td>
                  <td className="dsx-muted">{c.description}</td>
                  <td>{isCoded(c) ? <Badge tone="success" label="In code" /> : <Badge tone="neutral" label="Figma only" />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Page>
    );
  },
};
