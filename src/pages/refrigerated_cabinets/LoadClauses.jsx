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
import Alert from 'nsw-ds-react/alert/alert';
import SpinnerFullscreen from 'components/layout/SpinnerFullscreen';

export default function LoadClausesRF2(props) {
  const {
    variableToLoad,
    variables,
    entities,
    setStepNumber,
    stepNumber,
    formValues,
    setFormValues,
    dependencies,
    clausesForm,
    setClausesForm,
  } = props;

  console.log(variableToLoad);

  const [variable, setVariable] = useState({}); // all info about variable

  var today = new Date();
  const [calculationDate, setCalculationDate] = useState(moment(today).format('YYYY-MM-DD'));
  const [dateInvalid, setDateInvalid] = useState(false);

  const [calculationResult, setCalculationResult] = useState(null);
  const [calculationError, setCalculationError] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (stepNumber === 1) {
      setCalculationResult(null);
    }
  }, [stepNumber]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    OpenFiscaApi.getVariable(variableToLoad)
      .then((res) => {
        setVariable(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [variableToLoad]);

  const formatResultString = (result) => {
    if (typeof result === 'boolean') {
      if (result === true) {
        return 'you have met the base eligibility requirements';
      } else {
        return 'you have NOT met the base eligibility requirements';
      }
    }

    return JSON.stringify(result) + ' kW';
  };

  const formatBooleanToString = (result) => {
    const s = String(result);
    return s[0].toUpperCase() + s.slice(1);
  };

  if (!variable) return null;

  return (
    <div className style={{ marginBottom: '7%' }}>
      <div>
        {stepNumber === 1 && (
          <Fragment>
            <div className="nsw-row">
              <div className="nsw-col">
                <br></br>
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

        {stepNumber === 1 && (
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
              workflow={'eligibility'}
            />
          </Fragment>
        )}

        {stepNumber === 2 && calculationResult !== null && (
          <Fragment>
            {
              <div style={{ marginTop: '5%' }}>
                <Alert as="info" title="ESCs and PRCs" style={{ width: '80%' }}>
                  <p>
                    {/* <h4 className="nsw-content-block__title" style={{ textAlign: 'center' }}> */}
                    Based on the information provided {formatResultString(calculationResult)}.
                  </p>
                </Alert>

                {calculationResult === false && (
                  <Alert
                    as="warning"
                    title="The following answers were ineligible:"
                    style={{ width: '80%' }}
                  >
                    <p>
                      {clausesForm.length > 0 &&
                        clausesForm.map((item, i) => (
                          <React.Fragment>
                            <div class="nsw-global-alert__title">
                              {item.metadata.display_question} :{' '}
                              {formatBooleanToString(item.form_value)}
                            </div>
                            <br></br>
                            <p>{item.metadata.eligibility_clause}</p>
                            <br></br>
                          </React.Fragment>
                        ))}
                    </p>
                  </Alert>
                )}
              </div>
            }
          </Fragment>
        )}

        {stepNumber === 2 && loading && <SpinnerFullscreen />}

        {stepNumber === 2 && calculationError && (
          <Alert as="error" title="Sorry! An error has occurred.">
            <p>An error occurred during calculation. Please try again.</p>
          </Alert>
        )}

        {stepNumber === 2 && (
          <div
            className="nsw-col-md-9"
            style={{ padding: 'inherit', marginTop: '5%', marginBottom: '5%' }}
          >
            <Button
              style={{ float: 'left' }}
              as="dark"
              onClick={(e) => {
                setClausesForm([]);
                setStepNumber(stepNumber - 1);
              }}
            >
              Check base eligibility again
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
