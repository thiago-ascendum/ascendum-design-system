import { MenuItem } from '../../src/components/MenuItem.jsx';

export default {
  title: 'Components/Menu Item',
  component: MenuItem,
  tags: ['autodocs'],
  args: { label: 'Remove', tone: 'default', state: 'default', children: 'Ctrl+D' },
  decorators: [(Story) => <div style={{ width: 260 }} role="menu"><Story /></div>],
  parameters: {
    ds: {
      lead: 'One action in a menu. A shortcut sits on the right, or a tick if the choice is on. The Error tone is reserved for the action that cannot be undone.',
      group: 'Molecules',
      figma: '80:82',
      code: 'src/components/MenuItem.jsx',
      sample: { children: 'Ctrl+D' },
      use: ['Put the Error item last, set apart by a divider.', 'Keep labels to one or two words, starting with a verb.'],
      avoid: ['Using the Error tone for anything that can be undone.', 'Showing a tick and a shortcut on the same row.'],
      tokens: [
        ['surface-container', '--surface-container', 'Fill of the row'],
        ['surface-container-high', '--surface-container-high', 'Fill on hover'],
        ['on-surface', '--on-surface', 'Label and tick'],
        ['on-surface-variant', '--on-surface-variant', 'Shortcut'],
        ['on-surface-error', '--on-surface-error', 'Label of the Error tone'],
        ['component/menu-item/gap', '--menu-item-gap', 'Space between label and shortcut'],
        ['component/menu-item/padding-h', '--menu-item-padding-h', 'Left and right padding'],
        ['component/menu-item/padding-v', '--menu-item-padding-v', 'Top and bottom padding'],
      ],
      a11y: ['The row is a button with role="menuitem"; a Selected row is a "menuitemcheckbox" with aria-checked.', 'A focus ring is drawn inside the row. Figma draws none: an open point.', 'The row is 42px high, under the 44px touch target.'],
      open: ['Shortcuts are written as Ctrl+D. Should Mac symbols be shown too?'],
    },
  },
};

export const Default = {};
export const Selected = { args: { state: 'selected' } };
export const Error = { args: { tone: 'error', children: 'Del' } };

export const InUse = {
  name: 'In use: a file context menu',
  decorators: [],
  render: () => (
    <div role="menu" style={{ width: 260 }}>
      <MenuItem label="Rename">Ctrl+R</MenuItem>
      <MenuItem label="Duplicate">Ctrl+D</MenuItem>
      <MenuItem label="Pinned to top" state="selected" />
      <MenuItem label="Delete" tone="error">Del</MenuItem>
    </div>
  ),
};
