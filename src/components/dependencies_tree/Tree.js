import React, { Fragment, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import OpenFiscaAPI from 'services/openfisca_api';

import Codeblock from 'components/Codeblock';
import D3_Tree from 'components/dependencies_tree/D3_Tree';

export default function Tree(props) {
  let { variable_name } = useParams();
  const { entities, variables } = props;

  const [variable, setVariable] = useState({});
  const [dependencies, setDependencies] = useState([]);
  const [traceTree, setTraceTree] = useState({});

  const createDependenciesPayload = (variable_i, entity) => {
    var payload = {
      persons: {
        'person 1': {},
      },
    };
    payload[entity.plural] = {};
    payload[entity.plural][`${entity.description} abcd`] = {};
    payload[entity.plural][`${entity.description} abcd`][variable_i.id] = { '2021-5-5': null };

    return payload;
  };

  function makeDependencyTree(trace) {
    const inputArray = Object.entries(trace).map((e) => ({ name: e[0], ...e[1] }));
    var baseNode = inputArray[0];

    // Recursively build a nested tree structure starting from the baseNode
    function buildNestedTreeFromNode(inputNode) {
      let return_obj;
      if (!inputNode.dependencies || inputNode.dependencies.length === 0) {
        return_obj = { ...inputNode, children: [] };
      }

      return_obj = {
        ...inputNode,
        children: inputArray
          .filter((item) => inputNode.dependencies.includes(item.name))
          .map((childNode) => buildNestedTreeFromNode(childNode)),
      };

      return return_obj;
    }

    return buildNestedTreeFromNode(baseNode);
  }

  useEffect(() => {
    OpenFiscaAPI.getVariable(variable_name)
      .then((res) => {
        setVariable(res.data);

        const entity_name = res.data.entity;
        const entity = entities[entity_name];

        return Promise.resolve({ variable: res.data, entity: entity });
      })
      .then((res) => {
        const payload = createDependenciesPayload(res.variable, res.entity);

        OpenFiscaAPI.postDependencies(payload)
          .then((res) => {
            setDependencies(Object.keys(res.data));
          })
          .catch((err) => {
            console.log(err);
          });

        return Promise.resolve(payload);
      })
      .then((payload) => {
        OpenFiscaAPI.postTrace(payload)
          .then((res) => {
            const traceTree = makeDependencyTree(res.data.trace);
            setTraceTree(traceTree);
          })
          .catch((err) => {
            console.log(err);
          });
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
              Default: {variable.defaultValue}
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

        <div className="nsw-col">
          {/* <div
            id="treeWrapper"
            style={{ width: '100vw', height: '200px', backgroundColor: '#fff' }}
          >
            <D3_Tree data={dependencyTree} height={200} />
          </div> */}
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

          <ul>
            {/* <div
            id="treeWrapper"
            style={{ width: '100vw', height: '200px', backgroundColor: '#fff' }}
          >
            <D3_Tree data={dependencyTree} height={200} />
          </div> */}
          </ul>
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
