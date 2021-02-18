import "../styles/Summary.css";

export default function Summary(props) {
	return (
		<div className='summary-div'>
			<h3>{props.sectionTitle}</h3>
			<p>
				<span className='summaryValue'>{props.variableNumber}</span>{" "}
				variables
			</p>
			<p>
				<span className='summaryValue'>{props.parameterNumber}</span>{" "}
				parameters
			</p>
		</div>
	);
}
