import React, { Fragment, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function VariablePage(props) {
  let { variable_name } = useParams();
  const { entities, variables } = props;

  const variable = variables.find((item) => item.name === variable_name);
  if (!variable) return null;
  console.log(variable);

  return (
    <div className="nsw-container">
      <div className="nsw-row">
        <div className="nsw-col">
          <h2 className="nsw-section-title">{variable.metadata.alias}</h2>
          <div style={{ margin: '16px 0' }}>
            <h5 style={{ fontSize: '16px', fontWeight: 600, lineHeight: '24px' }}>
              {variable.description}
            </h5>
          </div>
          <div
            className="nsw-tag"
            style={{
              padding: '2px 16px 2px 16px',
              margin: 0,
            }}
          >
            {variable.value_type.toLowerCase()}
          </div>
        </div>
      </div>

      {/* SECTION --> HOW IT RELATES? */}
      <div className="nsw-row">
        <div className="nsw-col">
          <div className="nsw-content-block">
            <div className="nsw-content-block__content">
              <h2 className="nsw-content-block__title">
                See how the requirement {variable.metadata.alias} relates to other methods and
                requirements within the ESS
              </h2>
              {variable.children.length === 0 ? (
                'None'
              ) : (
                <Fragment>
                  <p className="nsw-content-block__copy">
                    To calculate the result of this variable, the below process is followed:
                  </p>
                  <ul className="nsw-content-block__list">
                    {variable.children.map((child_name) => {
                      let child_var = variables.find((item) => item.name === child_name);
                      if (!child_var) return null;

                      return (
                        <li>
                          <Link
                            to={`/variables/${child_name}`}
                            style={{ textDecorationLine: 'underline' }}
                          >
                            {child_var.metadata.alias}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION --> WHERE IS THIS VARIABLE USED? */}
      <div className="nsw-row">
        <div className="nsw-col">
          <div className="nsw-content-block">
            <div className="nsw-content-block__content">
              <h2 className="nsw-content-block__title">Where is this variable used?</h2>
              {variable.parents.length === 0 ? (
                'None'
              ) : (
                <Fragment>
                  <p className="nsw-content-block__copy">
                    The following is a list of all the other variables and activity definitions that
                    use this variable for their calculations.
                  </p>
                  <ul className="nsw-content-block__list">
                    {variable.parents.map((parent_name) => {
                      let parent_var = variables.find((item) => item.name === parent_name);
                      if (!parent_var) return null;

                      return (
                        <li>
                          <Link
                            to={`/variables/${parent_name}`}
                            style={{ textDecorationLine: 'underline' }}
                          >
                            {parent_var.metadata.alias}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION --> WHAT DOES THIS FORMULA LOOK LIKE? */}
      {/* <div className="nsw-row">
        <div className="nsw-col">
          <h3>What does the formula look like?</h3>
          {variable && variable.formulas
            ? Object.keys(variable.formulas).map((formula_date) => {
                const formula_i = variable.formulas[formula_date];
                if (formula_date === '0001-01-01') {
                  formula_date = 'ETERNITY';
                }
                return (
                  <Fragment>
                    <h5 style={{ marginBottom: '0.5rem' }}>From date: {formula_date}</h5>
                    <p>
                      <Codeblock code={formula_i.content} language="python" />
                    </p>
                  </Fragment>
                );
              })
            : 'This variable does not have a formula'}
        </div>
      </div> */}
    </div>
  );
}
