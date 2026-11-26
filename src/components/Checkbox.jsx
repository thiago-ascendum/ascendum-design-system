import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Checkbox.css';

/**
 * Choose any number of options from a list. Each option stands alone and always has a visible label.
 * Use Radio when only one answer is allowed, and Toggle when the change applies straight away.
 */
export function Checkbox({ label, checked, defaultChecked, indeterminate = false, disabled = false, onChange, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate, checked]);
  const state = checked === undefined ? {} : { checked };
  return (
    <label className="ds-checkbox">
      <input
        ref={ref}
        type="checkbox"
        className="ds-checkbox__input"
        defaultChecked={checked === undefined ? defaultChecked : undefined}
        disabled={disabled}
        onChange={onChange}
        {...state}
        {...rest}
      />
      <span className="ds-checkbox__box" aria-hidden="true" />
      <span className="ds-checkbox__label">{label}</span>
    </label>
  );
}

Checkbox.propTypes = {
  /** A short phrase in sentence case. Describes the option, not the action. */
  label: PropTypes.string.isRequired,
  /** Controlled value. Pair it with onChange. */
  checked: PropTypes.bool,
  /** Initial value when you let the browser hold the state. */
  defaultChecked: PropTypes.bool,
  /** Partly selected. Only for a parent whose children are some on, some off. */
  indeterminate: PropTypes.bool,
  /** The option is unavailable right now. Say why in nearby text. */
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};
