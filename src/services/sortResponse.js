// import variables from "../fullList.json";




function sortResponse(variables) {
	// variables is the response from get request to ./variables, json object

	// let re = /\b[E]\d\w+/;
	let var_sorted = {
		nabers: {},
		D: {},
		E: {},
		F: {},
		others: {},
	};
	//TODO: loop through var_sorted instead

	// Object.keys(var_sorted).forEach((key) => {
	// 	let regex = new RegExp("\b[" + key + "]dw+");
	// 	console.log(regex);
	// 	Object.keys(variables).forEach((variableID) => {
	// 		console.log(variableID.match(regex));
	// 	});
	// });

	Object.entries(variables).forEach(([key, value]) => {
		if (key.match(/\b[D]\d\w+/) != null) {
			var_sorted.D[key] = value;
		} else if (key.match(/\b[E]\d\w+/) != null) {
			var_sorted.E[key] = value;
		} else if (key.match(/\b[F]\d\w+/) != null) {
			var_sorted.F[key] = value;
		} else {
			var_sorted.others[key] = value;
		}
	});
	return var_sorted;
}
// pattern matching

export default sortResponse;
