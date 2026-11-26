import PropTypes from 'prop-types';
import './Select.css';

/**
 * A closed dropdown for choosing one option from a list of two to about seven. Until something is chosen it shows
 * a placeholder in the muted text colour, afterwards the chosen value in full contrast. Pair it with Menu Item for the open list.
 * Props mirror the Figma component: Label, Value, State.
 */
export function Select({ label, value = 'placeholder', state = 'default', type = 'button', ...rest }) {
  return (
    <button
      type={type}
      className={`ds-select ds-select--${value}`}
      aria-haspopup="listbox"
      aria-invalid={state === 'error' ? 'true' : undefined}
      disabled={state === 'disabled'}
      {...rest}
    >
      <span className="ds-select__label">{label}</span>
      <svg className="ds-select__chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      </svg>
    </button>
  );
}

Select.propTypes = {
  /** Figma: Label. The placeholder that names the choice, or the chosen value. */
  label: PropTypes.string,
  /** Figma: Value. Placeholder is muted text; Selected shows the chosen value in full contrast. */
  value: PropTypes.oneOf(['placeholder', 'selected']),
  /** Figma: State. Error shows the error border. Hover and Focus come from the browser. */
  state: PropTypes.oneOf(['default', 'error', 'disabled']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
};
