import React, { Fragment, useEffect, useState } from 'react';

// Import services

// Import components
import CalculateBlock from 'components/calculate/CalculateBlock';

import Button from 'nsw-ds-react/button/button';
import { FormGroup, FormGroupSelect, TextInput } from 'nsw-ds-react/forms';
import { Notification } from 'nsw-ds-react/notification/notification';
import { ProgressIndicator } from 'nsw-ds-react/forms/progress-indicator/progressIndicator';

const dropdownOptions = [
  {
    text: 'Peak Demand Savings - Removal of Old Appliance',
    value: 'PDRS__ROOA__peak_demand_savings',
  },
  {
    text: 'Peak Demand Savings - Air Conditioner',
    value: 'PDRS__Air_Conditioner__peak_demand_savings',
  },
  { text: 'Peak Demand Savings - Motors', value: 'PDRS__motors__peak_demand_savings' },
];

export default function CaculatePage(props) {
  const { variables, entities } = props;

  const [stepNumber, setStepNumber] = useState(1);
  const [variable, setVariable] = useState({});

  const [calculationDate, setCalculationDate] = useState('2021-01-01');
  const [dateInvalid, setDateInvalid] = useState(false);

  const [calculationResult, setCalculationResult] = useState(null);
  const [calculationError, setCalculationError] = useState(false);

  const [formValues, setFormValues] = useState([]);

  useEffect(() => {
    setVariable(variables.find((item) => item.name === dropdownOptions[0].value));
  }, [variables]);

  useEffect(() => {
    if (variable && variable.name) {
      const offsprings = variable.metadata.input_offspring;
      const children = variables.filter((item) => offsprings.includes(item.name));

      // Define the original array (at a minimum include the Implementation Date)
      var array = [];

      children.map((child) => {
        array.push({ ...child, form_value: child.default_value, invalid: false });
      });

      setFormValues(array);
    }
  }, [variable]);

  const formatResultString = (result) => {
    return JSON.stringify(result) + ' kW';
  };

  if (!variable) return null;

  return (
    <div className="nsw-container">
      <div className="nsw-row">
        <div className="nsw-col">
          <h2>
            <span style={{ marginRight: 10 }}>Calculate your savings</span>
          </h2>
        </div>
      </div>

      <ProgressIndicator step={stepNumber} of={3} />
      <div style={{ marginTop: 70, marginBottom: 70 }}>
        {stepNumber === 1 && (
          <Fragment>
            <div className="nsw-row">
              <div className="nsw-col">
                <div className="nsw-content-block">
                  <div className="nsw-content-block__content">
                    <h3 className="nsw-content-block__title">
                      What would you like to calculate savings for?
                    </h3>
                    <FormGroupSelect
                      label="What actitivty are you calculating savings for?" // primary label
                      helper="Search by activity name or code." // helper text (secondary label)
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
                    </FormGroup>
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
                >
                  Next
                </Button>
              </div>
            </div>
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
            />

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

            {calculationError && (
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
