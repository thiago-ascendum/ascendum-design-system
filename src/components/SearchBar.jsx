import PropTypes from 'prop-types';
import './SearchBar.css';

/**
 * A single-line field for searching a list or a page. Default goes in page headers, Compact inside toolbars and tables.
 * Muted is for a busy surface. Error is for a search that cannot run: say the reason next to the field.
 * Props mirror the Figma component: Value, Size, State.
 */
export function SearchBar({ value, size = 'default', state = 'default', placeholder, defaultValue, ...rest }) {
  const text = value ?? placeholder;
  return (
    <div className={`ds-search ds-search--${size} ds-search--${state}`}>
      <svg className="ds-search__icon" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M13 13l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      </svg>
      <input
        className="ds-search__input"
        type="search"
        placeholder={text}
        defaultValue={defaultValue}
        aria-label={text}
        aria-invalid={state === 'error' ? 'true' : undefined}
        {...rest}
      />
    </div>
  );
}

SearchBar.propTypes = {
  /** Figma: Value. The text that says what is searched. Shown as the placeholder. */
  value: PropTypes.string,
  /** Figma: Size. Default in page headers, Compact in toolbars and tables. */
  size: PropTypes.oneOf(['default', 'compact']),
  /** Figma: State. Muted stays quiet on a busy surface. Error is a search that cannot run. Hover and Focus come from the browser. */
  state: PropTypes.oneOf(['default', 'muted', 'error']),
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
};
