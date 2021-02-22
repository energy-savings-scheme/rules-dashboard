import '../styles/Summary.css';

export default function Summary(props) {
  function handleClick() {
    console.log(props.sectionTitle);
  }

  return (
    <div className="summary-div" onClick={handleClick}>
      <h3>{props.sectionTitle}</h3>
      <p>
        <span className="summaryValue">{props.variableNumber}</span> variables
      </p>
    </div>
  );
}
