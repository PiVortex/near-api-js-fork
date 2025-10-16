import { FailoverRpcProvider, JsonRpcProvider } from "@near-js/providers";
import {
  PAGODA_RPC_ARCHIVAL_ENDPOINTS_TESTNET,
  PAGODA_RPC_ENDPOINTS_MAINNET,
  PAGODA_RPC_ENDPOINTS_TESTNET
} from "./constants.js";
function getEndpointsByNetwork(network) {
  switch (network) {
    case "testnet":
      return PAGODA_RPC_ENDPOINTS_TESTNET;
    case "mainnet":
      return PAGODA_RPC_ENDPOINTS_MAINNET;
    default:
      return null;
  }
}
function createRpcClientWrapper(urls) {
  if (!urls) {
    throw new Error("at least one RPC endpoint URL required");
  }
  return new FailoverRpcProvider(urls.map((url) => new JsonRpcProvider({ url })));
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
  return createRpcClientWrapper(PAGODA_RPC_ARCHIVAL_ENDPOINTS_TESTNET);
}
function getMainnetRpcProvider() {
  return getProviderByNetwork("mainnet");
}
export {
  createRpcClientWrapper,
  getEndpointsByNetwork,
  getMainnetRpcProvider,
  getProviderByEndpoints,
  getProviderByNetwork,
  getTestnetRpcArchivalProvider,
  getTestnetRpcProvider
};
