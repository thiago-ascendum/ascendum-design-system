import { Divider } from '../../src/components/Divider.jsx';

export default {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  args: { orientation: 'horizontal' },
  argTypes: { orientation: { control: 'inline-radio' } },
  decorators: [(Story) => <div style={{ width: 280, height: 48, display: 'flex', alignItems: 'center' }}><Story /></div>],
  parameters: {
    ds: {
      lead: 'A thin line that separates groups of content, where spacing alone is not clear enough.',
      group: 'Atoms',
      figma: '45:25',
      code: 'src/components/Divider.jsx',
      when: [
        ['Horizontal: between sections', 'Between sections of a list, such as Profile and Notifications in a settings page.'],
        ['Vertical: between toolbar items', 'Between items in a row, such as Archive and Edit. It runs the full height of the row.'],
      ],
      use: ['Stretch it to the width or height of the content it divides.', 'Use it only where spacing alone is not clear enough.'],
      avoid: ['Stacking it with a border or a card that already separates the content.', 'Changing its weight or colour: it has no options for either.'],
      tokens: [
        ['outline-variant', '--outline-variant', 'Colour of the line'],
        ['border-width/hairline', '--border-width-hairline', 'Weight of the line: 1'],
      ],
      a11y: [
        'Horizontal is a native hr and vertical is a div with the separator role and a vertical orientation, so both are announced as separators.',
        'A divider that is purely visual is still announced. There is no option to hide it from assistive technology.',
        'It is 1px thick and not interactive, so it takes no focus and the 44px touch target does not apply.',
      ],
    },
  },
};

export const Horizontal = {};
export const Vertical = { args: { orientation: 'vertical' } };

export const InUse = {
  name: 'In use: a settings list and a toolbar',
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
  render: () => (
    <div className="sb-card">
      <div className="sb-col" style={{ maxWidth: 'none' }}>
        <span className="sb-label">Profile</span>
        <span className="sb-help">Name, photo and job title.</span>
        <Divider />
        <span className="sb-label">Notifications</span>
        <span className="sb-help">Choose what we email you about.</span>
      </div>
      <div className="sb-row" style={{ gap: 'var(--space-2xs)' }}>
        <span className="sb-label">Archive</span>
        <Divider orientation="vertical" />
        <span className="sb-label">Edit</span>
      </div>
    </div>
  ),
};
