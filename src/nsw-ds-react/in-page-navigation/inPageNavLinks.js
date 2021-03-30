/***************************************************************************************************************************************************************
 *
 * inpage-nav function
 *
 * Use inpage-nav links to help users scan and jump to content of a page.
 *
 **************************************************************************************************************************************************************/

import React from 'react';
import PropTypes from 'prop-types';

/**
 * The section component for the InpageNavLinks component
 *
 * @param  {object} link             - The link of this section
 * @param  {object} title            - The title of the section
 * @param  {object} li               - An additional object to be spread into the wrapping element, optional
 * @param  {object} attributeOptions - Any other attribute options
 */
export const InpageNavLinksItem = ({ link, title, li = {}, ...attributeOptions }) => (
  <li className="nsw-page-nav__list-item" {...li}>
    <a className="nsw-page-nav__link" href={`#${link}`} {...attributeOptions}>
      {title}
    </a>
  </li>
);

InpageNavLinksItem.propTypes = {
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  li: PropTypes.object,
};

/**
 * The inpage-nav component
 *
 * @param  {string}  title            - The title of the content link block, default: Contents
 * @param  {array}   sections         - An array of objects of all sections, sample: { link: '', title: '', onClick: () }
 * @param  {string}  className        - An additional class, optional
 * @param  {string}  ariaLabel        - The aria-label attribute, optional
 * @param  {object}  attributeOptions - Any other attribute options
 */
export const InpageNavLinks = ({
  title,
  sections,
  ariaLabel,
  className = '',
  ...attributeOptions
}) => (
  <nav className={`nsw-page-nav ${className}`} ariaLabel={ariaLabel} {...attributeOptions}>
    <h2 className="nsw-page-nav__title">{title}</h2>

    <ul className="nsw-page-nav__list">
      {sections.map((section, i) => (
        <InpageNavLinksItem key={i} {...section} />
      ))}
    </ul>
  </nav>
);

InpageNavLinks.propTypes = {
  /**
   * In-page nav title
   */
  title: PropTypes.string.isRequired,
  /**
   * Sections to list
   */
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      /**
       * Optional
       */
      li: PropTypes.object,
    }),
  ).isRequired,
  /**
   * An additional class, optional
   */
  className: PropTypes.string,
  /**
   * Aria label
   */
  ariaLabel: PropTypes.string,
};

InpageNavLinks.defaultProps = {
  title: 'On this page',
  ariaLabel: 'in page navigation',
};

export default InpageNavLinks;
