import React from 'react';
import { FormGroup } from 'nsw-ds-react/forms';
import { RadioItem } from 'nsw-ds-react/forms/radio/formRadio';
// style

import 'styles/formInput.css';

export default function RadioInput(props) {
  const { formItem, setItemValue } = props;

  const possibleValues = [
    { value: false, text: 'False', checked: 'true' },
    { value: true, text: 'True' },
  ];

  console.log(formItem);

  const toggleRadio = (e) => {
    console.log(e.target);
  };
  return (
    <FormGroup
      label={formItem.description} // primary label
      errorText="Invalid value!" // error text if invalid
      status={formItem.invalid && 'invalid'} // if `true` renders invalid formatting
    >
      {possibleValues.map((option, i) => {
        console.log(option);
        return <RadioItem key={i} {...option} onClick={toggleRadio} />;
      })}
    </FormGroup>
  );
}
