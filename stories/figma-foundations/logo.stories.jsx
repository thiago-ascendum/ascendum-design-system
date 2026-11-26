// The Figma page, exported (pipeline/08_figma_docs.py notes how). It becomes a live page when it has code.
import img from './img/logo.jpg';
import imgDark from './img/logo-dark.jpg';
import { FigmaOnly } from '../_shared/FigmaOnly.jsx';

export default {
  title: "Foundations/Logo",
  component: FigmaOnly,
  tags: ['autodocs', 'figma-only'],
  args: { name: "Logo", img, imgDark },
  parameters: { ds: { figmaOnly: true, img, imgDark, figma: "53:2" } },
};

export const Figma = {};
