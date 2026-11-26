import { SectionQuote } from '../../src/components/SectionQuote.jsx';

export default {
  title: 'Components/Section · Quote',
  component: SectionQuote,
  tags: ['autodocs'],
  args: { quote: '“They didn\'t just build what we asked for.”', size: 'h1' },
  parameters: {
    ds: {
      lead: 'Pull quote with attribution. Use it once per page to give weight to a customer\'s or leader\'s words.',
      group: 'Organisms',
      figma: '90:64',
      code: 'src/components/SectionQuote.jsx',
      sample: { quote: '“They didn\'t just build what we asked for.”' },
    },
  },
};

export const H1 = {};
export const H2 = { args: { size: 'h2' } };

export const CustomerWords = {
  name: 'In use: a customer quote',
  render: () => (
    <SectionQuote size="h2" quote="“We shipped in six weeks and the team could run it alone.”">
      <span className="ds-section-quote__author">Jon Okafor</span>
      <span className="ds-section-quote__role">CTO, Fabrikam</span>
    </SectionQuote>
  ),
};

export const OnDark = {
  name: 'Inverted, on a dark surface',
  render: () => <div data-context="inverted"><SectionQuote /></div>,
};
