import PropTypes from 'prop-types';
import './Radio.css';

/**
 * Choose one option from a short list. Every option is visible at once, and one is selected by default.
 * Use a Select past five options, and Checkbox when more than one answer is allowed.
 */
export function Radio({ label, name, value, checked, defaultChecked, disabled = false, onChange, ...rest }) {
  const state = checked === undefined ? { defaultChecked } : { checked };
  return (
    <label className="ds-radio">
      <input type="radio" className="ds-radio__input" name={name} value={value} disabled={disabled} onChange={onChange} {...state} {...rest} />
      <span className="ds-radio__ring" aria-hidden="true" />
      <span className="ds-radio__label">{label}</span>
    </label>
  );
}

Radio.propTypes = {
  /** A short phrase in sentence case. */
  label: PropTypes.string.isRequired,
  /** Groups the options. Every radio in one list shares the same name. */
  name: PropTypes.string.isRequired,
  /** The value sent when this option is selected. */
  value: PropTypes.string,
  /** Controlled value. Pair it with onChange. */
  checked: PropTypes.bool,
  /** Initial value when you let the browser hold the state. Select one option by default. */
  defaultChecked: PropTypes.bool,
  /** The option is unavailable right now. Say why in nearby text. */
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};
