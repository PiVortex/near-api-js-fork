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
var sign_and_send_exports = {};
__export(sign_and_send_exports, {
  getSignerNonce: () => getSignerNonce,
  signAndSendTransaction: () => signAndSendTransaction,
  signTransaction: () => signTransaction
});
module.exports = __toCommonJS(sign_and_send_exports);
var import_utils = require("@near-js/utils");
var import_view = require('../view.cjs');
const DEFAULT_FINALITY = { finality: "optimistic" };
async function signTransaction({ transaction, deps: { signer } }) {
  const [txHash, signedTransaction] = await signer.signTransaction(transaction);
  return {
    encodedTransactionHash: txHash,
    signedTransaction
  };
}
async function signAndSendTransaction({ transaction, deps: { rpcProvider, signer } }) {
  const { signedTransaction } = await signTransaction({ transaction, deps: { signer } });
  const outcome = await rpcProvider.sendTransaction(signedTransaction);
  return {
    outcome,
    result: (0, import_utils.getTransactionLastResult)(outcome)
  };
}
async function getSignerNonce({ account, blockReference = DEFAULT_FINALITY, deps: { rpcProvider, signer } }) {
  return (0, import_view.getNonce)({
    account,
    publicKey: (await signer.getPublicKey()).toString(),
    blockReference,
    deps: { rpcProvider }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getSignerNonce,
  signAndSendTransaction,
  signTransaction
});
