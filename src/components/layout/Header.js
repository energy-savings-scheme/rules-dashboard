import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Breadcrumb from 'components/layout/Breadcrumb';

export default function Header() {
  return (
    <Fragment>
      <div className="nsw-infobar">
        <div className="nsw-container">
          <p>A NSW Government website</p>
        </div>
      </div>

      <header className="nsw-header">
        <div className="nsw-container">
          <div className="nsw-header__wrapper">
            <div className="nsw-header__center">
              <Link to="/" className="nsw-header__logo-link">
                <svg className="nsw-icon nsw-header__logo" focusable="false" aria-hidden="true">
                  <use xlinkHref="#dpc-logo"></use>
                </svg>
                <span className="sr-only">NSW Department of Premier and Cabinet</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <Breadcrumb />

      {/* Title section */}
      <div className="nsw-infobar" style={{ height: 200, marginTop: 20 }}>
        <div className="nsw-container">
          <h1>ESS Rules Dashboard</h1>
        </div>
      </div>
    </Fragment>
  );

  // return (
  //   <header className="App-header">
  //     <h1>
  //       <Link to="/">ESS Rules Dashboard</Link>
  //       {/* DPIE{" "}
  // 			<a
  // 				className='Rules-link'
  // 				href='https://www.ess.nsw.gov.au/Home/Document-Search/Legislation/Energy-Savings-Scheme-Rule-of-2009/Energy-Savings-Scheme-Rule-of-2009-30-March-2020'>
  // 				Energy Saving Scheme (ESS) Rules
  // 			</a>{" "} */}
  //     </h1>
  //   </header>
  // );
}
