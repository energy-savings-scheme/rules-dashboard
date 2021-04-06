import React from 'react';
import { FormGroup, Select } from 'nsw-ds-react/forms';

export default function DropDownMenu(props) {
  const { formItem, setItemValue } = props;

  const possibleValues = [];
  for (const [key, value] of Object.entries(formItem.possible_values)) {
    possibleValues.push({ text: value, value: key });
  }

  // console.log(Object.entries(possibleValues));
  // console.log(typeof possibleValues);
  return (
    <FormGroup
      label={formItem.metadata && formItem.metadata.alias ? formItem.metadata.alias : formItem.name} // primary label
      helper={formItem.description} // helper text (secondary label)
      errorText="Invalid value!" // error text if invalid
      status={formItem.invalid && 'invalid'} // if `true` renders invalid formatting
    >
      <Select options={possibleValues} onChange={setItemValue}></Select>
    </FormGroup>
  );
}
