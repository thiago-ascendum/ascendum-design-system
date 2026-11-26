import PropTypes from 'prop-types';
import { Avatar } from './Avatar.jsx';
import './TeamCard.css';

/**
 * A titled list of the people on one discipline of a project. Each row has an Avatar, a name and a role with the company.
 * One card per discipline, six people or fewer. The card inverts when a parent has data-context="inverted".
 * Props mirror the Figma component: Inverted. The title and the rows are its children: use TeamCard.Title and TeamCard.Member.
 */
export function TeamCard({ inverted = false, children }) {
  return (
    <section className="ds-team-card" {...(inverted ? { 'data-context': 'inverted' } : {})}>
      {children}
    </section>
  );
}

/** The discipline, for example Product & Strategy. */
function Title({ children }) {
  return <h3 className="ds-team-card__title">{children}</h3>;
}

/** The people go in a list: wrap Members in TeamCard.List. */
function List({ children }) {
  return <ul className="ds-team-card__list">{children}</ul>;
}

/** One person: an Avatar, a name and a role with the company. */
function Member({ name, role, tone = 'blue' }) {
  return (
    <li className="ds-team-card__member">
      <Avatar name={name} size="small" tone={tone} />
      <span className="ds-team-card__text">
        <span className="ds-team-card__name">{name}</span>
        <span className="ds-team-card__role">{role}</span>
      </span>
    </li>
  );
}
TeamCard.Title = Title;
TeamCard.List = List;
TeamCard.Member = Member;

TeamCard.propTypes = {
  /** Figma: Inverted. Draws the card on the opposite surface. A parent with data-context="inverted" does the same. */
  inverted: PropTypes.bool,
  /** TeamCard.Title, then TeamCard.List with up to six TeamCard.Member. */
  children: PropTypes.node,
};

Title.propTypes = { children: PropTypes.node.isRequired };
List.propTypes = { children: PropTypes.node };
Member.propTypes = {
  /** Full name of the person. */
  name: PropTypes.string.isRequired,
  /** Role, then the company: Product Manager, Ascendum. */
  role: PropTypes.string.isRequired,
  /** Avatar tone. Keep the same tone for the same person everywhere. */
  tone: PropTypes.oneOf(['blue', 'purple', 'red', 'stone']),
};
