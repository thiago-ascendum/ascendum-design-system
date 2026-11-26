import { useState } from 'react';
import PropTypes from 'prop-types';
import './InlineEdit.css';

/**
 * Text that turns into a field when clicked. At rest it looks like plain text, on hover it shows it can be edited,
 * and while editing it matches a real input. Use the same text style as the heading it replaces.
 * Props mirror the Figma component: Value, State.
 */
export function InlineEdit({ value, state = 'read', placeholder, defaultValue, onChange, ...rest }) {
  const initial = value ?? defaultValue ?? placeholder ?? '';
  const [text, setText] = useState(initial);
  const [editing, setEditing] = useState(false);
  if (state === 'editing' || editing) {
    return (
      <input
        className="ds-inline-edit ds-inline-edit--editing"
        type="text"
        value={text}
        autoFocus={editing}
        onChange={(e) => { setText(e.target.value); if (onChange) onChange(e); }}
        onBlur={() => setEditing(false)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === 'Escape') setEditing(false); }}
        {...rest}
      />
    );
  }
  return (
    <button type="button" className="ds-inline-edit" onClick={() => setEditing(true)} {...rest}>
      {text}
    </button>
  );
}

InlineEdit.propTypes = {
  /** Figma: Value. The text the person edits, such as a project name. */
  value: PropTypes.string,
  /** Figma: State. Read is plain text, Editing is a field. Hover comes from the browser; clicking the text starts editing. */
  state: PropTypes.oneOf(['read', 'editing']),
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
};
