// import variables from "../fullList.json";

function sortResponse(variables) {
	// variables is the response from get request to ./variables

	// let re = /\b[E]\d\w+/;
	let var_sorted = {
		A: [],
		B: [],
		C: [],
		D: [],
		E: [],
		F: [],
		others: [],
	};
	//TODO: loop through var_sorted instead

	Object.keys(variables).forEach((key) => {
		if (key.match(/\b[E]\d\w+/) != null) {
			var_sorted.E.push(key);
		} else if (key.match(/\b[F]\d\w+/) != null) {
			var_sorted.F.push(key);
		} else if (key.match(/\b[D]\d\w+/) != null) {
			var_sorted.D.push(key);
		} else {
			var_sorted.others.push(key);
		}
	});
	return var_sorted;
}
// pattern matching

export default sortResponse;
