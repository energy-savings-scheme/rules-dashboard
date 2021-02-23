import ApiBase from 'services/api_base';

function getVariable(variable_name) {
  return ApiBase({
    url: `/variable/${variable_name}/`,
    method: 'GET',
  });
}

function getParameters() {
  return ApiBase({
    url: '/parameters/',
    method: 'GET',
  });
}

function listEntities() {
  return ApiBase({
    url: '/entities/',
    method: 'GET',
  });
}

function listVariables() {
  return ApiBase({
    url: '/variables/',
    method: 'GET',
  });
}

const OpenFiscaApi = {
  getVariable,
  getParameters,
  listEntities,
  listVariables,
};

export default OpenFiscaApi;
