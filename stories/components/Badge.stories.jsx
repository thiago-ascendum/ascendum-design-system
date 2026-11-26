import { Badge } from '../../src/components/Badge.jsx';

export default {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { label: 'On track', tone: 'success', dot: false },
  parameters: {
    docs: {
      description: {
        component:
          'Small status pill. **Each tone has one meaning.** Neutral: nothing to flag. Success: done or healthy. Info: in progress or worth knowing. Warning: needs attention soon. Error: blocked or failed. **Avoid:** using it as a button or as decoration. **Open questions for the owner:** our reading is that Info means in progress: confirm what blue means, or remove it. Neutral is the only tone without a meaning: is one enough?',
      },
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
