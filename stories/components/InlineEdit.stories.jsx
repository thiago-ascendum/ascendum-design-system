import { InlineEdit } from '../../src/components/InlineEdit.jsx';

export default {
  title: 'Components/Inline Edit',
  component: InlineEdit,
  tags: ['autodocs'],
  args: { value: 'Project Atlas', state: 'read' },
  parameters: {
    ds: {
      lead: 'Text that turns into a field when clicked. At rest it looks like plain text, on hover it shows it can be edited, and while editing it matches a real input.',
      group: 'Molecules',
      figma: '85:125',
      code: 'src/components/InlineEdit.jsx',
      sample: {},
    },
  },
};

export const Read = {};
export const Editing = { args: { state: 'editing' } };

export const InUse = {
  name: 'In use: a project title',
  render: () => (
    <div className="sb-col">
      <span className="sb-label">Click the name to rename it</span>
      <InlineEdit value="Project Atlas" aria-label="Project name" />
    </div>
  ),
};
