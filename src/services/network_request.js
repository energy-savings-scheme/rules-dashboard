import axios from "axios";

function sendHttpRequest() {
	// //testing on canadian-op API server
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
	// https://ess-test-1.herokuapp.com/
	// https://ofcan-dep.herokuapp.com/
	axios.post("https://ofcan-dep.herokuapp.com/dependencies", data).then(
		(res) => {
			// console.log(res.headers);
			console.log(res.data);
			console.log(typeof res.data);
		},
		(error) => {
			console.log(error.request);
		}
	);
}

export default sendHttpRequest;
