import { TeamCard } from '../../src/components/TeamCard.jsx';

const people = [
  ['Daniel Okoye', 'Product Development Manager, Meridian', 'blue'],
  ['Priya Nair', 'Product Manager, Ascendum', 'purple'],
  ['Tom Hendricks', 'Head of Design, Ascendum', 'red'],
  ['Sofia Marin', 'Product Designer, Ascendum', 'stone'],
  ['Liam Walsh', 'UX Designer, Ascendum', 'blue'],
];
const content = [
  <TeamCard.Title key="t">Product &amp; Strategy</TeamCard.Title>,
  <TeamCard.List key="l">
    {people.map(([name, role, tone]) => <TeamCard.Member key={name} name={name} role={role} tone={tone} />)}
  </TeamCard.List>,
];

export default {
  title: 'Components/Team Card',
  component: TeamCard,
  tags: ['autodocs'],
  args: { inverted: false, children: content },
  decorators: [(Story) => <div style={{ width: 416 }}><Story /></div>],
  parameters: {
    ds: {
      lead: 'A titled list of the people on one discipline of a project. Each row has an Avatar, a name and a role with the company.',
      group: 'Molecules',
      figma: '208:1420',
      code: 'src/components/TeamCard.jsx',
      sample: { children: content },
      when: [
        ['One discipline', 'One card per group, six people or fewer.'],
        ['Not for organisations', 'Clients and partners belong in Key Stakeholders Card.'],
      ],
      use: ['Group people by discipline, one card per group.', 'Use the Avatar component for every person.'],
      avoid: ['Listing more than six people in one card.', 'Adding contact details here.'],
      tokens: [
        ['component/group-card/gap', '--group-card-gap', 'Space between the title and the rows'],
        ['component/group-card/padding-h', '--group-card-padding-h', 'Left and right padding'],
        ['component/group-card/padding-v', '--group-card-padding-v', 'Top and bottom padding'],
        ['surface', '--ctx-surface', 'Fill, follows the Context mode'],
        ['outline-variant', '--ctx-outline-variant', 'Border, follows the Context mode'],
        ['radius/container', '--container-radius', 'Corners'],
        ['on-surface', '--ctx-on-surface', 'Title and name'],
        ['on-surface-variant', '--ctx-on-surface-variant', 'Role'],
        ['accent-*-container', '--accent-blue-container', 'Avatar tints'],
      ],
      a11y: [
        'The people are a list under a heading, so a screen reader announces the number of people.',
        'Each Avatar carries the full name as its accessible name.',
        'Text passes AA contrast on the card in both Context modes.',
      ],
      open: ['Part of the project overview, not product UI. Keep it in the library?'],
    },
  },
};

export const Default = {};
export const InvertedSurface = { args: { inverted: true } };

export const InUse = {
  name: 'In use: two disciplines side by side',
  decorators: [],
  render: () => (
    <div className="sb-row" style={{ alignItems: 'flex-start' }}>
      <div style={{ width: 416 }}><TeamCard>{content}</TeamCard></div>
      <div style={{ width: 416 }}>
        <TeamCard>
          <TeamCard.Title>Development</TeamCard.Title>
          <TeamCard.List>
            <TeamCard.Member name="Daniel Okoye" role="Engineering Manager, Ascendum" />
            <TeamCard.Member name="Priya Nair" role="Software Architect, Ascendum" tone="purple" />
          </TeamCard.List>
        </TeamCard>
      </div>
    </div>
  ),
};
