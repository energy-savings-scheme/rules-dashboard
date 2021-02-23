// import variables from "../fullList.json";
import variable_tree from './variable_tree.json';

function varRelatedToKeyword(varID, varDescription, keyword) {
  let regex = new RegExp(keyword, 'i');
  return regex.test(varID) || regex.test(varDescription);
}

function emptyTree() {
  const sorted_var = {};
  variable_tree.forEach((majorCat) => {
    sorted_var[majorCat.majorLabel] = {};
    majorCat.subCategories.forEach((subCat) => {
      sorted_var[majorCat.majorLabel][subCat.subLabel] = {};
    });
  });
  return sorted_var;
}

function sortResponse(variables) {
  // let re = /\b[E]\d\w+/;
  //   let regex = new RegExp('\\b' + majorLabel + '\\d\\w+');

  var sorted_var = emptyTree();
  var remainingVariablesList = Object.keys(variables);

  Object.entries(sorted_var).forEach(([majorLabel, subJson]) => {
    let regex = new RegExp('\\b' + majorLabel + '\\d\\w+');
    let majorList = remainingVariablesList.filter((item) => item.match(regex));
    let unMatched = remainingVariablesList.filter((item) => majorList.indexOf(item) === -1);

    if (majorList.length > 0) {
      remainingVariablesList = unMatched;
      Object.keys(subJson).forEach((subLabel) => {
        let regex0 = new RegExp('\\b' + subLabel + '_\\w+');
        let matches = majorList.filter((item) => item.match(regex0));
        let nonMatches = majorList.filter((item) => !item.match(regex0));
        sorted_var[majorLabel][subLabel] = matches;
        majorList = nonMatches;
      });
      sorted_var[majorLabel][`${majorLabel}-Others`] = majorList;
    } else if (majorList.length === 0 && majorLabel === 'nabers') {
      sorted_var[majorLabel]['nabers'] = [];
      Object.entries(variables).forEach(([varID, varData]) => {
        if (varRelatedToKeyword(varID, varData.description, majorLabel)) {
          sorted_var[majorLabel]['nabers'].push(varID);
        }
      });
      let leftOver = unMatched.filter(
        (item) => sorted_var[majorLabel]['nabers'].indexOf(item) === -1,
      );
      remainingVariablesList = leftOver;
    } else if (majorList.length === 0 && majorLabel === 'others') {
      sorted_var[majorLabel]['others'] = remainingVariablesList;
    }
  });
  console.log(sorted_var);
  return sorted_var;
}

export { emptyTree, sortResponse };
