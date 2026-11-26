import { Toggle } from '../../src/components/Toggle.jsx';

export default {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  args: { label: 'Email alerts', disabled: false },
  parameters: {
    ds: {
      lead: 'Switch one setting on or off, with the change applying straight away.',
      group: 'Atoms',
      figma: '33:29',
      code: 'src/components/Toggle.jsx',
      when: [
        ['On: the setting is active', 'The track fills and the knob moves to the right.'],
        ['Off: the setting is not active', 'The track is empty and the knob sits on the left.'],
        ['Disabled: unavailable for now', 'The setting cannot be changed right now. Say why in nearby text.'],
      ],
      use: ['Label it with the setting itself, such as "Email alerts", so the same words work for On and Off.', 'Use it only when the change applies straight away.'],
      avoid: ['Using it in a form that needs a Save button: use Checkbox.', 'Writing the label as an action, such as "Turn on".'],
      tokens: [
        ['component/toggle/width', '--toggle-width', 'Width of the track: 44'],
        ['component/toggle/height', '--toggle-height', 'Height of the track: 24'],
        ['component/toggle/knob', '--toggle-knob', 'Size of the knob: 17'],
        ['outline', '--outline', 'Border of the track'],
        ['surface-container', '--surface-container', 'Fill of the track when Off'],
        ['outline', '--outline', 'Fill of the track when On, and the knob when Off'],
        ['inverse-on-surface', '--inverse-on-surface', 'The knob when On'],
        ['radius/pill', '--radius-pill', 'Makes the track and the knob round'],
        ['focus', '--focus', 'Focus ring, 2px, set 2px off the track'],
      ],
      a11y: [
        'It is a native checkbox with the switch role, so assistive technology reads On and Off. The drawn track is hidden.',
        'Clicking the label also toggles it. Focus is a 2px ring set 2px away from the track.',
        'On and Off also differ by the knob position, not by colour alone.',
        'The track is 44px wide and 24px high, and the row is about 24px high. This is under the 44px touch target in height: an open point. Disabled is 40% opacity.',
      ],
      open: ['Disabled is kept, with the same question as Checkbox.'],
      changes: ['1.1.0: Focus is a visible ring.'],
    },
  },
};

export const Off = {};
export const On = { args: { defaultChecked: true } };
export const Disabled = { args: { disabled: true } };
export const DisabledOn = { args: { disabled: true, defaultChecked: true } };

export const InUse = {
  name: 'In use: account notification settings',
  render: () => (
    <div className="sb-card" style={{ width: 360 }}>
      <span className="sb-label">Notifications</span>
      <Toggle label="Email alerts" defaultChecked />
      <Toggle label="Weekly digest" />
      <Toggle label="Billing reminders" disabled defaultChecked />
      <span className="sb-help">Billing reminders are required for your plan.</span>
    </div>
  ),
};
