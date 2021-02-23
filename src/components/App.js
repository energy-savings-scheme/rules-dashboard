import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import '../styles/App.css';
import Footer from 'components/layout/Footer';
import Header from 'components/layout/Header';
import SearchBar from 'components/SearchBar';
import Summary from './Summary';
import Tree from 'components/dependencies_tree/Tree';

// import VariableTile from "./variable_tile";
import '../services/network_request';
import sortResponse from '../services/sortResponse';
// import { getRequest, postRequest } from "../services/network_request";
import variables from '../fullList.json';

import variable_tree from '../services/variable_tree.json';

import OpenFiscaAPI from 'services/openfisca_api';

function App() {
  // const [sortedVar, setSortedVar] = useState({
  // 	nabers: {},
  // 	D: {},
  // 	E: {},
  // 	F: {},
  // 	others: {}
  // });

  // const updateSortedVar = (name, variableJson) => {
  // 	setSortedVar((prevState) => {
  // 		return {
  // 			...prevState,
  // 			[name.variables]: value,
  // 		};
  // 	});
  // };

  const [entities, setEntities] = useState([]);
  const [variables, setVariables] = useState([]);

  useEffect(() => {
    OpenFiscaAPI.listEntities()
      .then((res) => {
        setEntities(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    OpenFiscaAPI.listVariables()
      .then((res) => {
        setVariables(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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

    sortResponse(variables);
    // postRequest("dependencies");
    // postRequest("calculate");
  }, []);

  return (
    <Router>
      <Header />

      <Switch>
        <Route path="/" exact>
          {/* Search section */}
          <div className="nsw-container">
            <div className="nsw-row">
              <div className="nsw-col">
                <h2>Energy Savings Scheme Rule of 2019</h2>
                <h3>
                  Search a term below to find more information on related methods and requirements
                </h3>
                <SearchBar variables={variables} />
              </div>
            </div>
          </div>

          <div className="nsw-container">
            <div className="nsw-row">
              <div className="nsw-col">
                <h3>Click below to get more details on each Schedule</h3>
              </div>
              {variable_tree.map((category) => {
                return (
                  <div className="nsw-col nsw-col-sm-6">
                    <div className="nsw-card">
                      <div className="nsw-card__content">
                        <Summary
                          key={category.majorLabel}
                          sectionTitle={category.activityName}
                          subTitle={category.reference}
                          variableNumber={category.variables.length}
                          subCategories={category.variables}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* <VariableTile /> */}
        </Route>
        <Route path="/variables/:variable_name" exact>
          <Tree entities={entities} variables={variables} />
        </Route>
        <Route path="*">Not Found</Route>
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
