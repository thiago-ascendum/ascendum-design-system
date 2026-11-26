import PropTypes from 'prop-types';
import './SectionShowcase.css';

/**
 * Text beside an image or video. Use it to explain one idea with a visual. MediaLeft swaps the order.
 * The media slot is a dashed placeholder, filled on the instance. Children replace the heading and body.
 * On a dark band, set data-context="inverted" on a parent. Props mirror the Figma component: MediaLeft (prop medialeft).
 */
export function SectionShowcase({ medialeft = false, children }) {
  return (
    <section className={`ds-section-showcase${medialeft ? ' ds-section-showcase--media-left' : ''}`}>
      <div className="ds-section-showcase__row">
        <div className="ds-section-showcase__text">
          {children || (
            <>
              <h2 className="ds-section-showcase__heading">One idea, shown next to the thing itself</h2>
              <p className="ds-section-showcase__body">Pair one message with one image, so the visual does the explaining and the words stay short.</p>
            </>
          )}
        </div>
        <div className="ds-section-showcase__media" role="img" aria-label="Media placeholder" />
      </div>
    </section>
  );
}

SectionShowcase.propTypes = {
  /** Figma: MediaLeft. On puts the media before the text. */
  medialeft: PropTypes.bool,
  /** Heading and body, replacing the sample text. */
  children: PropTypes.node,
};
