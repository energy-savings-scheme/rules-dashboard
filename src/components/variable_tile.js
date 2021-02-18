import "../styles/variable_tile.css";
import { getRequest } from "../services/network_request";

export default function VariableTile() {
	const index = 1;
	const variableID = "number_of_certificates";
	const variableDescription =
		"The total number of certificates generated from this activity.";
	const variableURL = "variable/number_of_certificates";

	const handleClick = () => {
		getRequest(variableURL).then((res) => {
			let data = res.data;
			console.log(data);
			console.log(Object.keys(data).includes("formulas"));
		});
	};

	return (
		<div className='variable-tile-div' onClick={handleClick}>
			<div className='variable-tile-index-div'>
				<span>{index}. </span>
			</div>
			<div>
				<p className='variable-tile-title'>{variableDescription}</p>
				<p className='variable-tile-subtext'>{`id: ${variableID}`}</p>
			</div>
		</div>
	);
}
