import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// Import services
import openfisca_api from 'services/openfisca_api';

// Import components

export default function ActivityDefinitionPage(props) {
  let { schedule_identifier, activity_identifier } = useParams();
  const { schedules } = props;

  const [relatedVariables, setRelatedVariables] = useState([]);
  const [outputVariables, setOutputVariables] = useState([]);

  // Get list of activities from `variable_tree.json`
  // NOTE - this needs refactoring. Too much manual data processing of the `variable_tree.json`!
  var activities = [];
  schedules.map((schedule) => {
    schedule.subCategories.map((activity) => {
      activities.push({ identifier: activity.identifier, title: activity.title });
    });
  });

  // NOTE - this needs refactoring. Passing down the `variable_tree.json` object and doing filtering based on
  // the URL parameters is not generalisable...
  // const current_schedule = schedules.find((item) => item.identifier === schedule_identifier);
  const current_activity = activities.find((item) => item.identifier === activity_identifier);

  useEffect(() => {
    openfisca_api
      .listVariables({ schedule:schedule_identifier, activity: activity_identifier, is_input: true })
      .then((res) => {
        setRelatedVariables(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    openfisca_api
      .listVariables({ schedule:schedule_identifier, activity: activity_identifier, is_output: true, is_input: false })
      .then((res) => {
        setOutputVariables(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [schedule_identifier, activity_identifier]);

  return (
    <div className="nsw-container">
      <div className="nsw-row">
        <div className="nsw-col">
          <h2>
            <span style={{ marginRight: 10 }}>
              Activity {current_activity.identifier} - {current_activity.title}
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
                            {variable.metadata.alias ? variable.metadata.alias : variable.name }
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
                              {variable.metadata.alias ? variable.metadata.alias : variable.name }
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
