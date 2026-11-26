import PropTypes from 'prop-types';
import { SideNavItem } from './SideNavItem.jsx';
import './SideNavigation.css';

/**
 * Application side navigation, always dark in every mode. Use it for apps with several top-level areas, with at most seven items.
 * Not for marketing pages: use Navigation Bar. Items are Side Nav Item instances; with no children it draws the Figma example.
 * One component in Figma, no properties.
 */
export function SideNavigation({ children, ...rest }) {
  return (
    <nav className="ds-side-navigation" aria-label="Application" {...rest}>
      <div className="ds-side-navigation__brand">
        <span className="ds-side-navigation__mark" aria-hidden="true" />
        <span className="ds-side-navigation__name">Ascendum</span>
      </div>
      <div className="ds-side-navigation__items">
        {children !== undefined ? children : (
          <>
            <SideNavItem label="Overview" state="active" />
            <SideNavItem label="Projects" />
            <SideNavItem label="Team" />
            <SideNavItem label="Settings" />
          </>
        )}
      </div>
    </nav>
  );
}

SideNavigation.propTypes = {
  /** SideNavItem elements, one of them active. Leave out for the Figma example. */
  children: PropTypes.node,
};
