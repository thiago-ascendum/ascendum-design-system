import tokens from '../build/tokens.json';
import figmaDocs from '../build/figma-docs.json';
import { Button } from '../src/components/Button.jsx';
import { Input } from '../src/components/Input.jsx';
import { Badge } from '../src/components/Badge.jsx';
import { CodeBlock } from '../src/components/CodeBlock.jsx';
import './figma-to-code.css';

/**
 * Figma to Code: the same guide as the Figma page "↳ Figma to Code" (frame 1124:7904), section by section and in the
 * same order. How a change travels from the Figma file to the code and the site, what the plugin does, what the gate
 * stops, and why the file is built the way it is. The pictures are the real components; the numbers are counted.
 */
const SITE = 'https://thiago-ascendum.github.io/ascendum-design-system/';
const REPO = 'https://github.com/thiago-ascendum/ascendum-design-system';
const count = (o) => Object.entries(o).reduce((n, [k, v]) => (k.startsWith('$') ? n : v && typeof v === 'object' && '$value' in v ? n + 1 : v && typeof v === 'object' ? n + count(v) : n), 0);
const nVars = count(tokens);
const coded = new Set(Object.keys(import.meta.glob('../src/components/*.jsx')).map((p) => p.split('/').pop().replace('.jsx', '').toLowerCase()));
// Counted like the Figma file: every component that has a documentation page (patterns are not components).
const documented = Object.values(figmaDocs.docs).filter((d) => d.chips[0] !== 'Pattern');
const nCoded = documented.filter((d) => coded.has(d.name.replace(/[^A-Za-z]/g, '').toLowerCase())).length;
const WHO = { designer: ['A designer', 'blue'], auto: ['Automatic', 'stone'], person: ['A person', 'purple'] };

const Head = ({ title, lead }) => (
  <header className="f2c-head">
    <h2>{title}</h2>
    {lead ? <p>{lead}</p> : null}
  </header>
);
const Tile = ({ n, tone }) => <i className={`f2c-tile f2c-tile--${tone}`}>{n}</i>;

const STEPS = [
  ['designer', 'Change in Figma', 'Edit a variable, a style or a component.'],
  ['designer', 'Send to code', 'Write what changed. Click once in the plugin.'],
  ['auto', 'Pull request', 'A branch and a pull request with the token diff.'],
  ['auto', 'Tokens', 'CSS, contracts and the AI contract, generated.'],
  ['auto', 'Gate', 'The checks run. One red stops everything.'],
  ['person', 'Review', 'Someone looks at the preview and merges.'],
  ['auto', 'Published', 'The site updates in about a minute.'],
];
const MAP = [
  ['Variables', 'Colours, spacing, radius, sizes', 'build/tokens.css', 'One CSS custom property each: --on-surface, --space-xs'],
  ['Modes', 'Light and Dark, Desktop and Mobile, Default and Inverted, Text 200%', 'data-theme, 768px, data-context, rem', 'The same names switch value; nothing is copied'],
  ['Components and properties', 'Style, State, Label, On …', 'React components, props with the same names', 'Style becomes style; a check blocks any difference'],
  ['Documentation frames', 'Use, Measures, Key tokens, Accessibility', 'Storybook pages', 'Read from the Figma file, so the words cannot drift'],
];
const GATE = [
  ['Aliases resolve', 'A role that points at a variable that no longer exists.'],
  ['Colours from the palette', 'A colour inside a component that is not a token.'],
  ['Contrast passes AA', 'Text under 4.5:1 on the surfaces it is meant for.'],
  ['One code name per token', 'Two tokens that would overwrite each other in CSS.'],
  ['Breaking changes accepted', 'Removing something a file uses, unless accepted by name.'],
  ['No colour typed in code', 'A hex value in a stylesheet instead of a token.'],
  ['Code mirrors Figma', 'A prop whose name or options differ from the Figma property.'],
  ['Generated files match', 'A token file edited by hand instead of generated.'],
];
const DEC = [
  ['Colours named by their job', 'surface, on-surface, primary, like Material 3. Light and Dark change the value, never the name.', '--on-surface'],
  ['A Context mode, not inverted copies', 'A dark band sets Inverted once and everything inside follows. 56 duplicate variants are gone.', 'data-context="inverted"'],
  ['Modes do the responsive work', 'Desktop and Mobile are one scale that changes at 768px. Nothing is resized by hand.', '@media (max-width: 767px)'],
  ['Status colours as tonal palettes', '11 tones by lightness (CIE L*). The approved colours are the anchors: 40, 95, 20 and 60.', '--error-40 … --error-98'],
  ['Sizes in rem, and Text 200%', 'A size layer doubles every size, as browser zoom does (WCAG 1.4.4).', 'font-size: 1rem'],
  ['Props named like Figma', 'Style is style, On is on. A blocking check keeps code and Figma in step.', 'style="solid"'],
  ['Browser states are not props', 'Hover, Focus, Pressed and Filled come from the browser. State only holds what a person sets.', 'state="disabled"'],
  ['Documentation read from Figma', 'Storybook pages are drawn from the documentation frames in the Figma file.', 'build/figma-docs.json'],
];

