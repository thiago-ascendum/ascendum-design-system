import PropTypes from 'prop-types';
import { Button } from './Button.jsx';
import './SectionLetsConnect.css';

/**
 * Closing call to action. Use it once, as the last block of a page. Centred, with the gradient on the second line.
 * For a dark band, set data-context="inverted" on a parent: the section and its button follow.
 * Props mirror the Figma component: Variant.
 */
export function SectionLetsConnect({ variant = 'default' }) {
  return (
    <section className={`ds-section-lets-connect ds-section-lets-connect--${variant}`}>
      <h2 className="ds-section-lets-connect__title">
        <span className="ds-section-lets-connect__heading">Ready to take the next step?</span>
        <span className="ds-section-lets-connect__gradient">Let&apos;s connect.</span>
      </h2>
      <Button style="outline" label="Get in touch" leadingIcon icon={(
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
      )} />
    </section>
  );
}

SectionLetsConnect.propTypes = {
  /** Figma: Variant. Only Default exists. */
  variant: PropTypes.oneOf(['default']),
};
