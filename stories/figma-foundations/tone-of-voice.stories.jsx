// The Figma page, exported (pipeline/08_figma_docs.py notes how). It becomes a live page when it has code.
import img from './img/tone-of-voice.jpg';
import imgDark from './img/tone-of-voice-dark.jpg';
import { FigmaOnly } from '../_shared/FigmaOnly.jsx';

export default {
  title: "Foundations/Tone of Voice",
  component: FigmaOnly,
  tags: ['autodocs', 'figma-only'],
  args: { name: "Tone of Voice", img, imgDark },
  parameters: { ds: { figmaOnly: true, img, imgDark, figma: "55:2" } },
};

export const Figma = {};
