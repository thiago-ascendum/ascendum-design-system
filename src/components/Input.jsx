import PropTypes from 'prop-types';
import './Input.css';

/**
 * Text field for short answers, and a textarea for longer ones. Always pair it with a visible label above the field:
 * the placeholder is an example, not a label.
 */
export function Input({ multiline = false, invalid = false, ...rest }) {
  const Tag = multiline ? 'textarea' : 'input';
  return <Tag className="ds-input" aria-invalid={invalid ? 'true' : undefined} {...(multiline ? {} : { type: 'text' })} {...rest} />;
}

Input.propTypes = {
  /** Text the person typed. */
  value: PropTypes.string,
  /** An example of a valid answer. It is not a label. */
  placeholder: PropTypes.string,
  /** Textarea for longer answers. */
  multiline: PropTypes.bool,
  /** Shows the error border. Add a short message under the field that says how to fix it. */
  invalid: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};
