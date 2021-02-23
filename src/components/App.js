import React, { useState, useEffect } from 'react';
import '../styles/App.css';
import Header from './header';
import Summary from './Summary';
// import VariableTile from "./variable_tile";
import '../services/network_request';
import sortResponse from '../services/sortResponse';
// import { getRequest, postRequest } from "../services/network_request";
import variables from '../fullList.json';
import variable_tree from '../services/variable_tree.json';
import OpenFiscaAPI from 'services/openfisca_api';

function App() {
  const [sortedVar, setSortedVar] = useState({
    D: {},
    E: {},
    F: {},
    nabers: {},
  });

  // const updateSortedVar = (name, variableJson) => {
  // 	setSortedVar((prevState) => {
  // 		return {
  // 			...prevState,
  // 			[name.variables]: value,
  // 		};
  // 	});
  // };

  useEffect(() => {
    //TODO: add a progress bar while loading
    // getRequest("variables").then((res) => {
    // 	let returnedData = res.data;
    // 	let varSorted = sortResponse(returnedData);
    // 	console.log("sorted");
    // 	console.log(varSorted);
    // 	// setSortedVar((prev) => {
    // 	// 	return varSorted;
    // 	// });
    // });
    // sortResponse(variables);

    setSortedVar(sortResponse(variables));
    // postRequest("dependencies");
    // postRequest("calculate");
  }, []);

  return (
    <div>
      <Header />
      <div className="App">
        {variable_tree.map((majorCat) => {
          return (
            <Summary
              key={majorCat.majorLabel}
              sectionTitle={majorCat.activityName}
              subTitle={majorCat.reference}
              variableNumber={majorCat.subCategories.length}
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
