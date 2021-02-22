import ApiBase from 'services/api_base';

function getVariables() {
  return ApiBase({
    url: '/variables/',
    method: 'GET',
  });
}

function getParameters() {
  return ApiBase({
    url: '/parameters/',
    method: 'GET',
  });
}

const OpenFiscaApi = {
  getVariables,
  getParameters,
};

export default OpenFiscaApi;
