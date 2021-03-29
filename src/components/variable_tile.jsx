import '../styles/variable_tile.css';
import React, { useState, useEffect } from 'react';
import OpenFiscaApi from 'services/openfisca_api';

export default function VariableTile(props) {
  const [varData, setVarData] = useState({
    id: null,
    entity: null,
    unit: null,
    definitionPeriod: null,
    formula: false,
    varDescription: null,
  });

  const handleClick = () => {
    console.log('clicked!');
    window.location.href = `/variables/${props.varID}`;
  };
  const createForm = () => {
    console.log('create form to compute this variable');
  };

  useEffect(() => {
    var varURL = `variable/${props.varID}`;
    const fetchVarData = async () => {
      let res = await OpenFiscaApi.getVariable(props.varID);
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
    <div className="var-tile-div" onClick={handleClick}>
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
