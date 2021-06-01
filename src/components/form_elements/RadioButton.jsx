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
      label={formItem.description}
      helper={
        formItem.metadata && formItem.metadata.alias ? formItem.metadata.alias : formItem.name
      }
      options={possibleValues}
      htmlId={formItem.name}
      form_value={formItem.form_value}
      onChange={setItemValue}
    />
  );
}
