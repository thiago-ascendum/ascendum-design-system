import { Toast } from '../../src/components/Toast.jsx';
import { Button } from '../../src/components/Button.jsx';

export default {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  args: { tone: 'neutral', title: 'Link copied', meta: 'Just now' },
  decorators: [(Story) => <div style={{ width: 440 }}><Story /></div>],
  parameters: {
    ds: {
      lead: 'A brief confirmation that floats over the page. It stays on the inverted surface in every mode, and only the icon changes with the tone.',
      group: 'Molecules',
      figma: '81:106',
      code: 'src/components/Toast.jsx',
      sample: {},
      when: [
        ['Confirming an action', 'Something already happened: saved, copied, sent.'],
        ['Anything that needs a decision', 'Use Alert instead. A toast goes away on its own.'],
      ],
      use: ['Confirm one action in a few words.', 'Keep it on screen for about five seconds.'],
      avoid: ['Using it for a message the person must act on.', 'Showing more than one at a time.'],
      tokens: [
        ['inverse-surface', '--inverse-surface', 'Fill'],
        ['inverse-on-surface', '--inverse-on-surface', 'Title and icon'],
        ['inverse-on-surface-variant', '--inverse-on-surface-variant', 'Meta'],
        ['component/toast/gap', '--toast-gap', 'Space between icon and body'],
        ['component/toast/padding-h', '--toast-padding-h', 'Left and right padding'],
        ['component/toast/padding-v', '--toast-padding-v', 'Top and bottom padding'],
        ['component/toast/max-width', '--toast-max-width', 'Maximum width'],
        ['component/toast/body-gap', '--toast-body-gap', 'Space between title and meta'],
        ['radius/surface', '--radius-surface', 'Corners'],
      ],
      a11y: [
        'Error has role="alert"; the other tones have role="status", announced politely.',
        'The icon is hidden from assistive technology: the title carries the meaning.',
        'Text 14.8:1 on its background in light mode. Passes AA.',
      ],
      open: [],
    },
  },
};

export const Neutral = {};
export const Success = { args: { tone: 'success', title: 'Project saved' } };
export const Error = { args: { tone: 'error', title: 'Upload failed' } };

export const InUse = {
  name: 'In use: after saving a project',
  render: () => (
    <div className="sb-card" style={{ width: 480 }}>
      <span className="sb-label">Atlas migration</span>
      <span className="sb-help">Twelve tasks are open across three teams.</span>
      <div><Button label="Save changes" /></div>
      <Toast tone="success" title="Project saved" meta="Just now" />
    </div>
  ),
};
