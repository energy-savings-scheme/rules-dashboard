import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { Popover, OverlayTrigger } from 'react-bootstrap';

export default function VariableTreeListItem(props) {
  const { variable_name, variables, renderNestedChildren } = props;

  const [expanded, setExpanded] = useState(false);

  let variable = variables.find((item) => item.name === variable_name);
  if (!variable) return null;

  const toggleExpanded = (e) => {
    setExpanded(!expanded);
  };

  const infoPopover = (
    <Popover id="popover-basic" style={{ maxWidth: 400 }}>
      <Popover.Title as="h3">{variable.metadata.alias}</Popover.Title>
      <Popover.Content>{variable.description}</Popover.Content>
    </Popover>
  );

  return (
    <li style={{ lineHeight: '2rem', paddingBottom: '0.8rem' }}>
      <OverlayTrigger trigger="hover" placement="bottom" overlay={infoPopover}>
        <Link to={`/variables/${variable.name}`} style={{ textDecorationLine: 'underline' }}>
          {variable.metadata.alias}
        </Link>
      </OverlayTrigger>

      {renderNestedChildren && (
        <Fragment>
          {variable.children.length > 0 && (
            <span style={{ paddingLeft: 10 }} onClick={toggleExpanded}>
              {expanded ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-chevron-up"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-chevron-down"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              )}
            </span>
          )}
          <div style={{ marginLeft: '1rem' }}>
            {expanded &&
              variable.children.map((child_name) => (
                <VariableTreeListItem
                  variable_name={child_name}
                  variables={variables}
                  renderNestedChildren
                />
              ))}
          </div>
        </Fragment>
      )}
    </li>
  );
}
