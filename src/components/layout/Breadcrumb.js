import React, { Fragment } from 'react';
import { Link, NavLink, useLocation, useParams } from 'react-router-dom';

export default function Breadcrumb() {
  const location = useLocation();
  const params = useParams();

  let path = {};

  if (params.schedule_name && !params.activity_sublabel) {
    return (
      <div className="nsw-container" style={{ marginBottom: 20 }}>
        <nav aria-label="Breadcrumb" className="nsw-breadcrumb">
          <ol className="nsw-breadcrumb__list">
            <li className="nsw-breadcrumb__item">
              <NavLink to="/" className="nsw-breadcrumb__link">
                Home
              </NavLink>
            </li>

            <li className="nsw-breadcrumb__item">
              <NavLink
                to={`/variables/${params.schedule_name}`}
                className="nsw-breadcrumb__link nsw-breadcrumb--current"
              >
                Schedule: {params.schedule_name}
              </NavLink>
            </li>
          </ol>
        </nav>
      </div>
    );
  }

  if (params.activity_sublabel) {
    return (
      <div className="nsw-container" style={{ marginBottom: 20 }}>
        <nav aria-label="Breadcrumb" className="nsw-breadcrumb">
          <ol className="nsw-breadcrumb__list">
            <li className="nsw-breadcrumb__item">
              <NavLink to="/" className="nsw-breadcrumb__link">
                Home
              </NavLink>
            </li>

            <li className="nsw-breadcrumb__item">
              <NavLink to={`/schedules/${params.schedule_name}`} className="nsw-breadcrumb__link">
                Schedule: {params.schedule_name}
              </NavLink>
            </li>

            <li className="nsw-breadcrumb__item">
              <NavLink
                to={`/schedules/${params.schedule_name}/${params.activity_sublabel}`}
                className="nsw-breadcrumb__link nsw-breadcrumb--current"
              >
                Activity: {params.activity_sublabel}
              </NavLink>
            </li>
          </ol>
        </nav>
      </div>
    );
  }
  if (params.variable_name) {
    return (
      <div className="nsw-container" style={{ marginBottom: 20 }}>
        <nav aria-label="Breadcrumb" className="nsw-breadcrumb">
          <ol className="nsw-breadcrumb__list">
            <li className="nsw-breadcrumb__item">
              <NavLink to="/" className="nsw-breadcrumb__link">
                Home
              </NavLink>
            </li>

            <li className="nsw-breadcrumb__item">
              <NavLink
                to={`/variables/${params.variable_name}`}
                className="nsw-breadcrumb__link nsw-breadcrumb--current"
              >
                Variable: {params.variable_name}
              </NavLink>
            </li>
          </ol>
        </nav>
      </div>
    );
  }

  return null;
}
