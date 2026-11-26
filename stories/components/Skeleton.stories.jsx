import { Skeleton } from '../../src/components/Skeleton.jsx';

export default {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  args: { shape: 'line' },
  argTypes: { shape: { control: 'inline-radio' } },
  decorators: [(Story) => <div style={{ width: 240 }}><Story /></div>],
  parameters: {
    docs: {
      description: {
        component:
          'A grey placeholder that holds the shape of content while it loads. In code it pulses gently, and the pulse stops for people who prefer reduced motion. **Use:** for lists and cards that take more than a moment to appear; copy the layout of the content that will replace it, and remove it as soon as the content arrives. **Avoid:** using it for missing content or an empty list (use an empty state), and mixing skeletons with real content in one card. **Open questions for the owner:** Three shapes: line, block and circle. Enough for the loading states the tools have?',
      },
    },
  },
};

export const Line = {};
export const LineLarge = { args: { shape: 'line-large' } };
export const Block = { args: { shape: 'block' } };
export const Circle = { args: { shape: 'circle' } };

export const InUse = {
  name: 'In use: a project card while it loads',
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
  render: () => (
    <div className="sb-card" role="status" aria-label="Loading project">
      <div className="sb-row" style={{ flexWrap: 'nowrap' }}>
        <Skeleton shape="circle" />
        <div className="sb-col" style={{ flex: 1 }}>
          <Skeleton shape="line-large" />
          <Skeleton />
        </div>
      </div>
      <Skeleton shape="block" />
      <Skeleton />
      <Skeleton />
    </div>
  ),
};
