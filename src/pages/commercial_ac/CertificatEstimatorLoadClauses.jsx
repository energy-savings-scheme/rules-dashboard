import React, { Fragment, useEffect, useState } from 'react';

// Import services
import moment from 'moment';

// Import components
import CalculateBlock from 'components/calculate/CalculateBlock';

import Button from 'nsw-ds-react/button/button';
import { FormGroup, FormGroupSelect, TextInput } from 'nsw-ds-react/forms';
import { Notification } from 'nsw-ds-react/notification/notification';
import { ProgressIndicator } from 'nsw-ds-react/forms/progress-indicator/progressIndicator';
import OpenFiscaApi from 'services/openfisca_api';
import VariableTreeListItem from 'components/VariableTreeListItem';

export default function CertificateEstimatorLoadClauses(props) {
  const {
    variableToLoad1,
    variableToLoad2,
    variables,
    entities,
    setStepNumber,
    stepNumber,
    metadata,
    // setFormValues,
    // dependencies,
  } = props;

  console.log(variableToLoad1);
  console.log(variableToLoad2);
  console.log(metadata);

  // const [dropdownOptions, setDropdownOptions] = useState([{}]);
  // const [stepNumber, setStepNumber] = useState(1);
  const [variable, setVariable] = useState({}); // all info about variable

  var today = new Date();
  const [calculationDate, setCalculationDate] = useState(moment(today).format('YYYY-MM-DD'));
  const [dateInvalid, setDateInvalid] = useState(false);

  const [calculationResult, setCalculationResult] = useState(null);
  const [calculationError, setCalculationError] = useState(false);

  const [formValues, setFormValues] = useState([]);
  const [dependencies, setDependencies] = useState([]);

  // const [formValues, setFormValues] = useState([]);
  const [loading, setLoading] = useState(true);

  const [variableData1, setVariableData1] = useState([]);
  const [variableData2, setVariableData2] = useState([]);

  useEffect(() => {
    OpenFiscaApi.getVariable(variableToLoad1)
      .then((res) => {
        setVariableData1(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [variableToLoad1]);

  useEffect(() => {
    OpenFiscaApi.getVariable(variableToLoad2)
      .then((res) => {
        setVariableData2(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [variableToLoad2]);

  console.log(variableData1);
  console.log(variableData2);

  function addElement(arr, obj) {
    const { length } = arr;
    const id = length + 1;
    const found = arr.some((el) => el.name === obj.name);
    if (!found) arr.push(obj);
    return arr;
  }

  useEffect(() => {
    if (variables) {
      const variable1 = variables.find((item) => item.name === variableToLoad1);
      const variable2 = variables.find((item) => item.name === variableToLoad2);

      const offsprings1 = variable1.metadata.input_offspring;
      const offsprings2 = variable2.metadata.input_offspring;

      const children1 = variables.filter((item) => offsprings1.includes(item.name));
      const children2 = variables.filter((item) => offsprings2.includes(item.name));

      console.log(children1);
      console.log(children2);

      // Define the original array (at a minimum include the Implementation Date)
      var array1 = [];
      var array2 = [];

      children1.map((child) => {
        array1.push({ ...child, form_value: '', invalid: false });
      });

      children2.map((child) => {
        array2.push({ ...child, form_value: '', invalid: false });
      });

      array2.forEach((item) => addElement(array1, item));

      console.log(array1);

      setFormValues(array1);
    }
  }, [variableData1, variableData2]);

  //   console.log(formValues);

  const formatResultString = (result) => {
    if (typeof result === 'boolean') {
      return JSON.stringify(result);
    }

    return JSON.stringify(result) + ' kW';
  };

  if (!variable) return null;

  return (
    <div className>
      <div style={{ marginTop: 70, marginBottom: 70 }}>
        {stepNumber === 1 && (
          <Fragment>
            <div className="nsw-row">
              <div className="nsw-col">
                <div className="nsw-content-block">
                  <div className="nsw-content-block__content">
                    {/* <h3 className="nsw-content-block__title">
                      What would you like to calculate savings for?
                    </h3>

                    <FormGroupSelect
                      label="What activity are you calculating savings for?" // primary label
                      helper="Select a variable below." // helper text (secondary label)
                      options={dropdownOptions}
                      value={variable.name}
                      onChange={(e) => {
                        setVariable(variables.find((item) => item.name === e.target.value));
                      }}
                    ></FormGroupSelect>
                    <FormGroup
                      label="What is the activity date?"
                      helper="What date did the energy saving activity occur?"
                      errorText="The date provided is invalid!"
                      status={dateInvalid && 'invalid'}
                    >
                      <TextInput
                        as="input"
                        type="date"
                        status={dateInvalid && 'invalid'}
                        placeholder="Enter value"
                        value={calculationDate}
                        onChange={(e) => setCalculationDate(e.target.value)}
                      />
                    </FormGroup> */}
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="nsw-row">
              <div className="nsw-col">
                <Button
                  as="primary"
                  onClick={(e) => {
                    setStepNumber(stepNumber + 1);
                  }}
                  style={{ float: 'right' }}
                >
                  Check Schemes Base Eligibility
                </Button>
              </div>
            </div> */}
          </Fragment>
        )}

        {stepNumber === 2 && (
          <Fragment>
            <CalculateBlock
              calculationDate={calculationDate}
              variable={variable}
              variables={variables}
              entities={entities}
              calculationResult={calculationResult}
              setCalculationResult={setCalculationResult}
              setCalculationError={setCalculationError}
              stepNumber={stepNumber}
              setStepNumber={setStepNumber}
              formValues={formValues}
              setFormValues={setFormValues}
              backAction={(e) => {
                setStepNumber(stepNumber - 1);
              }}
              dependencies={dependencies}
              metadata={metadata}
              // dependencyMapping={dependencyMapping}
            />
          </Fragment>
        )}

        {stepNumber === 3 && (
          <Fragment>
            {calculationResult !== null && (
              <div className="nsw-row">
                <div className="nsw-col">
                  <div className="nsw-content-block">
                    <div className="nsw-content-block__content">
                      <h4 className="nsw-content-block__title" style={{ textAlign: 'center' }}>
                        Based on the information provided, your{' '}
                        <span style={{ fontWeight: 600, textDecoration: 'underline' }}>
                          {variable.metadata && variable.metadata.alias
                            ? variable.metadata.alias
                            : variable.name}
                        </span>{' '}
                        are
                      </h4>
                      <h1 style={{ textAlign: 'center', paddingTop: 10 }}>
                        {formatResultString(calculationResult)}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {stepNumber === 2 && calculationError && (
              <Notification as="error" title="Sorry! An error has occurred.">
                <p>
                  An error occurred during calculation. Try choosing a more recent Date and
                  re-running the calculation
                </p>
              </Notification>
            )}

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
