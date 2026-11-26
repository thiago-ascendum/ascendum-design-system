import { useState as React_useState } from 'react';
import { Slider } from '../../src/components/Slider.jsx';

export default {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  args: { state: 'default', defaultValue: 50, 'aria-label': 'Maximum budget' },
  decorators: [(Story) => <div style={{ width: 240 }}><Story /></div>],
  parameters: {
    ds: {
      lead: 'Picks a value inside a range. The label and the current value always sit beside it.',
      group: 'Atoms',
      figma: '45:17',
      code: 'src/components/Slider.jsx',
      sample: { defaultValue: 50, 'aria-label': 'Value' },
      when: [
        ['Approximate choices', 'A bounded range where an approximate value is fine.'],
        ['Exact numbers', 'Use an Input when people need to type an exact number.'],
      ],
      use: ['Show the label and the current value above the track.', 'Use it for approximate choices inside a fixed range.'],
      avoid: ['Using it when people need an exact number.', 'Showing a slider with no label or value.'],
      tokens: [
        ['component/slider/height', '--slider-height', 'Height of the control'],
        ['component/slider/track-height', '--slider-track-height', 'Track and fill thickness'],
        ['component/slider/track-radius', '--slider-track-radius', 'Track corners'],
        ['component/slider/thumb', '--slider-thumb', 'Thumb size'],
        ['component/slider/thumb-border', '--slider-thumb-border', 'Thumb ring'],
        ['outline-variant', '--outline-variant', 'Track'],
        ['outline', '--outline', 'Fill and thumb'],
        ['surface-container', '--surface-container', 'Thumb ring colour'],
        ['primary-hover, primary-pressed', '--primary-hover, --primary-pressed', 'Thumb on hover and pressed'],
        ['focus', '--focus', 'Focus ring'],
      ],
      a11y: [
        'A native range input: arrow keys move one step, Shift and arrow ten, Home and End jump to the ends.',
        'Pass an aria-label, or put a visible label next to it. The value beside the label updates while dragging.',
        'It is 22 px high, below the 44 px touch target: fine with a pointer, add spacing on mobile.',
      ],
      open: ['No real use of the Disabled state was found. Keep it?'],
    },
  },
};

export const Default = {};
export const Disabled = { args: { state: 'disabled' } };

export const InUse = {
  name: 'In use: a budget filter',
  render: () => {
    const money = (n) => `£${Number(n).toLocaleString('en-GB')}`;
    const Budget = () => {
      const [v, setV] = React_useState(50000);
      return (
        <div className="sb-card" style={{ width: 320 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="sb-label">Maximum budget</span>
            <span className="sb-label">{money(v)}</span>
          </div>
          <Slider aria-label="Maximum budget" min={0} max={100000} step={1000} value={v} onChange={(e) => setV(Number(e.target.value))} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="sb-help">£0</span>
            <span className="sb-help">£100,000</span>
          </div>
        </div>
      );
    };
    return <Budget />;
  },
};
