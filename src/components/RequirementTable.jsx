import { Link } from 'react-router-dom';

export default function RequirementTable(props) {
  const { requirementName, requirementArrayFilled, variables } = props;

  const getDescription = (var_id) => {
    var itemVar = variables.find((entry) => entry.name === var_id);
    if (!itemVar) return null;
    return itemVar.description;
  };

  const getFileLocation = (var_id) => {
    var itemVar = variables.find((entry) => entry.name === var_id);
    if (!itemVar) return null;
    return itemVar.directory;
  };

  if (!requirementName) return null;
  if (!requirementArrayFilled) return null;
  // if (!variables) return null;

  return (
    <table className="nsw-table nsw-table--striped" style={{ width: '100%', marginBottom: 50 }}>
      <thead>
        <th style={{ fontWeight: 700 }}>{requirementName}</th>
      </thead>
      <tbody>
        {requirementArrayFilled.length === 0 ? (
          <tr>
            <td>None</td>
          </tr>
        ) : (
          requirementArrayFilled.map((item, index) => (
            <tr>
              <td>
                <strong>
                  {index + 1}. {getDescription(item)}
                </strong>
                <p>
                  <Link to={`/variables/${item}`} className="nsw-page-nav__link">
                    <small>{item}</small>
                  </Link>{' '}
                  <p>
                    <small>{getFileLocation(item)}</small>
                  </p>
                </p>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
