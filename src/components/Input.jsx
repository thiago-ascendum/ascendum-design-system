import PropTypes from 'prop-types';
import './Input.css';

/**
 * Text field for short answers, and a textarea for longer ones. Always pair it with a visible label above the field:
 * the placeholder is an example, not a label.
 * Props mirror the Figma component: Value, Type, State.
 */
export function Input({ type = 'text', state = 'default', ...rest }) {
  const Tag = type === 'textarea' ? 'textarea' : 'input';
  return (
    <Tag
      className="ds-input"
      aria-invalid={state === 'error' ? 'true' : undefined}
      disabled={state === 'disabled'}
      {...(type === 'textarea' ? {} : { type: 'text' })}
      {...rest}
    />
  );
}

Input.propTypes = {
  /** Figma: Value. Text the person typed. */
  value: PropTypes.string,
  /** An example of a valid answer. It is not a label. */
  placeholder: PropTypes.string,
  /** Figma: Type. Text for short answers, textarea for longer ones. */
  type: PropTypes.oneOf(['text', 'textarea']),
  /** Figma: State. Error shows the error border; add a short message that says how to fix it. Hover, Focus and Filled come from the browser. */
  state: PropTypes.oneOf(['default', 'error', 'disabled']),
  onChange: PropTypes.func,
};
