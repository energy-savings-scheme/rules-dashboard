import axios from "axios";

const baseURL = "https://dpie-ess-dev.herokuapp.com";
// const baseURL = "https://ofcan-dep.herokuapp.com";


function getRequest(route) {
	let url = `${baseURL}/${route}`;
	const dataPromise = axios.get(url);
	console.log(dataPromise);
	return dataPromise;
}
//testing on canadian-op API server
// var data = {
// 	persons: {
// 		Alicia: {
// 			date_of_birth: {
// 				ETERNITY: "1980-01-01",
// 			},
// 			age: {
// 				"2021-01-01": null,
// 			},
// 			canada_child_benefit__is_eligible: { "2021-02": null },
// 		},
// 	},
// };

// var data2 = {"persons":{"person 1":{}},"buildings":{"building 1":{"number_of_certificates":{"2021-2-16":null}}}};
var data3 = {"persons":{"person 1":{}},"buildings":{"building 1":{}}};

function postRequest(route) {
	axios.post(`${baseURL}/${route}`, data3).then(
		(response) => {
			console.log(response.data);
		},
		(error) => {
			console.log(error.request);
		}	
	);
}

export { getRequest, postRequest };
