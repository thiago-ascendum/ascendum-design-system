import PropTypes from 'prop-types';
import './Divider.css';

/**
 * A hairline that separates two groups of content. Use it only where spacing alone is not enough,
 * and never next to a card edge or table border that already separates the content.
 */
export function Divider({ orientation = 'horizontal' }) {
  if (orientation === 'vertical') {
    return <div className="ds-divider ds-divider--vertical" role="separator" aria-orientation="vertical" />;
  }
  return <hr className="ds-divider ds-divider--horizontal" />;
}

Divider.propTypes = {
  /** Horizontal runs the full width of its group. Vertical runs the full height, inside a row. */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
};
