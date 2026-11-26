import PropTypes from 'prop-types';
import { TableRow } from './TableRow.jsx';
import './Table.css';

/**
 * Records in rows, compared across the same fields. Rows are Table Row instances: a TableToolbar, one Header row, then the body rows.
 * The container clips to the card radius, which rounds the corner rows. With no children it draws the Figma example.
 * One component in Figma, no properties.
 */
export function Table({ children, ...rest }) {
  return (
    <div role="table" className="ds-table" {...rest}>
      {children !== undefined ? children : (
        <>
          <TableToolbar title="Projects" count="24 items" />
          <TableRow state="header">{['Project', 'Team', 'Status', 'Updated']}</TableRow>
          <TableRow>{['Website redesign', 'Design', 'In review', '2 days ago']}</TableRow>
          <TableRow>{['Mortgage portal', 'Engineering', 'In progress', 'Today']}</TableRow>
          <TableRow>{['Brand guide site', 'Design', 'Done', '12 Nov']}</TableRow>
          <TableRow>{['Careers page', 'Content', 'Blocked', '3 weeks ago']}</TableRow>
        </>
      )}
    </div>
  );
}

Table.propTypes = {
  /** TableToolbar, then TableRow items (first one with state header). Leave out for the Figma example. */
  children: PropTypes.node,
};

/** The title and the item count above the header row (the Toolbar frame of the Figma component). */
export function TableToolbar({ title, count }) {
  return (
    <div className="ds-table__toolbar">
      <h4 className="ds-table__title">{title}</h4>
      {count ? <span className="ds-table__count">{count}</span> : null}
    </div>
  );
}
