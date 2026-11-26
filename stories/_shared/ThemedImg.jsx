import PropTypes from 'prop-types';

/** An image exported from Figma in Light and in Dark. CSS in .storybook/docs.css shows the one that matches the theme. */
export function ThemedImg({ src, dark, alt, className = '' }) {
  return (
    <>
      <img className={`${className} ds-img-light`.trim()} src={src} alt={alt} />
      {dark ? <img className={`${className} ds-img-dark`.trim()} src={dark} alt={alt} /> : null}
    </>
  );
}

ThemedImg.propTypes = {
  src: PropTypes.string.isRequired,
  dark: PropTypes.string,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};
