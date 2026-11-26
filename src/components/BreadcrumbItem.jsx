import PropTypes from 'prop-types';
import './BreadcrumbItem.css';

/**
 * One step in the trail back up a page hierarchy, followed by a chevron. Earlier steps are muted links;
 * the current page is semi-bold, is not a link and has no chevron (set separator to false on it).
 * Props mirror the Figma component: Label, Separator, State.
 */
export function BreadcrumbItem({ label, separator = true, state = 'link', href = '#', ...rest }) {
  const current = state === 'current';
  return (
    <span className={`ds-breadcrumb-item ds-breadcrumb-item--${state}`}>
      {current
        ? <span className="ds-breadcrumb-item__label" aria-current="page" {...rest}>{label}</span>
        : <a className="ds-breadcrumb-item__label" href={href} {...rest}>{label}</a>}
      {separator ? (
        <svg className="ds-breadcrumb-item__separator" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
          <path d="m9 6 6 6-6 6" />
        </svg>
      ) : null}
    </span>
  );
}

BreadcrumbItem.propTypes = {
  /** Figma: Label. The name of the page this step goes to. */
  label: PropTypes.string.isRequired,
  /** Figma: Separator. The chevron after the step. Off on the last item, which is the current page. */
  separator: PropTypes.bool,
  /** Figma: State. Link is a muted link. Current is the page the person is on. Hover comes from the browser. */
  state: PropTypes.oneOf(['link', 'current']),
  /** Where the link goes. Link wiring, not a Figma property. */
  href: PropTypes.string,
};
