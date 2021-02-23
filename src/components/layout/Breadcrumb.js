import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Breadcrumb() {
  return (
    <div className="nsw-container">
      <nav aria-label="Breadcrumb" className="nsw-breadcrumb">
        <ol className="nsw-breadcrumb__list">
          <li className="nsw-breadcrumb__item">
            <NavLink to="/" className="nsw-breadcrumb__link">
              Home
            </NavLink>
          </li>
        </ol>
      </nav>
    </div>
  );
}
