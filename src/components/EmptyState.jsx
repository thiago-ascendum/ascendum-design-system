import PropTypes from 'prop-types';
import './EmptyState.css';

/**
 * What to show when a list or search has nothing in it yet, and the one thing to do next.
 * Figma has one component with no properties: a dashed icon ring, a title, a line of text and the actions.
 * Compose the content with EmptyStateTitle, EmptyStateText and EmptyStateActions as children.
 */
export function EmptyState({ children, ...rest }) {
  return (
    <section className="ds-empty-state" {...rest}>
      <span className="ds-empty-state__ring" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="28" height="28" focusable="false">
          <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="m16 16 4.5 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
        </svg>
      </span>
      {children}
    </section>
  );
}

/** Says why it is empty. */
export function EmptyStateTitle({ children }) {
  return <h3 className="ds-empty-state__title">{children}</h3>;
}

/** One or two lines, capped at 360px so the line stays readable. */
export function EmptyStateText({ children }) {
  return <p className="ds-empty-state__text">{children}</p>;
}

/** The next step: a solid Button, and optionally a ghost Button beside it. */
export function EmptyStateActions({ children }) {
  return <div className="ds-empty-state__actions">{children}</div>;
}

EmptyState.propTypes = {
  /** The title, text and actions, in that order. */
  children: PropTypes.node,
};
EmptyStateTitle.propTypes = { children: PropTypes.node };
EmptyStateText.propTypes = { children: PropTypes.node };
EmptyStateActions.propTypes = { children: PropTypes.node };
