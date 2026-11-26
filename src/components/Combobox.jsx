import PropTypes from 'prop-types';
import './Combobox.css';

/**
 * A type-to-filter field for picking several items from a long list. Picked items become tokens that can be removed
 * with their close icon. Open the list below with Menu Item rows as the person types.
 * Props mirror the Figma component: State. The picked items come in as value, and onRemove tells you which one to drop.
 */
export function Combobox({ state, value = [], placeholder, onChange, ...rest }) {
  const tokens = state === 'empty' ? [] : value;
  return (
    <div className="ds-combobox">
      {tokens.map((item) => (
        <span className="ds-combobox__token" key={item}>
          {item}
          <button type="button" className="ds-combobox__remove" aria-label={`Remove ${item}`} onClick={() => onChange && onChange(value.filter((v) => v !== item))}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
            </svg>
          </button>
        </span>
      ))}
      <input
        className="ds-combobox__input"
        type="text"
        role="combobox"
        aria-expanded="false"
        aria-autocomplete="list"
        placeholder={tokens.length ? undefined : placeholder}
        aria-label={placeholder}
        {...rest}
      />
    </div>
  );
}

Combobox.propTypes = {
  /** Figma: State. Empty has no tokens and shows the placeholder. Without it the picked items show as tokens. Hover and Focus come from the browser. */
  state: PropTypes.oneOf(['empty']),
  /** The picked items, shown as tokens. */
  value: PropTypes.arrayOf(PropTypes.string),
  placeholder: PropTypes.string,
  /** Called with the remaining items when a token is removed. */
  onChange: PropTypes.func,
};
