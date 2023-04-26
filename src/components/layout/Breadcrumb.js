import React, { Fragment } from 'react';
import { Link, NavLink, useLocation, useParams } from 'react-router-dom';
import { Breadcrumbs } from 'nsw-ds-react/breadcrumbs/breadcrumb';

export default function Breadcrumb() {
  const location = useLocation();
  const params = useParams();

  let path = {};

  if (location.pathname === '/') {
    return (
      <div className="nsw-container" style={{ marginBottom: 20 }}>
        <Breadcrumbs
          label="Breadcrumb for homepage"
          items={[
            {
              link: '#',
              text: 'Home',
            },
            {
              link: '#',
              text: 'Safeguard Digital Tools',
            },
            {
              text: 'Safeguard Certificate Estimator',
            },
          ]}
        />
      </div>
    );
  }

  if (location.pathname === '/core-eligibility') {
    return (
      <div className="nsw-container" style={{ marginBottom: 20 }}>
        <Breadcrumbs
          label="Breadcrumb for certificates"
          items={[
            {
              link: '/',
              text: 'Home',
            },
            {
              link: '#',
              text: 'Safeguard Digital Tools',
            },
            {
              link: '#',
              text: 'Safeguard Certificate Estimator',
            },
            {
              link: '#eligibility',
              text: 'Eligibility',
            },
            {
              text: 'Core Eligibility',
            },
          ]}
        />
      </div>
    );
  }

  if (location.pathname === '/eligibility') {
    return (
      <div className="nsw-container" style={{ marginBottom: 20 }}>
        <Breadcrumbs
          label="Breadcrumb for eligibility"
          items={[
            {
              link: '/',
              text: 'Home',
            },
            {
              link: '#',
              text: 'Safeguard Digital Tools',
            },
            {
              link: '#',
              text: 'Safeguard Certificate Estimator',
            },
            {
              text: 'Eligibility',
            },
          ]}
        />
      </div>
    );
  }

  if (location.pathname === '/certificate-estimation') {
    return (
      <div className="nsw-container" style={{ marginBottom: 20 }}>
        <Breadcrumbs
          label="Breadcrumb for eligibility"
          items={[
            {
              link: '/',
              text: 'Home',
            },
            {
              link: '#',
              text: 'Safeguard Digital Tools',
            },
            {
              link: '#',
              text: 'Safeguard Certificate Estimator',
            },
            {
              text: 'Certificate Estimation',
            },
          ]}
        />
      </div>
    );
  }

  if (
    location.pathname === '/commercial-ac-activity-requirements' ||
    location.pathname === '/residential-ac-activity-requirements' ||
    location.pathname === '/commercial-motors-activity-requirements' ||
    location.pathname === '/pool-pumps-activity-requirements' ||
    location.pathname === '/residential-refrigeration-activity-requirements' ||
    location.pathname === '/refrigerated-cabinet-activity-requirements' ||
    location.pathname === '/commercial-water-heater-activity-requirements'
  ) {
    return (
      <div className="nsw-container" style={{ marginBottom: 20 }}>
        <Breadcrumbs
          label="Breadcrumb for certificates"
          items={[
            {
              link: '/',
              text: 'Home',
            },
            {
              link: '#',
              text: 'Safeguard Digital Tools',
            },
            {
              link: '#',
              text: 'Safeguard Certificate Estimator',
            },
            {
              link: '#eligibility',
              text: 'Eligibility',
            },
            {
              text: 'Activity Eligibility',
            },
          ]}
        />
      </div>
    );
  }

  if (
    location.pathname === '/residential-ac-estimator' ||
    location.pathname === '/commercial-ac-estimator' ||
    location.pathname === '/refrigerated-cabinet-estimator' ||
    location.pathname === '/pool-pumps-estimator' ||
    location.pathname === '/commercial-motors-estimator' ||
    location.pathname === '/residential-refrigerators-estimator' ||
    location.pathname === '/commercial-wh-estimator'
  ) {
    return (
      <div className="nsw-container" style={{ marginBottom: 20 }}>
        <Breadcrumbs
          label="Breadcrumb for certificates"
          items={[
            {
              link: '/',
              text: 'Home',
            },
            {
              link: '#',
              text: 'Safeguard Digital Tools',
            },
            {
              link: '#',
              text: 'Safeguard Certificate Estimator',
            },
            {
              link: '#certificate-estimation',
              text: 'Certificate Estimation',
            },
            {
              text: 'Estimator',
            },
          ]}
        />
      </div>
    );
  }

  return null;
}
