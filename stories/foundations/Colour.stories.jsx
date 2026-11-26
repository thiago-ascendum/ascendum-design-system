import { Button } from '../../src/components/Button.jsx';
import { Badge } from '../../src/components/Badge.jsx';
import { all, value, usedBy, modesOf, cssVar, contrast, fmt, grade } from '../_shared/tokens.js';
import gradients from './img/gradients.png';
import './foundations.css';

/**
 * The Colour page, drawn like the Colour page of the Figma file (frame 13:2), section by section and in the same
 * order: Brand, Neutral ramp, Brand accents, Status, Tonal palettes, How it works, Roles, Surfaces, Bands,
 * Gradients, Contrast. Every swatch is a live token, and every hex and ratio is measured from build/tokens.json.
 */
const prims = (group) => (all.Primitives || []).filter((t) => t.$type === 'color' && t.name.startsWith(group + '/'));
const MODES = ['Dark', 'Light'];
const STATUS = ['error', 'warning', 'success', 'info'];
const TONES = [10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 98];

const Section = ({ title, lead, children }) => (
  <section className="fx-section">
    <h2 className="fx-h4">{title}</h2>
    {lead ? <p className="fx-lead">{lead}</p> : null}
    {children}
  </section>
);

function Swatch({ name, wide, plain }) {
  const roles = plain ? [] : usedBy(name);
  return (
    <div className={'fx-swatch' + (wide ? ' fx-swatch--wide' : '')}>
      <div className="fx-chip" style={{ background: `var(${cssVar(name)})` }} />
      <span className="fx-cap">{name}</span>
      <span className="fx-cap">{value(name)}</span>
      {roles.length ? <span className="fx-cap">for {roles.join(', ')}</span> : null}
    </div>
  );
}

/** One role tile: the role as fill, its pair as text, with hex and the measured ratio of that pair in that mode. */
function Tile({ bg, fg, mode, label }) {
  const b = value(bg, mode); const f = value(fg, mode); const r = contrast(f, b);
  return (
    <div className="fx-tile" style={{ background: `var(${cssVar(bg)})`, color: `var(${cssVar(fg)})` }}>
      <b>{label || bg}</b>
      <span>{b}</span>
      <span>{fmt(r)} {r >= 7 ? 'AAA' : r >= 4.5 ? 'AA' : ''}</span>
    </div>
  );
}

function RolesPanel({ mode }) {
  const quad = (x) => [[x, `on-${x}`], [`on-${x}`, x], [`${x}-container`, `on-${x}-container`], [`on-${x}-container`, `${x}-container`]];
  const rows = [
    [null, [['primary', 'on-primary'], ['on-primary', 'primary']]],
    ...STATUS.map((s) => [null, quad(s)]),
    ['Inverse, for dark bands on a light page', [['inverse-primary', 'inverse-on-primary'], ['inverse-on-primary', 'inverse-primary'], ['inverse-surface', 'inverse-on-surface'], ['inverse-on-surface', 'inverse-surface']]],
    ['Brand accents: tags and avatars', [['accent-red-container', 'on-accent-container'], ['on-accent-container', 'accent-red-container'], ['accent-purple-container', 'on-accent-container'], ['on-accent-container', 'accent-purple-container']]],
    [null, [['accent-blue-container', 'on-accent-container'], ['on-accent-container', 'accent-blue-container'], ['accent-stone-container', 'on-accent-container'], ['on-accent-container', 'accent-stone-container']]],
  ];
  return (
    <div className="fx-panel" data-theme={mode.toLowerCase()}>
      <h3 className="fx-h5">{mode} <span className="fx-cap">page {value('surface', mode)}</span></h3>
      <div className="fx-quad fx-cap"><span>X</span><span>On X</span><span>X container</span><span>On X container</span></div>
      {rows.map(([label, pairs], i) => (
        <div key={i} className="fx-group">
          {label ? <span className="fx-cap">{label}</span> : null}
          <div className="fx-quad">{pairs.map(([bg, fg]) => <Tile key={bg + fg} bg={bg} fg={fg} mode={mode} />)}</div>
        </div>
      ))}
      <span className="fx-cap">Text on any surface</span>
      <div className="fx-quad fx-quad--3">{['on-surface', 'on-surface-variant', 'on-surface-placeholder'].map((n) => <Tile key={n} bg="surface" fg={n} mode={mode} label={n} />)}</div>
      <div className="fx-quad">{STATUS.map((s) => <Tile key={s} bg="surface" fg={`on-surface-${s}`} mode={mode} label={`on-surface-${s}`} />)}</div>
      <span className="fx-cap">In use</span>
      <div className="fx-row">
        <Button label="Save" style="solid" />
        <Button label="Cancel" style="outline" />
        <Badge label="Error" tone="error" /><Badge label="Warning" tone="warning" /><Badge label="Success" tone="success" /><Badge label="Info" tone="info" />
      </div>
    </div>
  );
}

