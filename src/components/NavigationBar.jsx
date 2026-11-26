import PropTypes from 'prop-types';
import { Button } from './Button.jsx';
import './NavigationBar.css';

/**
 * The top bar of a page: logo, a few links and one call to action. Use it once per page, at the top.
 * For a dark bar, set data-context="inverted" on the bar or its section, as Figma sets the Context mode: the bar, the logo and the button follow.
 * Children replace the links; with none it draws the Figma example. Props mirror the Figma component: Variant.
 */
export function NavigationBar({ variant = 'default', children, ...rest }) {
  return (
    <header className={`ds-navigation-bar ds-navigation-bar--${variant}`} {...rest}>
      <a className="ds-navigation-bar__logo" href="#" aria-label="Ascendum home">ascendum</a>
      <nav className="ds-navigation-bar__nav" aria-label="Main">
        {children !== undefined ? children : (
          ['Work', 'Services', 'About', 'Insights'].map((l) => <a className="ds-navigation-bar__link" href="#" key={l}>{l}</a>)
        )}
        <Button style="outline" label="Get in touch" />
      </nav>
    </header>
  );
}

NavigationBar.propTypes = {
  /** Figma: Variant. Only Default exists. */
  variant: PropTypes.oneOf(['default']),
  /** Link elements (use class ds-navigation-bar__link). Leave out for the Figma example. */
  children: PropTypes.node,
};
