import React, { Fragment } from 'react';
import OpenFiscaApi from 'services/openfisca_api';

import CalculateButton from 'components/calculate/CalculateButton';

export default function CalculateBlock(props) {
  const { variable, entities } = props;

  return (
    <div className="nsw-row">
      <div className="nsw-col">
        <div className="nsw-content-block">
          <div className="nsw-content-block__content">
            <h2 className="nsw-content-block__title">Calculate</h2>
          </div>
        </div>
        <CalculateButton variable={variable} entities={entities} />;
      </div>
    </div>
  );
}
