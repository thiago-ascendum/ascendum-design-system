import './doc-extra.css';
import components from '../../build/components.json';

/** Shared pieces for the guide pages and the foundations pages. Markup only: every look comes from docs.css and doc-extra.css. */
export const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const pad = (n) => String(n).padStart(2, '0');

export function Hero({ title, children }) {
  return (
    <header className="dsdoc-hero">
      <h1>{title}</h1>
      {children ? <p>{children}</p> : null}
    </header>
  );
}

export function Index({ items }) {
  return (
    <nav className="dsdoc-toc" aria-label="On this page">
      {items.map((title, i) => <a key={title} href={'#' + slug(title)} target="_self"><i>{pad(i + 1)}</i>{title}</a>)}
    </nav>
  );
}

export function Section({ n, title, lead, children }) {
  return (
    <section className="dsdoc-section" id={slug(title)}>
      <h2 className="dsdoc-h2"><span className="dsdoc-num">{pad(n)}</span>{title}</h2>
      {lead ? <p className="dsdoc-lead">{lead}</p> : null}
      {children}
    </section>
  );
}

export function Cards({ items, columns }) {
  return (
    <div className={'dsdoc-grid' + (columns === 2 ? ' dsdoc-grid--2' : '')}>
      {items.map(({ title, text, tone }) => (
        <div className={'dsdoc-card' + (tone ? ' dsdoc-card--' + tone : '')} key={title}>
          <b>{title}</b>
          {Array.isArray(text) ? <ul>{text.map((x, i) => <li key={i}>{x}</li>)}</ul> : text ? <span>{text}</span> : null}
        </div>
      ))}
    </div>
  );
}

export function Steps({ items }) {
  return (
    <div className="dsdoc-steps">
      {items.map(([title, text], i) => (
        <div className="dsdoc-step" key={title}>
          <i>{i + 1}</i>
          <b>{title}</b>
          <span>{text}</span>
        </div>
      ))}
    </div>
  );
}

export function Chips({ items }) {
  return <div className="dsdoc-chips">{items.map((x, i) => <span className="dsdoc-chip" key={i}>{x}</span>)}</div>;
}

export function Table({ head, rows }) {
  return (
    <div className="dsdoc-tablewrap">
      <table className="dsdoc-table">
        <thead><tr>{head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

/** A plain list inside a card-like frame, for checklists. */
export function List({ items }) {
  return <ul className="dsdoc-list">{items.map((x, i) => <li key={i}>{x}</li>)}</ul>;
}

/** The frame of every foundations and catalogue story: title, one lead sentence, then the content. */
export function Page({ title, lead, children }) {
  return (
    <div className="dsx-page">
      <header className="dsx-head">
        <h1 className="dsx-title">{title}</h1>
        {lead ? <p className="dsx-lead">{lead}</p> : null}
      </header>
      {children}
    </div>
  );
}

// Counted the same way as the catalogue: from build/components.json and from the files in src/components.
const IN_CODE = Object.keys(import.meta.glob('../../src/components/*.jsx')).map((p) => p.split('/').pop().replace('.jsx', ''));
const nameKey = (n) => n.replace(/\s+/g, '').toLowerCase();

export function CodeCounts() {
  const coded = new Set(IN_CODE.map(nameKey));
  const total = components.length;
  const nCode = components.filter((c) => coded.has(nameKey(c.name))).length;
  const items = [[total, 'Components in the Figma library'], [nCode, 'In code'], [total - nCode, 'Still Figma only']];
  return (
    <div className="dsx-counts">
      {items.map(([n, label]) => <div className="dsx-count" key={label}><b>{n}</b><span>{label}</span></div>)}
    </div>
  );
}
