import React from 'react';
import { FormGroupRadio } from 'nsw-ds-react/forms';

export default function RadioInput(props) {
  const { formItem, setItemValue } = props;

  const possibleValues = [
    { value: false, text: 'False' },
    { value: true, text: 'True' },
  ];

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
    ></FormGroupRadio>
  );
}
