import { AccordionItem } from '../../src/components/AccordionItem.jsx';

const ANSWER = 'Most projects take between six and ten weeks, depending on scope. We confirm the plan in the first week.';

export default {
  title: 'Components/Accordion Item',
  component: AccordionItem,
  tags: ['autodocs'],
  args: { title: 'How long does a project take?', state: 'collapsed', children: ANSWER },
  decorators: [(Story) => <div style={{ width: 640, maxWidth: '100%' }}><Story /></div>],
  parameters: {
    ds: {
      lead: 'One question or topic that opens to show its answer. Stack several to build an accordion.',
      group: 'Organisms',
      figma: '87:46',
      code: 'src/components/AccordionItem.jsx',
      sample: { children: ANSWER },
      use: ['Write the header as the question people ask.', 'Keep the answer to a few lines.'],
      avoid: ['Hiding content people need to compare.', 'Nesting one accordion inside another.'],
      tokens: [
        ['surface-container', '--surface-container', 'Fill of the row'],
        ['outline-variant', '--outline-variant', 'Bottom stroke'],
        ['border-width/hairline', '--border-width-hairline', 'Stroke width'],
        ['on-surface', '--on-surface', 'Title and chevron'],
        ['component/accordion/gap', '--accordion-gap', 'Space between title and chevron'],
        ['component/accordion/padding-h', '--accordion-padding-h', 'Left and right padding'],
        ['component/accordion/padding-v', '--accordion-padding-v', 'Top and bottom padding'],
      ],
      a11y: ['The header is a button inside a heading, with aria-expanded and aria-controls; the answer is a labelled region.', 'The row is 65px high, which meets the 44px touch target.'],
      open: ['None open.'],
    },
  },
};

export const Collapsed = {};
export const Expanded = { args: { state: 'expanded' } };

export const InUse = {
  name: 'In use: a list of questions',
  decorators: [],
  render: () => (
    <div style={{ width: 640, maxWidth: '100%' }}>
      <AccordionItem title="How long does a project take?" defaultState="expanded">{ANSWER}</AccordionItem>
      <AccordionItem title="Who will we work with?">A named lead and a small team, from the first call to the handover.</AccordionItem>
      <AccordionItem title="Can we change the scope later?">Yes. Changes are agreed in writing before the work starts.</AccordionItem>
    </div>
  ),
};
