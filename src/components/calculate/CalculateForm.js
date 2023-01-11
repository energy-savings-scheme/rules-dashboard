import React, { useEffect, useState } from 'react';
import OpenFiscaApi from 'services/openfisca_api';

import Button from 'nsw-ds-react/button/button';
import Alert from 'nsw-ds-react/alert/alert';

import { Spinner } from 'react-bootstrap';
import SpinnerFullscreen from 'components/layout/SpinnerFullscreen';

export default function CalculateForm(props) {
  const {
    variable,
    variable2,
    entities,
    calculationDate,
    calculationResult,
    setCalculationResult,
    setCalculationError,
    setCalculationError2,
    stepNumber,
    setStepNumber,
    backAction,
    dependencies,
    setCalculationResult2,
    calculationResult2,
    workflow,
    selectedModel,
    selectedBrand,
    flow,
    setFlow,
    setFormValues,
    persistFormValues,
    setPersistFormValues,
  } = props;

  var { formValues } = props;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  console.log(variable);
  console.log(variable2);

  const handleCalculate = (e) => {
    e.preventDefault();

    setLoading(true);
    setCalculationError(true);

    if (variable2) {
      setCalculationError2(true);
    }

    const entity = entities.find((item) => item.name === variable.entity);

    // Set implementation date from DateInput component - and pop item from formValues
    const date = calculationDate;
    formValues = formValues.filter((item) => item.name !== 'Implementation Date');

    var payload = {
      persons: { person1: {} },
      [entity.plural]: { [`${entity.name}_1`]: { [variable.name]: { [date]: null } } },
    };

    if (workflow === 'eligibility') {

    formValues.filter(x => x.hide === false).map((variable) => {

      const variable_entity = entities.find((item) => item.name === variable.entity);

      payload[variable_entity.plural][`${variable_entity.name}_1`][`${variable.name}`] = {
        [date]: validateDataType(variable).form_value,
      };
    });
  } else {
    formValues.map((variable) => {

      const variable_entity = entities.find((item) => item.name === variable.entity);

      payload[variable_entity.plural][`${variable_entity.name}_1`][`${variable.name}`] = {
        [date]: validateDataType(variable).form_value,
      };
    });
  }

    console.log('payload', payload);

    console.log(loading);
    OpenFiscaApi.postCalculate(payload)
      .then((res) => {
        var result = res.data[entity.plural][`${entity.name}_1`][variable.name][date];
        setCalculationResult(result);
        setCalculationError(false);
        setLoading(true);
      })
      .catch((err) => {
        setCalculationResult(null);
        setCalculationError(true);
      })
      .finally(() => {
        setLoading(false);
      });

    if (variable2) {
      const entity2 = entities.find((item) => item.name === variable2.entity);
      var payload2 = {
        persons: { person1: {} },
        [entity2.plural]: { [`${entity2.name}_1`]: { [variable2.name]: { [date]: null } } },
      };

      formValues.map((variable) => {
        const variable_entity2 = entities.find((item) => item.name === variable.entity);

        payload2[variable_entity2.plural][`${variable_entity2.name}_1`][`${variable.name}`] = {
          [date]: validateDataType(variable).form_value,
        };
      });

      console.log(payload2);

      OpenFiscaApi.postCalculate(payload2)
        .then((res) => {
          var result = res.data[entity2.plural][`${entity2.name}_1`][variable2.name][date];
          console.log(res.data);
          setCalculationResult2(result);
          setCalculationError2(false);
        })
        .catch((err) => {
          setCalculationResult2(null);
          setCalculationError2(true);
          console.log(err);
        })
        .finally(() => { 
          setLoading(false);
        });
    }

    setStepNumber(stepNumber + 1);

    if (workflow !== 'eligibility') {
      setPersistFormValues(formValues);
    }
  };

  return (
    <form onSubmit={handleCalculate}>
      <div className="nsw-content-block">
        <div className="nsw-content-block__content">
          {workflow === 'certificates' ? (
            <h5 className="nsw-content-block__copy" style={{ paddingBottom: '30px' }}>
              <b>Please answer the following questions to calculate your ESCs and PRCs</b>
            </h5>
          ) : (
            <h5 className="nsw-content-block__copy">
              {' '}
              <b> Check if you meet the following requirements </b>
            </h5>
          )}
        </div>
      </div>

      {props.children}

      {stepNumber === 2 && (
        <div className="nsw-row" style={{ width: '80%', paddingTop: '50px' }}>
          <div className="nsw-col-md-9">
            {stepNumber !== 1 && (
              <Button
                style={{ float: 'left' }}
                as="dark-outline-solid"
                onClick={(e) => {
                  setFlow('backward');
                  setStepNumber(stepNumber - 1);
                }}
              >
                Back
              </Button>
            )}
          </div>

          <div className="nsw-col-md-3">
            <Button as="dark" type="submit" style={{ float: 'right' }}>
              {loading ? (
                <Spinner animation="border" role="status" size="lg">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              ) : workflow === 'eligibility' ? (
                'Check eligibility'
              ) : (
                'Calculate certificates'
              )}
            </Button>
          </div>
        </div>
      )}

      {stepNumber === 1 && (
        <div className="nsw-row" style={{ width: '80%', paddingTop: '50px' }}>
          <div className="nsw-col-md-3">
            <Button as="dark" type="submit" style={{ float: 'left' }}>
              {loading ? (
                <Spinner animation="border" role="status" size="lg">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              ) : workflow === 'eligibility' ? (
                'Check eligibility'
              ) : (
                'Calculate certificates'
              )}
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}
