import { Input } from '../../src/components/Input.jsx';

export default {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: { placeholder: 'Jane Smith', multiline: false, invalid: false, disabled: false },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
  parameters: {
    ds: {
      lead: 'A text field for short answers, and a textarea for longer ones. It always has a visible label above it: the placeholder is an example, not a label.',
      group: 'Atoms',
      figma: '30:27',
      code: 'src/components/Input.jsx',
      when: [
        ['Single line: short answers', 'A name, an email address or a reference number. Anything the person has to type.'],
        ['Textarea: longer answers', 'A message or a note. The person can drag the corner to make it taller.'],
        ['Error: something to fix', 'The border takes the error colour, and a short message under the field says how to fix it.'],
      ],
      use: ['Put a visible label above the field.', 'Use the placeholder for an example of a valid answer: "Jane Smith".', 'Write the error message so it says how to fix the problem.'],
      avoid: ['Using the placeholder as the label.', 'Using Input when the answers come from a list: use Select or Combobox.', 'Showing an error with the border alone, without a message.'],
      tokens: [
        ['outline', '--outline', 'Border of the field'],
        ['border-width/field', '--border-width-field', 'Border weight: 1.5'],
        ['radius/field', '--field-radius', 'Corners: 4, between the sharp button and the round card'],
        ['component/input/padding-v', '--input-padding-v', 'Top and bottom padding: 18'],
        ['component/input/padding-h', '--input-padding-h', 'Left and right padding: 16'],
        ['component/input/textarea-min', '--input-textarea-min', 'Minimum height of the textarea: 80'],
        ['on-surface-placeholder', '--on-surface-placeholder', 'Placeholder text'],
        ['error', '--on-surface-error', 'Border in the error state'],
        ['focus', '--focus', 'Focus ring, 2px, set 4px off the edge'],
      ],
      a11y: [
        'It is a native input, or a textarea when multiline. It has no label of its own, so pair it with a label element.',
        'The error state sets aria-invalid. Link the message with aria-describedby, as the "In use" story does.',
        'Focus is a 2px ring set 4px away from the field.',
        'A single line is 59px high on desktop and mobile (18 + 18 padding, 20 text, 3 border), above the 44px touch target. Disabled is 40% opacity and the browser blocks focus.',
      ],
      open: [
        'Filled is kept as a state because Form Field uses it. Is it a state, or just a Default input with a value?',
        'Vertical padding went from 8 to 18 so a typed value is not cramped. Confirm the height.',
      ],
      changes: ['1.1.0: Vertical padding went from 8 to 18. Focus is a visible ring.'],
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
