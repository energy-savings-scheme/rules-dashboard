/***************************************************************************************************************************************************************
 *
 * Direction link function
 *
 * Direction links show users how to navigate through a page or process.
 *
 **************************************************************************************************************************************************************/

import React from 'react';
import PropTypes from 'prop-types';

const directions = {
  left: 'nsw-material-icons--rotate-180',
  bottom: 'nsw-material-icons--rotate-90',
  top: 'nsw-material-icons--rotate-270',
  right: '',
};

/**
 * The section component for the Direction link component
 *
 * @param  {object} url                 - The url of the link
 * @param  {object} direction          - The direction of the arrow
 * @param  {object} text               - The label associated with the direction
 * @param  {object} screenReader       - Hidden text for screen readers
 * @param  {object} attributeOptions   - Any other attribute options
 */
export const DirectionLink = ({ direction, text, url, screenReader, ...attributeOptions }) => (
  <a className="nsw-direction-link" href={url}>
    <span className="nsw-direction-link__text">
      {text} <span className="sr-only">{screenReader}</span>
    </span>
    <i
      className={`material-icons nsw-material-icons ${directions[direction]}`}
      focusable="false"
      aria-hidden="true"
    >
      east
    </i>
  </a>
);

DirectionLink.propTypes = {
  /**
   * Url of the link
   */
  url: PropTypes.string,
  /**
   * Direction of the link
   */
  direction: PropTypes.string,
  /**
   * Direction link text
   */
  text: PropTypes.string,
  /**
   * Text for screen readers
   */
  screenReader: PropTypes.string,
};

DirectionLink.defaultProps = {
  url: '#',
  direction: 'right',
  text: 'next',
  screenReader: 'page',
};

export const DirectionLinks = ({ links }) => (
  <div>
    {links.map((link) => (
      <DirectionLink {...link} />
    ))}
  </div>
);

DirectionLinks.propTypes = {
  /**
   * Array of link objects
   */
  links: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      direction: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      screenReader: PropTypes.string,
    }),
  ).isRequired,
};

DirectionLinks.defaultProps = {
  links: [
    {
      url: '#',
      direction: 'top',
      text: 'top',
      screenReader: 'of the page',
    },
    {
      url: '#',
      direction: 'bottom',
      text: 'bottom',
      screenReader: 'of the page',
    },
  ],
};

export default DirectionLinks;
