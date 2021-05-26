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
            <h3>Energy Security Safeguard Rules</h3>
            <h5>
              Search a term below to find more information on related methods and requirements
            </h5>
            <VariableSearchBar variables={variables} />
          </div>
        </div>
      </div>

      <div className="nsw-container">
        <h2 style={{ textAlign: 'center', marginBottom: 50 }}>OR</h2>

        <div className="nsw-grid" style={{ marginBottom: 100 }}>
          <div className="nsw-col nsw-col-md-6">
            <Card headline="Calculate your savings" link="calculate">
              <CardCopy>
                Use the calculator to enter in details of an activity, and understand what your
                electricity or gas savings are.
              </CardCopy>
            </Card>
          </div>
          <div className="nsw-col nsw-col-md-6">
            <Card headline="Compare Variables" link="compare">
              <CardCopy>Select Two Variables and Compare them.</CardCopy>
            </Card>
          </div>
          <div className="nsw-col nsw-col-md-6">
            <Card headline="PDRS 2022 Activities " link="activities">
              <CardCopy>See All Peak Demand Savings Activities Currently In Development. </CardCopy>
            </Card>
          </div>
          <div className="nsw-col nsw-col-md-6">
            <Card headline="Compare Activities " link="activities/compare">
              <CardCopy>Select two activities and compare them. </CardCopy>
            </Card>
          </div>
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
