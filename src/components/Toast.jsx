import PropTypes from 'prop-types';
import './Toast.css';

const ICONS = {
  neutral: <><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7.5v.5" /></>,
  success: <path d="M5 12.5 10 17.5 19 7" />,
  error: <><path d="M12 3.5 22 20.5H2L12 3.5Z" /><path d="M12 10v5M12 17.5v.5" /></>,
};

/**
 * A brief confirmation that floats over the page and goes away on its own. It stays on the inverted surface
 * in every mode, and only the icon changes with the tone. Not for anything the person must act on: use Alert.
 * Props mirror the Figma component: Title, Meta, Tone.
 */
export function Toast({ title, meta, tone = 'neutral' }) {
  return (
    <div className={`ds-toast ds-toast--${tone}`} role={tone === 'error' ? 'alert' : 'status'}>
      <svg className="ds-toast__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        {ICONS[tone]}
      </svg>
      <div className="ds-toast__body">
        <span className="ds-toast__title">{title}</span>
        <span className="ds-toast__meta">{meta}</span>
      </div>
    </div>
  );
}

Toast.propTypes = {
  /** Figma: Title. What happened, in a few words. */
  title: PropTypes.string.isRequired,
  /** Figma: Meta. When it happened, for example "Just now". */
  meta: PropTypes.string,
  /** Figma: Tone. Neutral: info. Success: done. Error: failed. Only the icon changes. */
  tone: PropTypes.oneOf(['neutral', 'success', 'error']),
};
