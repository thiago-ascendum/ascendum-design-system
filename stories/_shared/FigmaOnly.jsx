import PropTypes from 'prop-types';
import { ThemedImg } from './ThemedImg.jsx';

/** Stands in for a component that exists in Figma and has no code yet: the Figma drawing of it, in Light and Dark. */
export function FigmaOnly({ name, img, imgDark }) {
  return <ThemedImg className="fd-figma-img" src={img} dark={imgDark} alt={`${name} in Figma: every variant, named. Not in code yet.`} />;
}

FigmaOnly.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  imgDark: PropTypes.string,
};
