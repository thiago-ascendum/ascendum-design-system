import { useEffect } from 'react';
import { ThemeBar } from './ThemeSwitch.jsx';
import { Primary, Controls, Story, DocsContainer, useOf } from '@storybook/addon-docs/blocks';
import { themes } from 'storybook/theming';
import { ThemedImg } from '../stories/_shared/ThemedImg.jsx';
import figmaDocs from '../build/figma-docs.json';
import { Badge } from '../src/components/Badge.jsx';

/**
 * The component page, drawn like the "<Component> / Documentation" frame in Figma: the same header,
 * the same rows of named variants in light and in dark, the same side blocks (Use, Measures, Key tokens,
 * Accessibility, Open questions) and the same footer. The words come from build/figma-docs.json, read
 * from the Figma file by pipeline/08_figma_docs.js, so the two can not drift. The difference: every
 * variant here is the coded component, live.
 */
const FIGMA = 'https://www.figma.com/design/5lhRMZkLHZijqgdigjk3J1/Ascendum-Design-System?node-id=';
const BROWSER = ['hover', 'focus', 'pressed', 'filled'];
const camel = (s) => s.trim().split(/[\s_-]+/).map((w, i) => (i ? w[0].toUpperCase() + w.slice(1) : w[0].toLowerCase() + w.slice(1))).join('');
const opt = (s) => s.trim().toLowerCase().replace(/\s+/g, '-');
const noop = () => {};
const cssVar = (figmaName) => 'var(--' + figmaName.replace(/\//g, '-') + ')';

/** Hover, Pressed and Focus are browser states. To draw them side by side, as Figma does, each :hover, :active
 * and :focus-visible rule is copied once under a class (.fd-force-hover, ...) that a cell can carry. */
function useForcedStates() {
  useEffect(() => {
    if (document.getElementById('fd-forced')) return;
    const map = [[/:hover/g, 'hover'], [/:active/g, 'pressed'], [/:focus-visible|:focus(?![-\w])/g, 'focus']];
    const out = [];
    const walk = (rules) => {
      for (const r of rules) {
        if (r.cssRules && !r.selectorText) { walk(r.cssRules); continue; }
        if (!r.selectorText || !/:hover|:active|:focus/.test(r.selectorText)) continue;
        for (const [re, name] of map) {
          if (!re.test(r.selectorText)) continue;
          re.lastIndex = 0;
          const sel = r.selectorText.split(',').filter((s) => { re.lastIndex = 0; return re.test(s); }).map((s) => { re.lastIndex = 0; return '.fd-force-' + name + ' ' + s.replace(re, '').trim(); }).join(', ');
          if (sel) out.push(sel + ' { ' + r.style.cssText + ' }');
        }
      }
    };
    for (const sheet of document.styleSheets) { try { walk(sheet.cssRules); } catch (e) { /* another origin */ } }
    const el = document.createElement('style'); el.id = 'fd-forced'; el.textContent = out.join('\n'); document.head.appendChild(el);
  }, []);
}

/** "Style=Solid, State=Hover" becomes props by the same rule the props-mirror check enforces. */
function propsFor(variant, doc, sample) {
  const p = {}; const force = [];
  for (const [k, v] of Object.entries(doc.defaults || {})) p[camel(k)] = v;
  for (const part of (variant || '').split(', ')) {
    const [a, b] = part.split('=');
    if (!b) continue;
    const key = camel(a); const val = opt(b);
    if (key === 'state' && BROWSER.includes(val)) { force.push(val); continue; }
    p[key] = val === 'true' ? true : val === 'false' ? false : val;
  }
  Object.assign(p, sample || {});
  if (p.count === true) p.count = (sample && sample.countValue) || 12; else if (p.count === false) delete p.count;
  delete p.countValue;
  if ('checked' in p || 'on' in p) p.onChange = noop;
  if (typeof p.value === 'string' && doc.defaults && 'Value' in doc.defaults) {
    const shown = force.includes('filled') || p.state === 'error' || p.state === 'disabled';
    if (shown) p.defaultValue = p.value; else p.placeholder = p.value;
    delete p.value;
  }
  return { props: p, force };
}

function Rows({ doc, Component, sample, dark }) {
  return doc.rows.map((row) => (
    <div className={'fd-row' + (row.inverted ? ' fd-row--inverted' : '')} key={row.title} {...(row.inverted ? { 'data-context': 'inverted' } : {})}>
      <span className="fd-row-title">{row.title}</span>
      <div className="fd-cells">
        {row.cells.map((cell, i) => {
          const { props, force } = propsFor(cell.variant, doc, sample);
          return (
            <div className={'fd-cell' + force.map((f) => ' fd-force-' + f).join('')} key={i + (dark ? 'd' : '')}>
              <span className="fd-caption">{cell.label}</span>
              <div className={"fd-cell-body sb-unstyled" + (!row.inverted && /invert/i.test(cell.label) ? " fd-cell-body--inverted" : "")} {...(!row.inverted && /invert/i.test(cell.label) ? { "data-context": "inverted" } : {})}><Component {...props} /></div>
            </div>
          );
        })}
      </div>
    </div>
  ));
}

function Side({ doc }) {
  return (
    <aside className="fd-side">
      {doc.side.map((b) => (
        <section className="fd-block" key={b.title}>
          <h4 className="fd-label">{b.title}</h4>
          {b.items.map((it, i) => {
            if (it.kind === 'rule') return <div className="fd-rule" key={i}><b className={/^Do/.test(it.tag) ? 'fd-do' : 'fd-avoid'}>{it.tag}</b><span>{it.text}</span></div>;
            if (it.kind === 'token') return <div className={"fd-token" + (it.swatch ? "" : " fd-token--plain")} key={i}>{it.swatch ? <i style={{ background: cssVar(it.swatch) }} /> : null}<span>{it.name}</span><em>{it.value}</em></div>;
            if (it.kind === 'check') return <div className="fd-check" key={i}><b>{it.title}</b><span>{it.text}</span></div>;
            if (it.kind === 'row') return <div className="fd-pair" key={i}><span>{it.a}</span><em>{it.b}</em></div>;
            return <p className={it.style === 'UI/Caption' ? 'fd-note' : 'fd-text'} key={i}>{it.text}</p>;
          })}
        </section>
      ))}
    </aside>
  );
}

export function DocPage() {
  useForcedStates();
  const resolved = useOf('meta', ['meta']);
  const { preparedMeta, csfFile } = resolved;
  const ds = preparedMeta.parameters.ds || {};
  const name = preparedMeta.title.split('/').pop();
  const doc = figmaDocs.docs[ds.figmaName || name] || Object.values(figmaDocs.docs).find((d) => d.figmaId === ds.figma);
  const Component = preparedMeta.component;
  const inUse = Object.values(csfFile.stories).filter((s) => /^In use/.test(s.name));

  if (ds.figmaOnly) {
    return (
      <div className="fd-page">
        <div className="fd-banner">
          <Badge label="Figma only, not in code yet" tone="warning" />
          <span>This is the Figma page itself, exported. It becomes a live page, like Button, when the component is built in code.</span>
          {ds.figma ? <a className="fd-link" href={FIGMA + ds.figma.replace(':', '-')}>Open in Figma</a> : null}
        </div>
        <ThemedImg className="fd-figma-img" src={ds.img} dark={ds.imgDark} alt={`${name}: the Figma documentation page.`} />
      </div>
    );
  }
  if (!doc || !Component) {
    return <div className="fd-page"><article className="fd-doc"><h2 className="fd-title">{name}</h2><p className="fd-lead">{ds.lead}</p><Primary /><Controls /></article></div>;
  }
  return (
    <div className="fd-page">
      <article className="fd-doc">
        <header className="fd-header">
          <h2 className="fd-title">{doc.title}</h2>
          <p className="fd-lead">{doc.lead}</p>
          <div className="fd-chips">
            {doc.chips.map((c) => <Badge key={c} label={c} tone="neutral" />)}
            {doc.figmaId ? <a className="fd-link" href={FIGMA + doc.figmaId.replace(':', '-')}>Open in Figma</a> : null}
            {ds.code ? <a className="fd-link" href={'https://github.com/thiago-ascendum/ascendum-design-system/blob/main/' + ds.code}>{ds.code}</a> : null}
          </div>
        </header>
        <div className="fd-body">
          <div className="fd-main">
            <section className="fd-group">
              <h3 className="fd-h5">Every variant, named</h3>
              <Rows doc={doc} Component={Component} sample={ds.sample} />
            </section>
            <section className="fd-group fd-dark" data-theme="dark">
              <h3 className="fd-h5">The same in dark mode</h3>
              <Rows doc={doc} Component={Component} sample={ds.sample} dark />
            </section>
            {inUse.length ? (
              <section className="fd-group">
                <h3 className="fd-h5">In use</h3>
                {inUse.map((s) => <div className="fd-use sb-unstyled" key={s.id}><Story of={s.moduleExport} /></div>)}
              </section>
            ) : null}
            <section className="fd-group">
              <h3 className="fd-h5">Try it in code</h3>
              <div className="fd-use fd-try"><Primary /><Controls /></div>
            </section>
          </div>
          <Side doc={doc} />
        </div>
        <footer className="fd-footer">{doc.footer}</footer>
      </article>
    </div>
  );
}

/** The documentation frame follows the theme chosen in the toolbar. Light first, like the Figma pages. */
export function ThemedDocsContainer({ children, context, ...rest }) {
  let theme = 'light';
  try { const g = context.store.userGlobals; theme = (g.get ? g.get() : g.globals).theme || 'light'; } catch (e) { /* first paint */ }
  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);
  document.documentElement.dataset.theme = theme;
  return <DocsContainer context={context} theme={theme === 'dark' ? themes.dark : themes.light} {...rest}><ThemeBar />{children}</DocsContainer>;
}
