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
var create_account_exports = {};
__export(create_account_exports, {
  createSubAccount: () => createSubAccount,
  createTopLevelAccount: () => createTopLevelAccount
});
module.exports = __toCommonJS(create_account_exports);
var import_composers = require('./composers/index.cjs');
var import_actions = require('./actions.cjs');
async function createTopLevelAccount({ account, contract, newAccount, newPublicKey, initialBalance, blockReference, deps }) {
  return (0, import_actions.functionCall)({
    sender: account,
    receiver: contract,
    method: "create_account",
    args: {
      new_account_id: newAccount,
      new_public_key: newPublicKey
    },
    deposit: initialBalance,
    blockReference,
    deps
  });
}
async function createSubAccount({ account, newAccount, newPublicKey, initialBalance, blockReference, deps }) {
  return import_composers.SignedTransactionComposer.init({ sender: account, receiver: newAccount, deps }).createAccount().transfer(initialBalance).addFullAccessKey(newPublicKey).signAndSend(blockReference);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createSubAccount,
  createTopLevelAccount
});
