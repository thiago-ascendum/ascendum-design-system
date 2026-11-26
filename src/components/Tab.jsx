import PropTypes from 'prop-types';
import './Tab.css';

/**
 * One tab in a row that switches between views of the same page. Use two to five peer views inside an element with role="tablist".
 * The count is optional and only for things that can be counted, such as open items.
 */
export function Tab({ label, selected = false, count, type = 'button', ...rest }) {
  const hasCount = count !== undefined && count !== null;
  return (
    <button
      type={type}
      role="tab"
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      className={`ds-tab${selected ? ' ds-tab--selected' : ''}`}
      {...rest}
    >
      <span className="ds-tab__label">{label}</span>
      {hasCount ? <span className="ds-tab__count">{count}</span> : null}
    </button>
  );
}

Tab.propTypes = {
  /** Name of the view, one or two words, sentence case. */
  label: PropTypes.string.isRequired,
  /** The tab whose view is showing. Only one tab in a row is selected. */
  selected: PropTypes.bool,
  /** Optional number of items in the view. Leave it out when nothing can be counted. */
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
};
