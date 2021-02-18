import axios from "axios";

// https://dpie-ess-dev.herokuapp.com/
// https://ofcan-dep.herokuapp.com/

function getRequest(route) {
	let url = `https://dpie-ess-dev.herokuapp.com/${route}`;
	const dataPromise = axios.get(url);
	console.log(dataPromise);
	return dataPromise;
}
//testing on canadian-op API server
var data = {
	persons: {
		Alicia: {
			date_of_birth: {
				ETERNITY: "1980-01-01",
			},
			age: {
				"2021-01-01": null,
			},
			canada_child_benefit__is_eligible: { "2021-02": null },
		},
	},
};

function postRequest() {
	axios.post("https://ofcan-dep.herokuapp.com/dependencies", data).then(
		(response) => {
			console.log(response.data);
		},
		(error) => {
			console.log(error.request);
		}
	);
}

export { getRequest, postRequest };
