import { StatCard } from '../../src/components/StatCard.jsx';

export default {
  title: 'Components/Stat Card',
  component: StatCard,
  tags: ['autodocs'],
  args: { label: 'Active projects', value: '128' },
  decorators: [(Story) => <div style={{ width: 280 }}><Story /></div>],
  parameters: {
    docs: {
      description: {
        component:
          'One number and what it counts. The label is in sentence case and the number carries the emphasis: no accent strip, no icon, no capitals. **Use:** in a row of two to four with the same height. **Avoid:** values that need a sentence to explain; use a table or a paragraph. **Open questions for the owner:** none.',
      },
    },
  },
};

export const Default = {};
export const Percentage = { args: { label: 'Delivered on time', value: '92%' } };

export const InUse = {
  name: 'In use: a row of three on a dashboard',
  decorators: [],
  render: () => (
    <div className="sb-row" style={{ alignItems: 'stretch' }}>
      <div style={{ width: 240 }}><StatCard label="Active projects" value="128" /></div>
      <div style={{ width: 240 }}><StatCard label="Open risks" value="14" /></div>
      <div style={{ width: 240 }}><StatCard label="Delivered on time" value="92%" /></div>
    </div>
  ),
};
