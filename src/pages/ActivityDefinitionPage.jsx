import React, { Fragment, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// Import services

// Import components

export default function ActivityDefinitionPage(props) {
  let { schedule_name, activity_sublabel } = useParams();
  const { schedules, variables } = props;

  // Get list of activities from `variable_tree.json`
  // NOTE - this needs refactoring. Too much manual data processing of the `variable_tree.json`!
  var activities = [];
  schedules.map((schedule) => {
    schedule.subCategories.map((activity) => {
      activities.push({ subLabel: activity.subLabel, activityName: activity.activityName });
    });
  });

  // NOTE - this needs refactoring. Passing down the `variable_tree.json` object and doing filtering based on
  // the URL parameters is not generalisable...
  const current_schedule = schedules.find((item) => item.activityName === schedule_name);
  const current_activity = activities.find((item) => item.subLabel === activity_sublabel);

  return (
    <div className="nsw-container">
      <div className="nsw-row">
        <div className="nsw-col">
          <h2>
            <span style={{ marginRight: 10 }}>
              Activity {current_activity.subLabel} - {current_activity.activityName}
            </span>
          </h2>
          <div
            className="nsw-tag"
            style={{
              padding: '2px 16px 2px 16px',
              marginTop: 10,
            }}
          >
            Activity Definition
          </div>
        </div>
        <div className="nsw-col">
          <h4>See how this relates to other methods and requirements within the ESS:</h4>
        </div>
      </div>

      <div className="nsw-row">
        <div className="nsw-col">
          Found within: <a href="#">Link to legislation here</a>
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
                  activities.map((activity) => (
                    <tr>
                      <td>{activity.subLabel || 'Activity definition not found'}</td>
                      <td>
                        <Link to={`/variables/123`} className="nsw-page-nav__link">
                          {activity.activityName}
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
