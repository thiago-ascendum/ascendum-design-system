import { JiraAnnotation } from '../../src/components/JiraAnnotation.jsx';

export default {
  title: 'Components/Jira Annotation',
  component: JiraAnnotation,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 480 }}><Story /></div>],
  parameters: {
    ds: {
      lead: 'Jira-powered annotation panel for design review. Brings Jira context directly into Figma while preserving Ascendum Design System styling and structure.',
      group: 'Organisms',
      figma: '244:600',
      code: 'src/components/JiraAnnotation.jsx',
      sample: {},
      when: [
        ['Next to a frame under review', 'One annotation per ticket, filled from the ticket.'],
        ['Not in a product screen', 'It is a review aid.'],
      ],
      use: ['Fill it from the ticket, never by hand.', 'Keep one annotation per ticket.'],
      avoid: ['Editing the requirement text in Figma, Jira is the source.', 'Leaving an example key such as PROJ-1234 in a real file.'],
      tokens: [
        ['surface-container-low', '--surface-container-low', 'Fill'],
        ['outline-variant', '--outline-variant', 'Border and dividers'],
        ['radius/card', '--radius-card', 'Corners'],
        ['component/modal/max-width', '--modal-max-width', 'Width'],
        ['component/annotation/padding-h', '--annotation-padding-h', 'Left and right padding'],
        ['info-container', '--info-container', 'Status badge and Review Focus fill'],
        ['info', '--on-surface-info', 'Status text and chevrons'],
        ['success', '--on-surface-success', 'Check marks'],
        ['on-surface', '--on-surface', 'Text'],
        ['on-surface-variant', '--on-surface-variant', 'Key and numbers'],
        ['outline-medium', '--outline-medium', 'Line under the header'],
      ],
      a11y: [
        'Requirements are an ordered list and criteria a list, so a screen reader announces the counts.',
        'The check and chevron icons are hidden from assistive technology.',
        'The Open button is a real button with a visible focus ring.',
      ],
      open: ['Same question as Overview Card: library, or a separate documentation kit?'],
    },
  },
};

export const Default = {};

export const InUse = {
  name: 'In use: next to a frame under review',
  decorators: [],
  render: () => (
    <div className="sb-row" style={{ alignItems: 'flex-start' }}>
      <div className="sb-card" style={{ width: 360, minHeight: 320 }}><span className="sb-label">Frame under review</span></div>
      <div style={{ width: 480 }}><JiraAnnotation /></div>
    </div>
  ),
};
