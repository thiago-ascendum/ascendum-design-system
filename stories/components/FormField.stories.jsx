import { FormField } from '../../src/components/FormField.jsx';
import { Button } from '../../src/components/Button.jsx';

export default {
  title: 'Components/Form Field',
  component: FormField,
  tags: ['autodocs'],
  args: { label: 'Full name', placeholder: 'Jane Smith', type: 'text', invalid: false, disabled: false, message: 'Enter your full name.' },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
  parameters: {
    docs: {
      description: {
        component:
          'A label, an input and, only when needed, a message. It composes the Input component and ties the label to it. **Use:** for every text entry in a form. The message shows only on error, replaces any help text and says how to fix the problem. **Avoid:** using the placeholder as the label, and adding help text the label already covers. **Open questions for the owner:** Help text now shows only on error. The audit suggests an info icon for optional help. Not built yet.',
      },
    },
  },
};

export const Default = {};
export const Filled = { args: { defaultValue: 'Jane Smith' } };
export const Error = { args: { invalid: true, defaultValue: 'Jane' } };
export const Disabled = { args: { disabled: true } };
export const Textarea = { args: { type: 'textarea', label: 'Project summary', placeholder: 'What does the project deliver?' } };
export const TextareaError = { args: { type: 'textarea', label: 'Project summary', invalid: true, message: 'Add at least one sentence.' } };

export const InUse = {
  name: 'In use: a request form',
  render: () => (
    <form className="sb-col" style={{ width: 320 }} onSubmit={(e) => e.preventDefault()}>
      <FormField label="Work email" defaultValue="jane@" invalid message="Enter a full address, like jane@ascendum.com." />
      <FormField label="Team" defaultValue="Platform engineering" />
      <FormField type="textarea" label="What do you need?" placeholder="Describe the request in a few sentences." />
      <div className="sb-row"><Button type="submit" label="Send request" /></div>
    </form>
  ),
};
