import React, { Fragment } from 'react';
import OpenFiscaApi from 'services/openfisca_api';

import CalculateButton from 'components/calculate/CalculateButton';

export default function CalculateBlock(props) {
  const { variables, variable, entities } = props;

  const children = variables.filter((item) => variable.children.includes(item.name));

  return (
    <div className="nsw-row">
      <div className="nsw-col">
        <div className="nsw-content-block">
          <div className="nsw-content-block__content">
            <h2 className="nsw-content-block__title">Calculate</h2>
            <p style={{ color: 'red' }}>
              For each children, render the correct form Input (based on the type). For example,
              radio-select for True/False, and Dropdown for an Enum
            </p>
            <ul>
              {children.map((child) => (
                <li>{child.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="nsw-col">
        <div className="nsw-content-block">
          <div className="nsw-content-block__content">
            <CalculateButton variable={variable} entities={entities} />;
          </div>
        </div>
      </div>
    </div>
  );
}
