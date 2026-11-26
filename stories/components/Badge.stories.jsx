import { Badge } from '../../src/components/Badge.jsx';

export default {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { label: 'On track', tone: 'success', dot: false },
  parameters: {
    ds: {
      lead: 'A small status pill that shows the state of an item in a table or list. Each tone has one meaning.',
      group: 'Atoms',
      figma: '39:40',
      code: 'src/components/Badge.jsx',
      when: [
        ['Neutral and success: calm states', 'Neutral is the default, with nothing to flag. Success means done or healthy.'],
        ['Info and warning: attention', 'Info means in progress or worth knowing, with no problem. Warning means it needs attention soon.'],
        ['Error: blocked', 'Error means the item is blocked or has failed.'],
      ],
      use: ['Pick the tone by its meaning, not by its colour.', 'Keep the label to one or two words, in sentence case: "In progress".', 'Turn the dot on where the colour should be repeated.'],
      avoid: ['Using a badge as a button or an action.', 'Using a badge as decoration.', 'Using a tone for something other than its meaning.'],
      tokens: [
        ['surface-container-low', '--surface-container-low', 'Fill of the neutral tone'],
        ['success-container, success', '--success-container, --on-surface-success', 'Success tone: tint and text'],
        ['info-container, info', '--info-container, --on-surface-info', 'Info tone: tint and text'],
        ['warning-container, warning', '--warning-container, --on-surface-warning', 'Warning tone: tint and text'],
        ['error-container, error', '--error-container, --on-surface-error', 'Error tone: tint and text'],
        ['component/badge/padding-h', '--badge-padding-h', 'Left and right padding: 14'],
        ['component/badge/padding-v', '--badge-padding-v', 'Top and bottom padding: 6'],
        ['component/badge/dot', '--badge-dot', 'Size of the optional dot: 6'],
        ['radius/pill', '--radius-pill', 'Fully rounded ends'],
      ],
      a11y: [
        'It is a plain span with no role. A screen reader reads the label as text, so the label has to carry the meaning.',
        'The dot is hidden from assistive technology. It uses the same colour as the text, so it adds no cue beyond colour.',
        'It is about 32px high (6 + 6 padding, 19.5 text). It is not interactive, so the 44px touch target does not apply.',
      ],
      open: [
        'Our reading: Info means in progress. Confirm what blue means, or remove it.',
        'Neutral is the only tone without a meaning. Is one enough?',
      ],
      changes: ['1.1.0: The tones Muted and Solid are gone. Instances that used them need a new tone.'],
    },
  },
};

export const Success = {};
export const Neutral = { args: { tone: 'neutral', label: 'Draft' } };
export const Info = { args: { tone: 'info', label: 'In progress' } };
export const Warning = { args: { tone: 'warning', label: 'Due soon' } };
export const Error = { args: { tone: 'error', label: 'Blocked' } };
export const WithDot = { args: { dot: true } };

export const Tones = {
  name: 'In use: every tone and what it means',
  render: () => (
    <div className="sb-row">
      <Badge tone="neutral" label="Draft" />
      <Badge tone="info" label="In progress" />
      <Badge tone="success" label="Approved" />
      <Badge tone="warning" label="Due soon" />
      <Badge tone="error" label="Blocked" />
    </div>
  ),
};
