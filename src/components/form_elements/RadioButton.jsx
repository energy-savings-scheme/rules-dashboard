import React from 'react';
import { FormGroupRadio } from 'nsw-ds-react/forms';

export default function RadioInput(props) {
  const { formItem, setItemValue } = props;

  const possibleValues = [
    { value: false, text: 'false', checked: 'true' },
    { value: true, text: 'true', checked: 'false' },
  ];
  // for (const [key, value] of Object.entries(formItem.possible_values)) {
  //   possibleValues.push({ text: value, value: key });
  // }

  console.log(formItem);

  return (
    <FormGroupRadio
      // helper={
      //   formItem.metadata && formItem.metadata.alias ? formItem.metadata.alias : formItem.name
      // } // (secondary label)
      label={formItem.description} // primary label
      errorText="Invalid value!" // error text if invalid
      status={formItem.invalid && 'invalid'} // if `true` renders invalid formatting
      options={possibleValues}
      // onClick={() => {
      //   console.log('clicked');
      // }}
    ></FormGroupRadio>
  );
}
