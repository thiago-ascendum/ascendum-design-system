import PropTypes from 'prop-types';
import './SectionFullWidth.css';

/**
 * Full-bleed section with four layouts: Text Left, Text Right, Text Only and Media Only.
 * Use it for the main moments of a page, alternating Default and Inverted (data-context="inverted" on a parent).
 * The media slot is a dashed placeholder, filled on the instance. Children replace the heading and body.
 * Props mirror the Figma component: Layout.
 */
export function SectionFullWidth({ layout = 'text-left', children }) {
  const hasText = layout !== 'media-only';
  const hasMedia = layout !== 'text-only';
  return (
    <section className={`ds-section-full-width ds-section-full-width--${layout}`}>
      <div className="ds-section-full-width__row">
        {hasText ? (
          <div className="ds-section-full-width__text">
            {children || (
              <>
                <h2 className="ds-section-full-width__heading">A main moment of the page</h2>
                <p className="ds-section-full-width__body">Pick the layout by content: text, media or both, and alternate light and dark down the page.</p>
              </>
            )}
          </div>
        ) : null}
        {hasMedia ? (
          <div className="ds-section-full-width__media" role="img" aria-label="Media placeholder" />
        ) : null}
      </div>
    </section>
  );
}

SectionFullWidth.propTypes = {
  /** Figma: Layout. Text Left and Text Right put text beside media; Text Only and Media Only use one. */
  layout: PropTypes.oneOf(['text-left', 'text-right', 'text-only', 'media-only']),
  /** Heading and body, replacing the sample text. */
  children: PropTypes.node,
};
