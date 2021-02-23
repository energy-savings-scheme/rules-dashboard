// import variables from "../fullList.json";
import variable_tree from './variable_tree.json';

function varRelatedToKeyword(varID, varDescription, keyword) {
  let regex = new RegExp(keyword, 'i');
  return regex.test(varID) || regex.test(varDescription);
}

function sortResponse(variables) {
  // let re = /\b[E]\d\w+/;
  //   let regex = new RegExp('\\b' + majorLabel + '\\d\\w+');

  const sorted_var = {};
  //Construct the variable tree
  var remainingVariables = variables;

  variable_tree.forEach((majorCat) => {
    let majorLabel = majorCat.majorLabel;
    sorted_var[majorLabel] = {};
    let regex = new RegExp('\\b' + majorLabel + '\\d\\w+');
    let majorList = Object.keys(variables).filter((item) => item.match(regex));

    if (majorList.length > 0) {
      majorCat.subCategories.forEach((subCat) => {
        let regex0 = new RegExp('\\b' + subCat.subLabel + '_' + '\\w+');
        let matches = majorList.filter((item) => item.match(regex0));
        let nonMatches = majorList.filter((item) => !item.match(regex0));
        sorted_var[majorLabel][subCat.subLabel] = matches;
        majorList = nonMatches;
      });
      sorted_var[majorLabel]['others'] = majorList;
    } else if (majorList.length == 0 && majorLabel == 'nabers') {
      sorted_var[majorLabel]['variables'] = [];
      Object.entries(variables).forEach(([varID, varData]) => {
        if (varRelatedToKeyword(varID, varData.description, majorLabel)) {
          sorted_var[majorLabel]['variables'].push(varID);
        }
      });
    }
  });
  return sorted_var;
}

export default sortResponse;
