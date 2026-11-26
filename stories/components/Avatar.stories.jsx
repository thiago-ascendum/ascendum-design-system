import { Avatar } from '../../src/components/Avatar.jsx';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: { name: 'Amara Bello', size: 'medium', tone: 'blue' },
  argTypes: { size: { control: 'inline-radio' }, tone: { control: 'inline-radio' } },
  parameters: {
    docs: {
      description: {
        component:
          'Initials on a soft tint, with dark text. **The tint only helps tell people apart.** It never means a team, a role or a status. **Use:** Small in tables and lists, Medium in cards, Large on a profile, and keep the same tone for the same person everywhere. **Avoid:** a saturated colour, a gradient or light text. **Open questions for the owner:** Four tones only tell people apart. Are four needed, or fewer? Photo avatars are not drawn. Needed?',
      },
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
