import { useState } from 'react';
import { Tab } from '../../src/components/Tab.jsx';

export default {
  title: 'Components/Tab',
  component: Tab,
  tags: ['autodocs'],
  args: { label: 'Overview', selected: false },
  parameters: {
    docs: {
      description: {
        component:
          'One tab in a row that switches between views of the same page. Put two to five tabs inside an element with role="tablist". The selected tab is bold with a bottom line; hover and keyboard focus are real CSS states. **Use:** for peer views of the same content. The count is optional and only for things that can be counted, such as open items. **Avoid:** steps in a process, and navigation between pages. **Open questions for the owner:** The count is shown as a pill. Is that the right treatment for a number of items?',
      },
    },
  },
};

export const Default = {};
export const Selected = { args: { selected: true } };
export const WithCount = { args: { count: 12 } };
export const SelectedWithCount = { args: { selected: true, count: 12 } };

function ProjectTabs() {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'tasks', label: 'Tasks', count: 12 },
    { id: 'risks', label: 'Risks', count: 3 },
    { id: 'files', label: 'Files' },
  ];
  const [active, setActive] = useState('overview');
  const onKeyDown = (e) => {
    const i = tabs.findIndex((t) => t.id === active);
    if (e.key === 'ArrowRight') setActive(tabs[(i + 1) % tabs.length].id);
    else if (e.key === 'ArrowLeft') setActive(tabs[(i - 1 + tabs.length) % tabs.length].id);
    else return;
    e.preventDefault();
  };
  return (
    <div className="sb-col" style={{ width: 420, maxWidth: 'none' }}>
      <div role="tablist" aria-label="Project views" className="sb-row" style={{ gap: 'var(--tabs-gap)' }} onKeyDown={onKeyDown}>
        {tabs.map((t) => (
          <Tab key={t.id} label={t.label} count={t.count} selected={t.id === active} onClick={() => setActive(t.id)} />
        ))}
      </div>
      <p className="sb-help" role="tabpanel">Showing the {active} view of the Harbourside migration project. Use the arrow keys to move between tabs.</p>
    </div>
  );
}

export const InUse = {
  name: 'In use: project views',
  render: () => <ProjectTabs />,
};
