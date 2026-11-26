import PropTypes from 'prop-types';
import './SectionQuote.css';

/**
 * Pull quote with attribution. Use it once per page to give weight to a real person's words.
 * The 2px rule beside the attribution is a border. On a dark band, set data-context="inverted" on a parent.
 * Children replace the attribution (author and role). Props mirror the Figma component: Quote, Size.
 */
export function SectionQuote({ quote = '“They didn\'t just build what we asked for.”', size = 'h1', children }) {
  return (
    <figure className={`ds-section-quote ds-section-quote--${size}`}>
      <blockquote className="ds-section-quote__quote">{quote}</blockquote>
      <figcaption className="ds-section-quote__attribution">
        {children || (
          <>
            <span className="ds-section-quote__author">Amara Bello</span>
            <span className="ds-section-quote__role">Head of Product, Northwind</span>
          </>
        )}
      </figcaption>
    </figure>
  );
}

SectionQuote.propTypes = {
  /** Figma: Quote. The words, in two sentences at most. */
  quote: PropTypes.string,
  /** Figma: Size. H1 is Display size, H2 is smaller. */
  size: PropTypes.oneOf(['h1', 'h2']),
  /** Attribution content: the author and the role. */
  children: PropTypes.node,
};
