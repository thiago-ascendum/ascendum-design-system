import { ThemedImg } from '../_shared/ThemedImg.jsx';
import tokens from '../../build/tokens.json';
import inuse from './img/space-inuse.png';
import inuseDark from './img/space-inuse-dark.png';
import grid from './img/space-grid.png';
import gridDark from './img/space-grid-dark.png';
import layout from './img/space-layout.png';
import layoutDark from './img/space-layout-dark.png';
import which from './img/space-which.png';
import whichDark from './img/space-which-dark.png';
import './foundations.css';

/**
 * The Spacing, Grid & Layout page, in the order of the Figma page (frame 27:2). The spacing scale runs live on the
 * tokens: the bars are drawn from the variables, so they follow the mobile values under 768px. In use, Grid, Layout on
 * the grid and Which step to use are the Figma sections themselves, exported, until they are built from tokens too.
 */
const ext = (t) => t?.$extensions?.['com.ascendum.ds'] || {};
const USE = {
  none: 'Parts that touch: no gap at all.',
  '3xs': 'Tight pairs, such as a label and its field.',
  '2xs': 'Gap between related items inside a card.',
  xs: 'Gap between blocks inside a section.',
  sm: 'Gap between sections of a page.',
  md: 'Large separation around major blocks.',
};
const Figma = ({ src, dark, alt }) => <ThemedImg className="fx-figma" src={src} dark={dark} alt={alt} />;

function Scale() {
  const px = (t) => Number(ext(t).modes?.Desktop ?? t.$value) || 0;
  const steps = Object.entries(tokens.Dimension?.space || {}).filter(([, t]) => t && t.$type).sort((a, b) => px(a[1]) - px(b[1]));
  return (
    <section className="fx-section">
      <h2 className="fx-h4">Spacing scale</h2>
      <p className="fx-lead">{steps.length} steps. Bars are drawn from the variables: narrow the window under 768px and they follow. Every step above 3xs gets smaller or stays on mobile.</p>
      <div className="fx-panel">
        {steps.map(([name, t]) => {
          const modes = ext(t).modes;
          return (
            <div key={name} className="fx-space">
              <b>space/{name}</b>
              <span className="fx-cap">{modes ? `${modes.Desktop}px desktop · ${modes.Mobile}px mobile` : `${t.$value}px`}</span>
              <div className="fx-space-bar" style={{ width: `var(${ext(t).code})` }} />
              <span className="fx-cap">{USE[name] || t.$description || ''}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

const SpacingPage = () => (
  <div className="fx-page fx-page--sections">
    <header className="fx-section">
      <h1 className="fx-title">Spacing, Grid & Layout</h1>
      <p className="fx-lead">The scale is non-linear, 0, 8, 16, 32, 48, 96, 288, and every step above 3xs changes at the 768px breakpoint. Switch the Dimension mode to Mobile and these gaps resize live; they are not two separate scales.</p>
    </header>
    <Figma src={inuse} dark={inuseDark} alt="In use: the same card in both Dimension modes." />
    <Scale />
    <Figma src={grid} dark={gridDark} alt="Grid." />
    <Figma src={layout} dark={layoutDark} alt="Layout on the grid." />
    <Figma src={which} dark={whichDark} alt="Which step to use." />
  </div>
);

export default {
  title: 'Foundations/Spacing, Grid & Layout',
  parameters: { layout: 'fullscreen' },
};

export const Spacing = { name: 'Spacing, Grid & Layout', render: () => <SpacingPage /> };
