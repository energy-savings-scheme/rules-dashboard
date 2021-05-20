import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import RequirementTable from 'components/RequirementTable';

const activityRequirements_name = [
  'Eligibility Requirements',
  'Equipment Requirements',
  'Implementation Requirements',
  'Energy Savings',
];

export default function ActivityRequirementPage(props) {
  const { activities, variables } = props;

  const [displayActivity, setDisplayActivity] = useState();
  const [requirementArray, setRequirementArray] = useState();

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
  };

  useEffect(() => {
    const initActivity = activities[1];
    setDisplayActivity(initActivity);
    setRequirementArray([
      initActivity['eligibility'],
      initActivity['equipment'],
      initActivity['implementation'],
      [initActivity['energy_savings']],
    ]);
  }, [activities]);

  if (!displayActivity) return null;

  return (
    <div className="nsw-container nsw-p-top-sm nsw-p-bottom-lg">
      <div className="nsw-page-layout">
        <div id="sidebar" className="nsw-page-layout__sidebar nsw-page-layout__sidebar--desktop">
          <nav className="nsw-sidenav">
            <div className="nsw-sidenav__header">
              <h5>PDRS 2022</h5>
            </div>
            <ul class="nsw-sidenav__list nsw-sidenav__list--level-1">
              {uniqueMethods.map((subMethod) => {
                const filteredActs = activities.filter(
                  (eachAct) => eachAct['sub_method'] === subMethod,
                );
                return (
                  <li class="nsw-sidenav__list-item">
                    <a className="nsw-sidenav__link">
                      <strong>{subMethod}</strong>
                    </a>
                    <ul class="nsw-sidenav__list nsw-sidenav__list--level-2">
                      {filteredActs.map((activity) => {
                        return (
                          <li className="nsw-sidenav__list-item">
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
        </div>
        <div id="content" className="nsw-container nsw-page-layout__main" s>
          <div className="nsw-row">
            <div className="nsw-col">
              <h4>{'Activity: ' + displayActivity['activity_name']}</h4>
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
            <div className="nsw-col">
              Status: <a href="#">In Development</a>
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
                        requirementArray={requirementArray[index]}
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
