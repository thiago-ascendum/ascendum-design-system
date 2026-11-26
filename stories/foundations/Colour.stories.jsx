import tokens from '../../build/tokens.json';
import { Page } from '../_shared/Doc.jsx';

const flat = (o, p = []) => Object.entries(o).flatMap(([k, v]) => (k.startsWith('$') ? [] : v && typeof v === 'object' && '$value' in v ? [{ name: [...p, k].join('/'), ...v }] : flat(v, [...p, k])));
const code = (t) => t.$extensions?.['com.ascendum.ds']?.code;
const colours = (group) => flat(tokens[group]).filter((t) => t.$type === 'color');

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
  parameters: { layout: 'padded', docs: { description: { component: 'Read live from build/tokens.json. Bind to the Semantic roles; the primitives sit behind them. Switch the theme in the toolbar: roles change, primitives do not.' } } },
};

export const SemanticRoles = {
  name: 'Semantic roles (bind to these)',
  render: () => (
    <Page title="Semantic roles" lead="Bind to these. Each role has a light and a dark value, so the page follows the theme in the toolbar.">
      <Grid list={colours('Semantic')} />
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
