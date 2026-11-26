import { FormField } from '../../src/components/FormField.jsx';
import { Button } from '../../src/components/Button.jsx';

export default {
  title: 'Components/Form Field',
  component: FormField,
  tags: ['autodocs'],
  args: { label: 'Full name', placeholder: 'Jane Smith', type: 'text', invalid: false, disabled: false, message: 'Enter your full name.' },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
  parameters: {
    ds: {
      lead: 'A label, an input and, only when needed, a message. It is the way to ask for any text in a form.',
      group: 'Molecules',
      figma: '68:59',
      code: 'src/components/FormField.jsx',
      when: [
        ['Short answers', 'A single line of text: a name, an email, a team. It uses the Input component.'],
        ['Longer answers', 'Set the type to textarea for a summary or a request.'],
        ['Errors', 'The message shows only when the field is invalid. It says how to fix the problem.'],
      ],
      use: ['Always show the label. Write it in sentence case.', 'Say how to fix the problem in the error message.', 'Use it for every text entry in a form.'],
      avoid: ['Using the placeholder as the label.', 'Adding help text the label already covers.', 'Error messages that only say "Invalid".'],
      tokens: [
        ['component/form-field/gap', '--form-field-gap', 'Space between the label, the field and the message'],
        ['font-size/label', '--text-label-size', 'Label size'],
        ['text/default', '--text', 'Label colour'],
        ['font-size/caption', '--font-size-caption', 'Message size'],
        ['feedback/error', '--feedback-error', 'Message colour'],
      ],
      a11y: [
        'The label is a real label tied to the field with for and id. A unique id is made when you leave it out.',
        'The error message is linked to the field with aria-describedby, and the field is marked aria-invalid.',
        'Focus is a 2px ring set 4px from the field, from the Input component.',
        'A disabled field cannot be focused or edited. The field is about 59px high (18px padding, 20px line, 1.5px borders), above the 44px touch target.',
      ],
      open: [
        'Help text now shows only on error. The design review suggests an info icon for optional help. Not built yet.',
        'Disabled sets 40% opacity on the field and again on the whole component. Which is intended?',
      ],
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
