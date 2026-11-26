import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Checkbox.css';

/**
 * Choose any number of options from a list. Each option stands alone and always has a visible label.
 * Use Radio when only one answer is allowed, and Toggle when the change applies straight away.
 * Props mirror the Figma component: Label, Checked, State.
 */
export function Checkbox({ label, checked, defaultChecked, state = 'default', onChange, ...rest }) {
  const ref = useRef(null);
  const indeterminate = checked === 'indeterminate' || (checked === undefined && defaultChecked === 'indeterminate');
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate, checked]);
  const value = (v) => (v === 'indeterminate' ? false : v);
  const control = checked === undefined ? { defaultChecked: value(defaultChecked) } : { checked: value(checked) };
  return (
    <label className="ds-checkbox">
      <input ref={ref} type="checkbox" className="ds-checkbox__input" disabled={state === 'disabled'} onChange={onChange} {...control} {...rest} />
      <span className="ds-checkbox__box" aria-hidden="true" />
      <span className="ds-checkbox__label">{label}</span>
    </label>
  );
}

Checkbox.propTypes = {
  /** Figma: Label. A short phrase in sentence case. Describes the option, not the action. */
  label: PropTypes.string.isRequired,
  /** Figma: Checked. Indeterminate is only for a parent whose children are some on, some off. Pair it with onChange. */
  checked: PropTypes.oneOf([false, true, 'indeterminate']),
  /** Initial Checked when you let the browser hold the state. */
  defaultChecked: PropTypes.oneOf([false, true, 'indeterminate']),
  /** Figma: State. Disabled: the option is unavailable right now; say why in nearby text. */
  state: PropTypes.oneOf(['default', 'disabled']),
  onChange: PropTypes.func,
};
