import PropTypes from 'prop-types';
import './Button.css';

/**
 * Starts an action. Solid is the main action and there is one per view. Outline is the second choice.
 * Ghost has no border and is for quiet actions such as Back and Cancel. Corners stay at 0.
 * On a dark band, set data-context="inverted" on the section, as Figma sets the Context mode: every button inside follows.
 * Props mirror the Figma component: Label, Leading icon, Icon, Style, State.
 */
export function Button({ label, leadingIcon = false, icon = null, style = 'solid', state = 'default', type = 'button', ...rest }) {
  return (
    <button type={type} className={`ds-button ds-button--${style}`} disabled={state === 'disabled'} {...rest}>
      {leadingIcon && icon ? <span className="ds-button__icon" aria-hidden="true">{icon}</span> : null}
      {label}
    </button>
  );
}

Button.propTypes = {
  /** Figma: Label. What the button does, in sentence case. Never "Button". */
  label: PropTypes.string.isRequired,
  /** Figma: Leading icon. Shows the icon before the label. Only when it adds meaning. */
  leadingIcon: PropTypes.bool,
  /** Figma: Icon. The icon shown when Leading icon is on. */
  icon: PropTypes.node,
  /** Figma: Style. Solid is the main action. Outline is the second choice. Ghost is for quiet actions. */
  style: PropTypes.oneOf(['solid', 'outline', 'ghost']),
  /** Figma: State. Disabled buttons cannot be focused or pressed. Hover, Focus and Pressed come from the browser. */
  state: PropTypes.oneOf(['default', 'disabled']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
};
