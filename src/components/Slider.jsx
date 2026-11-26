import { useState } from 'react';
import PropTypes from 'prop-types';
import './Slider.css';

/**
 * Picks a value inside a range by dragging. A native range input, so the keyboard works as Figma describes:
 * arrow keys move one step, Home and End jump to the ends. Always show a label and the current value beside it.
 * Minimum, maximum and step go straight to the input (min, max, step). Fill width and thumb position follow the value.
 * Props mirror the Figma component: State.
 */
export function Slider({ state = 'default', value, onChange, ...rest }) {
  const [own, setOwn] = useState(rest.defaultValue !== undefined ? Number(rest.defaultValue) : 50);
  const current = value !== undefined ? Number(value) : own;
  const min = rest.min !== undefined ? Number(rest.min) : 0;
  const max = rest.max !== undefined ? Number(rest.max) : 100;
  const pct = max > min ? ((current - min) / (max - min)) * 100 : 0;
  const { defaultValue, ...input } = rest;
  return (
    <span className="ds-slider">
      <span className="ds-slider__track" aria-hidden="true">
        <span className="ds-slider__fill" style={{ width: `${pct}%` }} />
      </span>
      <input
        type="range"
        className="ds-slider__input"
        value={current}
        disabled={state === 'disabled'}
        onChange={(e) => { setOwn(Number(e.target.value)); if (onChange) onChange(e); }}
        {...input}
      />
    </span>
  );
}

Slider.propTypes = {
  /** Figma: State. Disabled cannot take focus and does not move. Hover, Focus and Pressed come from the browser. */
  state: PropTypes.oneOf(['default', 'disabled']),
  /** The current value. Leave it out to let the slider keep its own. */
  value: PropTypes.number,
  onChange: PropTypes.func,
};
