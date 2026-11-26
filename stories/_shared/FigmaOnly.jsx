import PropTypes from 'prop-types';

/** Stands in for a component that exists in Figma and has no code yet: the Figma drawing of it. */
export function FigmaOnly({ name, img }) {
  return <img className="fd-figma-img" src={img} alt={`${name} in Figma: every variant, named. Not in code yet.`} />;
}

FigmaOnly.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};
