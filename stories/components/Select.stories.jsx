import { useState } from 'react';
import { Select } from '../../src/components/Select.jsx';

export default {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  args: { label: 'Select a team', value: 'placeholder', state: 'default' },
  parameters: {
    ds: {
      lead: 'A closed dropdown for choosing one option. Until something is chosen it shows a placeholder in the muted text colour, afterwards the chosen value in full contrast.',
      group: 'Molecules',
      figma: '79:100',
      code: 'src/components/Select.jsx',
      sample: {},
    },
  },
};

export const Default = {};
export const Selected = { args: { label: 'Design', value: 'selected' } };
export const Error = { args: { state: 'error' } };
export const Disabled = { args: { state: 'disabled' } };

const TEAMS = ['Design', 'Engineering', 'Research', 'Operations'];

export const InUse = {
  name: 'In use: choosing a team in a form',
  render: () => {
    const [open, setOpen] = useState(false);
    const [team, setTeam] = useState(null);
    return (
      <div className="sb-col" style={{ position: 'relative', width: 260 }}>
        <label className="sb-label" htmlFor="team">Team</label>
        <Select id="team" label={team || 'Select a team'} value={team ? 'selected' : 'placeholder'} aria-expanded={open} onClick={() => setOpen(!open)} />
        {open ? (
          <ul role="listbox" aria-label="Team" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {TEAMS.map((t) => (
              <li key={t} role="option" aria-selected={t === team}>
                <button type="button" className="ds-select" style={{ width: '100%', border: 0 }} onClick={() => { setTeam(t); setOpen(false); }}>{t}</button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  },
};
