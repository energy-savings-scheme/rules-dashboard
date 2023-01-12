import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

// Import Pages
import CalculatePage from 'pages/calculate/CalculatePage';
import Homepage from 'pages/homepage/Homepage';
import BaseEligibilityCommercialAC from 'pages/base_eligibility/BaseEligibility';
import BaseEligibilityCommercialWH from 'pages/commercial_wh/BaseEligibilityCommercialWhPage';
import ActivityRequirementsCommercialAC from 'pages/commercial_ac/ActivityRequirementsAirCon';
import ActivityRequirementsSYS1 from 'pages/commercial_motors/ActivityRequirementsSYS1';

// Import components
import Breadcrumb from 'components/layout/Breadcrumb';
import Footer from 'components/layout/Footer';
import Header from 'components/layout/Header';
import SpinnerFullscreen from 'components/layout/SpinnerFullscreen';

// Import services
import OpenFiscaAPI from 'services/openfisca_api';
import variable_tree from 'services/variable_tree.json';

// Import styles
//import './styles/App.css';
import 'nsw-design-system/src/main.scss';
import '@fontsource/public-sans';
import '@fontsource/public-sans/600.css';
import CommercialAC from 'pages/commercial_ac/CommercialAcPage';
import CommercialWH from 'pages/commercial_wh/CommercialWhPage';
import RegistryApi from 'services/registry_api';
import CertificateEstimatorHVAC from 'pages/commercial_ac/CertificateEstimator';
import CertificateEstimatorWH from 'pages/commercial_wh/CertificateEstimatorWH';
import CertificateEstimatorResidentialAC from 'pages/residential_ac/CertificateEstimatorResidentialAC';
import CertificateEstimatorRC from 'pages/refrigerated_cabinets/CertificateEstimatorRC';
import CertificateEstimatorPP from 'pages/pool_pumps/CertificateEstimatorPP';
import CertificateEstimatorMotors from 'pages/commercial_motors/CertificateEstimatorMotors';
import CertificateEstimatorRefrigerators from 'pages/residential_refrigerators/CertificateEstimatorRefrigerators';
import BaseEligibility from 'pages/base_eligibility/BaseEligibility';
import ActivityRequirementsResAC from 'pages/residential_ac/ActivityRequirementsResAC';

function App() {
  const [entities, setEntities] = useState([]);
  const [variables, setVariables] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hvacBrands, setHvacBrands] = useState([]);
  const [hvacModels, setHvacModels] = useState([]);
  const [whBrands, setWhBrands] = useState([]);
  const [RF2Brands, setRF2Brands] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

    OpenFiscaAPI.listActivities()
      .then((res) => {
        setActivities(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    RegistryApi.getCommercialHVACBrands()
      .then((res) => {
        setHvacBrands(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    RegistryApi.getCommercialWHBrands()
      .then((res) => {
        setWhBrands(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    RegistryApi.getRF2Brands()
      .then((res) => {
        setRF2Brands(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Router>
      <Header variables={variables} />

      {loading && <SpinnerFullscreen />}

      <Switch>
        <Route path="/" exact>
          <Breadcrumb />
          <Homepage />
        </Route>

        <Route path="/commercial-ac-estimator" exact>
          <Breadcrumb />
          <CertificateEstimatorHVAC
            entities={entities}
            variables={variables}
            hvacBrands={hvacBrands}
            loading={loading}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
            setHvacBrands={setHvacBrands}
          />
        </Route>

        <Route path="/commercial-wh-estimator" exact>
          <Breadcrumb />
          <CertificateEstimatorWH
            entities={entities}
            variables={variables}
            brands={whBrands}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
          />
        </Route>
        <Route path="/residential-ac-estimator" exact>
          <Breadcrumb />
          <CertificateEstimatorResidentialAC
            entities={entities}
            variables={variables}
            hvacBrands={hvacBrands}
            loading={loading}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
            setHvacBrands={setHvacBrands}
          />
        </Route>
        <Route path="/refrigerated-cabinet-estimator" exact>
          <Breadcrumb />
          <CertificateEstimatorRC
            entities={entities}
            variables={variables}
            RF2Brands={RF2Brands}
            loading={loading}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
            setRF2Brands={setRF2Brands}
          />
        </Route>
        <Route path="/pool-pumps-estimator" exact>
          <Breadcrumb />
          <CertificateEstimatorPP
            entities={entities}
            variables={variables}
            loading={loading}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
          />
        </Route>
        <Route path="/commercial-motors-estimator" exact>
          <Breadcrumb />
          <CertificateEstimatorMotors
            entities={entities}
            variables={variables}
            loading={loading}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
          />
        </Route>
        <Route path="/residential-refrigerators-estimator" exact>
          <Breadcrumb />
          <CertificateEstimatorRefrigerators
            entities={entities}
            variables={variables}
            loading={loading}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
          />
        </Route>

        <Route path="/base-eligibility" exact>
          <Breadcrumb />
          <BaseEligibility
            entities={entities}
            variables={variables}
            loading={loading}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
          />
        </Route>
        <Route path="/commercial-ac-activity-requirements" exact>
          <Breadcrumb />
          <ActivityRequirementsCommercialAC
            entities={entities}
            variables={variables}
            loading={loading}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
          />
        </Route>
        <Route path="/residential-ac-activity-requirements" exact>
          <Breadcrumb />
          <ActivityRequirementsResAC
            entities={entities}
            variables={variables}
            loading={loading}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
          />
        </Route>
        <Route path="/commercial-motors-activity-requirements" exact>
          <Breadcrumb />
          <ActivityRequirementsSYS1
            entities={entities}
            variables={variables}
            loading={loading}
            setEntities={setEntities}
            setVariables={setVariables}
            setLoading={setLoading}
          />
        </Route>
        <Route path="*">Not Found</Route>
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
