import { Radio } from '../../src/components/Radio.jsx';

export default {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  args: { label: 'Monthly invoice', name: 'billing', value: 'monthly', disabled: false },
  parameters: {
    docs: {
      description: {
        component:
          'Choose one option from a short list. **Use:** when every option should be visible at once, and always select one by default. The selected option shows a filled dot, and focus is a separate ring so it is never mistaken for a selection. **Avoid:** more than five options (use a Select), and more than one answer (use Checkbox). **Open questions for the owner:** The audit asks whether radio buttons are used at all. No tool was checked for this.',
      },
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
