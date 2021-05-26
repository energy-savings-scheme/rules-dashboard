import React, { Fragment, useEffect, useState } from 'react';
import Button from 'nsw-ds-react/button/button';
import { FormGroupSelect } from 'nsw-ds-react/forms';
import { ProgressIndicator } from 'nsw-ds-react/forms/progress-indicator/progressIndicator';
import { Link } from 'react-router-dom';

export default function ComparePage(props) {
  const { variables, entities } = props;

  const [dropdownOptions, setDropdownOptions] = useState([{}]);
  const [stepNumber, setStepNumber] = useState(1);
  const [variable1, setVariable1] = useState({});
  const [variable2, setVariable2] = useState({});
  const [var1_ref, setVar1Ref] = useState({});
  const [var2_ref, setVar2Ref] = useState({});

  const populateDropDown = (newOption) => {
    setDropdownOptions((prev) => {
      return [...prev, newOption];
    });
  };

  useEffect(() => {
    variables.forEach((item) => populateDropDown({ text: item.metadata.alias, value: item.name }));
  }, [variables]);

  const unpackRegRef = (someVariable) => {
    const metadata = someVariable.metadata;
    if (metadata !== null) {
      var metadataKeys = Object.keys(metadata);
      if (metadataKeys.includes('regulation_reference')) {
        var ref = metadata.regulation_reference;
        var reg_ref = { version_name: ref['version'], version_code: ref['identifier'] };

        while (Object.keys(ref).includes('part')) {
          var ref = ref['part'];
          if (ref['part_type'] === 'SubMethod') {
            reg_ref['subMethod'] = ref['title'];
          }

          if (ref['part_type'] === 'Activity Definition') {
            reg_ref['activity'] = ref['title'];
          }
        }

        return reg_ref;
      } else {
        return {};
      }
    } else {
      return {};
    }
  };

  if (!variable1) return null;
  if (!variable2) return null;

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
                      Which variables would you like to compare?
                    </h3>
                    <FormGroupSelect
                      label="Variable One" // primary label
                      helper="Select a variable below." // helper text (secondary label)
                      options={dropdownOptions}
                      value={variable1.name}
                      onChange={(e) => {
                        const var1 = variables.find((item) => item.name === e.target.value);
                        setVariable1(var1);
                        setVar1Ref(unpackRegRef(var1));
                      }}
                    ></FormGroupSelect>
                    <FormGroupSelect
                      label="Variable Two" // primary label
                      helper="Select a variable below." // helper text (secondary label)
                      options={dropdownOptions}
                      value={variable2.name}
                      onChange={(e) => {
                        const var2 = variables.find((item) => item.name === e.target.value);
                        setVariable2(var2);
                        setVar2Ref(unpackRegRef(var2));
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
                      <p>Here are the details of these two variables.</p>
                      <table className="nsw-table nsw-table--caption-top nsw-table--bordered nsw-table--striped ">
                        <thead>
                          <tr>
                            <th width="20%"></th>
                            <th width="40%">
                              <Link to={`/variables/${variable1.name}`}>
                                {' '}
                                {variable1.metadata.alias}
                              </Link>
                            </th>
                            <th width="40%">
                              {' '}
                              <Link to={`/variables/${variable2.name}`}>
                                {' '}
                                {variable2.metadata.alias}
                              </Link>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <strong>Description</strong>
                            </td>
                            <td>{variable1.description}</td>
                            <td>{variable2.description}</td>
                          </tr>
                          <tr>
                            <td>
                              {' '}
                              <strong>Scheme</strong>
                            </td>
                            <td>{var1_ref.version_code}</td>
                            <td>{var2_ref.version_code}</td>
                          </tr>
                          <tr>
                            <td>
                              {' '}
                              <strong>Sub-Method</strong>
                            </td>
                            <td>{var1_ref.subMethod}</td>
                            <td>{var2_ref.subMethod}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Activity Name</strong>
                            </td>
                            <td>{var1_ref.activity}</td>
                            <td>{var2_ref.activity}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Children</strong>
                            </td>
                            <td>
                              {variable1.children.map((item) => {
                                return <p>{item}</p>;
                              })}
                            </td>
                            <td>
                              {variable2.children.map((item) => {
                                return <p>{item}</p>;
                              })}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Parents</strong>
                            </td>
                            <td>
                              {variable1.parents.map((item) => {
                                return <p>{item}</p>;
                              })}
                            </td>
                            <td>
                              {variable2.parents.map((item) => {
                                return <p>{item}</p>;
                              })}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Input offsprings</strong>
                            </td>
                            <td>
                              {variable1.metadata.input_offspring.map((item) => {
                                return <p>{item}</p>;
                              })}
                            </td>
                            <td>
                              {variable2.metadata.input_offspring.map((item) => {
                                return <p>{item}</p>;
                              })}
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
