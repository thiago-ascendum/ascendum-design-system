import { Tooltip } from '../../src/components/Tooltip.jsx';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  args: { label: 'Copy to clipboard', arrow: 'above' },
  parameters: {
    ds: {
      lead: 'A small label that names what a control does. Above sits over its target with the arrow pointing down, Below sits under it with the arrow pointing up.',
      group: 'Molecules',
      figma: '81:131',
      code: 'src/components/Tooltip.jsx',
      sample: {},
      when: [
        ['Icon-only buttons', 'Name what the control does in a few words.'],
        ['Essential information', 'Never only in a tooltip: it is hidden until hover or focus.'],
      ],
      use: ['Use it to name icon-only buttons.', 'Keep it to one short line.'],
      avoid: ['Hiding essential information that is only in a tooltip.', 'Putting links or buttons inside it.'],
      tokens: [
        ['inverse-surface', '--inverse-surface', 'Bubble and arrow'],
        ['inverse-on-surface', '--inverse-on-surface', 'Label colour'],
        ['component/tooltip/padding-h', '--tooltip-padding-h', 'Left and right padding'],
        ['component/tooltip/padding-v', '--tooltip-padding-v', 'Top and bottom padding'],
        ['component/tooltip/arrow-overlap', '--tooltip-arrow-overlap', 'Arrow tucked under the bubble'],
        ['radius/field', '--field-radius', 'Corners'],
      ],
      a11y: [
        'role="tooltip". Link it to its control with aria-describedby, and show it on hover and on keyboard focus.',
        'Text 14.8:1 on its background in light mode. Passes AA.',
      ],
      open: [],
    },
  },
};

export const Above = {};
export const Below = { args: { arrow: 'below' } };

export const InUse = {
  name: 'In use: naming an icon button',
  render: () => (
    <div className="sb-col" style={{ alignItems: 'flex-start' }}>
      <Tooltip id="tip-copy" label="Copy to clipboard" arrow="above" />
      <button type="button" className="sb-card" aria-describedby="tip-copy" aria-label="Copy to clipboard">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect x="9" y="9" width="11" height="11" rx="1" /><path d="M5 15V5a1 1 0 0 1 1-1h10" />
        </svg>
      </button>
    </div>
  ),
};
