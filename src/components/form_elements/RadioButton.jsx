import React from 'react';
import { FormGroupRadio } from 'nsw-ds-react/forms';

export default function RadioInput(props) {
  const { formItem, setItemValue } = props;

  const possibleValues = [
    { value: true, text: 'Yes' },
    { value: false, text: 'No' },
  ];

  if (formItem.form_value === '') {
    formItem.form_value = formItem.default_value;
  }

  return (
    <FormGroupRadio
      // label={formItem.description}
      helper={formItem.description}
      options={possibleValues}
      htmlId={formItem.name}
      form_value={formItem.form_value}
      onChange={setItemValue}
    />
  );
}
