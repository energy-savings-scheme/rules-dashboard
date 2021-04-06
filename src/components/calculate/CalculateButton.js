import React, { Fragment, useState } from 'react';
import OpenFiscaApi from 'services/openfisca_api';

import Button from 'nsw-ds-react/button/button';
import { Notification } from 'nsw-ds-react/notification/notification';

export default function CalculateButton(props) {
  const {
    variable,
    entities,
    calculationDate,
    calculationResult,
    setCalculationResult,
    setCalculationError,
    stepNumber,
    setStepNumber,
  } = props;
  var { formValues } = props;

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

    OpenFiscaApi.postCalculate(payload)
      .then((res) => {
        var result = res.data[entity.plural][`${entity.name}_1`][variable.name][date];
        setCalculationResult(result);
      })
      .catch((err) => {
        setCalculationResult(null);
        setCalculationError(true);
        console.log(err);
      })
      .finally(() => {
        setStepNumber(stepNumber + 1);
      });
  };

  return (
    <Button as="primary" onClick={handleCalculate}>
      {calculationResult ? 'Calculate again' : 'Calculate'}
    </Button>
  );
}
