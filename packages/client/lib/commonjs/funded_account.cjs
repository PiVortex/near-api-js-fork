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
var funded_account_exports = {};
__export(funded_account_exports, {
  createFundedTestnetAccount: () => createFundedTestnetAccount
});
module.exports = __toCommonJS(funded_account_exports);
var import_constants = require('./constants.cjs');
async function createFundedTestnetAccount({
  newAccount,
  newPublicKey,
  endpointUrl = import_constants.KITWALLET_FUNDED_TESTNET_ACCOUNT_ENDPOINT
}) {
  const res = await fetch(endpointUrl, {
    method: "POST",
    body: JSON.stringify({
      newAccountId: newAccount,
      newAccountPublicKey: newPublicKey
    }),
    headers: { "Content-Type": "application/json" }
  });
  const { ok, status } = res;
  if (!ok) {
    throw new Error(`Failed to create account on ${endpointUrl}: ${status}`);
  }
  return await res.json();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createFundedTestnetAccount
});
