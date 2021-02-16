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
					date_of_birth: {
						ETERNITY: "1980-01-01",
					},
					age: {
						"2021-01-01": null,
					},
				},
			},
			// buildings: {
			// 	_: {
			// 		energy_savings_type: { ETERNITY: "annual_creation" },
			// 		gas_savings: {
			// 			ETERNITY: null,
			// 		},
			// 	},
			// },
		};
		// https://ess-test-1.herokuapp.com/
		// https://ofcan-dep.herokuapp.com/
		axios.post("https://ofcan-dep.herokuapp.com//calculate", data).then(
			(res) => {
				// console.log(res.headers);
				console.log(res.data);
			},
			(error) => {
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
