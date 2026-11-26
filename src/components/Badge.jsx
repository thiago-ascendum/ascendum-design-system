import PropTypes from 'prop-types';
import './Badge.css';

/**
 * Small status pill. Use it to show the state of an item in a table or list.
 * Do not use it for actions or for decoration.
 */
export function Badge({ label, tone = 'neutral', dot = false }) {
  return (
    <span className={`ds-badge ds-badge--${tone}`}>
      {dot ? <span className="ds-badge__dot" aria-hidden="true" /> : null}
      {label}
    </span>
  );
}

Badge.propTypes = {
  /** One or two words, sentence case. */
  label: PropTypes.string.isRequired,
  /** Neutral: nothing to flag. Success: done or healthy. Info: in progress. Warning: needs attention soon. Error: blocked or failed. */
  tone: PropTypes.oneOf(['neutral', 'success', 'info', 'warning', 'error']),
  /** Repeats the colour as a dot, for people who cannot tell the tones apart. */
  dot: PropTypes.bool,
};
