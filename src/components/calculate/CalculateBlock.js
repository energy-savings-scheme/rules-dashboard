import React from 'react';

import CalculateForm from 'components/calculate/CalculateForm';
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
    backAction,
  } = props;

  console.log(formValues); // the questions

  const renderFormField = (formItem) => {
    console.log(formItem);
    // This function checks the `value_type` attribute of the Variable
    // and renders the appropriate HTML input element.

    const setItemValue = (e) => {
      // Helper function which sets the value for formItem when the HTML input element's
      // onChange event is triggered
      setFormValues(
        [...formValues].map((item) => {
          if (item.name === formItem.name) {
            if (formItem.value_type === 'Boolean') {
              return { ...item, form_value: e.target.value === 'true' };
            } else {
              return { ...item, form_value: e.target.value };
            }
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

  return (
    <CalculateForm
      calculationDate={calculationDate}
      variable={variable}
      entities={entities}
      formValues={formValues}
      calculationResult={calculationResult}
      setCalculationResult={setCalculationResult}
      setCalculationError={setCalculationError}
      stepNumber={stepNumber}
      setStepNumber={setStepNumber}
      backAction={backAction}
    >
      {formValues.map((formItem, index) => renderFormField(formItem))}
    </CalculateForm>
  );
}
