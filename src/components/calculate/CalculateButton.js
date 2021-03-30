import React, { Fragment, useState } from 'react';
import OpenFiscaApi from 'services/openfisca_api';

import Button from 'nsw-ds-react/button/button';
import { Notification } from 'nsw-ds-react/notification/notification';

export default function CalculateButton(props) {
  const { variable, entities } = props;
  var { formValues } = props;

  const [result, setResult] = useState(null);
  const [error, setError] = useState(false);

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
    setError(false);

    const entity = entities.find((item) => item.name === variable.entity);

    // Set implementation date from DateInput component - and pop item from formValues
    const date = formValues.find((item) => item.value_type === 'Date').form_value;
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
        setResult(result);
      })
      .catch((err) => {
        setResult(null);
        setError(true);
        console.log(err);
      });
  };

  return (
    <Fragment>
      {result !== null && (
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
                <h1 style={{ textAlign: 'center', paddingTop: 10 }}>{result}</h1>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <Notification as="error" title="Sorry! An error has occurred.">
          <p>
            An error occurred during calculation. Try choosing a more recent Date and re-running the
            calculation
          </p>
        </Notification>
      )}

      <Button as="primary" onClick={handleCalculate}>
        {result ? 'Calculate again' : 'Calculate'}
      </Button>
    </Fragment>
  );
}
