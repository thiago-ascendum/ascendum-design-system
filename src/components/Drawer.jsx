import { useEffect, useId, useRef } from 'react';
import PropTypes from 'prop-types';
import './Drawer.css';

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Side panel for detail or editing while the page stays visible behind it. It draws in place (role="dialog"),
 * so the documentation page can show it inline; wrap it in DrawerOverlay to dock it to the edge of the page.
 * Children is the body. onClose is called by the Close button.
 * Props mirror the Figma component: Title, Side.
 */
export function Drawer({ title, side = 'right', children, onClick, ...rest }) {
  const id = useId();
  return (
    <aside className={`ds-drawer ds-drawer--${side}`} role="dialog" aria-modal="true" aria-labelledby={`${id}-title`} {...rest}>
      <div className="ds-drawer__header">
        <h2 className="ds-drawer__title" id={`${id}-title`}>{title}</h2>
        <button type="button" className="ds-drawer__close" aria-label="Close" onClick={onClick}>
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
            <path d="m6 6 12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
          </svg>
        </button>
      </div>
      <div className="ds-drawer__body">{children}</div>
    </aside>
  );
}

/**
 * Docks its children (a Drawer) to the edge of the page, with the page still visible behind it. Not drawn when open is false.
 * Focus moves into the drawer when it opens, Tab stays inside it, Escape calls onClose, and focus returns to where it was.
 */
export function DrawerOverlay({ open = false, side = 'right', onClose, children }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    const before = document.activeElement;
    const first = ref.current && ref.current.querySelector(FOCUSABLE);
    if (first) first.focus();
    return () => { if (before && before.focus) before.focus(); };
  }, [open]);
  if (!open) return null;
  const onKeyDown = (e) => {
    if (e.key === 'Escape' && onClose) { e.stopPropagation(); onClose(); return; }
    if (e.key !== 'Tab' || !ref.current) return;
    const items = ref.current.querySelectorAll(FOCUSABLE);
    if (!items.length) return;
    const a = items[0]; const z = items[items.length - 1];
    if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
    else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
  };
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className={`ds-drawer-overlay ds-drawer-overlay--${side}`} ref={ref} onKeyDown={onKeyDown}>
      {children}
    </div>
  );
}

Drawer.propTypes = {
  /** Figma: Title. Names the panel, for example Filters. */
  title: PropTypes.string.isRequired,
  /** Figma: Side. The edge the panel sits on. */
  side: PropTypes.oneOf(['right', 'left']),
  /** The body of the panel: place molecules here. */
  children: PropTypes.node,
  /** Called when the Close button is pressed. */
  onClick: PropTypes.func,
};
DrawerOverlay.propTypes = {
  open: PropTypes.bool,
  side: PropTypes.oneOf(['right', 'left']),
  onClose: PropTypes.func,
  children: PropTypes.node,
};
