import PropTypes from 'prop-types';
import './OverviewCard.css';

/**
 * Project summary card for a project page: intro text, key stakeholders, team groups and a link out.
 * Use it once per project, as the single summary. Not for a list of projects, and not for one number (use Stat Card).
 * The card inverts when a parent has data-context="inverted", as Figma sets the Context mode.
 * Props mirror the Figma component: Inverted. Its parts are children: OverviewCard.Header, OverviewCard.Team, OverviewCard.Footer.
 */
export function OverviewCard({ inverted = false, children }) {
  return (
    <article className="ds-overview-card" {...(inverted ? { 'data-context': 'inverted' } : {})}>
      {children}
    </article>
  );
}

/** Title and intro text. Paragraphs are children. */
function Header({ title, children }) {
  return (
    <header className="ds-overview-card__header">
      <h2 className="ds-overview-card__title">{title}</h2>
      <div className="ds-overview-card__intro">{children}</div>
    </header>
  );
}

/** The team block: a heading, then the Key Stakeholders Card and Team Cards as children. */
function Team({ title, children }) {
  return (
    <section className="ds-overview-card__team">
      <h3 className="ds-overview-card__team-title">{title}</h3>
      <div className="ds-overview-card__team-body">{children}</div>
    </section>
  );
}

/** Credit line on the left, the link out (a Button) as children on the right. */
function Footer({ caption, children }) {
  return (
    <footer className="ds-overview-card__footer">
      <p className="ds-overview-card__caption">{caption}</p>
      {children}
    </footer>
  );
}
OverviewCard.Header = Header;
OverviewCard.Team = Team;
OverviewCard.Footer = Footer;

OverviewCard.propTypes = {
  /** Figma: Inverted. Draws the card on the opposite surface. A parent with data-context="inverted" does the same. */
  inverted: PropTypes.bool,
  /** OverviewCard.Header, OverviewCard.Team, OverviewCard.Footer. */
  children: PropTypes.node,
};

Header.propTypes = { title: PropTypes.string.isRequired, children: PropTypes.node };
Team.propTypes = { title: PropTypes.string.isRequired, children: PropTypes.node };
Footer.propTypes = { caption: PropTypes.string.isRequired, children: PropTypes.node };
