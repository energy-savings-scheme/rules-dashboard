import React, { Fragment, useState, useEffect } from 'react';

import VariableSearchBar from 'pages/homepage/VariableSearchBar';

import Card, { CardCopy } from 'nsw-ds-react/card/card';
import { ContentBlock } from 'nsw-ds-react/content-block/contenBlock';
import { ProgressIndicator } from 'nsw-ds-react/forms/progress-indicator/progressIndicator';
import LoadClauses from './LoadClauses';
import DropDownMenu from 'components/form_elements/DropDownMenu';

export default function CertificateEstimatorHVAC(props) {
  const { entities, variables, variableToLoad } = props;
  console.log(variableToLoad);

  const [formValues, setFormValues] = useState([]);
  const [stepNumber, setStepNumber] = useState(1);
  const [dependencies, setDependencies] = useState([]);

  console.log(variables);

  useEffect(() => {
    if (variables) {
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

        if (child.metadata.conditional === 'True') {
          dep_arr.push({ ...child, form_value: '', invalid: false });
        } else {
          array.push({ ...child, form_value: '', invalid: false });
        }
      });

      setFormValues(array);
      setDependencies(dep_arr);
    }
  }, [variables]);

  console.log(formValues);

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
              <b>Commercial heat pump water heater activity requirements</b>
            </p>
            <p className="nsw-content-block__copy">
              The following questions assess the eligibility requirements for the Commercial Heat
              Pump Water Heater Activity (F16 in the ESS and WH1 in the PDRS). Answer the questions
              to check your eligibility and click the button below to review ineligible answers and
              their corresponding rule clauses.{' '}
            </p>
          </div>
        </div>

        <p className="nsw-content-block__copy">
          <b> Commercial heat pump water heater eligibility check progress </b>
        </p>
        <ProgressIndicator step={stepNumber} of={2} />

        <Fragment>
          <DropDownMenu formItem={formItem} setItemValue={setItemValue} />;
          {/* <LoadClauses
            // calculationDate={calculationDate}
            variableToLoad={variableToLoad}
            variables={variables}
            entities={entities}
            // calculationResult={calculationResult}
            // setCalculationResult={setCalculationResult}
            // setCalculationError={setCalculationError}
            dependencies={dependencies}
            stepNumber={stepNumber}
            setStepNumber={setStepNumber}
            formValues={formValues}
            setFormValues={setFormValues}
            backAction={(e) => {
              setStepNumber(stepNumber - 1);
            }}
          /> */}
        </Fragment>

        {/* <div className="nsw-grid">
          <h2 className="nsw-col nsw-content-block__title">
            Which eligibility requirements would you like to check?
          </h2>
          <div className="nsw-col nsw-col-md-4">
            <Card
              headline="Review schemes base eligibility, activity requirements and estimate certificates"
              content
              link="calculate"
              image="/commercialac/baseeligibility.jpeg"
            >
              <CardCopy></CardCopy>
            </Card>
          </div>
          <div className="nsw-col nsw-col-md-4">
            <Card
              content
              headline="Check activity requirements and estimate certificates"
              link="compare"
              image="/commercialac/activityeligibility.jpeg"
            >
              <CardCopy></CardCopy>
            </Card>
          </div>
          <div className="nsw-col nsw-col-md-4">
            <Card
              content
              headline="Estimate certificates only"
              link="compare"
              image="/commercialac/certificateslogo.jpeg"
            >
              <CardCopy></CardCopy>
            </Card>
          </div>
        </div>
        <div className="nsw-grid" style={{ backgroundColor: '#F2F2F2' }}>
          <h2 className="nsw-col nsw-content-block__title">
            Check your eligibility and estimate certificates
          </h2>
          <div className="nsw-col nsw-col-md-4">
            <Card
              headline="Review schemes base eligibility, activity requirements and estimate certificates"
              link="activities"
              image="/commercialac/navigation_row/full_flow_card.jpeg"
            >
              <CardCopy> </CardCopy>
            </Card>
          </div>
          <div className="nsw-col nsw-col-md-4">
            <Card
              headline="Check activity requirements and estimate certificates"
              link="compare2activities"
              image="/commercialac/navigation_row/activity_certificates.png"
            >
              <CardCopy> </CardCopy>
            </Card>
          </div>
          <div className="nsw-col nsw-col-md-4">
            <Card
              headline="Estimate certificates only"
              link="compare2activities"
              image="/commercialac/navigation_row/certificates_only.jpg"
            >
              <CardCopy></CardCopy>
            </Card>
          </div>
        </div> */}

        {/* <h3>Click below to get more details on each Schedule</h3> */}

        {/* Iterate through list of Schedules in `schedules` */}
        {/* <div className="nsw-grid">
        {schedules.map((item) => (
          <ScheduleTile schedule={item} />
        ))}
      </div> */}
      </div>
    </Fragment>
  );
}
