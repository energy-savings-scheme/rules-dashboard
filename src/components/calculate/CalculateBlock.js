import React, { useState, useEffect } from 'react';

import CalculateButton from 'components/calculate/CalculateButton';
import DateInput from 'components/form_elements/DateInput';
import FormTextInput from 'components/form_elements/FormTextInput';

export default function CalculateBlock(props) {
  const { variables, variable, entities } = props;

  const [formValues, setFormValues] = useState([]);

  useEffect(() => {
    const children = variables.filter((item) => variable.children.includes(item.name));

    // Define the original array (at a minimum include the Implementation Date)
    var array = [
      {
        name: 'Implementation Date',
        value_type: 'Date',
        default_value: '2021-01-01',
        form_value: '2021-01-01',
        invalid: true,
      },
    ];
    children.map((child) => {
      array.push({ ...child, form_value: child.default_value, invalid: false });
    });

    setFormValues(array);
  }, []);

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
    }
  };

  return (
    <div className="nsw-row">
      <div className="nsw-col">
        <div className="nsw-content-block">
          <div className="nsw-content-block__content">
            <h2 className="nsw-content-block__title">Calculate</h2>
            <p style={{ color: 'red' }}>
              For each children, render the correct form Input (based on the type). For example,
              radio-select for True/False, and Dropdown for an Enum
            </p>
            <form>{formValues.map((formItem, index) => renderFormField(formItem))}</form>
          </div>
        </div>
      </div>
      <div className="nsw-col">
        <div className="nsw-content-block">
          <div className="nsw-content-block__content">
            <CalculateButton variable={variable} entities={entities} />
          </div>
        </div>
      </div>
    </div>
  );
}
