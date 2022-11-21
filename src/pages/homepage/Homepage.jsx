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
                    Use our Safeguard Certificate Estimator to get an idea of how many Energy
                    Savings Certificates (ESCs) and Peak Demand Reduction Certificates (PRCs) your
                    activity may qualify for. Remember, results are an indication only and cannot be
                    promoted or published.
                  </p>
                  <p className="nsw-content-block__copy">
                    The Estimator is based on the latest Energy Savings Scheme rule and Peak Demand
                    Reduction Scheme rule. To complete the certificate estimation you may need
                    product information from the IPART Product Registry or GEMS Registry.
                  </p>
                  <p className="nsw-content-block__copy">
                    If you have any questions or feedback about this tool, please contact{' '}
                    <a href={`mailto:sustainability@environment.nsw.gov.au`}>
                      sustainability@environment.nsw.gov.au
                    </a>
                  </p>
                </div>
              </div>
              <br></br>
              <h2 className="nsw-content-block__title">Which activity are you interested in?</h2>
            </div>
          </div>
        </div>
      </div>

      <section class="nsw-section nsw-section--off-white" style={{ backgroundColor: '#F5F5F5' }}>
        <div class="nsw-container" style={{ paddingBottom: '4rem' }}>
          <div class="nsw-layout">
            <div class="nsw-layout__main">
              <h2 className="nsw-col nsw-content-block__title">Residential</h2>
              <div class="nsw-grid">
                <div class="nsw-col nsw-col-md-6 nsw-col-lg-4">
                  <Card
                    headline="Air Conditioner"
                    link="#residential-ac-estimator"
                    image="/ResidentialAC.jpg"
                    highlight
                  >
                    <CardCopy>
                      Install a new or replace an existing air conditioner with a high efficiency
                      air conditioner
                    </CardCopy>
                  </Card>
                </div>
                <div class="nsw-col nsw-col-md-6 nsw-col-lg-4">
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
                </div>
                <div class="nsw-col nsw-col-md-6 nsw-col-lg-4">
                  <Card
                    headline="Spare Refrigerator or Freezer"
                    link="#residential-refrigerators-estimator"
                    image="/ResidentialRefrigeratorFreezer.jpeg"
                    highlight
                  >
                    <CardCopy>Remove a spare refrigerator or freezer</CardCopy>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br></br>
      <br></br>

      <section class="nsw-section nsw-section--white">
        <div class="nsw-container">
          <div class="nsw-layout">
            <div class="nsw-layout__main">
              <h2 className="nsw-col nsw-content-block__title">Commercial</h2>
              <div className="nsw-grid">
                <div className="nsw-col nsw-col-md-4">
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
                </div>
                <div className="nsw-col nsw-col-md-4">
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
                </div>
                <div className="nsw-col nsw-col-md-4">
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
                </div>

                <div className="nsw-col nsw-col-md-4">
                  <Card
                    headline="Ventilation or Refrigeration motor"
                    link="#commercial-motors-estimator"
                    image="CommercialVentilationRefrigeration.jpeg"
                    highlight
                  >
                    <CardCopy>
                      Install a new high efficiency ventilation or refrigeration motor
                    </CardCopy>
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
