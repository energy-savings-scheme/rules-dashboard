import React, { Fragment, useEffect, useState } from 'react';
import Button from 'nsw-ds-react/button/button';
import { FormGroupSelect } from 'nsw-ds-react/forms';
import { ProgressIndicator } from 'nsw-ds-react/forms/progress-indicator/progressIndicator';
import { Link } from 'react-router-dom';

const DBbaseURL = process.env.REACT_APP_API_BASE_URL;

export default function ActivityComparePage(props) {
  const { activities, variables } = props;

  const [dropdownOptions, setDropdownOptions] = useState([{}]);
  const [stepNumber, setStepNumber] = useState(1);
  const [activity1, setActivity1] = useState({});
  const [activity2, setActivity2] = useState({});

  const populateDropDown = (newOption) => {
    setDropdownOptions((prev) => {
      return [...prev, newOption];
    });
  };

  const getDescription = (var_id) => {
    var itemVar = variables.find((entry) => entry.name === var_id);
    if (!itemVar) return null;
    return itemVar.description;
  };

  useEffect(() => {
    activities.forEach((item) =>
      populateDropDown({ text: item.activity_name, value: item.activity_name }),
    );
  }, [activities]);

  if (!activity1) return null;
  if (!activity2) return null;

  return (
    <div className="nsw-container">
      <div className="nsw-row">
        <div className="nsw-col"></div>
      </div>

      <ProgressIndicator step={stepNumber} of={2} />
      <div style={{ marginTop: 70, marginBottom: 70 }}>
        {stepNumber === 1 && (
          <Fragment>
            <div className="nsw-row">
              <div className="nsw-col">
                <div className="nsw-content-block">
                  <div className="nsw-content-block__content">
                    <h3 className="nsw-content-block__title">
                      Which activities would you like to compare?
                    </h3>
                    <FormGroupSelect
                      label="Activity One" // primary label
                      helper="Select an activity below." // helper text (secondary label)
                      options={dropdownOptions}
                      value={activity1.activity_name}
                      onChange={(e) => {
                        setActivity1(
                          activities.find((item) => item.activity_name === e.target.value),
                        );
                      }}
                    ></FormGroupSelect>
                    <FormGroupSelect
                      label="Activity Two" // primary label
                      helper="Select an activity below." // helper text (secondary label)
                      options={dropdownOptions}
                      value={activity2.activity_name}
                      onChange={(e) => {
                        setActivity2(
                          activities.find((item) => item.activity_name === e.target.value),
                        );
                      }}
                    ></FormGroupSelect>
                  </div>
                </div>
              </div>
            </div>

            <div className="nsw-row">
              <div className="nsw-col">
                <Button
                  as="primary"
                  onClick={(e) => {
                    setStepNumber(stepNumber + 1);
                  }}
                  style={{ float: 'right' }}
                >
                  Next
                </Button>
              </div>
            </div>
          </Fragment>
        )}

        {stepNumber === 2 && (
          <Fragment>
            <div className="nsw-row">
              <div className="nsw-col">
                <div className="nsw-content-block">
                  <div className="nsw-content-block__content">
                    <div className="nsw-table-responsive">
                      <p>Here are the details of these two activities.</p>
                      <table className="nsw-table nsw-table--caption-top nsw-table--bordered nsw-table--striped ">
                        <thead>
                          <tr>
                            <th width="20%"></th>
                            <th width="40%">{activity1.activity_name}</th>
                            <th width="40%"> {activity2.activity_name}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <strong>Scheme</strong>
                            </td>
                            <td>{activity1.version_code}</td>
                            <td>{activity2.version_code}</td>
                          </tr>
                          <tr>
                            <td>
                              {' '}
                              <strong>Sub-Method</strong>
                            </td>
                            <td>{activity1.sub_method}</td>
                            <td>{activity2.sub_method}</td>
                          </tr>
                          <tr>
                            <td>
                              {' '}
                              <strong>Eligibility Requirement</strong>
                            </td>
                            <td>
                              <ul>
                                {' '}
                                {activity1.eligibility.map((item) => {
                                  return <li>{getDescription(item)}</li>;
                                })}
                              </ul>
                            </td>
                            <td>
                              <ul>
                                {' '}
                                {activity2.eligibility.map((item) => {
                                  return <li>{getDescription(item)}</li>;
                                })}
                              </ul>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              {' '}
                              <strong>Equipment Requirement</strong>
                            </td>
                            <td>
                              <ul>
                                {' '}
                                {activity1.equipment.map((item) => {
                                  return <li>{getDescription(item)}</li>;
                                })}
                              </ul>
                            </td>
                            <td>
                              <ul>
                                {' '}
                                {activity2.equipment.map((item) => {
                                  return <li>{getDescription(item)}</li>;
                                })}
                              </ul>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              {' '}
                              <strong>Implementation Requirement</strong>
                            </td>
                            <td>
                              <ul>
                                {' '}
                                {activity1.implementation.map((item) => {
                                  return <li>{getDescription(item)}</li>;
                                })}
                              </ul>
                            </td>
                            <td>
                              <ul>
                                {' '}
                                {activity2.implementation.map((item) => {
                                  return <li>{getDescription(item)}</li>;
                                })}
                              </ul>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              {' '}
                              <strong>Energy Savings Formula</strong>
                            </td>
                            <td>
                              <Link to={`/variables/${activity1.energy_savings}`}>
                                {activity1.energy_savings}
                              </Link>
                              <a
                                className="nsw-button nsw-button--secondary"
                                href={`${DBbaseURL}/plots/shortest/${activity1.energy_savings}`}
                                target="_blank"
                                rel="noopener noreferer"
                              >
                                Variable Graph
                              </a>
                            </td>
                            <td>
                              {' '}
                              <Link to={`/variables/${activity2.energy_savings}`}>
                                {activity2.energy_savings}
                              </Link>
                              <a
                                className="nsw-button nsw-button--secondary"
                                href={`${DBbaseURL}/plots/shortest/${activity2.energy_savings}`}
                                target="_blank"
                                rel="noopener noreferer"
                              >
                                Variable Graph
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="nsw-row">
              <div className="nsw-col">
                <Button
                  as="secondary"
                  onClick={(e) => {
                    setStepNumber(stepNumber - 1);
                  }}
                >
                  Back
                </Button>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
}
