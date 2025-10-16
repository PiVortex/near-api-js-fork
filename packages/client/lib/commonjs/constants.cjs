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
var constants_exports = {};
__export(constants_exports, {
  DEFAULT_META_TRANSACTION_BLOCK_HEIGHT_TTL: () => DEFAULT_META_TRANSACTION_BLOCK_HEIGHT_TTL,
  KITWALLET_FUNDED_TESTNET_ACCOUNT_ENDPOINT: () => KITWALLET_FUNDED_TESTNET_ACCOUNT_ENDPOINT,
  MAX_GAS: () => MAX_GAS,
  PAGODA_RPC_ARCHIVAL_ENDPOINTS_MAINNET: () => PAGODA_RPC_ARCHIVAL_ENDPOINTS_MAINNET,
  PAGODA_RPC_ARCHIVAL_ENDPOINTS_TESTNET: () => PAGODA_RPC_ARCHIVAL_ENDPOINTS_TESTNET,
  PAGODA_RPC_ENDPOINTS_MAINNET: () => PAGODA_RPC_ENDPOINTS_MAINNET,
  PAGODA_RPC_ENDPOINTS_TESTNET: () => PAGODA_RPC_ENDPOINTS_TESTNET
});
module.exports = __toCommonJS(constants_exports);
const DEFAULT_META_TRANSACTION_BLOCK_HEIGHT_TTL = 100n;
const MAX_GAS = 300000000000000n;
const PAGODA_RPC_ENDPOINTS_MAINNET = [
  "https://rpc.near.org",
  "https://rpc.mainnet.pagoda.co"
];
const PAGODA_RPC_ARCHIVAL_ENDPOINTS_MAINNET = [
  "https://archival-rpc.near.org"
];
const PAGODA_RPC_ENDPOINTS_TESTNET = [
  "https://rpc.testnet.near.org",
  "https://rpc.testnet.pagoda.co"
];
const PAGODA_RPC_ARCHIVAL_ENDPOINTS_TESTNET = [
  "https://archival-rpc.testnet.near.org"
];
const KITWALLET_FUNDED_TESTNET_ACCOUNT_ENDPOINT = "https://testnet-api.kitwallet.app/account";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DEFAULT_META_TRANSACTION_BLOCK_HEIGHT_TTL,
  KITWALLET_FUNDED_TESTNET_ACCOUNT_ENDPOINT,
  MAX_GAS,
  PAGODA_RPC_ARCHIVAL_ENDPOINTS_MAINNET,
  PAGODA_RPC_ARCHIVAL_ENDPOINTS_TESTNET,
  PAGODA_RPC_ENDPOINTS_MAINNET,
  PAGODA_RPC_ENDPOINTS_TESTNET
});
