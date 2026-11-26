import PropTypes from 'prop-types';
import './Toggle.css';

/**
 * Switch one setting on or off, with the change applying straight away. Label it with the setting itself,
 * so the same words work for on and off. Use a Checkbox when the choice only counts after a Save button.
 */
export function Toggle({ label, checked, defaultChecked, disabled = false, onChange, ...rest }) {
  const state = checked === undefined ? { defaultChecked } : { checked };
  return (
    <label className="ds-toggle">
      <input type="checkbox" role="switch" className="ds-toggle__input" disabled={disabled} onChange={onChange} {...state} {...rest} />
      <span className="ds-toggle__track" aria-hidden="true"><span className="ds-toggle__knob" /></span>
      <span className="ds-toggle__label">{label}</span>
    </label>
  );
}

Toggle.propTypes = {
  /** The setting, such as Email alerts. Never the action, such as Turn on. */
  label: PropTypes.string.isRequired,
  /** Controlled value (Figma: On). Pair it with onChange. */
  checked: PropTypes.bool,
  /** Initial value when you let the browser hold the state. */
  defaultChecked: PropTypes.bool,
  /** The setting is unavailable right now. Say why in nearby text. */
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};
