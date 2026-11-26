import PropTypes from 'prop-types';
import './MenuItem.css';

/**
 * One row in a dropdown or context menu. Default is an everyday action, Error is the one action that destroys something.
 * Selected shows a tick for a choice that is on. Children is the shortcut written on the right (for example Ctrl+D);
 * a Selected row shows the tick instead of the shortcut. Put rows inside an element with role="menu".
 * Props mirror the Figma component: Label, Tone, State. Hover comes from the browser.
 */
export function MenuItem({ label, tone = 'default', state = 'default', children, type = 'button', ...rest }) {
  const selected = state === 'selected';
  return (
    <button
      type={type}
      role={selected ? 'menuitemcheckbox' : 'menuitem'}
      aria-checked={selected ? true : undefined}
      className={`ds-menu-item ds-menu-item--${tone}${selected ? ' ds-menu-item--selected' : ''}`}
      {...rest}
    >
      <span className="ds-menu-item__label">{label}</span>
      {selected ? (
        <svg className="ds-menu-item__check" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
          <path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
        </svg>
      ) : children ? <span className="ds-menu-item__shortcut">{children}</span> : null}
    </button>
  );
}

MenuItem.propTypes = {
  /** Figma: Label. One or two words, starting with a verb. */
  label: PropTypes.string.isRequired,
  /** Figma: Tone. Error is only for the action that cannot be undone. */
  tone: PropTypes.oneOf(['default', 'error']),
  /** Figma: State. Selected shows a tick for a choice that is on. Hover comes from the browser. */
  state: PropTypes.oneOf(['default', 'selected']),
  /** The shortcut text on the right, written as Ctrl+D. Not shown when the row is Selected. */
  children: PropTypes.node,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
};
