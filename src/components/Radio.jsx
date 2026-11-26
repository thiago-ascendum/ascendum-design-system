import PropTypes from 'prop-types';
import './Radio.css';

/**
 * Choose one option from a short list. Every option is visible at once, and one is selected by default.
 * Use a Select past five options, and Checkbox when more than one answer is allowed.
 * Props mirror the Figma component: Label, Checked, State.
 */
export function Radio({ label, name, value, checked, defaultChecked, state = 'default', onChange, ...rest }) {
  const control = checked === undefined ? { defaultChecked } : { checked };
  return (
    <label className="ds-radio">
      <input type="radio" className="ds-radio__input" name={name} value={value} disabled={state === 'disabled'} onChange={onChange} {...control} {...rest} />
      <span className="ds-radio__ring" aria-hidden="true" />
      <span className="ds-radio__label">{label}</span>
    </label>
  );
}

Radio.propTypes = {
  /** Figma: Label. A short phrase in sentence case. */
  label: PropTypes.string.isRequired,
  /** Groups the options. Every radio in one list shares the same name. */
  name: PropTypes.string.isRequired,
  /** The value sent when this option is selected. */
  value: PropTypes.string,
  /** Figma: Checked. Pair it with onChange. */
  checked: PropTypes.bool,
  /** Initial Checked when you let the browser hold the state. Select one option by default. */
  defaultChecked: PropTypes.bool,
  /** Figma: State. Disabled: the option is unavailable right now; say why in nearby text. */
  state: PropTypes.oneOf(['default', 'disabled']),
  onChange: PropTypes.func,
};