const SURFACES = [['surface', 'page'], ['surface-container-low', 'rails, table headers'], ['surface-container', 'cards, dialogs, fields'], ['surface-container-high', 'menus, row hover'], ['surface-container-highest', 'skeleton, tracks'], ['inverse-surface', 'dark bands, toasts']];
const LINES = [['on-surface', 'main text', 4.5], ['on-surface-variant', 'secondary text, labels', 4.5], ['on-surface-placeholder', 'placeholder', 4.5], ['outline', 'fields, outline buttons (3:1)', 3], ['outline-medium', 'search field, drop zones (3:1)', 3], ['outline-variant', 'dividers, card borders', 4.5], ['focus', 'focus ring', 3], ['primary', 'main action, links', 4.5], ['surface-hover', 'neutral hover', 4.5], ['surface-pressed', 'neutral pressed', 4.5]];

function SurfacesPanel({ mode }) {
  return (
    <div className="fx-panel fx-panel--flat" data-theme={mode.toLowerCase()}>
      <h3 className="fx-h5">{mode}</h3>
      <div className="fx-strip">
        {SURFACES.map(([n, use]) => (
          <div key={n} className="fx-strip-cell" style={{ background: `var(${cssVar(n)})`, color: `var(${cssVar(n === 'inverse-surface' ? 'inverse-on-surface' : 'on-surface')})` }}>
            <b>{n}</b><span>{use}</span><span className="fx-push">{value(n, mode)}</span>
          </div>
        ))}
      </div>
      <div className="fx-lines">
        {LINES.map(([n, use, min]) => {
          const r = contrast(value(n, mode), value('surface', mode));
          return (
            <div key={n} className="fx-line">
              <i style={{ background: `var(${cssVar(n)})` }} />
              <span><b>{n}</b><br />{use}</span>
              <span>{value(n, mode)}</span>
              <span>{fmt(r)} {grade(r, min)} on surface</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const Band = ({ theme, context }) => (
  <div className="fx-band-col">
    <span className="fx-cap">{theme} · {context}</span>
    <div data-theme={theme.toLowerCase()}>
      <div className="fx-band" data-context={context === 'Inverted' ? 'inverted' : undefined}>
        <b>Start a project</b>
        <span>We reply within a day.</span>
        <div className="fx-row"><Button label="Start" style="solid" /><Button label="Examples" style="outline" /></div>
      </div>
    </div>
  </div>
);

const CONTRAST_COLS = ['surface', 'surface-container', 'surface-container-low', 'surface-container-high', 'inverse-surface', 'accent-red-container', 'accent-purple-container', 'accent-blue-container', 'accent-stone-container'];
const CONTRAST_ROWS = [
  ['on-surface', ['surface', 'surface-container', 'surface-container-low', 'surface-container-high']],
  ['on-surface-variant', ['surface', 'surface-container', 'surface-container-low', 'surface-container-high']],
  ['on-surface-placeholder', ['surface', 'surface-container', 'surface-container-low']],
  ['primary', ['surface', 'surface-container', 'surface-container-low']],
  ['inverse-on-surface', ['inverse-surface']],
  ['inverse-on-surface-variant', ['inverse-surface']],
  ['on-accent-container', ['accent-red-container', 'accent-purple-container', 'accent-blue-container', 'accent-stone-container']],
];
function ContrastTable({ mode }) {
  return (
    <div className="fx-panel" data-theme={mode.toLowerCase()}>
      <h3 className="fx-h5">{mode} mode</h3>
      <div className="fx-table-wrap">
        <table className="fx-table">
          <thead><tr><th>Text role</th>{CONTRAST_COLS.map((c) => <th key={c}>{c}</th>)}</tr></thead>
          <tbody>
            {CONTRAST_ROWS.map(([fg, meant]) => (
              <tr key={fg}>
                <th>{fg}</th>
                {CONTRAST_COLS.map((bg) => {
                  if (!meant.includes(bg)) return <td key={bg}>–</td>;
                  const r = contrast(value(fg, mode), value(bg, mode));
                  return <td key={bg}><div className="fx-aa" style={{ background: `var(${cssVar(bg)})`, color: `var(${cssVar(fg)})` }}><b>Aa</b><span>{fmt(r)} {r >= 4.5 ? 'pass' : 'fail'}</span></div></td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
const countPass = (mode) => CONTRAST_ROWS.reduce((n, [fg, meant]) => n + meant.filter((bg) => contrast(value(fg, mode), value(bg, mode)) >= 4.5).length, 0);
const countAll = CONTRAST_ROWS.reduce((n, [, meant]) => n + meant.length, 0);

const ColourPage = () => (
  <div className="fx-page">
    <h1 className="fx-title">Colour</h1>

    <Section title="Brand" lead="Midnight and Milkyway are the entire foundation. White is for container fills only.">
      <div className="fx-swatches">{['brand/midnight', 'brand/milkyway', 'brand/white', 'brand/grey'].map((n) => <Swatch key={n} name={n} plain />)}</div>
    </Section>

    <Section title="Neutral ramp" lead="13 steps. Nobody picks a neutral directly: these sit behind the semantic roles, and the line under each step says which role uses it.">
      <div className="fx-swatches">{prims('neutral').sort((a, b) => parseInt(a.name.split('/')[1]) - parseInt(b.name.split('/')[1])).map((t) => <Swatch key={t.name} name={t.name} />)}</div>
    </Section>

    <Section title="Brand accents" lead="Four accents, each with one soft tint. Use the soft tint as a surface with dark text on top, as avatars do. Accents never mean status.">
      <div className="fx-swatches">{prims('accent').map((t) => <Swatch key={t.name} name={t.name} wide />)}</div>
    </Section>

    <Section title="Status" lead="Functional feedback only, never decoration. Success: it worked. Info: something to know. Warning: needs attention. Error: it failed, or it will destroy something.">
      {['Light', 'Dark'].map((mode) => (
        <div key={mode} className="fx-panel" data-theme={mode.toLowerCase()}>
          <div className="fx-row fx-row--top">
            {['success', 'info', 'warning', 'error'].map((s) => {
              const r = contrast(value(`on-${s}-container`, mode), value(`${s}-container`, mode));
              return (
                <div key={s} className="fx-status">
                  <div className="fx-status-tile" style={{ background: `var(--${s}-container)`, color: `var(--on-${s}-container)` }}>{s[0].toUpperCase() + s.slice(1)}</div>
                  <span className="fx-cap">on-{s}-container on {s}-container</span>
                  <span className="fx-cap">{mode} · contrast {fmt(r)}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </Section>

    <Section title="Tonal palettes" lead="The ingredients. Each status colour is one hue in 11 tones; the number is the lightness (CIE L*), so two tones 50 apart pass 4.5:1. Tones 40, 95, 20 and 60 are the colours already approved; the rest are drawn between them, as quiet as the brand. L and D mark the tones a role uses.">
      {STATUS.map((s) => {
        const usesIn = (mode) => new Set((all.Semantic || []).map((t) => modesOf(t)[mode]).filter((v) => v && v.startsWith(`{Primitives.${s}.`)).map((v) => v.split('.').pop().replace('}', '')));
        const L = usesIn('Light'); const D = usesIn('Dark');
        return (
          <div key={s} className="fx-tonal">
            <div className="fx-tonal-name"><b>{s[0].toUpperCase() + s.slice(1)}</b><span className="fx-cap">seed {value(`${s}/40`)} · tone 40</span></div>
            <div>
              <div className="fx-tones">
                {TONES.map((n) => (
                  <div key={n} className="fx-tone">
                    <div className="fx-tone-chip" style={{ background: `var(--${s}-${n})`, color: n >= 60 ? '#212121' : '#ffffff' }}>{n}</div>
                    <span className="fx-cap">{value(`${s}/${n}`)}</span>
                    <span className="fx-cap">{[L.has(String(n)) ? 'L' : '', D.has(String(n)) ? 'D' : ''].filter(Boolean).join(' ')}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </Section>

    <Section title="How it works" lead="Four rules and one chain. Every colour starts from an approved brand colour, becomes a tonal palette from 0 to 100, and each role takes one tone in Dark and another in Light.">
      <div className="fx-cards">
        {[['Accessible', 'Text 4.5:1 on its background; borders, icons and charts 3:1. Measured, not judged by eye.'], ['With a purpose', 'Colour says role, state or brand. If it says nothing, it goes.'], ['By role, not by hex', 'Bind primary, never #212121. The value changes between modes; the name does not.'], ['Never colour alone', 'A state is colour, icon and words. Not everyone sees red as red.']].map(([t, x]) => <div key={t} className="fx-card"><b>{t}</b><span>{x}</span></div>)}
      </div>
      <div className="fx-chain">
        {[['1 · Seed', 'An approved colour', `error ${value('error/40')}, signed in the brand file`], ['2 · Tonal palette', 'Tones 10 to 98', 'Same hue, different lightness'], ['3 · Role', 'A name with a job', 'error is the solid fill; on-surface-error is the text'], ['4 · Mode', 'The tone changes, the role does not', 'on-surface-error: Light 40 · Dark 80']].map(([a, b, c]) => <div key={a}><span className="fx-cap">{a}</span><b>{b}</b><span className="fx-cap">{c}</span></div>)}
      </div>
    </Section>

    <Section title="Roles" lead="Roles come in pairs, Dark and Light side by side. X carries on-X text; X-container carries on-X-container text. Status solids are the same strong colour in both modes; status text on a surface uses on-surface-X. The ratio printed on each tile is the real contrast of that pair in that mode.">
      <div className="fx-two">{MODES.map((m) => <RolesPanel key={m} mode={m} />)}</div>
    </Section>

    <Section title="Surfaces" lead="Surfaces by level. Height reads by tone, not by shadow. On surface, container and container-low, any text role passes AA. On container-high, container-highest, hover and pressed, text uses on-surface only.">
      {MODES.map((m) => <SurfacesPanel key={m} mode={m} />)}
    </Section>

    <Section title="Bands" lead="A dark band on a light page sets the Context mode to Inverted. Everything inside binds ctx/* tokens, which point to the role in Default and to its inverse in Inverted. In Dark mode the same band turns light.">
      <div className="fx-bands"><Band theme="Light" context="Default" /><Band theme="Light" context="Inverted" /><Band theme="Dark" context="Default" /><Band theme="Dark" context="Inverted" /></div>
    </Section>

    <Section title="Gradients" lead="Paint styles, not variables. Figma cannot store a gradient in a variable, so these stay the same in light and dark. Shown here as they are drawn in Figma.">
      <img className="fx-gradients" src={gradients} alt="The five gradient paint styles: Team, Develop Beyond, Digital, Careers and Process Solutions." />
    </Section>

    <Section title="Contrast" lead={`Every text role on the surfaces it is meant for, measured from the variable values in each mode. AA asks for 4.5:1 on normal text. Light: ${countPass('Light')} of ${countAll} pairs pass. Dark: ${countPass('Dark')} of ${countAll}. A dash means the pair is not meant to be used.`}>
      {['Light', 'Dark'].map((m) => <ContrastTable key={m} mode={m} />)}
    </Section>
  </div>
);

export default {
  title: 'Foundations/Colour',
  parameters: { layout: 'fullscreen' },
};

export const Colour = { name: 'Colour', render: () => <ColourPage /> };
