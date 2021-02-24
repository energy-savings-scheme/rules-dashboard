import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Breadcrumb from 'components/layout/Breadcrumb';

export default function Header() {
  return (
    <Fragment>
      <div className="nsw-infobar">
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
              <h1 style={{ fontSize: '3rem', marginLeft: '1rem' }}>ESS Rules Dashboard</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <Breadcrumb />
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
