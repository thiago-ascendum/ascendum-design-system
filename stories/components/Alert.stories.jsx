import { Alert } from '../../src/components/Alert.jsx';

export default {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  args: { tone: 'success', title: 'Project saved', text: 'Your changes were saved to the Harbourside migration project.' },
  decorators: [(Story) => <div style={{ width: 480 }}><Story /></div>],
  parameters: {
    ds: {
      lead: 'Tells the person something about the page or a form that they need to read before carrying on.',
      group: 'Molecules',
      figma: '80:126',
      code: 'src/components/Alert.jsx',
      when: [
        ['Neutral: a general note', 'Scheduled work, a change in how something behaves. Nothing has gone right or wrong.'],
        ['Success, warning, error: feedback', 'Done, needs attention, or failed. The colour and the border carry the meaning.'],
        ['Not for passing messages', 'For a message that disappears on its own, use Toast instead.'],
      ],
      use: ['Give the alert a short title that names what happened.', 'Say what to do next in one or two sentences.', 'Use the coloured tones for feedback only.'],
      avoid: ['Using an alert for a message that should disappear on its own.', 'Long text: two sentences at most.', 'Showing several alerts at once on one view.'],
      tokens: [
        ['component/alert/gap', '--alert-gap', 'Space between the icon and the text'],
        ['component/alert/padding-v', '--alert-padding-v', 'Top and bottom padding'],
        ['component/alert/padding-h', '--alert-padding-h', 'Left and right padding'],
        ['component/alert/body-gap', '--alert-body-gap', 'Space between the title and the text'],
        ['surface-container', '--surface-container', 'Fill of the Neutral tone'],
        ['outline-variant', '--outline-variant', 'Border of the Neutral tone'],
        ['border-width/hairline', '--border-width-hairline', 'Border width'],
        ['radius/surface', '--radius-surface', 'Corners'],
        ['size/icon-md', '--size-icon-md', 'Icon size'],
        ['on-surface', '--on-surface', 'Icon colour of the Neutral tone'],
        ['font-size/h5', '--text-h5-size', 'Title size'],
        ['font-size/body-lg', '--text-body-lg-size', 'Text size'],
        ['on-surface', '--on-surface', 'Title colour'],
        ['on-surface-variant', '--on-surface-variant', 'Text colour'],
        ['info, info-container', '--on-surface-info, --info-container', 'Border and icon, and fill, of Info'],
        ['success, success-container', '--on-surface-success, --success-container', 'Border and icon, and fill, of Success'],
        ['warning, warning-container', '--on-surface-warning, --warning-container', 'Border and icon, and fill, of Warning'],
        ['error, error-container', '--on-surface-error, --error-container', 'Border and icon, and fill, of Error'],
      ],
      a11y: [
        'Error has role="alert", so a screen reader announces it as it appears. The other tones have role="status", which is announced politely.',
        'The icon is hidden from assistive technology. The title and the text carry the meaning, so the tone is never colour alone.',
        'The alert has no controls, so it takes no focus and has no touch target of its own.',
      ],
      open: [
        'Neutral and Info look alike. Keep both?',
        'Neutral and Info use the same icon, and Error uses the Warning icon. Should each tone have its own?',
      ],
    },
  },
};

export const Success = {};
export const Neutral = { args: { tone: 'neutral', title: 'Scheduled maintenance', text: 'The portal will be read-only on Saturday between 02:00 and 04:00.' } };
export const Info = { args: { tone: 'info', title: 'New reviewers added', text: 'Two colleagues from Finance can now comment on this report.' } };
export const Warning = { args: { tone: 'warning', title: 'Approval due on Friday', text: 'Submit the budget before 17:00 or the next cycle starts without it.' } };
export const Error = { args: { tone: 'error', title: 'Upload failed', text: 'The file is larger than 25 MB. Compress it and try again.' } };

export const InUse = {
  name: 'In use: a form with a failed submit',
  render: () => (
    <div className="sb-col" style={{ width: 480, maxWidth: 'none' }}>
      <Alert tone="error" title="We could not send your request" text="Check the two fields marked below, then submit the form again." />
      <div className="sb-card">
        <span className="sb-label">Project name</span>
        <span className="sb-help">Harbourside migration</span>
      </div>
    </div>
  ),
};
