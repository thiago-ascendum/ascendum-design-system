import PropTypes from 'prop-types';
import './SectionHeader.css';

/**
 * Section heading with a gradient second line. Use it to open a page section, one per page, at the top.
 * Leave Gradient Line empty for a single line. On a dark band, set data-context="inverted" on a parent, as Figma sets the Context mode.
 * Props mirror the Figma component: Heading, Gradient Line, Level.
 */
export function SectionHeader({ heading = 'Take vibe-coded prototypes', gradientLine = 'all the way to viable.', level = 'h1' }) {
  const Tag = level;
  return (
    <section className={`ds-section-header ds-section-header--${level}`}>
      <Tag className="ds-section-header__title">
        <span className="ds-section-header__heading">{heading}</span>
        {gradientLine ? <span className="ds-section-header__gradient">{gradientLine}</span> : null}
      </Tag>
    </section>
  );
}

SectionHeader.propTypes = {
  /** Figma: Heading. The first line, in the text colour. */
  heading: PropTypes.string,
  /** Figma: Gradient Line. The second line, painted with the gradient. Empty gives a single line. */
  gradientLine: PropTypes.string,
  /** Figma: Level. H1 is Display size, H2 and H3 step down. */
  level: PropTypes.oneOf(['h1', 'h2', 'h3']),
};
