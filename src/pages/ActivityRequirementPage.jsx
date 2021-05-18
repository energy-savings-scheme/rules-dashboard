import React from 'react';
import { Link, useParams } from 'react-router-dom';
import RequirementTable from 'components/RequirementTable';

export default function ActivityRequirementPage(props) {
  const { activities, variables } = props;
  const activityRequirements_name = [
    'Eligibility Requirements',
    'Equipment Requirements',
    'Implementation Requirements',
    'Energy Savings',
  ];

  const test = activities[4];
  if (!test) return null;
  if (!variables) return null;

  const requirementArrayFilled = [
    test['eligibility'],
    test['equipment'],
    test['implementation'],
    [test['energy_savings']],
  ];

  return (
    <div className="nsw-container">
      <div className="nsw-row">
        <div className="nsw-col">
          <h4>{'Activity: ' + test['activity_name']}</h4>
          <div
            className="nsw-tag"
            style={{
              padding: '2px 16px 2px 16px',
              marginTop: 10,
            }}
          >
            {test['version_code']}
          </div>

          <div
            className="nsw-tag"
            style={{
              padding: '2px 16px 2px 16px',
              marginTop: 10,
              marginLeft: 20,
            }}
          >
            {test['sub_method']}
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
                    requirementArray={requirementArrayFilled[index]}
                    variables={variables}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
