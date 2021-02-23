import React, { useState, useEffect } from 'react';
import '../styles/App.css';
import Header from './header';
import Summary from './Summary';
import '../services/network_request';
import { emptyTree, sortResponse } from '../services/sortResponse';
import { getRequest } from '../services/network_request';
import variable_tree from '../services/variable_tree.json';
import OpenFiscaAPI from 'services/openfisca_api';

function App() {
  const [sortedVar, setSortedVar] = useState(emptyTree());

  useEffect(() => {
    //TODO: add a progress bar while loading
    getRequest('variables').then((res) => {
      let returnedData = res.data;
      let varSorted = sortResponse(returnedData);
      console.log('sorted');
      setSortedVar(varSorted);
    });
  }, []);

  return (
    <div>
      <Header />
      <div className="App">
        {variable_tree.map((majorCat) => {
          let subLengthList = Object.values(sortedVar[majorCat.majorLabel]).map(
            (list) => list.length,
          );
          const cumSum = (accumulator, currentValue) => accumulator + currentValue;

          const totalNum = subLengthList.reduce(cumSum);

          return (
            <Summary
              key={majorCat.majorLabel}
              total={totalNum}
              sectionTitle={majorCat.activityName}
              subTitle={majorCat.reference}
              subCategories={majorCat.subCategories}
              majorList={sortedVar[majorCat.majorLabel]}
            />
          );
        })}
      </div>{' '}
      {/* <VariableTile /> */}
    </div>
  );
}

export default App;
