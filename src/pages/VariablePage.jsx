import React, { Fragment, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// Import services
import OpenFiscaAPI from 'services/openfisca_api';

// Import components
import Codeblock from 'components/codeblock/Codeblock';

export default function VariablePage(props) {
  let { variable_name } = useParams();
  const { entities, variables } = props; 

  const [variable, setVariable] = useState({});
  const [dependencies, setDependencies] = useState([]);
  const [traceTree, setTraceTree] = useState({});



  useEffect(() => {
    OpenFiscaAPI.getVariable(variable_name)
      .then((res) => {
        setVariable(res.data);

        const entity_name = res.data.entity;
        const entity = entities[entity_name];
      })
      .catch((err) => {
        console.log(err);
      });
  }, [entities, variable_name]);

  return (
    <div className="nsw-container">
      <div className="nsw-row">
        <div className="nsw-col">
          <h2>
            <span style={{ marginRight: 10 }}>{variable.id}</span>
            <div
              className="nsw-button nsw-button--outline"
              style={{
                minWidth: 0,
                padding: 0,
                margin: 0,
                paddingLeft: 20,
                paddingRight: 20,
                marginLeft: 10,
              }}
            >
              {variable.valueType}
            </div>
            <div
              className="nsw-button nsw-button--outline"
              style={{
                minWidth: 0,
                padding: 0,
                margin: 0,
                paddingLeft: 20,
                paddingRight: 20,
                marginLeft: 10,
              }}
            >
              Default: {JSON.stringify(variable.defaultValue)}
            </div>
          </h2>
          <h5>{variable.description}</h5>
        </div>
      </div>

      {/* SECTION --> HOW IT RELATES? */}
      <div className="nsw-row">
        <div className="nsw-col">
          <h3>Variables used:</h3>
          {dependencies.length === 0 ? (
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
                    {dependencies.map((dep) => {
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
