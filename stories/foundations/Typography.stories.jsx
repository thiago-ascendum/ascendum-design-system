import { ThemedImg } from '../_shared/ThemedImg.jsx';
import tokens from '../../build/tokens.json';
import { Alert } from '../../src/components/Alert.jsx';
import { Button } from '../../src/components/Button.jsx';
import { Input } from '../../src/components/Input.jsx';
import header from './img/type-header.png';
import headerDark from './img/type-header-dark.png';
import callout from './img/type-callout.png';
import calloutDark from './img/type-callout-dark.png';
import how from './img/type-how.png';
import howDark from './img/type-how-dark.png';
import scale from './img/type-scale.png';
import scaleDark from './img/type-scale-dark.png';
import headings from './img/type-headings.png';
import headingsDark from './img/type-headings-dark.png';
import developers from './img/type-developers.png';
import developersDark from './img/type-developers-dark.png';
import weights from './img/type-weights.png';
import weightsDark from './img/type-weights-dark.png';
import which from './img/type-which.png';
import whichDark from './img/type-which-dark.png';
import inuse from './img/type-inuse.png';
import inuseDark from './img/type-inuse-dark.png';
import rules from './img/type-rules.png';
import rulesDark from './img/type-rules-dark.png';
import doavoid from './img/type-doavoid.png';
import doavoidDark from './img/type-doavoid-dark.png';
import findings from './img/type-findings.png';
import findingsDark from './img/type-findings-dark.png';
import './foundations.css';

/**
 * The Typography page, in the order of the Typography page of the Figma file (frame 26:2). Two sections run live on the
 * tokens: Sizes (the Accessibility size layer and the roles) and Text at 200%. The others are the Figma sections
 * themselves, exported (pipeline/08_figma_docs.py notes how), until they are built from tokens too.
 */
const ext = (t) => t?.$extensions?.['com.ascendum.ds'] || {};
const sizeOf = (ref) => { const m = String(ref).match(/type-size\.(\d+)/); return m ? Number(m[1]) : Number(ref); };
const rem = (n) => `${Math.round((n / 16) * 1000) / 1000}rem`;
const Figma = ({ src, dark, alt }) => <ThemedImg className="fx-figma" src={src} dark={dark} alt={alt} />;

const Sample = () => (
  <div className="fx-sample">
    <h5 className="fx-h5">Discard your changes?</h5>
    <p className="fx-lead" style={{ margin: 0 }}>You have edits to this project that are not saved yet.</p>
    <Alert tone="info" title="Heads up" text="Your changes were saved to the project." />
    <Input placeholder="Project name" aria-label="Project name" />
    <div className="fx-row"><Button style="solid" label="Save changes" /><Button style="ghost" label="Back" /></div>
  </div>
);

function Sizes() {
  const sizes = Object.entries(tokens.Accessibility?.['type-size'] || {}).sort((a, b) => Number(a[0]) - Number(b[0]));
  const roles = Object.entries(tokens.Dimension?.['font-size'] || {})
    .map(([name, t]) => ({ name, t, desktop: sizeOf(t.$value), mobile: sizeOf(ext(t).modes?.Mobile ?? t.$value) }))
    .sort((a, b) => b.desktop - a.desktop);
  return (
    <section className="fx-section">
      <h2 className="fx-h4">Sizes</h2>
      <p className="fx-lead">The Accessibility collection holds every size the system uses, once. Roles point here. Text 200% doubles each one, as browser zoom does, so you can design and check the zoomed screen in Figma.</p>
      <div className="fx-two">
        <div className="fx-panel">
          <h3 className="fx-h5">The size layer</h3>
          <table className="fx-plain">
            <thead><tr><th>Size</th><th>CSS</th><th>Default</th><th>Text 200%</th></tr></thead>
            <tbody>{sizes.map(([n, t]) => <tr key={n}><td><b>type-size/{n}</b></td><td><code>{ext(t).code}</code></td><td>{n}px</td><td>{ext(t).modes?.['Text 200%'] ?? n * 2}px</td></tr>)}</tbody>
          </table>
        </div>
        <div className="fx-panel">
          <h3 className="fx-h5">Roles, biggest first</h3>
          <table className="fx-plain">
            <thead><tr><th>Role</th><th>Desktop</th><th>Mobile</th></tr></thead>
            <tbody>{roles.map(({ name, desktop, mobile }) => <tr key={name}><td><b>font-size/{name}</b></td><td>{desktop}px · {rem(desktop)}</td><td>{mobile}px · {rem(mobile)}</td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

const TypographyPage = () => (
  <div className="fx-page fx-page--sections">
    <Figma src={header} dark={headerDark} alt="Typography: the page header." />
    <Figma src={callout} dark={calloutDark} alt="What to take from this page." />
    <Figma src={how} dark={howDark} alt="How type works." />
    <Figma src={scale} dark={scaleDark} alt="The scale: every text style in three groups, Headings, Body and Interface." />
    <Sizes />
    <Figma src={headings} dark={headingsDark} alt="Headings in a page." />
    <section className="fx-section">
      <h2 className="fx-h4">Text at 200%</h2>
      <p className="fx-lead">WCAG 1.4.4 asks that text can be doubled without losing content. On the web that is browser zoom, which doubles every size, so Text 200% does the same. Set it on a frame from the Appearance panel and check that nothing is cut. In code the sizes are rem, so browser zoom does it without a mode.</p>
      <div className="fx-two">
        <div className="fx-group"><span className="fx-cap">Default</span><Sample /></div>
        <div className="fx-group"><span className="fx-cap">Text 200%</span><div data-text-scale="200"><Sample /></div></div>
      </div>
    </section>
    <Figma src={developers} dark={developersDark} alt="For developers." />
    <Figma src={weights} dark={weightsDark} alt="Weight range." />
    <Figma src={which} dark={whichDark} alt="Which style for what." />
    <Figma src={inuse} dark={inuseDark} alt="In use." />
    <Figma src={rules} dark={rulesDark} alt="Rules." />
    <Figma src={doavoid} dark={doavoidDark} alt="Do and avoid." />
    <Figma src={findings} dark={findingsDark} alt="Findings." />
  </div>
);

export default {
  title: 'Foundations/Typography',
  parameters: { layout: 'fullscreen', options: { showPanel: false } },
};

export const Typography = { name: 'Typography', render: () => <TypographyPage /> };
