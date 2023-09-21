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

function listHvacModels(brandName) {
  return RegistryApiBase({
    url: `/commercial_hvac/brands/${brandName}/models`,
    method: 'GET',
  });
}

function getHvacModelsMetadata(payload) {
  return RegistryApiBase({
    url: `/commercial_hvac/metadata`,
    method: 'POST',
    data: payload,
  });
}

function getCommercialWHBrands() {
  return RegistryApiBase({
    url: `/commercial_wh/brands`,
    method: 'GET',
  });
}

function listWHModels(brandName) {
  return RegistryApiBase({
    url: `/commercial_wh/brands/${brandName}/models`,
    method: 'GET',
  });
}

function getWHModelsMetadata(payload) {
  return RegistryApiBase({
    url: `/commercial_wh/metadata`,
    method: 'POST',
    data: payload,
  });
}

function getRF2Brands() {
  return RegistryApiBase({
    url: `/refrigerated_cabinets/brands`,
    method: 'GET',
  });
}

function listRF2Models(brandName) {
  return RegistryApiBase({
    url: `/refrigerated_cabinets/brands/${brandName}/models`,
    method: 'GET',
  });
}

function getRF2ModelsMetadata(payload) {
  return RegistryApiBase({
    url: `/refrigerated_cabinets/metadata`,
    method: 'POST',
    data: payload,
  });
}

function getResidentialHeatPumpBrands() {
  return RegistryApiBase({
    url: `/residential_heat_pumps/brands`,
    method: 'GET',
  });
}

function getResidentialHeatPumpModels(brandName) {
  return RegistryApiBase({
    url: `/residential_heat_pumps/brands/${brandName}/models`,
    method: 'GET',
  });
}

function getResidentialHeatPumpModelsMetadata(payload) {
  return RegistryApiBase({
    url: `/residential_heat_pumps/metadata`,
    method: 'POST',
    data: payload,
  });
}

function getPoolPumpBrands() {
  return RegistryApiBase({
    url: `/pool_pumps/brands`,
    method: 'GET',
  });
}

function listPoolPumpModels(brandName) {
  return RegistryApiBase({
    url: `/pool_pumps/brands/${brandName}/models`,
    method: 'GET',
  });
}

function getPoolPumpMetadata(payload) {
  return RegistryApiBase({
    url: `/pool_pumps/metadata`,
    method: 'POST',
    data: payload,
  });
}

function getPostcodeValidation(postcode) {
  return RegistryApiBase({
    url: `/postcode/${postcode}`,
    method: 'GET',
  });
}

const RegistryApi = {
  getCommercialHVACBrands,
  getCommercialWHBrands,
  listHvacModels,
  getHvacModelsMetadata,
  listWHModels,
  getWHModelsMetadata,
  getRF2Brands,
  listRF2Models,
  getRF2ModelsMetadata,
  getPoolPumpBrands,
  listPoolPumpModels,
  getPoolPumpMetadata,
  getPostcodeValidation,
  getResidentialHeatPumpBrands,
  getResidentialHeatPumpModels,
  getResidentialHeatPumpModelsMetadata
};

export default RegistryApi;
