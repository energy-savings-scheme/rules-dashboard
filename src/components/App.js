import React, { useState, useEffect } from "react";
import "../styles/App.css";
import Header from "./header";
import Summary from "./Summary";
import VariableTile from "./variable_tile";
import "../services/network_request";
// import sortResponse from "../services/sortResponse";
// import { getRequest, postRequest } from "../services/network_request";

function App() {
	const [sortedVar, setSortedVar] = useState({
		A: {},
		B: {},
		C: {},
		D: {},
		E: {},
		F: {},
		others: {},
	});

	// const updateHttpResponse = (name, value) => {
	// 	setFullList((prevState) => {
	// 		return {
	// 			...prevState,
	// 			[name]: value,
	// 		};
	// 	});
	// };

	useEffect(() => {
		//TODO: add a progress bar while loading
		// getRequest("variables").then((res) => {
		// 	let returnedData = res.data;
		// 	let varSorted = sortResponse(returnedData);
		// 	console.log("sorted");
		// 	setSortedVar((prev) => {
		// 		return varSorted;
		// 	});
		// });
		
		// postRequest("dependencies");
		// postRequest("calculate");
	}, []);

	return (
		<div>
			<Header />
			<div className='App'>
				{Object.entries(sortedVar).map(([key, valueObj]) => {
					return (
						<Summary
							key={key}
							sectionTitle={
								key === "others" ? "Others" : `Schedule ${key}`
							}
							variableNumber={Object.keys(valueObj).length}
						/>
					);
				})}
			</div>{" "}
			<VariableTile />
		</div>
	);
}

export default App;
