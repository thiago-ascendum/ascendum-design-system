import { SideNavigation } from '../../src/components/SideNavigation.jsx';
import { SideNavItem } from '../../src/components/SideNavItem.jsx';

export default {
  title: 'Components/Side Navigation',
  component: SideNavigation,
  tags: ['autodocs'],
  parameters: {
    ds: {
      lead: 'Application side navigation, always dark in every mode. Use it for apps with several top-level areas.',
      group: 'Organisms',
      figma: '97:121',
      code: 'src/components/SideNavigation.jsx',
      sample: {},
      use: ['Use it inside an app, beside the content.', 'Keep it dark in both modes, it is chrome.'],
      avoid: ['Using it on a marketing page: use Navigation Bar.', 'Adding more than seven items.'],
      tokens: [
        ['inverse-surface', '--inverse-surface', 'Panel fill'],
        ['inverse-on-surface', '--inverse-on-surface', 'Name'],
        ['surface-container', '--surface-container', 'Placeholder logo mark'],
        ['component/sidenav/width', '--sidenav-width', 'Width: 240'],
        ['component/sidenav/gap', '--sidenav-gap', 'Gap between logo and items'],
        ['component/sidenav/padding-h', '--sidenav-padding-h', 'Left and right padding'],
        ['component/sidenav/padding-v', '--sidenav-padding-v', 'Top and bottom padding'],
      ],
      open: ['The logo is a placeholder circle and every item uses the same chevron icon. Real icons are needed.'],
    },
  },
};

export const Default = {};

export const InUse = {
  name: 'In use: beside the content',
  render: () => (
    <div style={{ display: 'flex', minHeight: 360 }}>
      <SideNavigation>
        <SideNavItem label="Overview" />
        <SideNavItem label="Projects" state="active" />
        <SideNavItem label="Team" />
      </SideNavigation>
    </div>
  ),
};
