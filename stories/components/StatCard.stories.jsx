import { StatCard } from '../../src/components/StatCard.jsx';

export default {
  title: 'Components/Stat Card',
  component: StatCard,
  tags: ['autodocs'],
  args: { label: 'Active projects', value: '128' },
  decorators: [(Story) => <div style={{ width: 280 }}><Story /></div>],
  parameters: {
    ds: {
      lead: 'One number and what it counts. The label sits above the value and the number is the emphasis.',
      group: 'Molecules',
      figma: '83:95',
      code: 'src/components/StatCard.jsx',
      when: [
        ['A single figure', 'Active projects, open risks, delivered on time. One number with a short label.'],
        ['In a row of two to four', 'Cards in a row keep the same height, so the figures line up.'],
        ['Not for explanations', 'A value that needs a sentence belongs in a table or a paragraph.'],
      ],
      use: ['Write the label in sentence case.', 'Keep the value to a number or a short value such as 92%.', 'Place two to four cards in a row, at the same height.'],
      avoid: ['Values that need a sentence to explain.', 'Accent strips, icons or capitals: the number is the emphasis.', 'More than four cards in one row.'],
      tokens: [
        ['component/stat-card/padding', '--stat-card-padding', 'Padding on all sides'],
        ['component/stat-card/gap', '--stat-card-gap', 'Space between the label and the value'],
        ['surface-container', '--surface-container', 'Fill'],
        ['outline-variant', '--outline-variant', 'Border'],
        ['border-width/hairline', '--border-width-hairline', 'Border width'],
        ['radius/card', '--radius-card', 'Corners'],
        ['font-size/body-sm', '--font-size-body-sm', 'Label size'],
        ['font-size/stat', '--text-stat-size', 'Value size: 44 desktop, 36 mobile'],
        ['on-surface', '--on-surface', 'Value colour'],
        ['on-surface-variant', '--on-surface-variant', 'Label colour'],
      ],
      a11y: [
        'The card is a group, named by its label, so a screen reader reads "Active projects, group" and then the value.',
        'The card has no controls, so it takes no focus and has no touch target of its own.',
        'The label is muted text on the card fill. Both pass contrast in light and dark.',
      ],
      changes: ['1.1.0: the Stat Card accent strip and its five department variants are removed. Those instances fall back to the plain card.'],
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
