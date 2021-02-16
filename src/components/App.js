import React from "react";

import "./App.css";
import Header from "./header";
import Activity from "./Activity";
import axios from "axios";

function App() {
	function sendHttpRequest() {
		// //testing on my local server
		// var data = {
		// 	persons: {
		// 		Alicia: {},
		// 	},
		// 	buildings: {
		// 		building1: {
		// 			energy_star_rating: { ETERNITY: 4.0 },
		// 			appliance_load: { ETERNITY: 6.0 },
		// 			deemed_electricity_savings: {
		// 				2021: null,
		// 			},
		// 		},
		// 		building2: {},
		// 		building3: {},
		// 	},
		// };
		// axios.post("http://localhost:5000/calculate", data).then(
		// 	(res) => {
		// 		// console.log(res.headers);
		// 		console.log(res.data);
		// 	},
		// 	(error) => {
		// 		// console.log(error.response.data);
		// 		console.log(error.request);
		// 	}
		// );

		// //testing on nsw base web API server

		var data = {
			persons: {
				Alicia: {
					birth: {
						ETERNITY: "1980-01-01",
					},
				},
			},
			buildings: {
				_: {
					energy_savings_type: { ETERNITY: "annual_creation" },
					gas_savings: {
						ETERNITY: null,
					},
				},
			},
		};

		axios.post("https://testrules.herokuapp.com/calculate", data).then(
			(res) => {
				// console.log(res.headers);
				console.log("I am here! in the response");
				console.log(res.data);
			},
			(error) => {
				// console.log(error.response.data);
				console.log(error.request);
			}
		);
	}

	sendHttpRequest();

	return (
		<div>
			<Header />
			<div className='App'>
				<Activity />
			</div>{" "}
		</div>
	);
}

export default App;
