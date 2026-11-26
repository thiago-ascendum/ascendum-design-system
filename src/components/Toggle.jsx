import PropTypes from 'prop-types';
import './Toggle.css';

/**
 * Switch one setting on or off, with the change applying straight away. Label it with the setting itself,
 * so the same words work for on and off. Use a Checkbox when the choice only counts after a Save button.
 * Props mirror the Figma component: Label, On, State.
 */
export function Toggle({ label, on, defaultOn, state = 'default', onChange, ...rest }) {
  const control = on === undefined ? { defaultChecked: defaultOn } : { checked: on };
  return (
    <label className="ds-toggle">
      <input type="checkbox" role="switch" className="ds-toggle__input" disabled={state === 'disabled'} onChange={onChange} {...control} {...rest} />
      <span className="ds-toggle__track" aria-hidden="true"><span className="ds-toggle__knob" /></span>
      <span className="ds-toggle__label">{label}</span>
    </label>
  );
}

Toggle.propTypes = {
  /** Figma: Label. The setting, such as Email alerts. Never the action, such as Turn on. */
  label: PropTypes.string.isRequired,
  /** Figma: On. Pair it with onChange. */
  on: PropTypes.bool,
  /** Initial On when you let the browser hold the state. */
  defaultOn: PropTypes.bool,
  /** Figma: State. Disabled: the setting is unavailable right now; say why in nearby text. */
  state: PropTypes.oneOf(['default', 'disabled']),
  onChange: PropTypes.func,
};
