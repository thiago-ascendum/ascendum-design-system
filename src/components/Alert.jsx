import PropTypes from 'prop-types';
import './Alert.css';

const ICONS = {
  neutral: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1 5h2v2h-2V7Zm0 4h2v6h-2v-6Z',
  info: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1 5h2v2h-2V7Zm0 4h2v6h-2v-6Z',
  success: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1.5 14.5-4-4 1.4-1.4 2.6 2.6 5.6-5.6 1.4 1.4-7 7Z',
  warning: 'M12 2 1 21h22L12 2Zm-1 7h2v6h-2V9Zm0 8h2v2h-2v-2Z',
  error: 'M12 2 1 21h22L12 2Zm-1 7h2v6h-2V9Zm0 8h2v2h-2v-2Z',
};

/**
 * Inline message about the state of the page or a form. Use it when the person needs to read something before carrying on.
 * Neutral is for general notes and the coloured tones are for feedback only. For a message that disappears on its own, use Toast.
 */
export function Alert({ title, text, tone = 'neutral' }) {
  return (
    <div className={`ds-alert ds-alert--${tone}`} role={tone === 'error' ? 'alert' : 'status'}>
      <svg className="ds-alert__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d={ICONS[tone]} fill="currentColor" />
      </svg>
      <div className="ds-alert__body">
        <p className="ds-alert__title">{title}</p>
        <p className="ds-alert__text">{text}</p>
      </div>
    </div>
  );
}

Alert.propTypes = {
  /** A short heading that names what happened, in sentence case. */
  title: PropTypes.string.isRequired,
  /** One or two sentences that say what to do next. */
  text: PropTypes.string.isRequired,
  /** Neutral: a general note. Info: worth knowing. Success: done. Warning: needs attention. Error: something failed. */
  tone: PropTypes.oneOf(['neutral', 'info', 'success', 'warning', 'error']),
};
