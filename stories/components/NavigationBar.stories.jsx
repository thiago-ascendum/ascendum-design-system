import { NavigationBar } from '../../src/components/NavigationBar.jsx';

export default {
  title: 'Components/Navigation Bar',
  component: NavigationBar,
  tags: ['autodocs'],
  args: { variant: 'default' },
  parameters: {
    ds: {
      lead: 'The top bar of a page: logo, a few links and one call to action.',
      group: 'Organisms',
      figma: '92:130',
      code: 'src/components/NavigationBar.jsx',
      sample: {},
      use: ['Keep to four or five links.', 'Set the Context mode to Inverted over dark sections: data-context="inverted".'],
      avoid: ['Adding a second call to action.', 'Using it inside an app: use Side Navigation.'],
      tokens: [
        ['ctx/surface', '--ctx-surface', 'Bar fill'],
        ['ctx/on-surface', '--ctx-on-surface', 'Links'],
        ['ctx/logo', '--ctx-logo', 'Logo'],
        ['ctx/outline', '--ctx-outline', 'Border of the button'],
        ['space/md', '--space-md', 'Left and right padding: 96'],
        ['space/2xs', '--space-2xs', 'Top and bottom padding: 16'],
        ['space/xs', '--space-xs', 'Gap between links: 32'],
      ],
      open: ['Is this the same bar as the website? The audit asks the same of the menu.'],
    },
  },
};

export const Default = {};

export const InUse = {
  name: 'In use: the top of a page',
  render: () => <NavigationBar />,
};

export const OnDark = {
  name: 'Inverted, over a dark section',
  render: () => (
    <div data-context="inverted">
      <NavigationBar />
    </div>
  ),
};
