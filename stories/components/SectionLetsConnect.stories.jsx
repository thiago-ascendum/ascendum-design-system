import { SectionLetsConnect } from '../../src/components/SectionLetsConnect.jsx';

export default {
  title: 'Components/Section · Let\'s Connect',
  component: SectionLetsConnect,
  tags: ['autodocs'],
  args: { variant: 'default' },
  parameters: {
    ds: {
      lead: 'Closing call to action. Use it once, as the last block of a page.',
      group: 'Organisms',
      figma: '90:77',
      code: 'src/components/SectionLetsConnect.jsx',
      sample: {},
    },
  },
};

export const Default = {};

export const ClosingAPage = {
  name: 'In use: last block of a page',
  render: () => <SectionLetsConnect />,
};

export const OnDark = {
  name: 'Inverted, on a dark surface',
  render: () => <div data-context="inverted"><SectionLetsConnect /></div>,
};
