// The Figma page, exported (pipeline/08_figma_docs.py notes how). It becomes a live page when it has code.
import img from './img/photography.jpg';
import imgDark from './img/photography-dark.jpg';
import { FigmaOnly } from '../_shared/FigmaOnly.jsx';

export default {
  title: "Foundations/Photography",
  component: FigmaOnly,
  tags: ['autodocs', 'figma-only'],
  args: { name: "Photography", img, imgDark },
  parameters: { ds: { figmaOnly: true, img, imgDark, figma: "55:72" } },
};

export const Figma = {};
