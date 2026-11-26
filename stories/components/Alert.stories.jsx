import { Alert } from '../../src/components/Alert.jsx';

export default {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  args: { tone: 'success', title: 'Project saved', text: 'Your changes were saved to the Harbourside migration project.' },
  decorators: [(Story) => <div style={{ width: 480 }}><Story /></div>],
  parameters: {
    docs: {
      description: {
        component:
          'Inline message about the state of the page or a form. **Use:** when the person needs to read something before carrying on. Neutral is for general notes; the coloured tones are for feedback only. Success and error alerts are announced by screen readers as they appear. **Avoid:** messages that disappear on their own (use Toast), and long text: two sentences at most. **Open questions for the owner:** Neutral and Info look alike. Keep both?',
      },
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
