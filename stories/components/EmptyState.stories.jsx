import { EmptyState, EmptyStateTitle, EmptyStateText, EmptyStateActions } from '../../src/components/EmptyState.jsx';
import { Button } from '../../src/components/Button.jsx';

const content = (
  <>
    <EmptyStateTitle>No results found</EmptyStateTitle>
    <EmptyStateText>Try a different search term, or clear your filters to see everything.</EmptyStateText>
    <EmptyStateActions>
      <Button label="Clear filters" style="solid" />
      <Button label="Go back" style="ghost" />
    </EmptyStateActions>
  </>
);

export default {
  title: 'Components/Empty State',
  component: EmptyState,
  tags: ['autodocs'],
  args: { children: content },
  parameters: {
    ds: {
      lead: 'What to show when a list or search has nothing in it yet, and the one thing to do next.',
      group: 'Organisms',
      figma: '87:11',
      code: 'src/components/EmptyState.jsx',
      sample: { children: content },
      use: ['Say why it is empty in the title.', 'Offer one clear next step.'],
      avoid: ['Using it for errors or loading.', 'Adding an illustration.'],
      tokens: [
        ['surface-container', '--surface-container', 'Fill'],
        ['outline-medium', '--outline-medium', 'Dashed icon ring'],
        ['on-surface', '--on-surface', 'Title and icon'],
        ['on-surface-variant', '--on-surface-variant', 'Text'],
        ['component/empty/padding-h', '--empty-padding-h', 'Left and right padding'],
        ['component/empty/padding-v', '--empty-padding-v', 'Top and bottom padding'],
        ['component/empty/icon', '--empty-icon', 'Icon ring size'],
        ['component/empty/max-width', '--empty-max-width', 'Text width cap'],
        ['radius/card', '--radius-card', 'Corners'],
      ],
      a11y: ['The icon ring is hidden from assistive technology; the title and text carry the meaning.', 'Text 16.1:1 on its background in light mode.'],
      open: ['None open.'],
    },
  },
};

export const Default = {};

export const InUse = {
  name: 'In use: a search with no results',
  render: () => (
    <div className="sb-card" style={{ maxWidth: 600 }}>
      <span className="sb-help">Search: "harbourside"</span>
      <EmptyState>{content}</EmptyState>
    </div>
  ),
};
