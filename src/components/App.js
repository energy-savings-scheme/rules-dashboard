import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import '../styles/App.css';
import Footer from 'components/layout/Footer';
import Header from 'components/layout/Header';
import SearchBar from 'components/SearchBar';
import Summary from './Summary';
import Tree from 'components/dependencies_tree/Tree';

import '../services/network_request';
import { emptyTree, sortResponse } from '../services/sortResponse';
import { getRequest } from '../services/network_request';
import variable_tree from '../services/variable_tree.json';
import OpenFiscaAPI from 'services/openfisca_api';

function App() {
  const [sortedVar, setSortedVar] = useState(emptyTree());

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
    getRequest('variables').then((res) => {
      let returnedData = res.data;
      let varSorted = sortResponse(returnedData);
      setSortedVar(varSorted);
    });
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
            <h3>Click below to get more details on each Schedule</h3>

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
