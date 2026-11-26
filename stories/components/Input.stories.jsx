import { Input } from '../../src/components/Input.jsx';

export default {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: { placeholder: 'Jane Smith', multiline: false, invalid: false, disabled: false },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
  parameters: {
    docs: {
      description: {
        component:
          'Text field for short answers, and a textarea for longer ones. **Use:** when the person has to type something, always with a visible label above. **Avoid:** using the placeholder as the label; use Select or Combobox when the answers come from a list. **Open questions for the owner:** is Filled a state, or just a Default input with a value? Vertical padding went from 8 to 18 so a typed value is not cramped: confirm the height.',
      },
    },
  },
};

export const Default = {};
export const Filled = { args: { defaultValue: 'Jane Smith' } };
export const Error = { args: { invalid: true, defaultValue: 'jane@' } };
export const Disabled = { args: { disabled: true } };
export const Textarea = { args: { multiline: true, placeholder: 'How can we help?' } };

export const WithLabel = {
  name: 'In use: label, field and message',
  render: () => (
    <div className="sb-col">
      <label className="sb-label" htmlFor="email">Work email</label>
      <Input id="email" invalid defaultValue="jane@" aria-describedby="email-msg" />
      <span className="sb-error" id="email-msg">Enter a full address, like jane@ascendum.com.</span>
    </div>
  ),
};
