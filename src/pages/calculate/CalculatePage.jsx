import React, { Fragment, useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';

// Import services

// Import components

export default function CaculatePage(props) {
  const location = useLocation();
  //   const { schedules, variables } = props;

  return (
    <div className="nsw-container">
      <div className="nsw-row">
        <div className="nsw-col">
          <h2>
            <span style={{ marginRight: 10 }}>Calculate your savings</span>
          </h2>
        </div>
      </div>
    </div>
  );
}
