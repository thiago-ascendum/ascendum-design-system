import { useEffect, useState } from 'react';
import { Title, Primary, Controls, Stories, DocsContainer, useOf } from '@storybook/addon-docs/blocks';
import { themes } from 'storybook/theming';

// The value a CSS property has right now, read from the page. It comes from build/tokens.css, so the
// documentation can never show a number the code does not use.
function LiveValue({ prop }) {
  const [v, setV] = useState('');
  useEffect(() => {
    const read = () => setV(getComputedStyle(document.documentElement).getPropertyValue(prop).trim());
    read();
    window.addEventListener('resize', read);
    return () => window.removeEventListener('resize', read);
  }, [prop]);
  return <code>{v || 'not defined'}</code>;
}

/**
 * One page layout for every component, so no two pages are built differently.
 * The content comes from `parameters.ds` in the story file:
 *   lead, group, status, figma (node id), code (path), when [[title, text]], use [], avoid [],
 *   tokens [[figma name, css property, what it sets]], a11y [], open [], changes []
 * A section with no content is left out, and the index at the top follows.
 */
const FIGMA = 'https://www.figma.com/design/5lhRMZkLHZijqgdigjk3J1/Ascendum-Design-System?node-id=';
const REPO = 'https://github.com/thiago-ascendum/ascendum-design-system/blob/main/';

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');

function Section({ n, title, lead, children }) {
  return (
    <section className="dsdoc-section" id={slug(title)}>
      <h2 className="dsdoc-h2"><span className="dsdoc-num">{String(n).padStart(2, '0')}</span>{title}</h2>
      {lead ? <p className="dsdoc-lead">{lead}</p> : null}
      {children}
    </section>
  );
}

export function DocPage() {
  const { preparedMeta } = useOf('meta', ['meta']);
  const ds = preparedMeta.parameters.ds || {};
  const lead = ds.lead || preparedMeta.parameters.docs?.description?.component;

  const sections = [
    ds.when?.length && ['What it is and when to use it', null, (
      <div className="dsdoc-grid">
        {ds.when.map(([t, text]) => <div className="dsdoc-card" key={t}><b>{t}</b><span>{text}</span></div>)}
      </div>
    )],
    ['Live', 'The real component, built from the tokens. Change the controls, and switch the theme in the toolbar.', (
      <><Primary /><Controls /></>
    )],
    (ds.use?.length || ds.avoid?.length) && ['Do and avoid', null, (
      <div className="dsdoc-grid dsdoc-grid--2">
        <div className="dsdoc-card dsdoc-card--do"><b>Do</b><ul>{(ds.use || []).map((x) => <li key={x}>{x}</li>)}</ul></div>
        <div className="dsdoc-card dsdoc-card--avoid"><b>Avoid</b><ul>{(ds.avoid || []).map((x) => <li key={x}>{x}</li>)}</ul></div>
      </div>
    )],
    ['Variants and states', 'Every variant that exists in code, and the component in use.', <Stories title="" includePrimary={false} />],
    ds.tokens?.length && ['Tokens', 'What this component binds. The same names as in the Figma file.', (
      <div className="dsdoc-tablewrap"><table className="dsdoc-table">
        <thead><tr><th>Figma variable</th><th>CSS property</th><th>Value in code now</th><th>What it sets</th></tr></thead>
        <tbody>{ds.tokens.map(([f, c, w]) => <tr key={f + c}><td><code>{f}</code></td><td><code>{c}</code></td><td><LiveValue prop={c} /></td><td>{w}</td></tr>)}</tbody>
      </table></div>
    )],
    ds.a11y?.length && ['Accessibility', null, <ul className="dsdoc-list">{ds.a11y.map((x) => <li key={x}>{x}</li>)}</ul>],
    ds.open?.length && ['Open questions for the owner', 'Measured here, decided by a person.', (
      <div className="dsdoc-grid">{ds.open.map((x, i) => <div className="dsdoc-card dsdoc-card--ask" key={x}><b>Question {i + 1}</b><span>{x}</span></div>)}</div>
    )],
    ds.changes?.length && ['Changes', null, <ul className="dsdoc-list">{ds.changes.map((x) => <li key={x}>{x}</li>)}</ul>],
  ].filter(Boolean);

  return (
    <div className="dsdoc">
      <header className="dsdoc-header">
        <Title />
        {lead ? <p className="dsdoc-intro">{lead}</p> : null}
        <div className="dsdoc-chips">
          {ds.group ? <span className="dsdoc-chip"><i>Group</i>{ds.group}</span> : null}
          <span className="dsdoc-chip dsdoc-chip--warn"><i>Status</i>{ds.status || 'Proposed in 1.1.0, not approved'}</span>
          {ds.code ? <a className="dsdoc-chip" href={REPO + ds.code}><i>Code</i>{ds.code}</a> : null}
          {ds.figma ? <a className="dsdoc-chip dsdoc-chip--link" href={FIGMA + ds.figma.replace(':', '-')}>Open in Figma</a> : null}
        </div>
        <nav className="dsdoc-toc" aria-label="On this page">
          {sections.map(([title], i) => <a key={title} href={'#' + slug(title)} target="_self"><i>{String(i + 1).padStart(2, '0')}</i>{title}</a>)}
        </nav>
      </header>
      {sections.map(([title, sectionLead, body], i) => <Section key={title} n={i + 1} title={title} lead={sectionLead}>{body}</Section>)}
    </div>
  );
}

/** The documentation frame follows the theme chosen in the toolbar, like the stories do. */
export function ThemedDocsContainer({ children, context, ...rest }) {
  let theme = 'dark';
  try { const g = context.store.userGlobals; theme = (g.get ? g.get() : g.globals).theme || 'dark'; } catch (e) { /* first paint */ }
  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);
  document.documentElement.dataset.theme = theme;
  return <DocsContainer context={context} theme={theme === 'dark' ? themes.dark : themes.light} {...rest}>{children}</DocsContainer>;
}
