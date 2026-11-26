import { TableRow } from '../../src/components/TableRow.jsx';

export default {
  title: 'Components/Table Row',
  component: TableRow,
  tags: ['autodocs'],
  args: { state: 'default', children: ['Website redesign', 'Design', 'In review', '2 days ago'] },
  parameters: {
    ds: {
      lead: 'One table row, including the Header variant. Use it only inside Table.',
      group: 'Data display',
      figma: '97:166',
      code: 'src/components/TableRow.jsx',
      sample: { children: ['Project', 'Team', 'Status', 'Updated'] },
      use: ['Use it only inside Table.', 'Keep cell text to one line.'],
      avoid: ['Mixing Header rows into the body.', 'Highlighting more than one row.'],
      tokens: [
        ['surface-container', '--surface-container', 'Row fill'],
        ['surface-container-high', '--surface-container-high', 'Hover fill'],
        ['surface-container-low', '--surface-container-low', 'Selected and Header fill'],
        ['outline-variant', '--outline-variant', 'Bottom hairline'],
        ['component/table/cell-padding-h', '--table-cell-padding-h', 'Left, right and gap between cells'],
        ['component/table/cell-padding-v', '--table-cell-padding-v', 'Top and bottom padding'],
      ],
    },
  },
};

export const Default = {};
export const Selected = { args: { state: 'selected' } };
export const Header = { args: { state: 'header', children: ['Project', 'Team', 'Status', 'Updated'] } };

export const InUse = {
  name: 'In use: rows of one list',
  render: () => (
    <div role="table" style={{ maxWidth: 880 }}>
      <TableRow state="header">{['Project', 'Team', 'Status', 'Updated']}</TableRow>
      <TableRow>{['Website redesign', 'Design', 'In review', '2 days ago']}</TableRow>
      <TableRow state="selected">{['Mortgage portal', 'Engineering', 'In progress', 'Today']}</TableRow>
      <TableRow>{['Brand guide site', 'Design', 'Done', '12 Nov']}</TableRow>
    </div>
  ),
};
