import PropTypes from 'prop-types';
import { Avatar } from './Avatar.jsx';
import './KeyStakeholdersCard.css';

/** The Ascendum mark, drawn from the Context logo roles so it inverts with its surface. */
function LogoMark() {
  return (
    <span className="ds-key-stakeholders-card__logo" role="img" aria-label="Ascendum Solutions, Inc">
      <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true">
        <circle cx="12" cy="12" r="12" fill="currentColor" />
        <path d="M7 15.5c0-3 2.2-5 5-5 2.6 0 4.5 1.8 4.5 4.2M12 6.5v7M9.5 9l2.5-2.5L14.5 9" fill="none" stroke="var(--ctx-logo-glyph)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/**
 * A titled list of the client and delivery partners on a project. Use it in a project overview.
 * Each row has a logo or an Avatar, a name and a one-line relationship. Four organisations at most.
 * The card inverts when a parent has data-context="inverted", as Figma sets the Context mode.
 * Props mirror the Figma component: Boolean, Inverted. The rows are its children: use KeyStakeholdersCard.Row.
 */
export function KeyStakeholdersCard({ boolean = false, inverted = false, children }) {
  return (
    <section className="ds-key-stakeholders-card" {...(inverted ? { 'data-context': 'inverted' } : {})}>
      <h3 className="ds-key-stakeholders-card__title">Key Stakeholders</h3>
      <ul className="ds-key-stakeholders-card__list" data-boolean={boolean ? 'true' : undefined}>{children}</ul>
    </section>
  );
}

/** One organisation: a logo or an Avatar, its name and its relationship to the project. */
function Row({ name, relationship, logo = false, tone = 'blue' }) {
  return (
    <li className="ds-key-stakeholders-card__row">
      {logo ? <LogoMark /> : <Avatar name={name} size="small" tone={tone} />}
      <span className="ds-key-stakeholders-card__text">
        <span className="ds-key-stakeholders-card__name">{name}</span>
        <span className="ds-key-stakeholders-card__relationship">{relationship}</span>
      </span>
    </li>
  );
}
KeyStakeholdersCard.Row = Row;

KeyStakeholdersCard.propTypes = {
  /** Figma: Boolean. Off by default. */
  boolean: PropTypes.bool,
  /** Figma: Inverted. Draws the card on the opposite surface. A parent with data-context="inverted" does the same. */
  inverted: PropTypes.bool,
  /** The organisations, as KeyStakeholdersCard.Row. Four at most. */
  children: PropTypes.node,
};

Row.propTypes = {
  /** Name of the organisation. */
  name: PropTypes.string.isRequired,
  /** One line: Client, Implementation partner. */
  relationship: PropTypes.string.isRequired,
  /** Shows the logo instead of an Avatar. */
  logo: PropTypes.bool,
  /** Avatar tone. */
  tone: PropTypes.oneOf(['blue', 'purple', 'red', 'stone']),
};
