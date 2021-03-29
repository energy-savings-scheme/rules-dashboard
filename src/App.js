import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Import Pages
import ActivityDefinitionPage from 'pages/ActivityDefinitionPage';
import Homepage from 'pages/homepage/Homepage';
import SchedulePage from 'pages/SchedulePage';
import VariablePage from 'pages/VariablePage';

// Import components
import Breadcrumb from 'components/layout/Breadcrumb';
import Footer from 'components/layout/Footer';
import Header from 'components/layout/Header';
import SpinnerFullscreen from 'components/layout/SpinnerFullscreen';

// Import services
import OpenFiscaAPI from 'services/openfisca_api';
import { emptyTree } from 'services/sortResponse';
import variable_tree from 'services/variable_tree.json';

// Import styles
import './styles/App.css';

function App() {
  const [sortedVar, setSortedVar] = useState(emptyTree());
  const [entities, setEntities] = useState([]);
  const [variables, setVariables] = useState([]);
  const [loading, setLoading] = useState(true);

  const [schedules, setSchedules] = useState(variable_tree);

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

        <Route path="/schedules/:schedule_name/:activity_sublabel" exact>
          <Breadcrumb />
          <ActivityDefinitionPage schedules={schedules} variables={variables} />
        </Route>

        <Route path="*">Not Found</Route>
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
