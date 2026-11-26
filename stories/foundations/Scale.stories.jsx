import tokens from '../../build/tokens.json';
import { Page } from '../_shared/Doc.jsx';

const flat = (o, p = []) => Object.entries(o).flatMap(([k, v]) => (k.startsWith('$') ? [] : v && typeof v === 'object' && '$value' in v ? [{ name: [...p, k].join('/'), ...v }] : flat(v, [...p, k])));
const ext = (t) => t.$extensions?.['com.ascendum.ds'] || {};
const dim = flat(tokens.Dimension);
const note = (t) => (ext(t).modes ? `desktop ${ext(t).modes.Desktop}, mobile ${ext(t).modes.Mobile}` : `${t.$value}`);

export default {
  title: 'Foundations/Spacing, radius and type',
  parameters: { layout: 'padded', docs: { description: { component: 'The shared scale of the system, read live from build/tokens.json. Resize the window under 768px: the mobile values take over.' } } },
};

export const Spacing = {
  render: () => (
    <Page title="Spacing" lead="The space tokens, drawn at their real width. Resize the window under 768px and the mobile values take over.">
      <div className="dsx-rows">
        {dim.filter((t) => t.name.startsWith('space/')).map((t) => (
          <div key={t.name} className="dsx-row"><b>{t.name}</b><div className="dsx-bar" style={{ width: `var(${ext(t).code})` }} /><span className="dsx-muted">{note(t)}</span></div>
        ))}
      </div>
    </Page>
  ),
};
export const Radius = {
  render: () => (
    <Page title="Radius" lead="The corner radii of the system, each drawn on a box.">
      <div className="dsx-radii">
        {dim.filter((t) => t.name.startsWith('radius/')).map((t) => (
          <div key={t.name} className="dsx-radius">
            <div className="dsx-radius-box" style={{ borderRadius: `var(${ext(t).code})` }} />
            <b>{t.name}</b><span className="dsx-muted">{t.$value}px</span>
          </div>
        ))}
      </div>
    </Page>
  ),
};
export const TypeSizes = {
  name: 'Type sizes',
  render: () => (
    <Page title="Type sizes" lead="The font size tokens, largest first, with the desktop and mobile value of each.">
      <div className="dsx-rows">
        {dim.filter((t) => t.name.startsWith('font-size/')).sort((a, b) => b.$value - a.$value).map((t) => (
          <div key={t.name} className="dsx-size">
            <span className="dsx-muted">{t.name} · {note(t)}</span>
            <span className="dsx-size-sample" style={{ fontSize: `var(${ext(t).code})` }}>Develop beyond</span>
          </div>
        ))}
      </div>
    </Page>
  ),
};
