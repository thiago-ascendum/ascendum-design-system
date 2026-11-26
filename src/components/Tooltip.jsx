import PropTypes from 'prop-types';
import './Tooltip.css';

/**
 * A small label that names what a control does. Above sits over its target with the arrow pointing down,
 * Below sits under it with the arrow pointing up. One short line: no links or buttons inside.
 * Props mirror the Figma component: Label, Arrow.
 */
export function Tooltip({ label, arrow = 'above', ...rest }) {
  return (
    <div className={`ds-tooltip ds-tooltip--${arrow}`} role="tooltip" {...rest}>
      <span className="ds-tooltip__bubble">{label}</span>
      <span className="ds-tooltip__arrow" aria-hidden="true" />
    </div>
  );
}

Tooltip.propTypes = {
  /** Figma: Label. One short line that names the control. */
  label: PropTypes.string.isRequired,
  /** Figma: Arrow. Above sits over its target (arrow down). Below sits under it (arrow up). */
  arrow: PropTypes.oneOf(['above', 'below']),
  id: PropTypes.string,
};
