import { Checkbox } from '../../src/components/Checkbox.jsx';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: { label: 'Email me a weekly summary', checked: false, state: 'default' },
  parameters: {
    ds: {
      lead: 'Choose any number of options from a list. Each option stands alone and always has a visible label.',
      group: 'Atoms',
      figma: '32:41',
      code: 'src/components/Checkbox.jsx',
      when: [
        ['Checked: the option is on', 'For settings and filters where each option stands alone. The box fills, so the state reads without colour.'],
        ['Indeterminate: a partly selected parent', 'For a parent whose children are some on, some off, such as a select-all row.'],
        ['Disabled: unavailable for now', 'The option cannot be changed right now. Say why in nearby text.'],
      ],
      use: ['Write a short label in sentence case that describes the option: "Email me a weekly summary".', 'Use Indeterminate only for a parent of other checkboxes.', 'Say why an option is disabled, in text next to it.'],
      avoid: ['Using it when only one answer is allowed: use Radio.', 'Using it when the change applies straight away: use Toggle.', 'Writing the label as an action.'],
      tokens: [
        ['outline', '--outline', 'Border of the box'],
        ['border-width/field', '--border-width-field', 'Border weight: 1.5'],
        ['size/control', '--size-control', 'Width and height of the box: 20'],
        ['component/checkbox/radius', '--checkbox-radius', 'Corners of the box: 3'],
        ['surface-container', '--surface-container', 'Fill of an unchecked box'],
        ['outline', '--outline', 'Fill of a checked or indeterminate box'],
        ['inverse-on-surface', '--inverse-on-surface', 'The tick and the dash'],
        ['space/control-gap', '--space-control-gap', 'Space between the box and the label: 10'],
        ['focus', '--focus', 'Focus ring, 2px, set 2px off the box'],
      ],
      a11y: [
        'It is a native checkbox inside a label, so clicking the label toggles it. The drawn box is hidden from assistive technology.',
        'Indeterminate is set on the input itself, so assistive technology reads it as mixed.',
        'Focus is a 2px ring set 2px away from the box. Disabled is 40% opacity and the browser blocks focus.',
        'The box is 20px and the whole row is about 22px high on desktop and 21px on mobile. This is under the 44px touch target: an open point.',
      ],
      open: ['Disabled is kept. Is a disabled option the right experience, or should the option be hidden with a reason?'],
      changes: ['1.1.0: Focus is a visible ring.'],
    },
  },
};

export const Unchecked = {};
export const Checked = { args: { checked: true } };
export const Indeterminate = { args: { checked: 'indeterminate', label: 'Select all projects' } };
export const Disabled = { args: { state: 'disabled', label: 'Share with the client' } };
export const DisabledChecked = { args: { state: 'disabled', checked: true, label: 'Share with the client' } };

export const InUse = {
  name: 'In use: filters with a select-all parent',
  render: () => (
    <fieldset className="sb-card" style={{ border: 0, margin: 0 }}>
      <legend className="sb-label">Show projects from</legend>
      <Checkbox label="All regions" defaultChecked="indeterminate" />
      <div className="sb-col" style={{ paddingLeft: 'var(--space-xs)' }}>
        <Checkbox label="Lisbon" defaultChecked />
        <Checkbox label="Porto" defaultChecked />
        <Checkbox label="Madrid" />
      </div>
      <span className="sb-help">Madrid is hidden until you select it.</span>
    </fieldset>
  ),
};
