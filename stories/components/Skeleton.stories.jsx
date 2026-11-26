import { Skeleton } from '../../src/components/Skeleton.jsx';

export default {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  args: { shape: 'line' },
  argTypes: { shape: { control: 'inline-radio' } },
  decorators: [(Story) => <div style={{ width: 240 }}><Story /></div>],
  parameters: {
    ds: {
      lead: 'A grey placeholder that holds the shape of content while it loads. In code it pulses gently; Figma cannot animate, so it shows the still state.',
      group: 'Atoms',
      figma: '45:22',
      code: 'src/components/Skeleton.jsx',
      when: [
        ['Circle: an avatar', 'Stands in for a round image. It is a fixed size.'],
        ['Line and line large: text and headings', 'Line for a row of text, line large for a heading. Both fill the width of their container.'],
        ['Block: an image', 'Stands in for a picture or a media area. It fills the width of its container.'],
      ],
      use: ['Copy the layout of the content that will replace it.', 'Use it for lists and cards that take more than a moment to appear.', 'Remove it as soon as the content arrives.'],
      avoid: ['Using it for missing content or an empty list: use an empty state.', 'Using it for actions.', 'Mixing skeletons with real content in one card.'],
      tokens: [
        ['surface-container-highest', '--surface-container-highest', 'Fill of every shape'],
        ['component/skeleton/line', '--skeleton-line', 'Height of a line: 14'],
        ['component/skeleton/line-lg', '--skeleton-line-lg', 'Height of a large line: 18'],
        ['component/skeleton/block', '--skeleton-block', 'Height of a block: 80'],
        ['component/skeleton/circle', '--skeleton-circle', 'Width and height of the circle: 40'],
        ['radius/field', '--field-radius', 'Corners of lines and blocks: 4'],
        ['radius/pill', '--radius-pill', 'Makes the circle round'],
      ],
      a11y: [
        'It is hidden from screen readers. Announce the loading on the container, for example with role status and a label, as the "In use" story does.',
        'The pulse fades the shape between full and half opacity over 1.5 seconds. It stops when the person prefers reduced motion.',
        'It is not interactive, so it takes no focus and the 44px touch target does not apply.',
      ],
      open: ['Three shapes: line, block and circle. Enough for the loading states the tools have?'],
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
