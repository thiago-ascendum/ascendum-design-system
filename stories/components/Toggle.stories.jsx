import { Toggle } from '../../src/components/Toggle.jsx';

export default {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  args: { label: 'Email alerts', disabled: false },
  parameters: {
    docs: {
      description: {
        component:
          'Switch one setting on or off, with the change applying straight away. **Use:** label it with the setting itself, such as Email alerts, so the same words work for on and off. **Avoid:** using it in a form that needs a Save button (use Checkbox), and writing the label as an action like Turn on. **Open questions for the owner:** Disabled is kept, with the same question as Checkbox.',
      },
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
