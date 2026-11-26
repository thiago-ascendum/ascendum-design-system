import PropTypes from 'prop-types';
import './Tab.css';

/**
 * One tab in a row that switches between views of the same page. Use two to five peer views inside an element with role="tablist".
 * The count is optional and only for things that can be counted, such as open items.
 * Props mirror the Figma component: Label, State, Count.
 */
export function Tab({ label, state = 'default', count, type = 'button', ...rest }) {
  const active = state === 'active';
  const hasCount = count !== undefined && count !== null && count !== false;
  return (
    <button type={type} role="tab" aria-selected={active} tabIndex={active ? 0 : -1} className={`ds-tab${active ? ' ds-tab--active' : ''}`} {...rest}>
      <span className="ds-tab__label">{label}</span>
      {hasCount ? <span className="ds-tab__count">{count}</span> : null}
    </button>
  );
}

Tab.propTypes = {
  /** Figma: Label. Name of the view, one or two words, sentence case. */
  label: PropTypes.string.isRequired,
  /** Figma: State. Active is the tab whose view is showing; only one per row. Hover comes from the browser. */
  state: PropTypes.oneOf(['default', 'active']),
  /** Figma: Count. The number of items in the view; leave it out when nothing can be counted. */
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
};
