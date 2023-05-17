import React, { Fragment, useState, useEffect } from 'react';
import { ProgressIndicator } from 'nsw-ds-react/forms/progress-indicator/progressIndicator';
import Button from 'nsw-ds-react/button/button';
import { FormGroup, TextInput, Select } from 'nsw-ds-react/forms';
import RegistryApi from 'services/registry_api';
import OpenFiscaAPI from 'services/openfisca_api';
import SpinnerFullscreen from 'components/layout/SpinnerFullscreen';
import CertificateEstimatorLoadClausesRC from './CertificatEstimatorLoadClausesRC';
import HeroBanner from 'nsw-ds-react/heroBanner/heroBanner';
import Alert from 'nsw-ds-react/alert/alert';
import { compareAsc, format, previousSunday } from 'date-fns';
import axios from 'axios';

export default function CertificateEstimatorRC(props) {
  const {
    entities,
    variables,
    RF2Brands,
    setVariables,
    setEntities,
    setRF2Brands,
    loading,
    setLoading,
  } = props;

  const [formValues, setFormValues] = useState([]);
  const [stepNumber, setStepNumber] = useState(1);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [dropdownOptionsModels, setDropdownOptionsModels] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [models, setModels] = useState([]);
  const [metadata, setMetadata] = useState(null);
  const [calculationResult, setCalculationResult] = useState(null);
  const [calculationResult2, setCalculationResult2] = useState(null);
  const [calculationError, setCalculationError] = useState(false);
  const [calculationError2, setCalculationError2] = useState(false);
  const [postcode, setPostcode] = useState(null);
  const [zone, setZone] = useState(null);
  const [registryData, setRegistryData] = useState(true);
  const [flow, setFlow] = useState(null);
  const [persistFormValues, setPersistFormValues] = useState([]);
  const [productClassOptions, setProductClassOptions] = useState([]);
  const [selectedProductClass, setSelectedProductClass] = useState(null);
  const [showPostcodeError, setShowPostcodeError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    setDropdownOptions([{ value: '', text: 'Please select brand' }]);

    setProductClassOptions([
      { value: '', text: 'Please select product class' },
      { value: 'Class 1', text: 'Class 1' },
      { value: 'Class 2', text: 'Class 2' },
      { value: 'Class 3', text: 'Class 3' },
      { value: 'Class 4', text: 'Class 4' },
      { value: 'Class 5', text: 'Class 5' },
      { value: 'Class 6', text: 'Class 6' },
      { value: 'Class 7', text: 'Class 7' },
      { value: 'Class 8', text: 'Class 8' },
      { value: 'Class 9', text: 'Class 9' },
      { value: 'Class 10', text: 'Class 10' },
      { value: 'Class 11', text: 'Class 11' },
      { value: 'Class 12', text: 'Class 12' },
      { value: 'Class 13', text: 'Class 13' },
      { value: 'Class 14', text: 'Class 14' },
      { value: 'Class 15', text: 'Class 15' },
    ]);

    if (variables.length < 1) {
      OpenFiscaAPI.listEntities()
        .then((res) => {
          setEntities(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (entities.length < 1) {
      OpenFiscaAPI.listVariables()
        .then((res) => {
          setVariables(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (RF2Brands.length < 1) {
      RegistryApi.getRF2Brands()
        .then((res) => {
          setRF2Brands(res.data);
          setLoading(false);
          setRegistryData(true);
        })
        .catch((err) => {
          console.log(err);
          setRegistryData(false);
        });
    }
  }, []);

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
    if (postcode && postcode.length < 4) {
      setShowPostcodeError(false);
    }
  }, [postcode]);

  const validatePostcode = (postcode) => {
    RegistryApi.getPostcodeValidation(postcode)
      .then((res) => {
        const persons = res.data;
        console.log(res);
        if (
          (persons.status === '200') &
          (persons.data.postcode === postcode) &
          (persons.data.state === 'NSW')
        ) {
          setFlow(null);
          setStepNumber(stepNumber + 1);
          setShowPostcodeError(false);
        } else {
          setShowPostcodeError(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setShowPostcodeError(true);
      });
  };

  useEffect(() => {
    setDropdownOptionsModels([{ value: '', text: 'Please select model' }]);

    models.forEach((item) => populateModelDropDown({ text: item, value: item }));
  }, [models]);

  useEffect(() => {
    if (!selectedBrand) return null;
    if (!selectedModel) return null;

    var payload = {
      brand: selectedBrand,
      model: selectedModel,
    };
    console.log(payload);
    RegistryApi.getRF2ModelsMetadata(payload)
      .then((res) => {
        setMetadata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(metadata);
  }, [selectedModel]);

  useEffect(() => {
    if (RF2Brands.length > 1) {
      RF2Brands.forEach((item) => populateDropDown({ text: item, value: item }));
    }
  }, [RF2Brands]);

  useEffect(() => {
    console.log(selectedBrand);

    RegistryApi.listRF2Models(selectedBrand)
      .then((res) => {
        setModels(res.data);
        setRegistryData(true);
      })
      .catch((err) => {
        console.log(err);
        setRegistryData(false);
      });

    console.log(models);
  }, [selectedBrand]);

  return (
    <Fragment>
      <br></br>
      <HeroBanner
        wide
        style="dark"
        image={{
          alt: 'RF2',
          src: '/CommercialRefrigeratedCabinet.jpg',
        }}
        intro="Energy Savings Scheme and Peak Demand Reduction Scheme"
        title="Safeguard Certificate Estimator"
      />

      <div className="nsw-container">
        <br></br>
        <br></br>

        {stepNumber !== 3 && (
          <div className="nsw-grid nsw-grid--spaced">
            <div className="nsw-col nsw-col-md-10">
              <h2 className="nsw-content-block__title">
                Commercial Refrigerated Cabinet certificate estimator
              </h2>
              <br></br>
              <p className="nsw-content-block__copy">
                Estimate the energy savings certificates (ESCs) and peak reduction certificates
                (PRCs) for the Commercial Refrigerated Cabinet Activity (F1.1 and F1.2 in the Energy
                Savings Scheme and RF2 in the Peak Demand Reduction Scheme) by answering the
                following questions. Note that a new installation activity will not generate PRCs.
              </p>
              <p className="nsw-content-block__copy">
                Where possible, residential and small business air conditioner specifications are
                automatically pulled in at the end of each week from the{' '}
                <a href="https://reg.energyrating.gov.au/comparator/product_types/" target="_blank">
                  Greenhouse & Energy Minimum Standards (GEMS) Registry
                </a>{' '}
                based on brand and model, but you may also enter your own values.
              </p>
              <p className="nsw-content-block__copy">
                Please keep in mind that the results are indicative only and cannot be promoted or
                published.
              </p>
            </div>
          </div>
        )}

        {stepNumber === 3 && (
          <div className="nsw-grid nsw-grid--spaced">
            <div className="nsw-col nsw-col-md-12">
              <h2 className="nsw-content-block__title">
                Commercial Refrigerated Cabinet certificate estimator
              </h2>
            </div>
          </div>
        )}

        <ProgressIndicator step={stepNumber} of={3} style={{ width: '80%' }} />

        <Fragment>
          {stepNumber === 1 && (
            <div className="nsw-row">
              <div className="nsw-col" style={{ padding: 'inherit' }}>
                <div className="nsw-content-block">
                  <br></br>
                  <br></br>
                  <br></br>
                  <div className="nsw-content-block__content">
                    <h5 className="nsw-content-block__copy" style={{ paddingBottom: '30px' }}>
                      <b>Please answer the following questions to calculate your ESCs and PRCs</b>
                    </h5>

                    <FormGroup
                      label="Postcode"
                      helper="What is your postcode?" // helper text (secondary label)
                      errorText="Invalid value!" // error text if invalid
                    >
                      <TextInput
                        style={{ maxWidth: '50%' }}
                        as="input"
                        type="number"
                        placeholder="Enter postcode"
                        value={postcode}
                        onChange={(e) => {
                          setPostcode(e.target.value);
                        }}
                        required
                      />
                    </FormGroup>
                    <FormGroup
                      label="Brand"
                      helper="Select refrigerated cabinet brand" // primary question text
                      errorText="Invalid value!" // error text if invalid
                    >
                      <Select
                        style={{ maxWidth: '50%' }}
                        options={dropdownOptions}
                        onChange={(e) => {
                          setSelectedBrand(RF2Brands.find((item) => item === e.target.value));
                        }}
                        value={selectedBrand}
                        required
                      />
                    </FormGroup>

                    <FormGroup
                      label="Model"
                      helper="Select refrigerated cabinet model" // primary question text
                      errorText="Invalid value!" // error text if invalid
                    >
                      <Select
                        style={{ maxWidth: '50%' }}
                        options={dropdownOptionsModels}
                        onChange={(e) => {
                          setSelectedModel(models.find((item) => item === e.target.value));
                        }}
                        value={selectedModel}
                        required
                      />
                    </FormGroup>

                    <FormGroup
                      label="Product Class"
                      helper="Refrigerated Cabinet Product Class (Product Characteristics Code)" // primary question text
                      errorText="Invalid value!" // error text if invalid
                    >
                      <Select
                        style={{ maxWidth: '50%' }}
                        options={productClassOptions}
                        onChange={(e) => {
                          setSelectedProductClass(e.target.value);
                        }}
                        value={selectedProductClass}
                        required
                      />
                    </FormGroup>
                    <p style={{ fontSize: '14px', marginBottom: '2%' }}>
                      {' '}
                      Updated from product registry:{' '}
                      {format(previousSunday(new Date()), 'MMMM d, Y')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {stepNumber === 1 && !registryData && (
            <Alert as="error" title="Sorry! An error has occurred.">
              <p>Unable to load data from the product registry. Please try again later.</p>
            </Alert>
          )}

          {stepNumber === 2 && loading && <SpinnerFullscreen />}

          {stepNumber === 2 && (
            <CertificateEstimatorLoadClausesRC
              variableToLoad1={'RF2_PRC_calculation'}
              variableToLoad2={'RF2_ESC_calculation'}
              variables={variables}
              setVariables={setVariables}
              entities={entities}
              metadata={metadata}
              calculationResult={calculationResult}
              calculationResult2={calculationResult2}
              setCalculationResult={setCalculationResult}
              setCalculationResult2={setCalculationResult2}
              calculationError={calculationError}
              calculationError2={calculationError2}
              setCalculationError={setCalculationError}
              setCalculationError2={setCalculationError2}
              stepNumber={stepNumber}
              setStepNumber={setStepNumber}
              postcode={postcode}
              zone={zone}
              formValues={formValues}
              setFormValues={setFormValues}
              selectedBrand={selectedBrand}
              selectedModel={selectedModel}
              backAction={(e) => {
                setStepNumber(stepNumber - 1);
              }}
              flow={flow}
              setFlow={setFlow}
              persistFormValues={persistFormValues}
              setPersistFormValues={setPersistFormValues}
              selectedProductClass={selectedProductClass}
            />
          )}

          {stepNumber === 3 && (
            <CertificateEstimatorLoadClausesRC
              variableToLoad1={'RF2_PRC_calculation'}
              variableToLoad2={'RF2_ESC_calculation'}
              variables={variables}
              setVariables={setVariables}
              entities={entities}
              metadata={metadata}
              calculationResult={calculationResult}
              setCalculationResult={setCalculationResult}
              calculationError={calculationError}
              setCalculationError={setCalculationError}
              calculationResult2={calculationResult2}
              setCalculationResult2={setCalculationResult2}
              stepNumber={stepNumber}
              setStepNumber={setStepNumber}
              zone={zone}
              formValues={formValues}
              setFormValues={setFormValues}
              selectedBrand={selectedBrand}
              selectedModel={selectedModel}
              flow={flow}
              setFlow={setFlow}
              persistFormValues={persistFormValues}
              setPersistFormValues={setPersistFormValues}
              selectedProductClass={selectedProductClass}
            />
          )}

          {stepNumber === 3 && calculationError && calculationError2 && <SpinnerFullscreen />}

          {stepNumber === 1 && showPostcodeError && postcode.length >= 4 && (
            <Alert as="error" title="The postcode is not valid in NSW">
              <p>Please check your postcode and try again.</p>
            </Alert>
          )}

          {stepNumber === 1 &&
            registryData &&
            postcode &&
            postcode.length === 4 &&
            selectedBrand &&
            selectedModel && (
              <div className="nsw-row" style={{ paddingTop: '30px', width: '80%' }}>
                <div className="nsw-col" style={{ padding: 'inherit' }}>
                  <Button
                    as="dark"
                    onClick={(e) => {
                      validatePostcode(postcode);
                      // setFlow(null);
                      // setStepNumber(stepNumber + 1);
                    }}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
        </Fragment>
      </div>
    </Fragment>
  );
}
