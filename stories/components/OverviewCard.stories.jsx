import { OverviewCard } from '../../src/components/OverviewCard.jsx';
import { KeyStakeholdersCard } from '../../src/components/KeyStakeholdersCard.jsx';
import { TeamCard } from '../../src/components/TeamCard.jsx';
import { Button } from '../../src/components/Button.jsx';

const group = (title, rows) => (
  <TeamCard key={title}>
    <TeamCard.Title>{title}</TeamCard.Title>
    <TeamCard.List>
      {rows.map(([name, role, tone]) => <TeamCard.Member key={name} name={name} role={role} tone={tone} />)}
    </TeamCard.List>
  </TeamCard>
);

const content = [
  <OverviewCard.Header key="h" title="Project Overview">
    <p>The platform is evolving into a modern, scalable enterprise solution designed to simplify complex workflows and provide a more cohesive user experience.</p>
    <p>The project focuses on improving usability, streamlining key processes, and establishing a reusable design foundation that supports future growth and fits into the existing development workflow.</p>
  </OverviewCard.Header>,
  <OverviewCard.Team key="t" title="Team members">
    <KeyStakeholdersCard>
      <KeyStakeholdersCard.Row name="Meridian Bank" relationship="Client" />
      <KeyStakeholdersCard.Row name="Ascendum Solutions, Inc" relationship="Implementation partner" logo />
    </KeyStakeholdersCard>
    {group('Product & Strategy', [
      ['Daniel Okoye', 'Product Development Manager, Meridian', 'blue'],
      ['Priya Nair', 'Product Manager, Ascendum', 'purple'],
      ['Tom Hendricks', 'Head of Design, Ascendum', 'red'],
      ['Sofia Marin', 'Product Designer, Ascendum', 'stone'],
      ['Liam Walsh', 'UX Designer, Ascendum', 'blue'],
    ])}
    {group('Development', [
      ['Daniel Okoye', 'Engineering Manager', 'blue'],
      ['Priya Nair', 'Software Architect', 'purple'],
      ['Tom Hendricks', 'Full-Stack Developer', 'red'],
      ['Sofia Marin', 'Cloud & Data Engineer', 'stone'],
      ['Liam Walsh', 'Machine Learning Engineer', 'blue'],
    ])}
  </OverviewCard.Team>,
  <OverviewCard.Footer key="f" caption="Design by Ascendum Solutions © 2026 All Rights Reserved">
    <Button label="Visit Website" />
  </OverviewCard.Footer>,
];

export default {
  title: 'Components/Overview Card',
  component: OverviewCard,
  tags: ['autodocs'],
  args: { inverted: false, children: content },
  decorators: [(Story) => <div style={{ width: 480 }}><Story /></div>],
  parameters: {
    ds: {
      lead: 'Project summary card for a project page: intro text, key stakeholders, team groups and a link out. Use it once per project as the single summary.',
      group: 'Organisms',
      figma: '209:1800',
      code: 'src/components/OverviewCard.jsx',
      sample: { children: content },
      when: [
        ['The cover of a project file', 'One per project, as the first thing a reader sees.'],
        ['Not a list of projects', 'For one number, use Stat Card.'],
      ],
      use: ['Use it once per project file, as the first thing a reader sees.', 'Fill stakeholders and team with the real people.'],
      avoid: ['Using it inside a product screen.', 'Adding sections that are not about the project.'],
      tokens: [
        ['surface-container', '--ctx-surface-container', 'Fill, follows the Context mode'],
        ['radius/card', '--radius-card', 'Corners'],
        ['component/modal/max-width', '--modal-max-width', 'Width'],
        ['component/overview/padding-h', '--overview-padding-h', 'Left and right padding'],
        ['component/overview/padding-v', '--overview-padding-v', 'Top and bottom padding of the header'],
        ['component/overview/head-padding', '--overview-head-padding', 'Space above the team heading'],
        ['component/overview/body-padding', '--overview-body-padding', 'Body and footer padding'],
        ['component/overview/actions-gap', '--overview-actions-gap', 'Gaps in the footer and between cards'],
        ['on-surface', '--ctx-on-surface', 'Titles'],
        ['on-surface-variant', '--ctx-on-surface-variant', 'Intro and credit line'],
        ['outline-variant', '--ctx-outline-variant', 'Dividers'],
      ],
      a11y: [
        'The card is an article with a level 2 title and level 3 sections, so headings give the outline.',
        'The Visit Website button is a real button with a visible focus ring.',
        'Text passes AA contrast in both Context modes.',
      ],
      open: ['This documents a project, it is not product UI. Should it live in a separate documentation kit?'],
    },
  },
};

export const Default = {};
export const InvertedSurface = { args: { inverted: true } };

export const InUse = {
  name: 'In use: the cover of a project file',
  decorators: [],
  render: () => <div style={{ width: 480 }}><OverviewCard>{content}</OverviewCard></div>,
};
