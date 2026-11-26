import { useState } from 'react';
import { Combobox } from '../../src/components/Combobox.jsx';

export default {
  title: 'Components/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  args: { placeholder: 'Add reviewers...', value: ['Priya Nair', 'Tom Hendricks'] },
  decorators: [(Story) => <div style={{ width: 440 }}><Story /></div>],
  parameters: {
    ds: {
      lead: 'A type-to-filter field for picking several items from a long list. Picked items become tokens that can be removed with their close icon.',
      group: 'Molecules',
      figma: '84:122',
      code: 'src/components/Combobox.jsx',
      sample: { placeholder: 'Add reviewers...', value: ['Priya Nair', 'Tom Hendricks'] },
    },
  },
};

export const Empty = { args: { state: 'empty' } };
export const Filled = {};

export const InUse = {
  name: 'In use: choosing reviewers for a project',
  render: () => {
    const [picked, setPicked] = useState(['Priya Nair', 'Tom Hendricks']);
    return (
      <div className="sb-col">
        <label className="sb-label" htmlFor="reviewers">Reviewers</label>
        <Combobox id="reviewers" value={picked} placeholder="Add reviewers..." onChange={setPicked} />
      </div>
    );
  },
};
