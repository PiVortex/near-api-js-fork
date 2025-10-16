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
var actions_exports = {};
__export(actions_exports, {
  addFullAccessKey: () => addFullAccessKey,
  addFunctionCallAccessKey: () => addFunctionCallAccessKey,
  deleteAccessKey: () => deleteAccessKey,
  deleteAccount: () => deleteAccount,
  deployContract: () => deployContract,
  functionCall: () => functionCall,
  stake: () => stake,
  transfer: () => transfer
});
module.exports = __toCommonJS(actions_exports);
var import_composers = require('./composers/index.cjs');
function functionCall({ sender, receiver, method, args, gas, deposit, blockReference, deps }) {
  return import_composers.SignedTransactionComposer.init({ sender, receiver, deps }).functionCall(method, args, gas, deposit).signAndSend(blockReference);
}
function transfer({ sender, receiver, amount, blockReference, deps }) {
  return import_composers.SignedTransactionComposer.init({ sender, receiver, deps }).transfer(amount).signAndSend(blockReference);
}
function stake({ account, amount, publicKey, blockReference, deps }) {
  return import_composers.SignedTransactionComposer.init({ sender: account, receiver: account, deps }).stake(amount, publicKey).signAndSend(blockReference);
}
function addFullAccessKey({ account, publicKey, blockReference, deps }) {
  return import_composers.SignedTransactionComposer.init({ sender: account, receiver: account, deps }).addFullAccessKey(publicKey).signAndSend(blockReference);
}
function addFunctionCallAccessKey({ account, publicKey, contract, methodNames, allowance, blockReference, deps }) {
  return import_composers.SignedTransactionComposer.init({ sender: account, receiver: account, deps }).addFunctionCallAccessKey(publicKey, contract, methodNames, allowance).signAndSend(blockReference);
}
function deleteAccessKey({ account, publicKey, blockReference, deps }) {
  return import_composers.SignedTransactionComposer.init({ sender: account, receiver: account, deps }).deleteKey(publicKey).signAndSend(blockReference);
}
function deleteAccount({ account, beneficiaryId, blockReference, deps }) {
  return import_composers.SignedTransactionComposer.init({ sender: account, receiver: account, deps }).deleteAccount(beneficiaryId).signAndSend(blockReference);
}
function deployContract({ account, code, blockReference, deps }) {
  return import_composers.SignedTransactionComposer.init({ sender: account, receiver: account, deps }).deployContract(code).signAndSend(blockReference);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addFullAccessKey,
  addFunctionCallAccessKey,
  deleteAccessKey,
  deleteAccount,
  deployContract,
  functionCall,
  stake,
  transfer
});
