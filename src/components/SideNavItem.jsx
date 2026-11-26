import PropTypes from 'prop-types';
import './SideNavItem.css';

/**
 * One row in the side navigation. Use it only inside Side Navigation.
 * The panel is always dark, so labels use the inverted text colour, and Active turns into a light pill. Hover comes from the browser.
 * Props mirror the Figma component: Label, State.
 */
export function SideNavItem({ label, state = 'default', href = '#', ...rest }) {
  const active = state === 'active';
  return (
    <a href={href} className={`ds-side-nav-item${active ? ' ds-side-nav-item--active' : ''}`} aria-current={active ? 'page' : undefined} {...rest}>
      <svg className="ds-side-nav-item__icon" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
        <path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="ds-side-nav-item__label">{label}</span>
    </a>
  );
}

SideNavItem.propTypes = {
  /** Figma: Label. One short word or two, sentence case. */
  label: PropTypes.string.isRequired,
  /** Figma: State. Show exactly one Active item. Hover comes from the browser. */
  state: PropTypes.oneOf(['default', 'active']),
  /** Where the item goes. Link wiring, not a Figma property. */
  href: PropTypes.string,
};
