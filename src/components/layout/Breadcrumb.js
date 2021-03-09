import React, { Fragment } from 'react';
import { Link, NavLink, useLocation, useParams } from 'react-router-dom';

export default function Breadcrumb() {
  const location = useLocation();
  const params = useParams();

  let path = {};

  if (params.schedule_name) {
    path = { breadcrumb_category: 'Schedules', breadcrumb_name: params.schedule_name };
  }
  if (params.variable_name) {
    path = { breadcrumb_category: 'Variables', breadcrumb_name: params.variable_name };
  }

  return (
    <div className="nsw-container" style={{ marginBottom: 20 }}>
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
          {path.breadcrumb_name && (
            <Fragment>
              <li className="nsw-breadcrumb__item">{path.breadcrumb_category}</li>
              <li className="nsw-breadcrumb__item">
                <NavLink
                  to={`/variables/${path.breadcrumb_name}`}
                  className="nsw-breadcrumb__link nsw-breadcrumb--current"
                >
                  {path.breadcrumb_name}
                </NavLink>
              </li>
            </Fragment>
          )}
        </ol>
      </nav>
    </div>
  );
}
