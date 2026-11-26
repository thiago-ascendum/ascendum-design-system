import { SideNavItem } from '../../src/components/SideNavItem.jsx';

export default {
  title: 'Components/Side Nav Item',
  component: SideNavItem,
  tags: ['autodocs'],
  args: { label: 'Projects', state: 'default' },
  parameters: {
    ds: {
      lead: 'One row in the side navigation. Use it only inside Side Navigation.',
      group: 'Organisms',
      figma: '97:120',
      code: 'src/components/SideNavItem.jsx',
      sample: { label: 'Projects' },
      use: ['One icon and one short label.', 'Show exactly one Active item.'],
      avoid: ['Nesting more than one level.', 'Using it outside Side Navigation.'],
      tokens: [
        ['inverse-surface', '--inverse-surface', 'Panel fill behind the item'],
        ['inverse-on-surface', '--inverse-on-surface', 'Label and icon'],
        ['surface-container', '--surface-container', 'Active pill'],
        ['surface-container-high', '--surface-container-high', 'Hover fill'],
        ['component/sidenav/item-padding-h', '--sidenav-item-padding-h', 'Left and right padding'],
        ['component/sidenav/item-padding-v', '--sidenav-item-padding-v', 'Top and bottom padding'],
        ['radius/field', '--field-radius', 'Corners: 4'],
      ],
      open: ['Hover is drawn at 15% opacity in Figma and is hard to read in both modes.'],
    },
  },
};

export const Default = {};
export const Active = { args: { state: 'active' } };

export const InUse = {
  name: 'In use: three rows',
  render: () => (
    <div style={{ width: 208 }}>
      <SideNavItem label="Overview" state="active" />
      <SideNavItem label="Projects" />
      <SideNavItem label="Team" />
    </div>
  ),
};
