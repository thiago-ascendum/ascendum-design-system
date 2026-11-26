import PropTypes from 'prop-types';
import { Button } from './Button.jsx';
import './JiraAnnotation.css';

const FOCUS = ['Information hierarchy', 'Navigation and discoverability.', 'Form behaviour and feedback.', 'Responsive and accessible states.'];
const REQUIREMENTS = [
  'Organize settings into clear, scannable groups.',
  'Make primary actions easy to identify and understand.',
  'Provide clear feedback when changes are saved.',
  'Preserve user input when validation errors occur.',
  'Support keyboard navigation and smaller screen sizes.',
];
const CRITERIA = [
  'Settings categories and controls are clearly labeled.',
  'Users receive confirmation after saving changes.',
  'Validation errors identify the affected field and the list of required actions.',
  'The experience remains usable across screen sizes.',
];

const Chevron = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M6 3.5 10.5 8 6 12.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const Check = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

/**
 * Jira-powered annotation panel for design review. It sits next to the frame under review, never inside a product screen.
 * Jira is the source of truth: the text below is the placeholder a populate step replaces with the ticket.
 * There are no Figma properties, so it has no props: the structure and the layer names are the contract.
 */
export function JiraAnnotation() {
  return (
    <section className="ds-jira-annotation" aria-label="Jira annotation">
      <header className="ds-jira-annotation__header">
        <p className="ds-jira-annotation__meta">
          <span>Project annotation</span><span aria-hidden="true">·</span><span>PROJ-1234</span>
        </p>
        <h2 className="ds-jira-annotation__summary">Improve account settings experience</h2>
      </header>
      <div className="ds-jira-annotation__badges">
        <span className="ds-jira-annotation__badge ds-jira-annotation__badge--status">
          <span className="ds-jira-annotation__dot" aria-hidden="true" />Ready for Review
        </span>
        <span className="ds-jira-annotation__badge ds-jira-annotation__badge--priority">Priority: Minor</span>
      </div>
      <div className="ds-jira-annotation__section ds-jira-annotation__section--objective">
        <h3 className="ds-jira-annotation__label">Objective</h3>
        <p className="ds-jira-annotation__text">Create a clearer settings experience that helps users understand available options and make changes with confidence.</p>
      </div>
      <div className="ds-jira-annotation__section">
        <div className="ds-jira-annotation__focus">
          <h3 className="ds-jira-annotation__label">Review Focus</h3>
          <ul className="ds-jira-annotation__list">
            {FOCUS.map((t) => (
              <li className="ds-jira-annotation__item" key={t}><span className="ds-jira-annotation__chevron"><Chevron /></span><span className="ds-jira-annotation__text">{t}</span></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="ds-jira-annotation__section ds-jira-annotation__section--ruled">
        <h3 className="ds-jira-annotation__label">Design Requirements</h3>
        <ol className="ds-jira-annotation__list">
          {REQUIREMENTS.map((t, i) => (
            <li className="ds-jira-annotation__item" key={t}><span className="ds-jira-annotation__number" aria-hidden="true">{i + 1}.</span><span className="ds-jira-annotation__text">{t}</span></li>
          ))}
        </ol>
      </div>
      <div className="ds-jira-annotation__section ds-jira-annotation__section--ruled">
        <h3 className="ds-jira-annotation__label">Acceptance Criteria</h3>
        <ul className="ds-jira-annotation__list">
          {CRITERIA.map((t) => (
            <li className="ds-jira-annotation__item" key={t}><span className="ds-jira-annotation__check"><Check /></span><span className="ds-jira-annotation__text">{t}</span></li>
          ))}
        </ul>
      </div>
      <footer className="ds-jira-annotation__footer">
        <div className="ds-jira-annotation__source">
          <span className="ds-jira-annotation__source-line">Source of truth: Jira</span>
          <span className="ds-jira-annotation__updated">Updated Aug 10<span aria-hidden="true"> · </span>Design v2</span>
        </div>
        <Button label="Open PROJ-1234" />
      </footer>
    </section>
  );
}

JiraAnnotation.propTypes = {};
