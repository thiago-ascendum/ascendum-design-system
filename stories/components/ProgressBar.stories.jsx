import { ProgressBar } from '../../src/components/ProgressBar.jsx';

export default {
  title: 'Components/Progress Bar',
  component: ProgressBar,
  tags: ['autodocs'],
  args: { value: 60, label: 'Upload progress', size: 'sm', tone: 'default' },
  argTypes: { value: { control: { type: 'range', min: 0, max: 100, step: 1 } } },
  decorators: [(Story) => <div style={{ width: 280 }}><Story /></div>],
  parameters: {
    ds: {
      lead: 'Shows how far a task with a known length has got, such as an upload or a migration.',
      group: 'Molecules',
      figma: '83:157',
      code: 'src/components/ProgressBar.jsx',
      when: [
        ['Small: inside cards and tables', 'The bar supports a row or a card and is not the main thing on screen.'],
        ['Large: the main thing on screen', 'A migration or an upload the person is waiting for.'],
        ['Tones for the state', 'Default while it runs, Success when finished, Warning when slow or at risk, Error when it failed.'],
      ],
      use: ['Pair the bar with a visible label and the percentage.', 'Give the bar a name for screen readers, such as "Upload progress".', 'Use Success only when the task is finished.'],
      avoid: ['Using it when the length is unknown.', 'Showing the percentage only inside the bar.', 'Colour as the only sign of a failed task: say it in text too.'],
      tokens: [
        ['component/progress/height-sm', '--progress-height-sm', 'Height of the Small bar: 8'],
        ['component/progress/height-lg', '--progress-height-lg', 'Height of the Large bar: 16'],
        ['radius/pill', '--radius-pill', 'Corners of the track and the fill'],
        ['outline-variant', '--outline-variant', 'Track'],
        ['outline', '--outline', 'Fill of the Default tone'],
        ['success', '--on-surface-success', 'Fill of Success'],
        ['warning', '--on-surface-warning', 'Fill of Warning'],
        ['error', '--on-surface-error', 'Fill of Error'],
      ],
      a11y: [
        'The bar has role="progressbar" with aria-valuenow, aria-valuemin 0 and aria-valuemax 100. The value is kept between 0 and 100.',
        'The label prop becomes the accessible name. Without a visible label and percentage next to it, sighted people lose the number.',
        'The bar has no controls, so it takes no focus and has no touch target of its own.',
      ],
      open: [
        'Two sizes are left, Small and Large. Is one more cut possible?',
        'The fill is a fixed width inside the component. An instance sets the value by hand (in code the value is a prop).',
        'The Figma component always draws 60%. Should it show a real value?',
      ],
      changes: ['1.1.0: two Progress Bar sizes are removed. Small and Large are left.'],
    },
  },
};

export const Default = {};
export const Large = { args: { size: 'lg' } };
export const Success = { args: { tone: 'success', value: 100 } };
export const Warning = { args: { tone: 'warning', value: 35 } };
export const Error = { args: { tone: 'error', value: 20 } };
export const Empty = { args: { value: 0 } };

export const InUse = {
  name: 'In use: a migration with a label and percentage',
  decorators: [],
  render: () => (
    <div className="sb-col" style={{ width: 320 }}>
      <div className="sb-row" style={{ justifyContent: 'space-between' }}>
        <span className="sb-label">Migrating Harbourside data</span>
        <span className="sb-help">72%</span>
      </div>
      <ProgressBar value={72} label="Harbourside data migration" size="lg" />
      <span className="sb-help">About 6 minutes left. You can leave this page.</span>
    </div>
  ),
};
