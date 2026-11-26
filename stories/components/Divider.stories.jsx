import { Divider } from '../../src/components/Divider.jsx';

export default {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  args: { orientation: 'horizontal' },
  argTypes: { orientation: { control: 'inline-radio' } },
  decorators: [(Story) => <div style={{ width: 280, height: 48, display: 'flex', alignItems: 'center' }}><Story /></div>],
  parameters: {
    docs: {
      description: {
        component:
          'A hairline in the default border colour that separates two groups of content. **Use:** only where spacing alone is not enough, and let it run the full width or height of its group. **Avoid:** changing its weight or colour, and adding it next to a card edge or table border that already separates the content. **Open questions for the owner:** none.',
      },
    },
  },
};

export const Horizontal = {};
export const Vertical = { args: { orientation: 'vertical' } };

export const InUse = {
  name: 'In use: a settings list and a toolbar',
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
  render: () => (
    <div className="sb-card">
      <div className="sb-col" style={{ maxWidth: 'none' }}>
        <span className="sb-label">Profile</span>
        <span className="sb-help">Name, photo and job title.</span>
        <Divider />
        <span className="sb-label">Notifications</span>
        <span className="sb-help">Choose what we email you about.</span>
      </div>
      <div className="sb-row" style={{ gap: 'var(--space-2xs)' }}>
        <span className="sb-label">Archive</span>
        <Divider orientation="vertical" />
        <span className="sb-label">Edit</span>
      </div>
    </div>
  ),
};
