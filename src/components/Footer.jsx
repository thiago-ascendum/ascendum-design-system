import PropTypes from 'prop-types';
import './Footer.css';

const GROUPS = [
  ['Services', ['Strategy', 'Design', 'Engineering']],
  ['Company', ['About', 'Careers', 'Insights']],
  ['Connect', ['Contact', 'LinkedIn', 'Newsletter']],
];

/**
 * Page footer: a row of link groups above a legal bar. Use it once, at the bottom of every page, with three groups or fewer.
 * Set data-context="inverted" on the footer or its section to invert the links area. The legal bar is always dark.
 * Children replace the link groups; with none it draws the Figma example. Props mirror the Figma component: Variant.
 */
export function Footer({ variant = 'default', children, ...rest }) {
  return (
    <footer className={`ds-footer ds-footer--${variant}`} {...rest}>
      <div className="ds-footer__links">
        {children !== undefined ? children : GROUPS.map(([title, items]) => (
          <div className="ds-footer__group" key={title}>
            <h2 className="ds-footer__title">{title}</h2>
            <ul className="ds-footer__list">
              {items.map((i) => <li key={i}><a className="ds-footer__link" href="#">{i}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="ds-footer__legal">
        <span className="ds-footer__logo" aria-label="Ascendum">ascendum</span>
        <span className="ds-footer__legal-text">© 2026 Ascendum · Privacy · Terms</span>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  /** Figma: Variant. Only Default exists. */
  variant: PropTypes.oneOf(['default']),
  /** Groups of links (class ds-footer__group with a ds-footer__title and a ds-footer__list). Leave out for the Figma example. */
  children: PropTypes.node,
};
