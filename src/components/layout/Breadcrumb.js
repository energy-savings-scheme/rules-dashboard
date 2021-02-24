import React, { useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

export default function Breadcrumb(match) {
  const location = useLocation();

  // THIS IS A JANKY PLACEHOLDER WAY OF GETTING THE BREADCRUMB!
  // TODO - refactor heavily!
  try {
    var crumb = String(location.pathname).replace('/variables/', '');
  } catch {
    var crumb = null;
  }

  return (
    <div className="nsw-container">
      <nav aria-label="Breadcrumb" className="nsw-breadcrumb">
        <ol className="nsw-breadcrumb__list">
          <li className="nsw-breadcrumb__item">
            <NavLink
              to="/"
              className={
                location.pathname === '/'
                  ? 'nsw-breadcrumb__link nsw-breadcrumb--current'
                  : 'nsw-breadcrumb__link'
              }
            >
              Home
            </NavLink>
          </li>
          {crumb && crumb !== '/' && (
            <li className="nsw-breadcrumb__item">
              <NavLink
                to={`/variables/${crumb}`}
                className="nsw-breadcrumb__link nsw-breadcrumb--current"
              >
                {crumb}
              </NavLink>
            </li>
          )}
        </ol>
      </nav>
    </div>
  );
}
