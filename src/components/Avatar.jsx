import PropTypes from 'prop-types';
import './Avatar.css';

/** First letter of the first and last word of a name. */
function initialsOf(name) {
  const words = name.trim().split(/\s+/);
  const first = words[0]?.[0] ?? '';
  const last = words.length > 1 ? words[words.length - 1][0] : '';
  return (first + last).toUpperCase();
}

/**
 * Initials on a soft colour tint. The tint only helps tell people apart: it never means a team, a role or a status.
 * Keep the same tone for the same person everywhere.
 */
export function Avatar({ name, size = 'medium', tone = 'blue' }) {
  return (
    <span className={`ds-avatar ds-avatar--${size} ds-avatar--${tone}`} role="img" aria-label={name}>
      <span aria-hidden="true">{initialsOf(name)}</span>
    </span>
  );
}

Avatar.propTypes = {
  /** Full name. It becomes the accessible name, and the initials are taken from it. */
  name: PropTypes.string.isRequired,
  /** Small 32 for tables and lists, medium 48 for cards, large 72 for a profile. */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** Tells people apart. Carries no meaning. */
  tone: PropTypes.oneOf(['blue', 'purple', 'red', 'stone']),
};
