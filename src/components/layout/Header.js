import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <Fragment>
      <div className="nsw-infobar" style={{ marginBottom: 20 }}>
        <div className="nsw-container">
          <div className="nsw-row">
            <div className="nsw-col">
              <p>A NSW Government website</p>
            </div>

            <div className="nsw-col">
              <Link to="/" className="nsw-header__logo-link">
                <img
                  src="https://www.dpie.nsw.gov.au/__data/assets/image/0009/231759/DPIE-logo.png"
                  alt="NSW Department of Planing Inustry and Environment"
                  height="60"
                />
                {/* <svg className="nsw-icon nsw-header__logo" focusable="false" aria-hidden="true">
                  <use xlinkHref="#dpc-logo"></use>
                </svg> */}
                <span className="sr-only">NSW Department of Planing Inustry and Environment</span>
              </Link>
            </div>

            <div className="nsw-col">
              <h1 style={{ fontSize: '3rem', marginLeft: '1rem' }}>Safeguard Dashboard</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
    </Fragment>
  );
}
