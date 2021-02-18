import "../styles/Activity.css";

export default function Activity() {
	function checked(event) {
		console.log(event.target.value);
	}

	return (
		<div className='Activity-choice-div'>
			<fieldset>
				<legend className='question'>
					Choose an energy saving activity:
				</legend>

				<div className='radio-option-div'>
					<input
						type='radio'
						id='sona'
						name='activity-type'
						value='sona'
						onChange={checked}></input>
					<label>Sale of New Appliances</label>

					<input
						type='radio'
						id='install'
						name='activity-type'
						value='install'
						onChange={checked}></input>
					<label>Installing New Appliances</label>
				</div>
			</fieldset>
		</div>
	);
}
