import React, { Fragment, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';


// Import components
import Codeblock from 'components/codeblock/Codeblock';

export default function VariablePage(props) {
  let { variable_name } = useParams();
  const { entities, variables } = props;
  // const variable = variables.find((item) => item.name === variable_name)


  const variable = {"name":"benchmark_star_rating","description":"The star rating for which the benchmark electricity and gasconsumption is calculated against - what NABERS rating the building aims to achieve. Prior to rounding - Offices requires star ratings in 0.5 intervals.","value_type":"Float","entity":"building","definition_period":"ETERNITY","default_value":"0","possible_values":null,"metadata":{"majorCat":"nabers","minorCat":"nabers","alias":"Benchmark Star Rating"},"children":["method_one","method_one_can_be_used","method_two"],"parents":["offices_benchmark_star_rating","GEwholemax","NGEmax","office_maximum_electricity_consumption"]};


  
  
  return (
    <div className="nsw-container">
      <div className="nsw-row">
        <div className="nsw-col">
          <h2 style={{fontSize:32 }}>
             {variable.metadata.alias}
            </h2>
          <div style={{margin: "16px 0"}}>
            <h5 style={{fontSize:16 }}>{variable.description}</h5>
          </div>
            <div
              className="nsw-tag"
              style={{
                padding: "2px 16px 2px 16px",
                margin: 0,
              }}
            >
              {variable.value_type.toLowerCase()}
            </div>
          
        
        </div>
      </div>

      {/* SECTION --> HOW IT RELATES? */}
      <div className="nsw-row">
        <div className="nsw-col">
          <h3>Variables used:</h3>
          {variable.children.length === 0 ? (
            'None'
          ) : (
            <Fragment>
              <p>The following are the variables used in this calculation.</p>

              <div className="nsw-table-responsive">
                <div className="nsw-table nsw-table--striped">
                  <thead>
                    <th colSpan="2" style={{ fontWeight: 600 }}>
                      Inputs
                    </th>
                  </thead>
                  <tbody>
                    {variable.children.map((dep) => {
                      return (
                        <tr>
                          <td>
                            <Link to={`/variables/${dep}`}>{dep}</Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </div>
              </div>
            </Fragment>
          )}
        </div>
      </div>

      {/* SECTION --> WHERE IS THIS VARIABLE USED? */}
      <div className="nsw-row">
        <div className="nsw-col">
          <h3>Where is this variable used?</h3>
          <p>
            The following is a list of all the other variables and activity definitions that use
            this variable for their calculations.
          </p>
        </div>
      </div>

      {/* SECTION --> WHAT DOES THIS FORMULA LOOK LIKE? */}
      <div className="nsw-row">
        <div className="nsw-col">
          <h3>What does the formula look like?</h3>
          {variable && variable.formulas
            ? Object.keys(variable.formulas).map((formula_date) => {
                const formula_i = variable.formulas[formula_date];
                if (formula_date === '0001-01-01') {
                  formula_date = 'ETERNITY';
                }
                return (
                  <Fragment>
                    <h5 style={{ marginBottom: '0.5rem' }}>From date: {formula_date}</h5>
                    <p>
                      <Codeblock code={formula_i.content} language="python" />
                    </p>
                  </Fragment>
                );
              })
            : 'This variable does not have a formula'}
          <p></p>
        </div>
      </div>
    </div>
  );

  return (
    <Fragment>
      <table style={{ marginTop: 40, marginBottom: 40 }}>
        <tbody>
          <tr>
            <td style={{ fontWeight: 600 }}>id:</td>
            <td>{variable.id}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 600 }}>description:</td>
            <td>{variable.description}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 600 }}>type:</td>
            <td>{variable.valueType}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 600 }}>default:</td>
            <td>{JSON.stringify(variable.defaultValue)}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 600 }}>entity:</td>
            <td>{variable.entity}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 600 }}>source:</td>
            <td>...github source link here</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 600 }}>formula:</td>
            {/* <td>{JSON.stringify(variable.formulas)}</td> */}
            <td>...formula block here</td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
}
