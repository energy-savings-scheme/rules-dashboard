import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import RequirementTable from 'components/RequirementTable';
import Button from 'nsw-ds-react/button/button';

const activityRequirements_name = [
  'Eligibility Requirements',
  'Equipment Requirements',
  'Implementation Requirements',
  'Energy Savings',
];

const DBbaseURL = process.env.REACT_APP_API_BASE_URL;

export default function ActivityRequirementPage(props) {
  const { activities, variables } = props;

  const [displayActivity, setDisplayActivity] = useState({});
  const [requirementArray, setRequirementArray] = useState({});
  const [activityPlotVar, setActivityPlotVar] = useState('');

  const methodList = activities.map((activity) => activity['sub_method']);
  const uniqueMethods = Array.from(new Set(methodList));

  const handleClickActivity = (event) => {
    const chosenActivityName = event.target.innerText;
    const chosenActivity = activities.find((item) => item['activity_name'] === chosenActivityName);
    setDisplayActivity(chosenActivity);
    setRequirementArray([
      chosenActivity['eligibility'],
      chosenActivity['equipment'],
      chosenActivity['implementation'],
      [chosenActivity['energy_savings']],
    ]);

    setActivityPlotVar(chosenActivity['energy_savings']);
  };

  useEffect(() => {
    const setInitialActivity = (initActivity) => {
      setDisplayActivity(initActivity);
      setRequirementArray([
        initActivity['eligibility'],
        initActivity['equipment'],
        initActivity['implementation'],
        [initActivity['energy_savings']],
      ]);
    };
    const initActivity = activities[1];
    if (!initActivity) {
      return null;
    } else {
      setInitialActivity(initActivity);
      setActivityPlotVar(initActivity['energy_savings']);
    }
  }, [activities]);

  // if (!displayActivity | !requirementArray) return null;

  return (
    <div className="nsw-container nsw-p-top-sm nsw-p-bottom-lg">
      <div className="nsw-page-layout">
        <div id="sidebar" className="nsw-page-layout__sidebar nsw-page-layout__sidebar--desktop">
          <nav className="nsw-sidenav">
            <div className="nsw-sidenav__header">
              <h5>PDRS 2022</h5>
            </div>
            <ul className="nsw-sidenav__list nsw-sidenav__list--level-1">
              {uniqueMethods.map((subMethod, methodIndex) => {
                const filteredActs = activities.filter(
                  (eachAct) => eachAct['sub_method'] === subMethod,
                );
                return (
                  <li key={methodIndex} className="nsw-sidenav__list-item">
                    <a className="nsw-sidenav__link">
                      <strong>{subMethod}</strong>
                    </a>
                    <ul className="nsw-sidenav__list nsw-sidenav__list--level-2">
                      {filteredActs.map((activity, index) => {
                        return (
                          <li key={index} className="nsw-sidenav__list-item">
                            <a className="nsw-sidenav__link" href="#" onClick={handleClickActivity}>
                              {activity['activity_name']}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </nav>
          <Link to="/activities/compare">
            <Button as="primary" style={{ marginLeft: '5%' }}>
              Compare Activities
            </Button>
          </Link>
        </div>

        <div id="content" className="nsw-container nsw-page-layout__main">
          <div className="nsw-row">
            <div className="nsw-col">
              <h4>{displayActivity['activity_name']}</h4>
              <div
                className="nsw-tag"
                style={{
                  padding: '2px 16px 2px 16px',
                  marginTop: 10,
                }}
              >
                {displayActivity['version_code']}
              </div>

              <div
                className="nsw-tag"
                style={{
                  padding: '2px 16px 2px 16px',
                  marginTop: 10,
                  marginLeft: 20,
                }}
              >
                {displayActivity['sub_method']}
              </div>
            </div>
          </div>

          <div className="nsw-row">
            <div className="nsw-col nsw-col-md-8">
              Status: <a href="#">In Development</a>
            </div>
            <div className="nsw-col nsw-col-md-4">
              <a
                href={`${DBbaseURL}/plots/shortest/${activityPlotVar}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Activity Variable Graph
              </a>
            </div>
          </div>
          {/* SECTION: Requirement Table: four components */}
          {activityRequirements_name.map((value, index) => {
            return (
              <div className="nsw-row">
                <div className="nsw-col">
                  <div className="nsw-content-block">
                    <div className="nsw-content-block__content">
                      <RequirementTable
                        requirementName={value}
                        requirementArrayFilled={requirementArray[index]}
                        variables={variables}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
