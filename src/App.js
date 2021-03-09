import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Import Pages
import Homepage from 'pages/homepage/Homepage';
import SchedulePage from 'pages/SchedulePage';
import VariablePage from 'pages/VariablePage';

// Import components
import Breadcrumb from 'components/layout/Breadcrumb';
import Footer from 'components/layout/Footer';
import Header from 'components/layout/Header';
import SpinnerFullscreen from 'components/layout/SpinnerFullscreen';

// Import services
import { getRequest } from 'services/network_request';
import OpenFiscaAPI from 'services/openfisca_api';
import { emptyTree, sortResponse } from 'services/sortResponse';

// Import styles
import './styles/App.css';

const initial_schedules = [
  {
    name: 'Default Factors and Classifications',
    description: 'Schedule A sets out Default Factors and Classifications.',
  },
  {
    name: 'Sale of New Appliances',
    description:
      'Schedule B sets out Activity Definitions for the Sale of New Appliances (clause 9.3)',
  },
  {
    name: 'Removal of Old Appliance',
    description:
      'Schedule C sets out Activity Definitions for the Removal of Old Appliances (clause 9.7)',
  },
  {
    name: 'General Activities for Home Energy Efficiency Retrofits',
    description:
      'Schedule D sets out Activity Definitions for General Activities for Home Energy Efficiency Retrofits (clause 9.8)',
  },
  {
    name: 'Low Cost Activities for Home Energy Efficiency Retrofits',
    description:
      'Schedule E sets out Activity Definitions for Low Cost Activities for Home Energy Efficiency Retrofits (clause 9.8)',
  },
  {
    name: 'Installation of High Efficiency Appliances for Businesses',
    description:
      'Schedule F sets out Activity Definitions for the Installation of High Efficiency Appliances for Businesses (clause 9.9)',
  },
];

function App() {
  const [sortedVar, setSortedVar] = useState(emptyTree());

  const [entities, setEntities] = useState([]);
  const [variables, setVariables] = useState([]);
  const [loading, setLoading] = useState(true);

  const [schedules, setSchedules] = useState(initial_schedules);

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
        setLoading(false);
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

      {loading && <SpinnerFullscreen />}

      <Switch>
        <Route path="/" exact>
          <Homepage schedules={schedules} variables={variables} />
        </Route>
        <Route path="/variables/:variable_name" exact>
          <Breadcrumb />
          <VariablePage entities={entities} variables={variables} />
        </Route>
        <Route path="/schedules/:schedule_name" exact>
          <Breadcrumb />
          <SchedulePage schedules={schedules} variables={variables} />
        </Route>
        <Route path="*">Not Found</Route>
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
