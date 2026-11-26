import PropTypes from 'prop-types';
import './Skeleton.css';

/**
 * A grey placeholder that holds the shape of content while it loads. Copy the layout of what will replace it,
 * and remove it as soon as the content arrives. It is hidden from screen readers: announce loading on the container.
 */
export function Skeleton({ shape = 'line' }) {
  return <span className={`ds-skeleton ds-skeleton--${shape}`} aria-hidden="true" />;
}

Skeleton.propTypes = {
  /** Circle for an avatar, line for text, line-large for a heading and block for an image. */
  shape: PropTypes.oneOf(['line', 'line-large', 'block', 'circle']),
};
