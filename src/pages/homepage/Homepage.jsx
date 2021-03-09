import React, { Fragment, useState } from 'react';

import VariableSearchBar from 'pages/homepage/VariableSearchBar';
import ScheduleTile from './ScheduleTile';

export default function Homepage(props) {
  const { variables, schedules } = props;

  return (
    <Fragment>
      {/* Search section */}
      <div className="nsw-container">
        <div className="nsw-row">
          <div className="nsw-col">
            <h2>Energy Savings Scheme Rule</h2>
            <h3>
              Search a term below to find more information on related methods and requirements
            </h3>
            <VariableSearchBar variables={variables} />
          </div>
        </div>
      </div>

      <div className="nsw-container">
        <h3>Click below to get more details on each Schedule</h3>

        {/* Iterate through list of Schedules in `schedules` */}
        <div className="nsw-grid">
          {schedules.map((item) => (
            <ScheduleTile schedule={item} />
          ))}
        </div>
      </div>
    </Fragment>
  );
}
