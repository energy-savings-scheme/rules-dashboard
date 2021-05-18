import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ActivityRequirementPage(props) {
  const { activities, variables } = props;

  const test = activities[4];
  if (!test) return null;
  console.log(test);
  console.log(test['energy_savings']);

  return (
    <div className="nsw-container">
      <div className="nsw-row">
        <div className="nsw-col">
          <h2>{test['activity_name']}</h2>
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

      {/* SECTION --> VARIABLES USED? */}
      <div className="nsw-row">
        <div className="nsw-col">
          <div className="nsw-content-block">
            <div className="nsw-content-block__content">
              <table
                className="nsw-table nsw-table--striped"
                style={{ width: '100%', marginBottom: 50 }}
              >
                <thead>
                  <th style={{ fontWeight: 600 }}>Eligibility Requirements</th>
                </thead>
                <tbody>
                  {test['eligibility'].length === 0 ? (
                    <tr>
                      <td>None</td>
                    </tr>
                  ) : (
                    test['eligibility'].map((item) => (
                      <tr>
                        <td>
                          <Link to={`/variables/${item}`} className="nsw-page-nav__link">
                            {item}
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
                  <th style={{ fontWeight: 600 }}>Equipment Requirements</th>
                </thead>
                <tbody>
                  {test['equipment'].length === 0 ? (
                    <tr>
                      <td>None</td>
                    </tr>
                  ) : (
                    test['equipment'].map((item) => (
                      <tr>
                        <td>
                          <Link to={`/variables/${item}`} className="nsw-page-nav__link">
                            {item}
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
                  <th style={{ fontWeight: 600 }}>Implementation Requirements</th>
                </thead>
                <tbody>
                  {test['implementation'].length === 0 ? (
                    <tr>
                      <td>None</td>
                    </tr>
                  ) : (
                    test['implementation'].map((item) => (
                      <tr>
                        <td>
                          <Link to={`/variables/${item}`} className="nsw-page-nav__link">
                            {item}
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
                  <th style={{ fontWeight: 600 }}>Energy Savings</th>
                </thead>
                <tbody>
                  {test['energy_savings'] === '' ? (
                    <tr>
                      <td>None</td>
                    </tr>
                  ) : (
                    <tr>
                      <td>
                        <Link
                          to={`/variables/${test['energy_savings']}`}
                          className="nsw-page-nav__link"
                        >
                          {test['energy_savings']}
                        </Link>
                      </td>
                    </tr>
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
