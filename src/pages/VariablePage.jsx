import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';

import Codeblock from 'components/codeblock/Codeblock';
import VariableTreeListItem from 'components/VariableTreeListItem';

export default function VariablePage(props) {
  let { variable_name } = useParams();
  const { variables } = props;

  const variable = variables.find((item) => item.name === variable_name);
  if (!variable) return null;

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

      {variable.children.length === 0 && variable.parents.length === 0 ? (
        <div className="nsw-row">
          <div className="nsw-col">
            <div className="nsw-content-block">
              <div className="nsw-content-block__content">
                <h2 className="nsw-content-block__title">
                  This variable is not related to any other variables.
                </h2>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* SECTION --> HOW IT RELATES? */
        <div>
          <div className="nsw-row">
            <div className="nsw-col">
              <div className="nsw-content-block">
                <div className="nsw-content-block__content">
                  <h2 className="nsw-content-block__title">
                    Which variables are needed to compute <a href="#" style={{textDecoration: "underline"}}>{variable.metadata.alias}</a> ?
                  </h2>

                  {variable.children.length === 0 ? (
                    <p className="nsw-content-block__copy">
                      This variable does not depend any other variables. It could be a variable
                      requiring user input.
                    </p>
                  ) : (
                    <Fragment>
                      <p className="nsw-content-block__copy">
                        To calculate the result of this variable, the below process is followed:
                      </p>
                      <ul className="nsw-content-block__list">
                        {variable.children.map((child_name) => (
                          <VariableTreeListItem
                            variable_name={child_name}
                            variables={variables}
                            renderNestedChildren
                          />
                        ))}
                      </ul>
                    </Fragment>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="nsw-row">
            <div className="nsw-col">
              <div className="nsw-content-block">
                <div className="nsw-content-block__content">
                  <h2 className="nsw-content-block__title">Where is this variable used?</h2>
                  {variable.parents.length === 0 ? (
                    <p className="nsw-content-block__copy">
                      This variable is not used in any calculations.
                    </p>
                  ) : (
                    <Fragment>
                      <p className="nsw-content-block__copy">
                        The following is a list of all the other variables and activity definitions
                        that use this variable for their calculations.
                      </p>
                      <ul className="nsw-content-block__list">
                        {variable.parents.map((parent_name) => (
                          <VariableTreeListItem variable_name={parent_name} variables={variables} />
                        ))}
                      </ul>
                    </Fragment>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* SECTION --> WHAT DOES THIS FORMULA LOOK LIKE? */}
      <div className="nsw-row">
        <div className="nsw-col">
          <div className="nsw-content-block">
            <div className="nsw-content-block__content">
              <h2 className="nsw-content-block__title">What does the formula look like?</h2>
              {variable && variable.formula ? (
                <Fragment>
                  <p>
                    <Codeblock code={variable.formula} language="python" />
                  </p>
                </Fragment>
              ) : (
                <p className="nsw-content-block__copy">This variable does not have a formula</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
