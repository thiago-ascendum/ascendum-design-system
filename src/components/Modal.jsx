import { createContext, useContext, useEffect, useId, useRef } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

const ModalContext = createContext(null);
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * A short dialogue that stops the page until the person confirms or cancels. This is the dialogue card itself
 * (role="dialog", aria-modal) and it draws in place, so the documentation page can show it inline.
 * Compose it with ModalTitle, ModalText and ModalActions. To show it over the page on a scrim, wrap it in ModalOverlay.
 * Figma has one component with no properties.
 */
export function Modal({ children, ...rest }) {
  const id = useId();
  return (
    <ModalContext.Provider value={id}>
      <div className="ds-modal" role="dialog" aria-modal="true" aria-labelledby={`${id}-title`} {...rest}>
        {children}
      </div>
    </ModalContext.Provider>
  );
}

/** Says what will happen. Names the dialogue for screen readers. */
export function ModalTitle({ children }) {
  const id = useContext(ModalContext);
  return <div className="ds-modal__header"><h2 className="ds-modal__title" id={id ? `${id}-title` : undefined}>{children}</h2></div>;
}

/** One or two sentences. */
export function ModalText({ children }) {
  return <div className="ds-modal__body"><p className="ds-modal__text">{children}</p></div>;
}

/** The buttons, with the main action last, on the right. */
export function ModalActions({ children }) {
  return <div className="ds-modal__actions">{children}</div>;
}

/**
 * Shows its children (a Modal) over the page on a scrim. Not drawn when open is false.
 * Focus moves into the dialogue when it opens, Tab stays inside it, Escape calls onClose, and focus returns to where it was.
 */
export function ModalOverlay({ open = false, onClose, children }) {
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
    <div className="ds-modal-overlay" ref={ref} onKeyDown={onKeyDown}>
      {children}
    </div>
  );
}

Modal.propTypes = {
  /** The title, text and actions, in that order. */
  children: PropTypes.node,
};
ModalTitle.propTypes = { children: PropTypes.node };
ModalText.propTypes = { children: PropTypes.node };
ModalActions.propTypes = { children: PropTypes.node };
ModalOverlay.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
};
