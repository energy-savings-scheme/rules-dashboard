import React from 'react';
import OpenFiscaApi from 'services/openfisca_api';

export default function CalculateButton(props) {
  const { variable, entities } = props;

  const handleCalculate = (e) => {
    console.log('CALCULATING');

    const entity = entities.find((item) => item.name === variable.entity);

    const date = '2021-01';

    var payload = {
      persons: { person1: {} },
      [entity.plural]: { [`${entity.name}_1`]: { [variable.name]: { [date]: null } } },
    };

    payload[entity.plural][`${entity.name}_1`]['PDRS__Air_Conditioner__AC_type'] = {};
    payload[entity.plural][`${entity.name}_1`]['PDRS__Air_Conditioner__AC_type'][date] = 'type_1';

    OpenFiscaApi(payload)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return <button onClick={handleCalculate}>Calculate</button>;
}
