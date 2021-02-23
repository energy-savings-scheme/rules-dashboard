import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import OpenFiscaAPI from 'services/openfisca_api';

export default function Tree(props) {
  let { variable_name } = useParams();
  const { entities, variables } = props;

  const [variable, setVariable] = useState({});
  const [dependencyTree, setDependencyTree] = useState([]);

  const createDependenciesPayload = (variable, entity) => {
    var payload = {
      persons: {
        'person 1': {},
      },
    };
    payload[entity.plural] = {};
    payload[entity.plural][`${entity.description} abcd`] = {};
    payload[entity.plural][`${entity.description} abcd`][variable.id] = { '2021-5-5': null };

    return payload;
  };

  function makeTree(inputArray) {
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

      //   Remove unnecessary keys from object
      delete return_obj.calculation_time;
      delete return_obj.formula_time;
      return return_obj;
    }

    return buildNestedTreeFromNode(baseNode);
  }

  const buildDependencyTree = (trace) => {
    const dependencies_array = Object.entries(trace).map((e) => ({ name: e[0], ...e[1] }));
    const tree = makeTree(dependencies_array);
    console.log(tree);
  };

  useEffect(() => {
    // console.log(Object.keys(variables));

    OpenFiscaAPI.getVariable(variable_name)
      .then((res) => {
        setVariable(res.data);

        const entity_name = res.data.entity;
        const entity = entities[entity_name];

        return Promise.resolve({ variable: res.data, entity: entity });
      })
      .then((res) => {
        const payload = createDependenciesPayload(res.variable, res.entity);

        OpenFiscaAPI.postTrace(payload)
          .then((res) => {
            buildDependencyTree(res.data.trace);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });

    // var variable = variables.filter(item => item.name)

    // OpenFiscaAPI.postDependencies({});
  }, [entities]);

  return (
    <div>
      <table>
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
            <td style={{ fontWeight: 600 }}>definitionPeriod:</td>
            <td>{variable.definitionPeriod}</td>
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
    </div>
  );
}
