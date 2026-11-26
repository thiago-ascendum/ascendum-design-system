import { useId } from 'react';
import PropTypes from 'prop-types';
import { Input } from './Input.jsx';
import './FormField.css';

/**
 * A label, an input and, only when needed, a message. Use it for every text entry in a form.
 * The message shows only on error and replaces any help text. The label is a real label tied to the field.
 */
export function FormField({ label, message, type = 'text', invalid = false, disabled = false, id, ...rest }) {
  const autoId = useId();
  const fieldId = id || autoId;
  const messageId = `${fieldId}-message`;
  const showMessage = invalid && Boolean(message);
  return (
    <div className="ds-form-field">
      <label className={`ds-form-field__label${disabled ? ' ds-form-field__label--disabled' : ''}`} htmlFor={fieldId}>
        {label}
      </label>
      <Input
        id={fieldId}
        multiline={type === 'textarea'}
        invalid={invalid}
        disabled={disabled}
        aria-describedby={showMessage ? messageId : undefined}
        {...rest}
      />
      {showMessage ? <span className="ds-form-field__message" id={messageId}>{message}</span> : null}
    </div>
  );
}

FormField.propTypes = {
  /** What to enter, in sentence case. Always visible: the placeholder is not a label. */
  label: PropTypes.string.isRequired,
  /** The error message. It shows only when the field is invalid and says how to fix it. */
  message: PropTypes.string,
  /** Text for short answers, textarea for longer ones. */
  type: PropTypes.oneOf(['text', 'textarea']),
  /** Shows the error border and the message. */
  invalid: PropTypes.bool,
  /** Disabled fields cannot be focused or edited. */
  disabled: PropTypes.bool,
  /** Ties the label to the field. A unique id is made when you leave it out. */
  id: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
