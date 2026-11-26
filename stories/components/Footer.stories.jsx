import { Footer } from '../../src/components/Footer.jsx';

export default {
  title: 'Components/Footer',
  component: Footer,
  tags: ['autodocs'],
  args: { variant: 'default' },
  parameters: {
    ds: {
      lead: 'Page footer: a row of links above a legal bar. Use it once, at the bottom of every page.',
      group: 'Organisms',
      figma: '92:193',
      code: 'src/components/Footer.jsx',
      sample: {},
      use: ['Keep three link groups or fewer.', 'End every page with it.'],
      avoid: ['Putting a call to action in the footer.', 'Changing the legal bar: it is dark in both variants.'],
      tokens: [
        ['ctx/surface', '--ctx-surface', 'Links area fill'],
        ['ctx/on-surface', '--ctx-on-surface', 'Links'],
        ['ctx/on-surface-variant', '--ctx-on-surface-variant', 'Group titles'],
        ['inverse-surface', '--inverse-surface', 'Legal bar fill, always dark'],
        ['inverse-on-surface-variant', '--inverse-on-surface-variant', 'Legal text'],
        ['space/md', '--space-md', 'Side padding: 96'],
        ['space/sm', '--space-sm', 'Top and bottom padding of the links: 48'],
        ['space/3xs', '--space-3xs', 'Gap inside a group: 8'],
      ],
      open: ['Is this the website footer or a tool footer? The audit asks the same of the menu.'],
    },
  },
};

export const Default = {};

export const InUse = {
  name: 'In use: the end of a page',
  render: () => <Footer />,
};

export const OnDark = {
  name: 'Inverted, over a dark section',
  render: () => (
    <div data-context="inverted">
      <Footer />
    </div>
  ),
};
