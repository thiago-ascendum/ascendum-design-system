import { Radio } from '../../src/components/Radio.jsx';

export default {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  args: { label: 'Monthly invoice', name: 'billing', value: 'monthly', disabled: false },
  parameters: {
    ds: {
      lead: 'Choose one option from a short list. Every option is visible at once, and one is selected by default.',
      group: 'Atoms',
      figma: '32:63',
      code: 'src/components/Radio.jsx',
      when: [
        ['Selected: the chosen option', 'The ring holds a filled dot. Only one option in a list can be selected.'],
        ['Focus: a separate ring', 'Focus is a ring around the circle, so it is never mistaken for a selection.'],
        ['Disabled: unavailable for now', 'The option cannot be chosen right now. Say why in nearby text.'],
      ],
      use: ['Show every option at once, up to five.', 'Select one option by default.', 'Give every radio in one list the same name.'],
      avoid: ['Using it with more than five options: use a Select.', 'Using it when more than one answer is allowed: use Checkbox.', 'Leaving a list with nothing selected.'],
      tokens: [
        ['border/field', '--form-border', 'Border of the ring'],
        ['border-width/field', '--border-width-field', 'Border weight: 1.5'],
        ['size/control', '--size-control', 'Width and height of the ring: 20'],
        ['component/radio/dot', '--radio-dot', 'Size of the selected dot: 9'],
        ['radius/pill', '--radius-pill', 'Makes the ring and the dot round'],
        ['bg/surface', '--container-fill', 'Fill of the ring'],
        ['border/strong', '--border-strong', 'Colour of the selected dot'],
        ['space/control-gap', '--space-control-gap', 'Space between the ring and the label: 10'],
        ['border/focus', '--border-focus', 'Focus ring, 2px, set 2px off the circle'],
      ],
      a11y: [
        'It is a native radio inside a label, so clicking the label selects it. The drawn ring is hidden from assistive technology.',
        'Radios with the same name form one group, and the browser moves between them with the arrow keys.',
        'Wrap a list in a fieldset with a legend, as the "In use" story does, so the question is announced.',
        'The ring is 20px and the whole row is about 22px high on desktop and 21px on mobile. This is under the 44px touch target: an open point. Disabled is 40% opacity.',
      ],
      open: ['The design review asks whether radio buttons are used at all. No tool was checked for this.'],
      changes: ['1.1.0: Focus is a visible ring.'],
    },
  },
};

export const Unselected = {};
export const Selected = { args: { defaultChecked: true } };
export const Disabled = { args: { disabled: true } };
export const DisabledSelected = { args: { disabled: true, defaultChecked: true } };

export const InUse = {
  name: 'In use: choosing a billing cycle',
  render: () => (
    <fieldset className="sb-card" style={{ border: 0, margin: 0 }}>
      <legend className="sb-label">How should we invoice you?</legend>
      <Radio name="cycle" value="monthly" label="Monthly invoice" defaultChecked />
      <Radio name="cycle" value="quarterly" label="Quarterly invoice" />
      <Radio name="cycle" value="annual" label="Annual invoice, paid upfront" />
      <span className="sb-help">You can change this before the next billing date.</span>
    </fieldset>
  ),
};
