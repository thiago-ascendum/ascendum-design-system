import PropTypes from 'prop-types';
import './ProgressBar.css';

/**
 * Determinate progress for a task with a known length, such as an upload or a migration.
 * Pair it with a visible label and the percentage. Do not use it when the length is unknown.
 */
export function ProgressBar({ value, label, size = 'sm', tone = 'default' }) {
  const clamped = Math.min(100, Math.max(0, Number(value) || 0));
  return (
    <div
      className={`ds-progress ds-progress--${size}`}
      role="progressbar"
      aria-label={label}
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className={`ds-progress__fill ds-progress__fill--${tone}`} style={{ width: `${clamped}%` }} />
    </div>
  );
}

ProgressBar.propTypes = {
  /** How much is done, from 0 to 100. */
  value: PropTypes.number.isRequired,
  /** What is progressing, for screen readers, such as "Upload progress". */
  label: PropTypes.string.isRequired,
  /** Small inside cards and tables. Large when the bar is the main thing on screen. */
  size: PropTypes.oneOf(['sm', 'lg']),
  /** Default for normal progress. Success when finished. Warning when slow or at risk. Error when it failed. */
  tone: PropTypes.oneOf(['default', 'success', 'warning', 'error']),
};
