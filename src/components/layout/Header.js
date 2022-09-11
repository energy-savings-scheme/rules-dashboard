import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <Fragment>
      <div className="nsw-masthead" style={{ marginBottom: 20 }}>
        <div className="nsw-container">
          <div className="nsw-row">
            <div className="nsw-col">
              <p>A NSW Government website</p>
            </div>

            <div className="nsw-col">
              <Link to="/" className="nsw-header__logo-link">
                <img
                  src="/logo.png"
                  alt="NSW Department of Planing Industry and Environment"
                  height="80"
                />
                <span className="sr-only">NSW Department of Planing Industry and Environment</span>
              </Link>
            </div>

            <div className="nsw-col">
              <h3 style={{ fontSize: '2rem', marginLeft: '1rem' }}>Safeguard Rules Interface</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
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
