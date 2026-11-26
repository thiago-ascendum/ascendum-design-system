import { Table, TableToolbar } from '../../src/components/Table.jsx';
import { TableRow } from '../../src/components/TableRow.jsx';

export default {
  title: 'Components/Table',
  component: Table,
  decorators: [(Story) => <div style={{ width: 880, maxWidth: '100%' }}><Story /></div>],
  tags: ['autodocs'],
  parameters: {
    ds: {
      lead: 'Records in rows, compared across the same fields. Rows are Table Row instances.',
      group: 'Data display',
      figma: '97:167',
      code: 'src/components/Table.jsx',
      sample: {},
      use: ['Keep columns to what people compare.', 'Keep one selected row at a time.'],
      avoid: ['Putting paragraphs in a cell.', 'Using it for fewer than three records.'],
      tokens: [
        ['surface-container', '--surface-container', 'Table fill'],
        ['outline-variant', '--outline-variant', 'Border and row strokes'],
        ['radius/card', '--radius-card', 'Corner radius that clips the rows'],
        ['border-width/hairline', '--border-width-hairline', 'Border width'],
        ['component/table/toolbar-padding-h', '--table-toolbar-padding-h', 'Toolbar padding'],
        ['on-surface-variant', '--on-surface-variant', 'Item count'],
      ],
      open: ['Status is plain text. Should it use Badge?'],
    },
  },
};

export const Default = {};

export const InUse = {
  name: 'In use: a project list',
  render: () => (
    <Table aria-label="Projects">
      <TableToolbar title="Projects" count="3 items" />
      <TableRow state="header">{['Project', 'Team', 'Status', 'Updated']}</TableRow>
      <TableRow>{['Website redesign', 'Design', 'In review', '2 days ago']}</TableRow>
      <TableRow state="selected">{['Mortgage portal', 'Engineering', 'In progress', 'Today']}</TableRow>
      <TableRow>{['Brand guide site', 'Design', 'Done', '12 Nov']}</TableRow>
    </Table>
  ),
};
