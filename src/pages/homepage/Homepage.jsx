import React, { Fragment, useState } from 'react';

import VariableSearchBar from 'pages/homepage/VariableSearchBar';
import ScheduleTile from './ScheduleTile';

import Card, { CardCopy } from 'nsw-ds-react/card/card';

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
        <h2 style={{ textAlign: 'center', marginBottom: 50 }}>OR</h2>

        <div style={{ marginBottom: 100 }}>
          <Card headline="Calculate your savings" link="calculate">
            <CardCopy>
              Use the calculator to enter in details of an activity, and understand what your
              electricity or gas savings are.
            </CardCopy>
          </Card>
        </div>

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
