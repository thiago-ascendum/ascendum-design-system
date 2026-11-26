import { Checkbox } from '../../src/components/Checkbox.jsx';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: { label: 'Email me a weekly summary', indeterminate: false, disabled: false },
  parameters: {
    docs: {
      description: {
        component:
          'Choose any number of options from a list. **Use:** for settings and filters where each option stands alone, with a short label in sentence case. Checked and indeterminate fill the box, so the state reads without colour. **Avoid:** using it when only one answer is allowed (use Radio), when the change applies straight away (use Toggle), or leaving a disabled option without saying why. Use indeterminate only for a select-all parent. **Open questions for the owner:** Disabled is kept. Is a disabled option the right experience, or should the option be hidden with a reason?',
      },
    },
  },
};

export const Unchecked = {};
export const Checked = { args: { defaultChecked: true } };
export const Indeterminate = { args: { indeterminate: true, label: 'Select all projects' } };
export const Disabled = { args: { disabled: true, label: 'Share with the client' } };
export const DisabledChecked = { args: { disabled: true, defaultChecked: true, label: 'Share with the client' } };

export const InUse = {
  name: 'In use: filters with a select-all parent',
  render: () => (
    <fieldset className="sb-card" style={{ border: 0, margin: 0 }}>
      <legend className="sb-label">Show projects from</legend>
      <Checkbox label="All regions" indeterminate />
      <div className="sb-col" style={{ paddingLeft: 'var(--space-xs)' }}>
        <Checkbox label="Lisbon" defaultChecked />
        <Checkbox label="Porto" defaultChecked />
        <Checkbox label="Madrid" />
      </div>
      <span className="sb-help">Madrid is hidden until you select it.</span>
    </fieldset>
  ),
};
