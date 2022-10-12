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
      // label={formItem.metadata && formItem.metadata.alias ? formItem.metadata.alias : formItem.name}
      helper={formItem.metadata.display_question}
      options={possibleValues}
      htmlId={formItem.name}
      form_value={formItem.form_value}
      onChange={setItemValue}
    />
  );
}
