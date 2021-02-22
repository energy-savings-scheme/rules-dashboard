// import variables from "../fullList.json";
import variable_tree from './variable_tree.json';

function variableRelatedToKeyword(varID, varDescription, keyword) {
  if (
    varID.indexOf(keyword.toLowerCase()) !== -1 ||
    varID.indexOf(keyword.toUpperCase()) !== -1 ||
    varDescription.indexOf(keyword.toLowerCase()) !== -1 ||
    varDescription.indexOf(keyword.toUpperCase()) !== -1
  ) {
    console.log(varID);
    console.log(varDescription);
  }
}

function sortResponse(variables) {
  // variables is the response from get request to ./variables, json object
  // sort variables into the pre-made tree structure

  // let re = /\b[E]\d\w+/;

  const sorted_var = {};
  variable_tree.forEach((majorCat) => {
    sorted_var[majorCat.majorLabel] = {};
    majorCat.variables.forEach((subCat) => {
      sorted_var[majorCat.majorLabel][subCat.subLabel] = {};
    });
  });

  var majorLabel = 'D1_';
  var regex = new RegExp('\\b' + majorLabel + '\\w+');

  Object.keys(variables).forEach((id) => {
    if (id.match(regex) != null) {
      console.log(id);
    } else {
      console.log('others');
    }
  });

  // for (let [varID, varData] of Object.entries(variables)) {
  // 	// console.log(varID);
  // 	if (varID.match(regex) != null) {
  // 		console.log(varID)
  // 	}
  // 	// variableRelatedToKeyword(varID, varData.description, 'nabers');

  // };

  //TODO: loop through var_sorted instead

  // Object.keys(var_sorted).forEach((key) => {
  // 	let regex = new RegExp("\b[" + key + "]dw+");
  // 	console.log(regex);
  // 	Object.keys(variables).forEach((variableID) => {
  // 		console.log(variableID.match(regex));
  // 	});
  // });

  // Object.entries(variables).forEach(([key, value]) => {
  // 	if (key.match(/\b[D]\d\w+/) != null) {
  // 		var_sorted.D[key] = value;
  // 	} else if (key.match(/\b[E]\d\w+/) != null) {
  // 		var_sorted.E[key] = value;
  // 	} else if (key.match(/\b[F]\d\w+/) != null) {
  // 		var_sorted.F[key] = value;
  // 	} else {
  // 		var_sorted.others[key] = value;
  // 	}
  // });
  console.log(sorted_var);
}
// pattern matching

export default sortResponse;
