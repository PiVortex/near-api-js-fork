"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var providers_exports = {};
__export(providers_exports, {
  createRpcClientWrapper: () => createRpcClientWrapper,
  getEndpointsByNetwork: () => getEndpointsByNetwork,
  getMainnetRpcProvider: () => getMainnetRpcProvider,
  getProviderByEndpoints: () => getProviderByEndpoints,
  getProviderByNetwork: () => getProviderByNetwork,
  getTestnetRpcArchivalProvider: () => getTestnetRpcArchivalProvider,
  getTestnetRpcProvider: () => getTestnetRpcProvider
});
module.exports = __toCommonJS(providers_exports);
var import_providers = require("@near-js/providers");
var import_constants = require('./constants.cjs');
function getEndpointsByNetwork(network) {
  switch (network) {
    case "testnet":
      return import_constants.PAGODA_RPC_ENDPOINTS_TESTNET;
    case "mainnet":
      return import_constants.PAGODA_RPC_ENDPOINTS_MAINNET;
    default:
      return null;
  }
}
function createRpcClientWrapper(urls) {
  if (!urls) {
    throw new Error("at least one RPC endpoint URL required");
  }
  return new import_providers.FailoverRpcProvider(urls.map((url) => new import_providers.JsonRpcProvider({ url })));
}
function getProviderByNetwork(network) {
  return createRpcClientWrapper(getEndpointsByNetwork(network));
}
function getProviderByEndpoints(...urls) {
  return createRpcClientWrapper(urls);
}
function getTestnetRpcProvider() {
  return getProviderByNetwork("testnet");
}
function getTestnetRpcArchivalProvider() {
  return createRpcClientWrapper(import_constants.PAGODA_RPC_ARCHIVAL_ENDPOINTS_TESTNET);
}
function getMainnetRpcProvider() {
  return getProviderByNetwork("mainnet");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createRpcClientWrapper,
  getEndpointsByNetwork,
  getMainnetRpcProvider,
  getProviderByEndpoints,
  getProviderByNetwork,
  getTestnetRpcArchivalProvider,
  getTestnetRpcProvider
});
