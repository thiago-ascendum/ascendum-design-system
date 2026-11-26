import { Avatar } from '../../src/components/Avatar.jsx';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: { name: 'Amara Bello', size: 'medium', tone: 'blue' },
  argTypes: { size: { control: 'inline-radio' }, tone: { control: 'inline-radio' } },
  parameters: {
    ds: {
      lead: 'Initials on a soft colour tint with dark text. The tint only helps tell people apart: it never means a team, a role or a status.',
      group: 'Atoms',
      figma: '40:52',
      code: 'src/components/Avatar.jsx',
      when: [
        ['Small, 32: tables and lists', 'Next to a name in a row, such as a team list.'],
        ['Medium, 48: cards', 'The default size, for team and stakeholder cards.'],
        ['Large, 72: a profile', 'The head of a profile page.'],
      ],
      use: ['Keep the same tone for the same person everywhere.', 'Pass the full name: the initials come from its first and last word.', 'For a photo, place an image fill on the instance in Figma.'],
      avoid: ['Using the tone to show a team, a role or a status.', 'A saturated colour, a gradient or light text.'],
      tokens: [
        ['accent-blue-container', '--accent-blue-container', 'Blue tone'],
        ['accent-purple-container', '--accent-purple-container', 'Purple tone'],
        ['accent-red-container', '--accent-red-container', 'Red tone'],
        ['accent-stone-container', '--accent-stone-container', 'Stone tone'],
        ['on-accent-container', '--on-accent-container', 'Initials'],
        ['component/avatar/size-sm', '--avatar-size-sm', 'Small: 32'],
        ['component/avatar/size-md', '--avatar-size-md', 'Medium: 48'],
        ['component/avatar/size-lg', '--avatar-size-lg', 'Large: 72'],
        ['radius/pill', '--radius-pill', 'Always round'],
      ],
      a11y: [
        'It is an image role with the full name as its accessible name. The initials are hidden, so the name is read once.',
        'The tone carries no meaning, so nothing depends on colour. Two people with the same initials differ only by accessible name.',
        'It is not interactive, so the 44px touch target does not apply. It is 32, 48 or 72px.',
      ],
      open: [
        'Four tones only tell people apart. Are four needed, or fewer?',
        'Photo avatars are not drawn. Needed?',
      ],
      changes: ['1.1.0: The Fill property is now Tone, and Size has three values instead of four. Soft tint with dark initials, four tones. It was 20 variants. Team and stakeholder cards use Avatar.'],
    },
  },
};

export const Medium = {};
export const Small = { args: { size: 'small' } };
export const Large = { args: { size: 'large' } };
export const Purple = { args: { tone: 'purple', name: 'Tomas Greene' } };
export const Red = { args: { tone: 'red', name: 'Priya Nair' } };
export const Stone = { args: { tone: 'stone', name: 'Lucas Ferreira' } };

export const InUse = {
  name: 'In use: a team list',
  render: () => (
    <div className="sb-card" style={{ width: 360 }}>
      {[
        ['Amara Bello', 'Design lead', 'blue'],
        ['Tomas Greene', 'Engineering', 'purple'],
        ['Priya Nair', 'Client partner', 'red'],
      ].map(([name, role, tone]) => (
        <div className="sb-row" key={name}>
          <Avatar name={name} tone={tone} size="small" />
          <div className="sb-col" style={{ gap: 0 }}>
            <span className="sb-label">{name}</span>
            <span className="sb-help">{role}</span>
          </div>
        </div>
      ))}
    </div>
  ),
};
