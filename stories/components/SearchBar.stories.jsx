import { SearchBar } from '../../src/components/SearchBar.jsx';

export default {
  title: 'Components/Search Bar',
  component: SearchBar,
  tags: ['autodocs'],
  args: { value: 'Search projects', size: 'default', state: 'default' },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
  parameters: {
    ds: {
      lead: 'A single-line field for searching a list or a page. Use Default in page headers and Compact inside toolbars and tables.',
      group: 'Molecules',
      figma: '69:61',
      code: 'src/components/SearchBar.jsx',
      sample: {},
    },
  },
};

export const Default = {};
export const Compact = { args: { size: 'compact' } };
export const Muted = { args: { state: 'muted' } };
export const Error = { args: { state: 'error', defaultValue: 'status:' } };

export const InUse = {
  name: 'In use: above a project list',
  render: () => (
    <div className="sb-col">
      <label className="sb-label" htmlFor="q">Projects</label>
      <SearchBar id="q" value="Search projects" />
      <ul style={{ margin: 0, paddingLeft: 20 }}><li>Project Atlas</li><li>Project Borealis</li></ul>
    </div>
  ),
};

export const InToolbar = {
  name: 'In use: compact in a table toolbar',
  render: () => <SearchBar size="compact" value="Filter rows" aria-label="Filter rows" />,
};
