import React from 'react';

import { FormGroup, TextInput } from 'nsw-ds-react/forms';

export default function DateInput(props) {
  const { formItem, setItemValue } = props;

  return (
    <FormGroup
      // label={formItem.metadata && formItem.metadata.alias ? formItem.metadata.alias : formItem.name} // primary label
      helper={formItem.description} // helper text (secondary label)
      errorText="Demonstration error text!" // error text if invalid
      status={formItem.invalid && 'invalid'} // if `true` renders invalid formatting
    >
      <TextInput
        style={{ maxWidth: '50%' }}
        as="input"
        type="date"
        status={formItem.invalid && 'invalid'} // if `true` renders invalid formatting
        placeholder="Enter value"
        value={formItem.form_value}
        onChange={setItemValue}
        required
      />
    </FormGroup>
  );
}