const Page = () => (
  <div className="f2c-page">
    <section className="f2c-hero">
      <h1>Figma to Code</h1>
      <p>Change it in Figma. One click sends it to code. The checks decide. The site publishes itself. This page shows the whole path, and why the file is built the way it is.</p>
      <div className="f2c-stats">
        {[[String(nVars), 'variables, one source'], [`${nCoded} of ${documented.length}`, 'components in code'], ['0', 'names that differ'], ['1 click', 'from Figma to a pull request']].map(([v, l]) => (
          <div key={l} className="f2c-stat"><b>{v}</b><span>{l}</span></div>
        ))}
      </div>
      <div className="f2c-links">
        <a href={SITE + 'report/'} target="_top">Health report →</a>
        <a href={REPO} target="_blank" rel="noreferrer">Repository →</a>
        <a href="https://www.figma.com/design/5lhRMZkLHZijqgdigjk3J1/Ascendum-Design-System?node-id=1124-7904" target="_blank" rel="noreferrer">This page in Figma →</a>
      </div>
    </section>

    <section className="f2c-section">
      <Head title="The path of a change" lead="Seven steps. The colour of the number says who does it." />
      <div className="f2c-legend">{Object.values(WHO).map(([w, t]) => <span key={w}><i className={`f2c-dot f2c-tile--${t}`} />{w}</span>)}</div>
      <ol className="f2c-flow">
        {STEPS.map(([who, title, line], i) => (
          <li key={title} className="f2c-step">
            <Tile n={i + 1} tone={WHO[who][1]} />
            <b>{title}</b>
            <span>{line}</span>
          </li>
        ))}
      </ol>
    </section>

    <section className="f2c-section f2c-card">
      <Head title="What travels" lead="Everything on the left lives in the Figma file. Everything on the right is generated from it. Nobody edits the right side by hand." />
      {MAP.map(([a, a2, b, b2]) => (
        <div key={a} className="f2c-map">
          <div className="f2c-cell"><small>In Figma</small><b>{a}</b><span>{a2}</span></div>
          <span className="f2c-arrow" aria-hidden="true">→</span>
          <div className="f2c-cell"><small>In code</small><b>{b}</b><span>{b2.split(/(--[a-z0-9-]+)/).map((p, i) => (p.startsWith("--") ? <code key={i}>{p}</code> : p))}</span></div>
        </div>
      ))}
      <div className="f2c-map">
        <div className="f2c-cell f2c-cell--plain"><small>This instance in Figma</small><div><Button label="Save changes" style="solid" /></div></div>
        <span className="f2c-arrow" aria-hidden="true">=</span>
        <div className="f2c-cell f2c-cell--plain"><small>This line in code</small><CodeBlock language="JSX">{'<Button label="Save changes" style="solid" state="default" />'}</CodeBlock></div>
      </div>
    </section>

    <section className="f2c-section">
      <Head title="The plugin: Send to code" lead="The only step a designer does after designing. It works on any Figma plan." />
      <div className="f2c-plugin">
        <div className="f2c-mock" aria-label="Plugin window, as it looks in Figma">
          <b className="f2c-h5">Send to code</b>
          <label className="f2c-label" htmlFor="f2c-what">What changed?</label>
          <Input id="f2c-what" defaultValue="Button padding 28 to 32" />
          <div><Button label="Send to code" style="solid" /></div>
          <small>Saved Figma version · Branch figma/… pushed · Pull request opened</small>
        </div>
        <ol className="f2c-plugin-steps">
          {[['Reads the file', 'Every variable, alias, component and layer, through the Figma Plugin API.'], ['Saves a Figma version', 'Named after what you wrote. Its id travels with the change, so the code always knows which Figma it came from.'], ['Opens a pull request', 'GitHub regenerates every file from the snapshot and shows the token diff.'], ['Waits for the gate', 'Red: nothing can be merged. Green: a person merges and the site publishes.']].map(([t, x], i) => (
            <li key={t}><Tile n={i + 1} tone="stone" /><div><b>{t}</b><span>{x}</span></div></li>
          ))}
        </ol>
      </div>
      <div className="f2c-two">
        <div className="f2c-note"><b>Install once</b><span>Figma desktop: Plugins, Development, Import plugin from manifest (figma-plugin/manifest.json). Paste a GitHub token for this repository the first time; it stays on your computer.</span></div>
        <div className="f2c-note"><b>Why a click</b><span>Reading variables from a server needs the Figma Enterprise plan. Without it, someone clicks Send to code; everything after the click runs alone.</span></div>
      </div>
    </section>

    <section className="f2c-section f2c-card">
      <Head title="The gate" lead="Checks that run on every pull request. Any one in red blocks the merge, for everyone, admins included." />
      <div className="f2c-grid4">
        {GATE.map(([t, x]) => <div key={t} className="f2c-note"><div><Badge label="Blocks" tone="error" /></div><b>{t}</b><span>Stops: {x}</span></div>)}
      </div>
      <div className="f2c-two">
        <div className="f2c-out f2c-out--red"><div><Badge label="Red" tone="error" /></div><p>The pull request cannot be merged. Nothing is published. The failing check says what to fix.</p></div>
        <div className="f2c-out f2c-out--green"><div><Badge label="Green" tone="success" /></div><p>A person looks at the preview and merges. The site publishes itself in about a minute.</p></div>
      </div>
    </section>

    <section className="f2c-section">
      <Head title="Why the file is built this way" lead="Eight decisions. Each one makes the path above possible." />
      <div className="f2c-grid4">
        {DEC.map(([t, x, c]) => <div key={t} className="f2c-dec"><b>{t}</b><span>{x}</span><code>{c}</code></div>)}
      </div>
    </section>

    <section className="f2c-section f2c-card">
      <Head title="Who does what" />
      <div className="f2c-grid3">
        {[['designer', 'Designers', ['Change variables, styles and components in Figma.', 'Click Send to code and write what changed.', 'Fix a red check in Figma when it is a design problem.']], ['auto', 'The pipeline', ['Generates tokens, contracts and pages.', 'Runs every check on every pull request.', 'Publishes the site only after a green gate.']], ['person', 'Developers and reviewers', ['Look at the preview and merge.', 'Code a new variant when a contract changes.', 'Accept a breaking change by name, on purpose.']]].map(([k, t, items], i) => (
          <div key={t} className="f2c-note"><Tile n={i + 1} tone={WHO[k][1]} /><b className="f2c-h5">{t}</b><ul>{items.map((x) => <li key={x}>{x}</li>)}</ul></div>
        ))}
      </div>
    </section>

    <section className="f2c-section">
      <Head title="When it goes red" lead="The three you will meet most, and what to do." />
      {[['Contrast fails', 'Change the value of the role in Figma, or stop using that pair. Never lighten a colour only in code.'], ['Code does not mirror Figma', 'Rename so both say the same: the prop in code, or the property in Figma. Then send again.'], ['A breaking change', 'If it is on purpose, accept it by name in governance/accepted-breaking.json in the same pull request.']].map(([t, x]) => (
        <div key={t} className="f2c-red"><Badge label="Red" tone="error" /><b>{t}</b><span>{x}</span></div>
      ))}
    </section>

    <p className="f2c-foot">Proposed in 1.1.0. Not reviewed by the owner yet. The path was tested end to end on 26 November 2026.</p>
  </div>
);

export default {
  title: 'Start here/Figma to Code',
  parameters: { layout: 'fullscreen', options: { showPanel: false } },
};

export const FigmaToCode = { name: 'Figma to Code', render: () => <Page /> };
