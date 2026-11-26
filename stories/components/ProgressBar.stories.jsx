import { ProgressBar } from '../../src/components/ProgressBar.jsx';

export default {
  title: 'Components/Progress Bar',
  component: ProgressBar,
  tags: ['autodocs'],
  args: { value: 60, label: 'Upload progress', size: 'sm', tone: 'default' },
  argTypes: { value: { control: { type: 'range', min: 0, max: 100, step: 1 } } },
  decorators: [(Story) => <div style={{ width: 280 }}><Story /></div>],
  parameters: {
    docs: {
      description: {
        component:
          'Determinate progress for a task with a known length, such as an upload or a migration. The value runs from 0 to 100. **Use:** small inside cards and tables, large when the bar is the main thing on screen, always with a visible label and the percentage. **Avoid:** when the length is unknown. **Open questions for the owner:** Two sizes are left, Small and Large. Is one more cut possible? The fill is a fixed width inside the component. An instance sets the value by hand (in code the value is a prop).',
      },
    },
  },
};

export const Default = {};
export const Large = { args: { size: 'lg' } };
export const Success = { args: { tone: 'success', value: 100 } };
export const Warning = { args: { tone: 'warning', value: 35 } };
export const Error = { args: { tone: 'error', value: 20 } };
export const Empty = { args: { value: 0 } };

export const InUse = {
  name: 'In use: a migration with a label and percentage',
  decorators: [],
  render: () => (
    <div className="sb-col" style={{ width: 320 }}>
      <div className="sb-row" style={{ justifyContent: 'space-between' }}>
        <span className="sb-label">Migrating Harbourside data</span>
        <span className="sb-help">72%</span>
      </div>
      <ProgressBar value={72} label="Harbourside data migration" size="lg" />
      <span className="sb-help">About 6 minutes left. You can leave this page.</span>
    </div>
  ),
};
