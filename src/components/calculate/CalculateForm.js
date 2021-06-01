import React, { useState } from 'react';
import OpenFiscaApi from 'services/openfisca_api';

import Button from 'nsw-ds-react/button/button';
import { Notification } from 'nsw-ds-react/notification/notification';

import { Spinner } from 'react-bootstrap';

export default function CalculateForm(props) {
  const {
    variable,
    entities,
    calculationDate,
    calculationResult,
    setCalculationResult,
    setCalculationError,
    stepNumber,
    setStepNumber,
    backAction,
  } = props;
  var { formValues } = props;

  const [loading, setLoading] = useState(false);

  const validateDataType = (item) => {
    // OpenFisca requires payload data to be correctly typed.
    // eg. a Float value cannot be 'stringified'.
    // So in this function we check the value_type attribute, and
    // parse the input value accordingly.
    if (item.value_type === 'Float') {
      item.form_value = parseFloat(item.form_value);
    }

    return item;
  };

  const handleCalculate = (e) => {
    e.preventDefault();

    setLoading(true);
    setCalculationError(false);

    const entity = entities.find((item) => item.name === variable.entity);

    // Set implementation date from DateInput component - and pop item from formValues
    const date = calculationDate;
    formValues = formValues.filter((item) => item.name !== 'Implementation Date');

    var payload = {
      persons: { person1: {} },
      [entity.plural]: { [`${entity.name}_1`]: { [variable.name]: { [date]: null } } },
    };

    formValues.map((variable) => {
      const variable_entity = entities.find((item) => item.name === variable.entity);

      payload[variable_entity.plural][`${variable_entity.name}_1`][`${variable.name}`] = {
        [date]: validateDataType(variable).form_value,
      };
    });

//    console.log(payload);

    OpenFiscaApi.postCalculate(payload)
      .then((res) => {
        var result = res.data[entity.plural][`${entity.name}_1`][variable.name][date];
        console.log(res.data)
        setCalculationResult(result);
      })
      .catch((err) => {
        setCalculationResult(null);
        setCalculationError(true);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        setStepNumber(stepNumber + 1);
      });
  };

  return (
    <form onSubmit={handleCalculate}>
      <div className="nsw-content-block">
        <div className="nsw-content-block__content">
          <h2 className="nsw-content-block__title">
            Calculate{' '}
            {variable.metadata && variable.metadata.alias ? variable.metadata.alias : variable.name}
          </h2>
        </div>
      </div>

      {props.children}

      <div className="nsw-row">
        <div className="nsw-col">
          <Button as="secondary" onClick={backAction}>
            Back
          </Button>
          <Button as="primary" type="submit" style={{ float: 'right' }}>
            {loading ? (
              <Spinner animation="border" role="status" size="lg">
                <span className="sr-only">Loading...</span>
              </Spinner>
            ) : calculationResult ? (
              'Calculate again'
            ) : (
              'Calculate'
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
