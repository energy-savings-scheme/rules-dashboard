import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// Import services
import openfisca_api from 'services/openfisca_api';

// Import components

export default function ActivityDefinitionPage(props) {
  let { schedule_name, activity_sublabel } = useParams();
  const { schedules } = props;

  const [relatedVariables, setRelatedVariables] = useState([]);
  const [outputVariables, setOutputVariables] = useState([]);

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

  useEffect(() => {
    const searchParams = { minorcat: activity_sublabel, is_input: true };

    openfisca_api
      .listVariables(searchParams)
      .then((res) => {
        console.log(res);
        setRelatedVariables(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [schedule_name, activity_sublabel]);

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

      {/* SECTION --> VARIABLES USED? */}
      <div className="nsw-row">
        <div className="nsw-col">
          <div className="nsw-content-block">
            <div className="nsw-content-block__content">
              <h4 className="nsw-content-block__title">Variables used:</h4>

              <table
                className="nsw-table nsw-table--striped"
                style={{ width: '100%', marginBottom: 50 }}
              >
                <thead>
                  <th style={{ fontWeight: 600 }}>
                    Direct inputs
                    <small style={{ paddingLeft: 30 }}>
                      These inputs are needed to inform the result of the output variables of this
                      activity.
                    </small>
                  </th>
                </thead>
                <tbody>
                  {relatedVariables.length === 0 ? (
                    <tr>
                      <td>None</td>
                    </tr>
                  ) : (
                    relatedVariables.map((variable) => (
                      <tr>
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

              <table
                className="nsw-table nsw-table--striped"
                style={{ width: '100%', marginBottom: 50 }}
              >
                <thead>
                  <th style={{ fontWeight: 600 }}>
                    Outputs
                    <small style={{ paddingLeft: 30 }}>
                      These are the ouputs of this activity definition.
                    </small>
                  </th>
                </thead>
                <tbody>
                  {outputVariables.length === 0 ? (
                    <tr>
                      <td>None</td>
                    </tr>
                  ) : (
                    outputVariables.map((variable) => (
                      <tr>
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
    </div>
  );
}
