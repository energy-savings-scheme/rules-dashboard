import React, { Fragment, useState } from 'react';

import VariableSearchBar from 'pages/homepage/VariableSearchBar';
import ScheduleTile from './ScheduleTile';

const initial_schedules = [
  {
    name: 'Default Factors and Classifications',
    description: 'Schedule A sets out Default Factors and Classifications.',
  },
  {
    name: 'Sale of New Appliances',
    description:
      'Schedule B sets out Activity Definitions for the Sale of New Appliances (clause 9.3)',
  },
  {
    name: 'Removal of Old Appliance',
    description:
      'Schedule C sets out Activity Definitions for the Removal of Old Appliances (clause 9.7)',
  },
  {
    name: 'General Activities for Home Energy Efficiency Retrofits',
    description:
      'Schedule D sets out Activity Definitions for General Activities for Home Energy Efficiency Retrofits (clause 9.8)',
  },
  {
    name: 'Low Cost Activities for Home Energy Efficiency Retrofits',
    description:
      'Schedule E sets out Activity Definitions for Low Cost Activities for Home Energy Efficiency Retrofits (clause 9.8)',
  },
  {
    name: 'Installation of High Efficiency Appliances for Businesses',
    description:
      'Schedule F sets out Activity Definitions for the Installation of High Efficiency Appliances for Businesses (clause 9.9)',
  },
];

export default function Homepage(props) {
  const { variables } = props;

  const [schedules, setSchedules] = useState(initial_schedules);

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
