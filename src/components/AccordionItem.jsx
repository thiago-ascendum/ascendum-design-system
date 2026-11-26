import { useId, useState } from 'react';
import PropTypes from 'prop-types';
import './AccordionItem.css';

/**
 * One row of an accordion: a question that opens to show its answer. Stack several to build an accordion.
 * Children is the answer, shown when the row is expanded. The row opens and closes itself when pressed;
 * pass state to set it from outside. Props mirror the Figma component: Title, State. Hover comes from the browser.
 */
export function AccordionItem({ title, state, defaultState = 'collapsed', children, onClick, ...rest }) {
  const [inner, setInner] = useState(defaultState);
  const current = state || inner;
  const expanded = current === 'expanded';
  const uid = useId();
  return (
    <div className={`ds-accordion-item${expanded ? ' ds-accordion-item--expanded' : ''}`} {...rest}>
      <h3 className="ds-accordion-item__heading">
        <button
          type="button"
          className="ds-accordion-item__header"
          id={`${uid}-h`}
          aria-expanded={expanded}
          aria-controls={`${uid}-b`}
          onClick={(e) => { setInner(expanded ? 'collapsed' : 'expanded'); if (onClick) onClick(e); }}
        >
          <span className="ds-accordion-item__title">{title}</span>
          <svg className="ds-accordion-item__chevron" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
            <path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
          </svg>
        </button>
      </h3>
      <div className="ds-accordion-item__body" id={`${uid}-b`} role="region" aria-labelledby={`${uid}-h`} hidden={!expanded}>
        <p className="ds-accordion-item__text">{children}</p>
      </div>
    </div>
  );
}

AccordionItem.propTypes = {
  /** Figma: Title. Write the header as the question people ask. */
  title: PropTypes.string.isRequired,
  /** Figma: State. Expanded shows the answer. Hover comes from the browser. Leave it out to let the row open itself. */
  state: PropTypes.oneOf(['collapsed', 'expanded']),
  /** The state a row starts in when it opens itself. */
  defaultState: PropTypes.oneOf(['collapsed', 'expanded']),
  /** The answer, a few lines. */
  children: PropTypes.node,
  onClick: PropTypes.func,
};
