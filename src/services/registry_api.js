import DjangoApiBase from 'services/django_api_base';
import OpenFiscaApiBase from 'services/openfisca_api_base';
import RegistryApiBase from './registry_api_base';

// Note the change in url for openfisca-djangoapi
function getCommercialHVACBrands() {
  return RegistryApiBase({
    url: `/commercial_hvac/brands`,
    method: 'GET',
  });
}

function getCommercialWHBrands() {
    return RegistryApiBase({
      url: `/commercial_wh/brands`,
      method: 'GET',
    });
  }

function getCommercialHVACmodel(params) {
  return DjangoApiBase({
    url: '/commercial_hvac/brands',
    method: 'GET',
    params: params,
  });
}

function listVariables(params) {
  return DjangoApiBase({
    url: '/variables/',
    method: 'GET',
    params: params,
  });
}

function listActivities(params) {
  return DjangoApiBase({
    url: '/activities/',
    method: 'GET',
    params: params,
  });
}

const OpenFiscaApi = {
  getVariable,
  getParameters,
  listEntities,
  listVariables,
  listActivities,
  postDependencies,
  postTrace,
  postCalculate,
};

export default OpenFiscaApi;
