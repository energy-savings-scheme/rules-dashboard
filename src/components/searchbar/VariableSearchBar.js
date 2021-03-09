import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function VariableSearchBar(props) {
  const { variables } = props;
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div
      className="nsw-col nsw-col-md-6 nsw-offset-md-3"
      style={{ marginTop: 80, marginBottom: 80 }}
    >
      <div className="nsw-form-search">
        <label for="hero-search-input" className="sr-only">
          Search a term below to find more information on related methods and requirements:
        </label>
        <input
          className="nsw-form-search__input"
          list="variables"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <datalist id="variables">
          {Object.keys(variables).map((variable) => (
            <option value={variable} />
          ))}
        </datalist>
        <button
          className="nsw-form-search__submit"
          onClick={(e) => {
            history.push(`/variables/${searchTerm}`);
          }}
          aria-label="search"
        >
          <svg className="nsw-icon" focusable="false" aria-hidden="true">
            <use xlinkHref="#search"></use>
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </div>
    </div>
  );
}
