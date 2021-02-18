import React from "react";

import "../styles/App.css";
import Header from "./header";
import Summary from "./Summary";

function App() {
	return (
		<div>
			<Header />
			<div className='App'>
				<Summary
					sectionTitle='Sale of New Appliances (SONA)'
					variableNumber='25'
					parameterNumber='30'
				/>
				<Summary
					sectionTitle='NABERS Ratings'
					variableNumber='180'
					parameterNumber='70'
				/>
			</div>{" "}
		</div>
	);
}

export default App;
