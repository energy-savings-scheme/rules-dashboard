import React, { Fragment, useState } from 'react';

import VariableSearchBar from 'pages/homepage/VariableSearchBar';
import ScheduleTile from './ScheduleTile';

import Card, { CardCopy } from 'nsw-ds-react/card/card';
import { ContentBlock } from 'nsw-ds-react/content-block/contenBlock';
import { Breadcrumbs } from 'nsw-ds-react/breadcrumbs/breadcrumb';
import { HeroBanner } from 'nsw-ds-react/heroBanner/heroBanner';

import 'nsw-design-system/src/main.scss';
import '@fontsource/public-sans';
import '@fontsource/public-sans/600.css';
import { Link } from 'react-router-dom';

export default function Homepage(props) {
  return (
    <Fragment>
      <br></br>
      <HeroBanner
        wide
        style="dark"
        image={{
          alt: 'homepage',
          src: '/LandingPageHero.jpg',
        }}
        intro="Energy Savings Scheme and Peak Demand Reduction Scheme"
        title="Safeguard Certificate Estimator"
      />

      <div class="nsw-section nsw-section--white">
        <div class="nsw-container">
          <div class="nsw-layout">
            <div class="nsw-layout__main">
              <div className="nsw-grid nsw-grid--spaced" style={{ fontFamily: 'sans-serif' }}>
                <div className="nsw-col nsw-col-md-12">
                  {/* <h2 className="nsw-content-block__title">Safeguard Certificate Estimator</h2>
                  <h5 className="nsw-content-block__copy">
                    Energy Savings Scheme and Peak Demand Reduction Scheme
                  </h5> */}
                  {/* <br></br> */}
                  <p className="nsw-content-block__copy">
                    We have created this tool to help you check the eligibility of an activity and
                    estimate how many energy savings certificates (ESCs) and peak reduction
                    certificates (PRCs) your activity may generate.
                  </p>
                  <p className="nsw-content-block__copy">
                    This tool can help you to compare and explore:
                    <ul>
                      <li>
                        base eligibility requirements for the Energy Savings Scheme and Peak Demand
                        Reduction Scheme
                      </li>
                      <li>activity-specific eligibility requirements for both schemes</li>
                      <li>
                        the number of certificates generated for different brands and models of
                        equipment
                      </li>
                      <li>
                        how changes in technical specifications for a product affect certificate
                        creation
                      </li>
                      <li>
                        activities in the Energy Savings Scheme and Peak Demand Reduction Scheme by
                        demonstrating how ESCs and PRCs stack together
                      </li>
                      <li>
                        the estimator's number of certificates with your own modelling for specific
                        brands and models.
                      </li>
                    </ul>
                  </p>
                  <p className="nsw-content-block__copy">
                    The estimator is based on the latest{' '}
                    <a href="https://www.energy.nsw.gov.au/nsw-plans-and-progress/regulation-and-policy/energy-security-safeguard/energy-savings-scheme">
                      Energy Savings Scheme
                    </a>{' '}
                    and{' '}
                    <a href="https://www.energy.nsw.gov.au/nsw-plans-and-progress/regulation-and-policy/energy-security-safeguard/peak-demand-reduction-scheme">
                      Peak Demand Reduction Scheme{' '}
                    </a>
                    rules.
                  </p>
                  <p className="nsw-content-block__copy">
                    If you have any questions or feedback about this tool, please contact{' '}
                    <a href={`mailto:sustainability@environment.nsw.gov.au`}>
                      sustainability@environment.nsw.gov.au
                    </a>
                  </p>
                </div>
              </div>

              <h2 className="nsw-content-block__title">How to use the Estimator</h2>

              <section class="nsw-section nsw-section--white">
                <div class="nsw-container">
                  <div class="nsw-layout">
                    <p className="nsw-content-block__copy">
                      There are 2 parts to using the certificate estimator.
                    </p>
                  </div>
                </div>
              </section>

              <ul>
                <li>
                  {' '}
                  <h3 className="nsw-content-block__title">Check Eligibility</h3>
                </li>
                <p className="nsw-content-block__copy">
                  If you are unsure whether an activity meets eligibility for creating certificates,
                  you can check the requirements for base scheme and the specific activity.
                </p>
                <p className="nsw-content-block__copy">
                  To assess eligibility you need to answer a sequence of questions. Explanations
                  will be provided if you do not meet the eligibility requirement for the scheme or
                  for a particular activity.
                </p>

                <div class="nsw-callout">
                  <div class="nsw-callout__content">
                    <h4>Base eligibility requirements</h4>
                    <p>
                      Check <a href="#/base-eligibility"> base eligibility requirements</a>
                    </p>
                  </div>
                </div>

                <div class="nsw-callout">
                  <div class="nsw-callout__content">
                    <h4>Activity eligibility requirements</h4>
                    <p>
                      Check activity specific eligibility requirements by{' '}
                      <a href="#">choosing the required activity</a>
                    </p>
                  </div>
                </div>

                <br></br>
                <br></br>
                <li>
                  <h3 className="nsw-content-block__title">Estimate certificates </h3>
                </li>
                <p className="nsw-content-block__copy">
                  The second part is to estimate how many certificates can be created for the
                  activity. You can access the estimator for each activity below.
                </p>

                <p className="nsw-content-block__copy">
                  You will need:
                  <ul>
                    <li>the postcode of the site installation </li>
                    <li>the brand and model number of the equipment you have installed</li>
                  </ul>
                </p>

                <p className="nsw-content-block__copy">
                  Where possible, technical information has been populated from the relevant product
                  registry. Please double-check the populated fields to make sure they are accurate
                  to your expected equipment specifications. Note that results are indicative only
                  and cannot be promoted or published.
                </p>
              </ul>
              <br></br>
              <h2 className="nsw-content-block__title">
                Choose the activity you are interested in
              </h2>
            </div>
          </div>
        </div>
      </div>

      <section class="nsw-section nsw-section--off-white" style={{ backgroundColor: '#F5F5F5' }}>
        <div class="nsw-container" style={{ paddingBottom: '4rem' }}>
          <div class="nsw-layout">
            <div class="nsw-layout__main">
              <h2 className="nsw-col nsw-content-block__title">Residential and Small Business</h2>
              <div class="nsw-grid">
                <div class="nsw-col nsw-col-md-6 nsw-col-lg-4" style={{ backgroundColor: 'white' }}>
                  <ContentBlock
                    copy="Install a new or replace an existing air conditioner with a high efficiency air conditioner"
                    headline="Air Conditioner"
                    image="/ResidentialAC.jpg"
                    links={[
                      {
                        href: '/#residential-ac-activity-requirements',
                        title: 'Check Activity Eligibility',
                      },
                      {
                        href: '/#residential-ac-estimator',
                        title: 'Estimate Scheme Certificates',
                      },
                    ]}
                  />
                </div>
                {/* <div class="nsw-col nsw-col-md-6 nsw-col-lg-4">
                  <Card
                    headline="Pool Pump"
                    link="#pool-pumps-estimator"
                    image="/ResidentialPoolPumps.jpg"
                    highlight
                  >
                    <CardCopy>
                      Replace an existing pool pump with a high efficiency pool pump
                    </CardCopy>
                  </Card>
                </div> */}
                <div class="nsw-col nsw-col-md-6 nsw-col-lg-4" style={{ backgroundColor: 'white' }}>
                  <ContentBlock
                    copy="Replace an existing pool pump with a high efficiency pool pump"
                    headline="Pool Pump"
                    image="/ResidentialPoolPumps.jpg"
                    links={[
                      {
                        href: '#pool-pumps-activity-requirements',
                        title: 'Check Activity Eligibility',
                      },
                      {
                        href: '#pool-pumps-estimator',
                        title: 'Estimate Scheme Certificates',
                      },
                    ]}
                  />
                </div>
                {/* <div class="nsw-col nsw-col-md-6 nsw-col-lg-4">
                  <Card
                    headline="Spare Refrigerator or Freezer"
                    link="#residential-refrigerators-estimator"
                    image="/ResidentialFridgeFreezerRemoval.jpeg"
                    highlight
                  >
                    <CardCopy>Remove a spare refrigerator or freezer</CardCopy>
                  </Card>
                </div> */}

                <div class="nsw-col nsw-col-md-6 nsw-col-lg-4" style={{ backgroundColor: 'white' }}>
                  <ContentBlock
                    copy="Remove a spare refrigerator or freezer"
                    headline="Spare Refrigerator or Freezer"
                    image="/ResidentialFridgeFreezerRemoval.jpeg"
                    links={[
                      {
                        href: '#residential-refrigeration-activity-requirements',
                        title: 'Check Activity Eligibility',
                      },
                      {
                        href: '#residential-refrigerators-estimator',
                        title: 'Estimate Scheme Certificates',
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="nsw-section nsw-section--white">
        <div class="nsw-container">
          <div class="nsw-layout">
            <div class="nsw-layout__main">
              <h2 className="nsw-col nsw-content-block__title">Commercial</h2>
              <div className="nsw-grid">
                <div class="nsw-col nsw-col-md-6 nsw-col-lg-4" style={{ backgroundColor: 'white' }}>
                  <ContentBlock
                    copy="Install a new or replace an existing air conditioner with a high efficiency
      air conditioner"
                    headline="Air Conditioner"
                    image="CommercialAC.jpeg"
                    links={[
                      {
                        href: '#commercial-ac-activity-requirements',
                        title: 'Check Activity Eligibility',
                      },
                      {
                        href: '#commercial-ac-estimator',
                        title: 'Estimate Scheme Certificates',
                      },
                    ]}
                  />
                </div>
                {/* <div className="nsw-col nsw-col-md-4">
                  <Card
                    headline="Air Conditioner"
                    link="#commercial-ac-estimator"
                    image="CommercialAC.jpeg"
                    highlight
                  >
                    <CardCopy>
                      Install a new or replace an existing air conditioner with a high efficiency
                      air conditioner
                    </CardCopy>
                  </Card>
                </div> */}
                <div class="nsw-col nsw-col-md-6 nsw-col-lg-4" style={{ backgroundColor: 'white' }}>
                  <ContentBlock
                    copy="Replace one or more existing hot water boilers or water heaters with one or
          more air source heat pump water heater systems"
                    headline="Heat Pump Water Heater"
                    image="CommercialHeatPumpWaterHeater.jpeg"
                    links={[
                      {
                        href: '#commercial-water-heater-activity-requirements',
                        title: 'Check Activity Eligibility',
                      },
                      {
                        href: '#commercial-wh-estimator',
                        title: 'Estimate Scheme Certificates',
                      },
                    ]}
                  />
                </div>
                {/* <div className="nsw-col nsw-col-md-4">
                  <Card
                    headline="Heat Pump Water Heater"
                    link="#commercial-wh-estimator"
                    image="CommercialHeatPumpWaterHeater.jpeg"
                    highlight
                  >
                    <CardCopy>
                      Replace one or more existing hot water boilers or water heaters with one or
                      more air source heat pump water heater systems
                    </CardCopy>
                  </Card>
                </div> */}
                <div class="nsw-col nsw-col-md-6 nsw-col-lg-4" style={{ backgroundColor: 'white' }}>
                  <ContentBlock
                    copy="Install a new high efficiency refrigerated cabinet or replace an existing
      refrigerated cabinet"
                    headline="Refrigerated Cabinet"
                    image="CommercialRefrigeratedCabinet.jpg"
                    links={[
                      {
                        href: '#refrigerated-cabinet-activity-requirements',
                        title: 'Check Activity Eligibility',
                      },
                      {
                        href: '#refrigerated-cabinet-estimator',
                        title: 'Estimate Scheme Certificates',
                      },
                    ]}
                  />
                </div>
                {/* <div className="nsw-col nsw-col-md-4">
                  <Card
                    headline="Refrigerated Cabinet"
                    link="#refrigerated-cabinet-estimator"
                    image="CommercialRefrigeratedCabinet.jpg"
                    highlight
                  >
                    <CardCopy>
                      Install a new high efficiency refrigerated cabinet or replace an existing
                      refrigerated cabinet
                    </CardCopy>
                  </Card>
                </div> */}

                <div class="nsw-col nsw-col-md-6 nsw-col-lg-4" style={{ backgroundColor: 'white' }}>
                  <ContentBlock
                    copy="Install a new or replace an existing motor with a high efficiency motor"
                    headline="Ventilation or Refrigeration motor"
                    image="CommercialVentilationRefrigeration.jpeg"
                    links={[
                      {
                        href: '#commercial-motors-activity-requirements',
                        title: 'Check Activity Eligibility',
                      },
                      {
                        href: '#commercial-motors-estimator',
                        title: 'Estimate Scheme Certificates',
                      },
                    ]}
                  />
                </div>
                {/* <div className="nsw-col nsw-col-md-4">
                  <Card
                    headline="Ventilation or Refrigeration motor"
                    link="#commercial-motors-estimator"
                    image="CommercialVentilationRefrigeration.jpeg"
                    highlight
                  >
                    <CardCopy>
                      Install a new or replace an existing motor with a high efficiency motor
                    </CardCopy>
                  </Card>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
