import { useState } from 'react';
import { Tab } from '../../src/components/Tab.jsx';

export default {
  title: 'Components/Tab',
  component: Tab,
  tags: ['autodocs'],
  args: { label: 'Overview', state: 'default' },
  parameters: {
    ds: {
      sample: { countValue: 12 },
      lead: 'One tab in a row that switches between views of the same page.',
      group: 'Molecules',
      figma: '79:59',
      code: 'src/components/Tab.jsx',
      when: [
        ['Peer views of the same content', 'Overview, Tasks, Risks, Files. Two to five tabs in one row.'],
        ['With a count', 'Optional, and only for things that can be counted, such as open items.'],
        ['Not for steps or pages', 'For steps in a process or navigation between pages, use something else.'],
      ],
      use: ['Put two to five tabs inside an element with role="tablist".', 'Name each view with one or two words, in sentence case.', 'Leave the count out when nothing can be counted.'],
      avoid: ['Steps in a process.', 'Navigation between pages.', 'More than five tabs in a row.'],
      tokens: [
        ['component/tabs/padding-v', '--tabs-padding-v', 'Top and bottom padding'],
        ['component/tabs/count-gap', '--tabs-count-gap', 'Space between the label and the count'],
        ['component/tabs/count-padding-v', '--tabs-count-padding-v', 'Top and bottom padding of the count'],
        ['component/tabs/count-padding-h', '--tabs-count-padding-h', 'Left and right padding of the count'],
        ['font-size/button', '--text-button-size', 'Label size'],
        ['font-size/label', '--text-label-size', 'Count size'],
        ['border-width/button', '--border-width-button', 'Width of the bottom line'],
        ['transparent', '--transparent', 'Bottom line of an unselected tab'],
        ['outline', '--outline', 'Bottom line of the selected tab'],
        ['on-surface-variant', '--on-surface-variant', 'Label and count of an unselected tab'],
        ['on-surface', '--on-surface', 'Label of the selected tab, and of any tab on hover'],
        ['surface-container-low', '--surface-container-low', 'Fill of the count'],
        ['inverse-surface, inverse-on-surface', '--inverse-surface, --inverse-on-surface', 'Fill and text of the count on the selected tab'],
        ['radius/pill', '--radius-pill', 'Corners of the count'],
        ['focus, border-width/focus', '--focus, --border-width-focus', 'Focus ring'],
      ],
      a11y: [
        'Each tab is a button with role="tab" and aria-selected. The row needs role="tablist" and a label.',
        'Only the selected tab is in the tab order (tabindex 0). Move between tabs with the arrow keys, as the example shows.',
        'Focus is a 2px ring set 2px from the tab. The ring in Button is set 4px away.',
        'An unselected tab is about 48px high and the selected tab about 42px, because its line height is tighter. The selected tab is under the 44px touch target by about 2px.',
      ],
      open: [
        'The count is shown as a pill. Is that the right treatment for a number of items?',
        'The unselected line is bound to a button token (transparent). Should tabs have their own?',
      ],
    },
  },
};

export const Default = {};
export const Active = { args: { state: 'active' } };
export const WithCount = { args: { count: 12 } };
export const ActiveWithCount = { args: { state: 'active', count: 12 } };

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
          <Tab key={t.id} label={t.label} count={t.count} state={t.id === active ? 'active' : 'default'} onClick={() => setActive(t.id)} />
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
