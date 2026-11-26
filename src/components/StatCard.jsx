import { useId } from 'react';
import PropTypes from 'prop-types';
import './StatCard.css';

/**
 * One number and what it counts. The label sits above the value and the number is the emphasis: no accent strip, no icon.
 * Use it in a row of two to four with the same height.
 */
export function StatCard({ label, value }) {
  const id = useId();
  return (
    <div className="ds-stat-card" role="group" aria-labelledby={id}>
      <div className="ds-stat-card__body">
        <span className="ds-stat-card__label" id={id}>{label}</span>
        <span className="ds-stat-card__value">{value}</span>
      </div>
    </div>
  );
}

StatCard.propTypes = {
  /** What the number counts, in sentence case. */
  label: PropTypes.string.isRequired,
  /** The figure. Keep it to a number or a short value such as 92%. */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
