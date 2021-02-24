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

function postDependencies(payload) {
  return ApiBase({
    url: '/dependencies/',
    method: 'POST',
    data: payload,
  });
}

function postTrace(payload) {
  return ApiBase({
    url: '/trace/',
    method: 'POST',
    data: payload,
  });
}

const OpenFiscaApi = {
  getVariable,
  getParameters,
  listEntities,
  listVariables,
  postDependencies,
  postTrace,
};

export default OpenFiscaApi;
