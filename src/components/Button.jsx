import PropTypes from 'prop-types';
import './Button.css';

/**
 * Starts an action. Solid is the main action and there is one per view. Outline is the second choice.
 * Ghost has no border and is for quiet actions such as Back and Cancel. Corners stay at 0.
 */
export function Button({ label, variant = 'solid', surface = 'primary', disabled = false, type = 'button', ...rest }) {
  const cls = ['ds-button', `ds-button--${variant}`, surface === 'inverted' ? 'ds-button--inverted' : ''].filter(Boolean).join(' ');
  return (
    <button type={type} className={cls} disabled={disabled} {...rest}>
      {label}
    </button>
  );
}

Button.propTypes = {
  /** What the button does, in sentence case. Never "Button". */
  label: PropTypes.string.isRequired,
  /** Solid is the main action. Outline is the second choice. Ghost is for quiet actions. */
  variant: PropTypes.oneOf(['solid', 'outline', 'ghost']),
  /** Use inverted on dark surfaces. */
  surface: PropTypes.oneOf(['primary', 'inverted']),
  /** Disabled buttons cannot be focused or pressed. */
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
};
