import { SectionShowcase } from '../../src/components/SectionShowcase.jsx';

export default {
  title: 'Components/Section · Showcase',
  component: SectionShowcase,
  tags: ['autodocs'],
  args: { medialeft: false },
  parameters: {
    ds: {
      lead: 'Text beside an image or video. Use it to explain one idea with a visual.',
      group: 'Organisms',
      figma: '91:160',
      code: 'src/components/SectionShowcase.jsx',
      sample: {},
    },
  },
};

export const MediaRight = {};
export const MediaLeft = { args: { medialeft: true } };

export const Alternating = {
  name: 'In use: alternating down a page',
  render: () => (
    <div>
      <SectionShowcase />
      <SectionShowcase medialeft />
    </div>
  ),
};

export const OnDark = {
  name: 'Inverted, on a dark surface',
  render: () => <div data-context="inverted"><SectionShowcase medialeft /></div>,
};
