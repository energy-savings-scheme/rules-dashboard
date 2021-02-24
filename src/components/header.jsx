import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="App-header">
      <h1>
        <Link to="/">ESS Rules Dashboard</Link>
        {/* DPIE{" "}
				<a
					className='Rules-link'
					href='https://www.ess.nsw.gov.au/Home/Document-Search/Legislation/Energy-Savings-Scheme-Rule-of-2009/Energy-Savings-Scheme-Rule-of-2009-30-March-2020'>
					Energy Saving Scheme (ESS) Rules
				</a>{" "} */}
      </h1>
    </header>
  );
}
