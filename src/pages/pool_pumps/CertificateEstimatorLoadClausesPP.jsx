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
import SpinnerFullscreen from 'components/layout/SpinnerFullscreen';

export default function CertificateEstimatorLoadClausesPP(props) {
  const {
    variableData1,
    variableData2,
    variables,
    entities,
    setStepNumber,
    stepNumber,
    metadata,
    calculationError,
    calculationError2,
    setCalculationError,
    setCalculationError2,
    calculationResult,
    setCalculationResult,
    calculationResult2,
    setCalculationResult2,
  } = props;

  console.log(variableData1);
  console.log(variableData2);

  console.log(stepNumber);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [variable, setVariable] = useState({}); // all info about variable

  var today = new Date();
  const [calculationDate, setCalculationDate] = useState(moment(today).format('YYYY-MM-DD'));
  const [dateInvalid, setDateInvalid] = useState(false);

  const [formValues, setFormValues] = useState([]);
  const [dependencies, setDependencies] = useState([]);

  const [loading, setLoading] = useState(true);

  function addElement(arr, obj) {
    const { length } = arr;
    const id = length + 1;
    const found = arr.some((el) => el.name === obj.name);
    if (!found) arr.push(obj);
    return arr;
  }

  useEffect(() => {
    if (variableData1.length == 0 || variableData1.length == 0) {
      setLoading(true);
    } else {
      setLoading(false);
      if (variables.length == 0) {
        setLoading(true);
      } else {
        setLoading(false);
        console.log(variables);
        const variable1 = variables.find((item) => item.name === 'SYS2_ESC_calculation');
        const variable2 = variables.find((item) => item.name === 'SYS2_PRC_calculation');

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

        array1.sort((a, b) => a.metadata.sorting - b.metadata.sorting);

        setFormValues(array1);
      }
    }
  }, [variableData1, variableData2]);

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
            <CalculateBlock
              calculationDate={calculationDate}
              variable={variableData1}
              variable2={variableData2}
              variables={variables}
              entities={entities}
              calculationResult={calculationResult}
              calculationResult2={calculationResult2}
              setCalculationResult={setCalculationResult}
              setCalculationResult2={setCalculationResult2}
              setCalculationError={setCalculationError}
              setCalculationError2={setCalculationError2}
              calculationError={calculationError}
              calculationError2={calculationError2}
              stepNumber={stepNumber}
              setStepNumber={setStepNumber}
              formValues={formValues}
              setFormValues={setFormValues}
              backAction={(e) => {
                setStepNumber(stepNumber - 1);
              }}
              dependencies={dependencies}
              metadata={metadata}
              workflow={'certificates'}
            />
          </Fragment>
        )}

        {stepNumber === 2 && !calculationError && !calculationError2 && (
          <Fragment>
            {
              <div className="nsw-row">
                <div className="nsw-col">
                  <div className="nsw-content-block">
                    <div className="nsw-content-block__content">
                      <h4 className="nsw-content-block__title" style={{ textAlign: 'center' }}>
                        Based on the information provided
                        <span style={{ fontWeight: 600, textDecoration: 'underline' }}></span>{' '}
                      </h4>
                      <h4 className="nsw-content-block__title" style={{ textAlign: 'center' }}>
                        your PRC certificates are
                        <span style={{ fontWeight: 600, textDecoration: 'underline' }}></span>{' '}
                      </h4>

                      <h1 style={{ textAlign: 'center', paddingTop: 10, fontWeight: 600 }}>
                        {Math.round(calculationResult)}
                      </h1>
                      <h4 className="nsw-content-block__title" style={{ textAlign: 'center' }}>
                        and ESC certificates are
                        <span style={{ fontWeight: 600, textDecoration: 'underline' }}></span>{' '}
                      </h4>
                      <h1 style={{ textAlign: 'center', paddingTop: 10, fontWeight: 600 }}>
                        {Math.round(calculationResult2)}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            }
          </Fragment>
        )}

        {stepNumber === 1 && loading && <SpinnerFullscreen />}

        {(stepNumber === 2 && calculationError === true) ||
          (stepNumber === 2 && calculationError2 === true && (
            <Notification as="error" title="Sorry! An error has occurred.">
              <p>An error occurred during calculation. Try re-running the calculation</p>
            </Notification>
          ))}

        {stepNumber === 2 && (
          <div className="nsw-row">
            <div className="nsw-col nsw-col-md-6">
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
        )}
      </div>
    </div>
  );
}
