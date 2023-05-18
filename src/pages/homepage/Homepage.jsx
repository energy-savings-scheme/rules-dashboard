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
import { HashLink } from 'react-router-hash-link';

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
                  <p className="nsw-content-block__copy">
                  The Safeguard certificate estimator is a tool that helps you estimate how many certificates you can generate for an activity carried out through the Energy Savings Scheme and the Peak Demand Reduction Scheme. Activities include replacing or installing new equipment or appliances which are more energy efficient.  
                  </p>
                  <p className="nsw-content-block__copy">
                  The tool can help you explore: 
                    <ul>
                      <li>
                      the number of energy savings certificates (ESCs) and peak demand reduction certificates (PRCs) generated for different brands and models of equipment 
                      </li>
                      <li>core eligibility requirements for the Energy Savings Scheme and Peak Demand Reduction Scheme 

</li>
                      <li>
                      activity-specific eligibility requirements
                      </li>
                      <li>
                      how changes in technical specifications for a product affect how many certificates you can generate
                      </li>
                      <li>
                      how you can benefit from both schemes by demonstrating how ESCs and PRCs work together
                      </li>
                      <li>
                      how the estimator's number of certificates compares with your own modelling for specific brands and models
                      </li>
                    </ul>
                  </p>

                <div style={{ fontFamily: 'sans-serif', paddingTop: '4%' }}>
                <h2 className="nsw-content-block__title">Before you use the estimator</h2>

                      <p className="nsw-content-block__copy">
                      Please note the estimator is a guide only and does not ensure eligibility to generate certificates or guarantee that the estimated certificates will apply for every installation. The estimator is based on the latest{' '}
                    <a href="https://www.energy.nsw.gov.au/nsw-plans-and-progress/regulation-and-policy/energy-security-safeguard/energy-savings-scheme" target="_blank">
                      Energy Savings Scheme
                    </a>{' '}
                    and{' '}
                    <a href="https://www.energy.nsw.gov.au/nsw-plans-and-progress/regulation-and-policy/energy-security-safeguard/peak-demand-reduction-scheme" target="_blank">
                      Peak Demand Reduction Scheme
                    </a>{' '} rules.  
                      </p>

                <p className="nsw-content-block__copy">
                An approved supplier, known as an Accredited Certificate Provider, must be engaged before a project begins to assess scheme feasibility and ensure the accuracy of a submission.
                </p>
              </div>
                </div>
              </div>

              <div style={{ fontFamily: 'sans-serif', paddingTop: '4%' }}>
                <h2 className="nsw-content-block__title">How to use the Estimator</h2>
                <p className="nsw-content-block__copy">
                For an optimal user experience, we recommend using the latest browser versions of Google Chrome or Mozilla Firefox. 
                      </p>


                <section class="nsw-section nsw-section--white">
                  <div class="nsw-container">
                    <div class="nsw-layout">
                      <p className="nsw-content-block__copy">
                        There are 2 parts to using the certificate estimator.
                      </p>
                    </div>
                  </div>
                </section>

                <h3 className="nsw-content-block__title">1. Check eligibility</h3>
                <p className="nsw-content-block__copy">
                Check the eligibility requirements by answering questions.  
                </p>
                <p className="nsw-content-block__copy">
                Eligibility requirements are broken down into 2 stages: 
                </p>
                <ul>
                  <li>scheme eligibility requirements: does the activity meet the basic scheme requirements </li>
                  <li>activity-specific eligibility requirements: is the brand or model of equipment eligible </li>
                </ul>

                <p className="nsw-content-block__copy">
                If eligibility requirements for a scheme or for a particular activity are not met, explanations are provided.
                </p>

                <br></br>
                <br></br>
                <h3 className="nsw-content-block__title">2. Estimate certificates </h3>
                <p className="nsw-content-block__copy">
                Estimate how many certificates can be created for an activity.
                </p>

                <p className="nsw-content-block__copy">
                To estimate how many certificates can be created, you will need to provide some information about the installation, including the postcode and brand and model number. Additional technical details may be required for certain activities.   To estimate how many certificates can be created, you will need to provide some information about the installation, including the postcode and brand and model number. Additional technical details may be required for certain activities.                </p>
                <p className="nsw-content-block__copy">
                Note that results are a guide only and cannot be promoted or published.
                </p>

                <p className="nsw-content-block__copy">
                If you have any questions or feedback about using the tool, please contact{' '}
                    <a href={`mailto:sustainability@environment.nsw.gov.au`}>
                      sustainability@environment.nsw.gov.au
                    </a>                
                </p>


              </div>

              <div style={{ fontFamily: 'sans-serif', paddingTop: '5%' }}>
                <h2 className="nsw-content-block__title">New to energy saving upgrades</h2>

                      <p className="nsw-content-block__copy">
                      If you are looking to upgrade equipment or appliances in your household or business, you can work with an Accredited Certificate Provider. They will explain the process and help you save on the installation and future energy bills.
                      </p>

                <p className="nsw-content-block__copy">
                Find out what offers are available for your                   <a href="https://www.energy.nsw.gov.au/households/rebates-grants-and-schemes/household-energy-saving-upgrades" target="_blank">
                house
                    </a>{' '} or your {' '}
                    <a href="https://www.energy.nsw.gov.au/business-and-industry/programs-grants-and-schemes/business-equipment" target="_blank">
                      business.
                    </a>{' '}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section class="nsw-section nsw-section">
        <div class="nsw-container" style={{ paddingBottom: '4rem' }}>
          <div class="nsw-layout">
            <div class="nsw-layout__main">
              <div class="nsw-grid">
                {/* <div class="nsw-col nsw-col-md-6 nsw-col-lg-4" style={{ backgroundColor: 'white' }}>
                  <ContentBlock
                    copy="Check what the scheme eligibility requirements are"
                    headline="Check eligibility requirements"
                    image="/ResidentialAC.jpg"
                    links={[
                    ]}
                  />
                </div> */}
                <div class="nsw-col nsw-col-md-6 nsw-col-lg-4">
                  <Card
                    headline="Check eligibility"
                    link="#eligibility"
                    image="/iStock_000020664590_Full(optimised).jpg"
                    highlight
                  >
                    <CardCopy></CardCopy>
                  </Card>
                </div>
                <div class="nsw-col nsw-col-md-6 nsw-col-lg-4">
                  <Card
                    headline="Estimate certificates"
                    link="#certificate-estimation"
                    image="/iStock-901937314(optimised).jpg"
                    highlight
                  >
                    <CardCopy></CardCopy>
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
