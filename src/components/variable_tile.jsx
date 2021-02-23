import '../styles/variable_tile.css';
import React, { useState, useEffect } from 'react';
import { getRequest } from '../services/network_request';

export default function VariableTile(props) {
  const [varData, setVarData] = useState({
    id: 'number_of_certificates',
    entity: null,
    unit: null,
    definitionPeriod: null,
    formula: false,
    varDescription: null,
  });

  // const index = 1;
  // const varID = 'number_of_certificates';
  // const varDescription = 'The total number of certificates generated from this activity.';
  // const varURL = 'variable/number_of_certificates';

  const createForm = () => {
    console.log('create form to compute this variable');
  };

  useEffect(() => {
    var varURL = `variable/${props.varID}`;
    const fetchVarData = async () => {
      let res = await getRequest(varURL);
      let data = res.data;
      setVarData({
        definitionPeriod: data.definitionPeriod,
        unit: data.valueType,
        entity: data.entity,
        formula: Object.keys(data).includes('formulas'),
        varDescription: data.description,
      });
    };
    fetchVarData();
    //TODO: clean up unmounted states when closed
  }, [props.varID]);

  return (
    <div className="var-tile-div">
      <div className="var-tile-index-div">
        <span>{props.index}. </span>
      </div>
      <div className="var-detail-div">
        <p className="var-tile-title">{varData.varDescription}</p>
        <p className="var-tile-subtext">
          <span className="var-data-in-subtext"> {props.varID} </span> with value in
          <span className="var-data-in-subtext"> {varData.unit} </span> applies to{' '}
          <span className="var-data-in-subtext">{varData.entity}</span> for period
          <span className="var-data-in-subtext"> {varData.definitionPeriod} </span>
        </p>
      </div>
      {varData.formula && (
        <div className="calculate-button" onClick={createForm}>
          <p>Calculate</p>
        </div>
      )}
    </div>
  );
}
