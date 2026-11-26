import PropTypes from 'prop-types';
import { Children } from 'react';
import './TableRow.css';

/**
 * One table row, including the Header variant. Use it only inside Table.
 * Pass the cell text as children, one child per column. Cells share the row by weight, so columns survive a resize.
 * Hover comes from the browser. Props mirror the Figma component: State.
 */
export function TableRow({ state = 'default', children, ...rest }) {
  const header = state === 'header';
  const cells = Children.toArray(children);
  return (
    <div role="row" aria-selected={state === 'selected' ? true : undefined} className={`ds-table-row ds-table-row--${state}`} {...rest}>
      {cells.map((cell, i) => (
        <div role={header ? 'columnheader' : 'cell'} className="ds-table-row__cell" key={i}>{cell}</div>
      ))}
    </div>
  );
}

TableRow.propTypes = {
  /** Figma: State. Header is the column titles, once, at the top. Selected marks the one chosen row. Hover comes from the browser. */
  state: PropTypes.oneOf(['default', 'selected', 'header']),
  /** One child per cell, short text on one line. */
  children: PropTypes.node,
};
