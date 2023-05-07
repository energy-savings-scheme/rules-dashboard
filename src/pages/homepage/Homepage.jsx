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
                  <nav class="nsw-in-page-nav" aria-labelledby="in-page-nav">
                    <div id="in-page-nav" class="nsw-in-page-nav__title">
                      On this page
                    </div>
                    <ul>
                      <li>How to use this estimator</li>
                      <li>Check eligibility requirements</li>
                      <li>Estimate certificates for an activity</li>
                    </ul>
                  </nav>

                  <br></br>
                  <br></br>
                  <p className="nsw-content-block__copy">
                    The Safeguard Certificate Estimator helps you check eligibility and estimate how
                    many Energy Savings Certificates (ESCs) and Peak Reduction Certificates (PRCs)
                    your activity may generate.
                  </p>
                  <p className="nsw-content-block__copy">
                    This tool can help you to compare and explore:
                    <ul>
                      <li>
                        core eligibility requirements for the Energy Savings Scheme and Peak Demand
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
                        combined incentives across the Energy Savings Scheme and Peak Demand
                        Reduction Scheme by demonstrating how ESCs and PRCs work together
                      </li>
                      <li>
                        how the estimator's number of certificates compare with your own modelling
                        for specific brands and models.
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
                    rules. It is designed as an approximate guide only and does not guarantee
                    eligibility to generate certificates for a specific project, or guarantee that
                    the estimated certificates are applicable for every installation. An Accredited
                    Certificate Provider must be engaged before a project begins to assess scheme
                    feasibility and ensure the accuracy of a submission.
                  </p>
                  <p className="nsw-content-block__copy">
                    For an optimal user experience we recommend using the latest browser versions of
                    Google Chrome or Mozilla Firefox.
                  </p>
                  <p className="nsw-content-block__copy">
                    If you have any questions or feedback about this tool, please contact{' '}
                    <a href={`mailto:sustainability@environment.nsw.gov.au`}>
                      sustainability@environment.nsw.gov.au
                    </a>
                  </p>
                </div>
              </div>

              <div style={{ fontFamily: 'sans-serif', paddingTop: '4%' }}>
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

                <h3 className="nsw-content-block__title">1. Check Eligibility</h3>
                <p className="nsw-content-block__copy">
                  The first part checks the eligibility requirements of a scheme or activity by
                  answering questions from the scheme rules.
                </p>
                <p className="nsw-content-block__copy">
                  Eligibility requirements are broken down into 2 stages:
                </p>
                <ul>
                  <li>Core eligibility requirements</li>
                  <li>Activity-specific eligibility requirements</li>
                </ul>

                <p className="nsw-content-block__copy">
                  If eligibility requirements for a scheme or for a particular activity are not met,
                  explanations are provided.
                </p>

                <br></br>
                <br></br>
                <h3 className="nsw-content-block__title">2. Estimate certificates </h3>
                <p className="nsw-content-block__copy">
                  The second part is to estimate how many certificates can be created for an
                  activity.
                </p>

                <p className="nsw-content-block__copy">
                  To estimate how many certificates can be created for an activity you will need:
                </p>

                <ul>
                  <li>the postcode of the site installation</li>
                  <li>the brand and model number of the equipment you have installed</li>
                </ul>

                <p className="nsw-content-block__copy">
                  Where possible, technical information has been populated from the relevant product
                  registry. Please double-check the populated fields to make sure they are accurate
                  to your expected equipment specifications. Note that results are indicative only
                  and cannot be promoted or published.
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
                    headline="Check eligibility requirements"
                    link="#eligibility"
                    image="/iStock_000020664590_Full(optimised).jpg"
                    highlight
                  >
                    <CardCopy></CardCopy>
                  </Card>
                </div>
                <div class="nsw-col nsw-col-md-6 nsw-col-lg-4">
                  <Card
                    headline="Estimate Certificates"
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
