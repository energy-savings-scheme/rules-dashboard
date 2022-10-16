import React, { Fragment, useState, useEffect } from 'react';

import VariableSearchBar from 'pages/homepage/VariableSearchBar';

import Card, { CardCopy } from 'nsw-ds-react/card/card';
import { ContentBlock } from 'nsw-ds-react/content-block/contenBlock';
import { ProgressIndicator } from 'nsw-ds-react/forms/progress-indicator/progressIndicator';
import LoadClauses from './LoadClauses';
import DropDownMenu from 'components/form_elements/DropDownMenu';
import Button from 'nsw-ds-react/button/button';
import { FormGroupSelect } from 'nsw-ds-react/forms';
import RegistryApi from 'services/registry_api';
import CertificateEstimatorLoadClauses from './CertificatEstimatorLoadClauses';


export default function CertificateEstimatorHVAC(props) {
  const { entities, variables, brands } = props;

  const [formValues, setFormValues] = useState([]);
  const [stepNumber, setStepNumber] = useState(1);
  const [dependencies, setDependencies] = useState([]);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [dropdownOptionsModels, setDropdownOptionsModels] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [models, setModels] = useState([]);
  const [metadata, setMetadata] = useState(null);
 
// For brands
  const populateDropDown = (newOption) => {
    setDropdownOptions((prev) => {
      return [...prev, newOption];
    });
  };

  // For models   {text: abc, value: abc}
  const populateModelDropDown = (newOption) => {
    setDropdownOptionsModels((prev) => {
      return [...prev, newOption];
    });
  };

  useEffect(() => {
        setDropdownOptionsModels([{value : "", text : "Please select model"}])
        models.forEach((item) =>
            populateModelDropDown({ text: item, value: item }),
        );
    }, [models]);


    useEffect(() => {

        if (!selectedBrand) return null;
        if (!selectedModel) return null;
        
        var payload = {
            'brand': selectedBrand,
            'model': selectedModel
        }
        console.log(payload);
        RegistryApi.getHvacModelsMetadata(payload)
        .then((res) => {
            setMetadata(res.data);
        })
        .catch((err) => {
        console.log(err);
        });

        console.log(metadata);

    }, [selectedModel]);


  useEffect(() => {
    setDropdownOptions([{value : "", text : "Please select brand"}]);

    brands.forEach((item) =>
        populateDropDown({ text: item, value: item }),
    );
   }, [brands]);


    useEffect(() => {
        console.log(selectedBrand);

        RegistryApi.listHvacModels(selectedBrand)
            .then((res) => {
                setModels(res.data);
            })
            .catch((err) => {
            console.log(err);
            });


        console.log(models);

    }, [selectedBrand]);


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
              <b>Commercial air conditioner activity requirements</b>
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
        <br></br>
        <br></br>

        <Fragment>
        {stepNumber === 1 && <div className="nsw-row">
              <div className="nsw-col" style={{ padding: 'inherit' }}>
                <div className="nsw-content-block">
                  <div className="nsw-content-block__content">
                    <FormGroupSelect
                      label="Select commercial air conditioner brand" // primary label
                    //   helper="Select commercial air conditioner brand" // helper text (secondary label)
                      options={dropdownOptions}
                      value={selectedBrand}
                      onChange={(e) => {
                        setSelectedBrand(
                          brands.find((item) => item === e.target.value),
                        );
                      }}
                    ></FormGroupSelect>
                    <FormGroupSelect
                      label="Select commercial air conditioner model" // primary label
                    //   helper="Select commercial air conditioner model" // helper text (secondary label)
                      options={dropdownOptionsModels}
                      value={selectedModel}
                      onChange={(e) => {
                        setSelectedModel(
                          models.find((item) => item === e.target.value),
                        );
                      }}
                    ></FormGroupSelect>
                  </div>
                </div>
              </div>
            </div> }

            {stepNumber === 2 && (
          <CertificateEstimatorLoadClauses
          // calculationDate={calculationDate}
          variableToLoad1={"HVAC2_PRC_calculation"}
          variableToLoad2={"HVAC2_ESC_calculation"}
          variables={variables}
          entities={entities}
          metadata={metadata}
        //   // calculationResult={calculationResult}
        //   // setCalculationResult={setCalculationResult}
        //   // setCalculationError={setCalculationError}
        //   dependencies={dependencies}
          stepNumber={stepNumber}
        //   setStepNumber={setStepNumber}
        //   formValues={formValues}
        //   setFormValues={setFormValues}
          backAction={(e) => {
            setStepNumber(stepNumber - 1);
          }}
        />
        )}

            <div className="nsw-row">
              <div className="nsw-col">
                <Button
                  as="primary"
                  onClick={(e) => {
                    setStepNumber(stepNumber + 1);
                  }}
                  style={{ float: 'right' }}
                >
                  Next
                </Button>
              </div>
            </div>
        </Fragment>
      </div>
    </Fragment>
  );
}
