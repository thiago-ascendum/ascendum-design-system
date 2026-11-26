import { SectionFullWidth } from '../../src/components/SectionFullWidth.jsx';

export default {
  title: 'Components/Section · Full Width',
  component: SectionFullWidth,
  tags: ['autodocs'],
  args: { layout: 'text-left' },
  parameters: {
    ds: {
      lead: 'Full-bleed section with four layouts: Text Left, Text Right, Text Only and Media Only.',
      group: 'Organisms',
      figma: '92:87',
      code: 'src/components/SectionFullWidth.jsx',
      sample: {},
    },
  },
};

export const TextLeft = {};
export const TextRight = { args: { layout: 'text-right' } };
export const TextOnly = { args: { layout: 'text-only' } };
export const MediaOnly = { args: { layout: 'media-only' } };

export const PageRhythm = {
  name: 'In use: alternating light and dark',
  render: () => (
    <div>
      <SectionFullWidth layout="text-left" />
      <div data-context="inverted"><SectionFullWidth layout="text-right" /></div>
      <SectionFullWidth layout="text-only" />
    </div>
  ),
};

export const OnDark = {
  name: 'Inverted, on a dark surface',
  render: () => <div data-context="inverted"><SectionFullWidth layout="text-left" /></div>,
};
