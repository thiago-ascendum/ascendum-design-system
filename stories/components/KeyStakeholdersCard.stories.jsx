import { KeyStakeholdersCard } from '../../src/components/KeyStakeholdersCard.jsx';
import { TeamCard } from '../../src/components/TeamCard.jsx';

const rows = [
  <KeyStakeholdersCard.Row key="m" name="Meridian Bank" relationship="Client" />,
  <KeyStakeholdersCard.Row key="a" name="Ascendum Solutions, Inc" relationship="Implementation partner" logo />,
];

export default {
  title: 'Components/Key Stakeholders Card',
  component: KeyStakeholdersCard,
  tags: ['autodocs'],
  args: { boolean: false, inverted: false, children: rows },
  decorators: [(Story) => <div style={{ width: 416 }}><Story /></div>],
  parameters: {
    ds: {
      lead: 'A titled list of the client and delivery partners on a project. Use it in a project overview.',
      group: 'Molecules',
      figma: '207:1114',
      code: 'src/components/KeyStakeholdersCard.jsx',
      sample: { children: rows },
      when: [
        ['Organisations on a project', 'The client and the delivery partners, one row each, four at most.'],
        ['Not for people', 'Individuals belong in Team Card.'],
      ],
      use: ['List organisations, never individuals.', 'Keep each row to a name and a relationship.'],
      avoid: ['Mixing people into this card, use Team Card.', 'Drawing a logo by hand: place the logo or an Avatar.'],
      tokens: [
        ['component/group-card/gap', '--group-card-gap', 'Space between the title and the rows'],
        ['component/group-card/padding-h', '--group-card-padding-h', 'Left and right padding'],
        ['component/group-card/padding-v', '--group-card-padding-v', 'Top and bottom padding'],
        ['surface', '--ctx-surface', 'Fill, follows the Context mode'],
        ['outline-variant', '--ctx-outline-variant', 'Border, follows the Context mode'],
        ['radius/container', '--container-radius', 'Corners'],
        ['on-surface', '--ctx-on-surface', 'Title and name'],
        ['on-surface-variant', '--ctx-on-surface-variant', 'Relationship'],
        ['font-size/h6', '--text-h6-size', 'Title size'],
      ],
      a11y: [
        'The rows are a list under a heading, so a screen reader announces the number of organisations.',
        'The Avatar carries the name as its accessible name.',
        'Text passes AA contrast on the card in both Context modes.',
      ],
      open: ['Part of the project overview, not product UI. Keep it in the library?'],
    },
  },
};

export const Default = {};
export const InvertedSurface = { args: { inverted: true } };

export const InUse = {
  name: 'In use: the side column of a project overview',
  decorators: [],
  render: () => (
    <div className="sb-row" style={{ alignItems: 'flex-start' }}>
      <div style={{ width: 416 }}><KeyStakeholdersCard>{rows}</KeyStakeholdersCard></div>
      <div style={{ width: 416 }}>
        <TeamCard>
          <TeamCard.Title>Product &amp; Strategy</TeamCard.Title>
          <TeamCard.List>
            <TeamCard.Member name="Daniel Okoye" role="Product Development Manager, Meridian" />
            <TeamCard.Member name="Priya Nair" role="Product Manager, Ascendum" tone="purple" />
          </TeamCard.List>
        </TeamCard>
      </div>
    </div>
  ),
};
