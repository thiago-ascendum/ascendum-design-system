// The Figma page, exported (pipeline/08_figma_docs.py notes how). It becomes a live page when it has code.
import img from './img/radius-elevation.jpg';
import imgDark from './img/radius-elevation-dark.jpg';
import { FigmaOnly } from '../_shared/FigmaOnly.jsx';

export default {
  title: "Foundations/Radius & Elevation",
  component: FigmaOnly,
  tags: ['autodocs', 'figma-only'],
  args: { name: "Radius & Elevation", img, imgDark },
  parameters: { ds: { figmaOnly: true, img, imgDark, figma: "29:2" } },
};

export const Figma = {};
