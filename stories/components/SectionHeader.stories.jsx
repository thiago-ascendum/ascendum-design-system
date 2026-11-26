import { SectionHeader } from '../../src/components/SectionHeader.jsx';

export default {
  title: 'Components/Section · Header',
  component: SectionHeader,
  tags: ['autodocs'],
  args: { heading: 'Take vibe-coded prototypes', gradientLine: 'all the way to viable.', level: 'h1' },
  parameters: {
    ds: {
      lead: 'Section heading with a gradient second line. Use it to open a page section.',
      group: 'Organisms',
      figma: '90:43',
      code: 'src/components/SectionHeader.jsx',
      sample: { heading: 'Take vibe-coded prototypes', gradientLine: 'all the way to viable.' },
    },
  },
};

export const H1 = {};
export const H2 = { args: { level: 'h2' } };
export const H3 = { args: { level: 'h3' } };
export const SingleLine = { args: { gradientLine: '' } };

export const OpeningAPage = {
  name: 'In use: opening a page',
  render: () => (
    <div>
      <SectionHeader heading="Take vibe-coded prototypes" gradientLine="all the way to viable." level="h1" />
    </div>
  ),
};

export const OnDark = {
  name: 'Inverted, on a dark surface',
  render: () => (
    <div data-context="inverted"><SectionHeader level="h2" /></div>
  ),
};
