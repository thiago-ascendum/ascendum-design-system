import { useId } from 'react';
import PropTypes from 'prop-types';
import { Input } from './Input.jsx';
import './FormField.css';

/**
 * A label, an input and, only when needed, a message. Use it for every text entry in a form.
 * The message shows only on error and replaces any help text. The label is a real label tied to the field.
 * Props mirror the Figma component: Label, Message, Type, State.
 */
export function FormField({ label, message, type = 'text', state = 'default', id, ...rest }) {
  const autoId = useId();
  const fieldId = id || autoId;
  const messageId = `${fieldId}-message`;
  const showMessage = state === 'error' && Boolean(message);
  return (
    <div className="ds-form-field">
      <label className={`ds-form-field__label${state === 'disabled' ? ' ds-form-field__label--disabled' : ''}`} htmlFor={fieldId}>
        {label}
      </label>
      <Input id={fieldId} type={type} state={state} aria-describedby={showMessage ? messageId : undefined} {...rest} />
      {showMessage ? <span className="ds-form-field__message" id={messageId}>{message}</span> : null}
    </div>
  );
}

FormField.propTypes = {
  /** Figma: Label. What to enter, in sentence case. Always visible: the placeholder is not a label. */
  label: PropTypes.string.isRequired,
  /** Figma: Message. The error message. It shows only in the Error state and says how to fix it. */
  message: PropTypes.string,
  /** Figma: Type. Text for short answers, textarea for longer ones. */
  type: PropTypes.oneOf(['text', 'textarea']),
  /** Figma: State. Error shows the border and the message. Disabled fields cannot be focused or edited. */
  state: PropTypes.oneOf(['default', 'error', 'disabled']),
  /** Ties the label to the field. A unique id is made when you leave it out. */
  id: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
