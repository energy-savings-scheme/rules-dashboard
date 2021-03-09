import React, { Fragment, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// Import services

// Import components

export default function SchedulePage(props) {
  let { schedule_name } = useParams();
  const { schedules, variables } = props;

  const current_schedule = schedules.find((item) => item.name === schedule_name);

  const activities = variables.filter((item) => item.metadata.schedule === current_schedule);

  return (
    <div className="nsw-container">
      <div className="nsw-row">
        <div className="nsw-col">
          <h2>
            <span style={{ marginRight: 10 }}>Title</span>
          </h2>
          <h5>Description</h5>
        </div>
      </div>

      {/* SECTION --> HOW IT RELATES? */}
      <div className="nsw-row">
        <div className="nsw-col">
          <div className="nsw-table-responsive">
            <table className="nsw-table nsw-table--striped" style={{ width: '100%' }}>
              <colgroup>
                <col span="1" style={{ width: '20%' }} />
                <col span="1" style={{ width: '80%' }} />
              </colgroup>
              <thead>
                <th style={{ fontWeight: 600 }}>Activity Definition</th>
                <th style={{ fontWeight: 600 }}>Name</th>
              </thead>
              <tbody>
                {activities.length === 0 ? (
                  <tr>
                    <td colSpan="2">No activities found for this Schedule</td>
                  </tr>
                ) : (
                  activities.map((variable) => (
                    <tr>
                      <td>
                        {variable.metadata.activity_definition_number ||
                          'Activity definition not found'}
                      </td>
                      <td>
                        <Link to={`/variables/${variable.name}`} className="nsw-page-nav__link">
                          {variable.metadata.alias}
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
