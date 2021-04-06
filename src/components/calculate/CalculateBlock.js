import React, { useState, useEffect } from 'react';

import CalculateButton from 'components/calculate/CalculateButton';
import DateInput from 'components/form_elements/DateInput';
import FormTextInput from 'components/form_elements/FormTextInput';
import DropDownMenu from 'components/form_elements/DropDownMenu';
import RadioButton from 'components/form_elements/RadioButton';

export default function CalculateBlock(props) {
  const {
    variables,
    variable,
    entities,
    calculationDate = '2021-01-01',
    calculationResult,
    setCalculationResult,
    setCalculationError,
    stepNumber,
    setStepNumber,
    formValues,
    setFormValues,
  } = props;

  const renderFormField = (formItem) => {
    // This function checks the `value_type` attribute of the Variable
    // and renders the appropriate HTML input element.

    const setItemValue = (e) => {
      // Helper function which sets the value for formItem when the HTML input element's
      // onChange event is triggered
      setFormValues(
        [...formValues].map((item) => {
          if (item.name === formItem.name) {
            return { ...item, form_value: e.target.value };
          } else {
            return item;
          }
        }),
      );
    };

    switch (formItem.value_type) {
      case 'Float':
        return <FormTextInput formItem={formItem} setItemValue={setItemValue} />;
      case 'Date':
        return <DateInput formItem={formItem} setItemValue={setItemValue} />;
      case 'String':
        return <DropDownMenu formItem={formItem} setItemValue={setItemValue} />;
      case 'Boolean':
        return <RadioButton formItem={formItem} setItemValue={setItemValue} />;
    }
  };

  console.log(formValues);

  return (
    <div className="nsw-row">
      <div className="nsw-col">
        <div className="nsw-content-block">
          <div className="nsw-content-block__content">
            <h2 className="nsw-content-block__title">Calculate</h2>
            <form className="nsw-form-group">
              {formValues.map((formItem, index) => renderFormField(formItem))}
            </form>
          </div>
        </div>
      </div>
      <div className="nsw-col">
        <div className="nsw-content-block">
          <div className="nsw-content-block__content">
            <CalculateButton
              calculationDate={calculationDate}
              variable={variable}
              entities={entities}
              formValues={formValues}
              calculationResult={calculationResult}
              setCalculationResult={setCalculationResult}
              setCalculationError={setCalculationError}
              stepNumber={stepNumber}
              setStepNumber={setStepNumber}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
