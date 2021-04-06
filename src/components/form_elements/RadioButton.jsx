import React from 'react';
import { FormGroupRadio } from 'nsw-ds-react/forms';
import { RadioItem } from 'nsw-ds-react/forms/radio/formRadio';
// style

import 'styles/formInput.css';

export default function RadioInput(props) {
  const { formItem, setItemValue } = props;

  const possibleValues = [
    { value: false, text: 'False' },
    { value: true, text: 'True' },
  ];

  const toggleRadio = (e) => {
    console.log(e.target);
  };
  return (
    <FormGroupRadio
      helper={
        formItem.metadata && formItem.metadata.alias ? formItem.metadata.alias : formItem.name
      } // (secondary label)
      label={formItem.description} // primary label
      errorText="Invalid value!" // error text if invalid
      status={formItem.invalid && 'invalid'} // if `true` renders invalid formatting
      options={possibleValues}
      onChange={setItemValue}
      checked={formItem.form_value}
    ></FormGroupRadio>
  );
}
