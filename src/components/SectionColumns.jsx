import PropTypes from 'prop-types';
import './SectionColumns.css';

const defaults = [
  ['Vibe check', 'A fast read on what you have built and what it will take to make it production-ready.'],
  ['Hardening', 'Architecture, accessibility and performance brought up to the standard a real product needs.'],
  ['Handover', 'A codebase and documentation your own team can run without us in the room.'],
  ['Support', 'A month alongside your team after launch, then a clean exit.'],
];

/**
 * Feature block with two to four columns of equal weight, sharing the width with the column gap.
 * Without children it draws the first N sample columns. On a dark band, set data-context="inverted" on a parent.
 * Props mirror the Figma component: Columns.
 */
export function SectionColumns({ columns = '3', children }) {
  const count = Number(columns);
  return (
    <section className={`ds-section-columns ds-section-columns--${columns}`}>
      <div className="ds-section-columns__row">
        {children || defaults.slice(0, count).map(([t, b]) => (
          <div className="ds-section-columns__column" key={t}>
            <svg className="ds-section-columns__icon" width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M24 26a2 2 0 1 1 2-2 6 6 0 1 1-6-6 10 10 0 1 1-10 10 14 14 0 0 1 28-2" />
            </svg>
            <h3 className="ds-section-columns__title">{t}</h3>
            <p className="ds-section-columns__body">{b}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

SectionColumns.propTypes = {
  /** Figma: Columns. How many columns: 2, 3 or 4. */
  columns: PropTypes.oneOf(['2', '3', '4']),
  /** Columns using the ds-section-columns__column markup, replacing the sample columns. */
  children: PropTypes.node,
};
