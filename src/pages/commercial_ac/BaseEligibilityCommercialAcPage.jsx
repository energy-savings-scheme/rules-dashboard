import React, { Fragment, useState, useEffect } from 'react';
import Card, { CardCopy } from 'nsw-ds-react/card/card';
import { ProgressIndicator } from 'nsw-ds-react/forms/progress-indicator/progressIndicator';
import LoadClauses from './LoadClauses';
import OpenFiscaAPI from 'services/openfisca_api';
import SpinnerFullscreen from 'components/layout/SpinnerFullscreen';

export default function BaseEligibilityCommercialAC(props) {
  const { entities, variables, setEntities, setVariables, loading, setLoading } = props;

  const [formValues, setFormValues] = useState([]);
  const [stepNumber, setStepNumber] = useState(1);
  const [dependencies, setDependencies] = useState([]);
  const [variableToLoad, setVariableToLoad] = useState('ESS__PDRS__ACP_base_scheme_eligibility');

  if (formValues.length === 0) {
    setLoading(true);
  } else if (variables.length === 0) {
    setLoading(true);
  } else if (variables.length === 0) {
    setLoading(true);
  } else {
    setLoading(false);
  }

  useEffect(() => {
    if (variables.length < 1) {
      OpenFiscaAPI.listEntities()
        .then((res) => {
          setEntities(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (entities.length < 1) {
      OpenFiscaAPI.listVariables()
        .then((res) => {
          setVariables(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    if (variables.length > 0) {
      console.log(variableToLoad);
      console.log(variables);
      const variable = variables.find((item) => item.name === variableToLoad);
      console.log(variable);
      const offsprings = variable.metadata.input_offspring;

      console.log(offsprings);
      const children = variables.filter((item) => offsprings.includes(item.name));
      console.log(children);

      // Define the original array (at a minimum include the Implementation Date)
      var array = [];

      var dep_arr = [];

      children.map((child) => {
        console.log(child);
        const dependency = child.metadata.conditional === 'True';
        console.log(dependency);

        if (child.metadata.conditional == 'True') {
          dep_arr.push({ ...child, form_value: '', invalid: false });
        } else {
          array.push({ ...child, form_value: '', invalid: false });
        }
      });

      array.sort((a, b) => a.metadata.sorting - b.metadata.sorting);
      dep_arr.sort((a, b) => a.metadata.sorting - b.metadata.sorting);

      setFormValues(array);
      setDependencies(dep_arr);
      setLoading(false);
    }
  }, [variables, variableToLoad]);

  return (
    <Fragment>
      {/* Search section */}
      <br></br>
      <div className="nsw-layout">
        <div class="nsw-hero-banner nsw-hero-banner--dark">
          <div class="nsw-hero-banner__container">
            <div class="nsw-hero-banner__wrapper">
              <div class="nsw-hero-banner__box">
                <img
                  class="nsw-hero-banner__image"
                  src="/commercialac/Base_Eligibility_Hero.jpg"
                  alt=""
                  style={{ top: '50%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="nsw-container">
        <div className="nsw-grid nsw-grid--spaced">
          <div className="nsw-col nsw-col-md-12">
            <br></br>
            <br></br>
            <h2 className="nsw-content-block__title">
              Energy Savings Scheme and Peak Demand Reduction Scheme Certificate Estimator
            </h2>
            <br></br>
            <p className="nsw-content-block__copy">
              <b>Base eligibility requirements </b>
            </p>
            <p className="nsw-content-block__copy">
              The following questions assess the basic eligibility requirements for the Energy
              Savings Scheme and Peak Demand Reduction Scheme. Answer the questions and click the
              button below to check your eligibility. If ineligible, you will be shown the
              ineligible answers and their corresponding rule clauses.
            </p>
          </div>
        </div>

        <p className="nsw-content-block__copy">
          <b> Schemes base eligibility check progress </b>
        </p>
        <ProgressIndicator step={stepNumber} of={2} />

        <Fragment>
          {loading && <SpinnerFullscreen />}
          {!loading && (
            <LoadClauses
              variableToLoad={variableToLoad}
              variables={variables}
              entities={entities}
              stepNumber={stepNumber}
              setStepNumber={setStepNumber}
              formValues={formValues}
              dependencies={dependencies}
              setFormValues={setFormValues}
              backAction={(e) => {
                setStepNumber(stepNumber - 1);
              }}
            />
          )}
        </Fragment>
      </div>
      <section class="nsw-section nsw-section--off-white" style={{ backgroundColor: '#F5F5F5' }}>
        <div class="nsw-container" style={{ paddingBottom: '4rem' }}>
          <div class="nsw-layout">
            <div class="nsw-layout__main">
              <br></br>
              <br></br>
              <h2 className="nsw-col nsw-content-block__title">
                Check your eligibility and estimate certificates
              </h2>
              <br></br>
              <div class="nsw-grid">
                <div className="nsw-col nsw-col-md-4">
                  <Card
                    headline="Review schemes base eligibility, activity requirements and estimate certificates"
                    link="base_eligibility_commercialac/"
                    image="/commercialac/navigation_row/full_flow_card.jpeg"
                  >
                    {/* <p class="nsw-card__copy" style={{ fontSize: '21px', color: '#202D61' }}><b>
                        Review schemes base eligibility, activity requirements and estimate certificates</b></p> */}
                  </Card>
                </div>
                <div className="nsw-col nsw-col-md-4">
                  <Card
                    headline="Check activity requirements and estimate certificates"
                    link="activity-requirements/"
                    image="/commercialac/navigation_row/activity_certificates.png"
                  >
                    {/* <p class="nsw-card__copy" style={{ fontSize: '21px', color: '#202D61' }}><b>
                        Check activity requirements and estimate certificates</b></p> */}
                  </Card>
                </div>
                <div className="nsw-col nsw-col-md-4">
                  <Card
                    headline="Estimate certificates only"
                    link="compare2activities"
                    image="/commercialac/navigation_row/certificates_only.jpg"
                  >
                    {/* <p class="nsw-card__copy" style={{ fontSize: '21px', color: '#202D61' }}><b>
                        Estimate certificates only</b></p> */}
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
