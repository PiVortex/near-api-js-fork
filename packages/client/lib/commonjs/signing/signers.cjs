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
var signers_exports = {};
__export(signers_exports, {
  getSignerFromKeyPair: () => getSignerFromKeyPair,
  getSignerFromKeystore: () => getSignerFromKeystore,
  getSignerFromPrivateKey: () => getSignerFromPrivateKey
});
module.exports = __toCommonJS(signers_exports);
var import_signers = require("@near-js/signers");
function getSignerFromKeyPair(keyPair) {
  return new import_signers.KeyPairSigner(keyPair);
}
function getSignerFromPrivateKey(privateKey) {
  return import_signers.KeyPairSigner.fromSecretKey(privateKey);
}
async function getSignerFromKeystore(account, network, keyStore) {
  const keyPair = await keyStore.getKey(network, account);
  return new import_signers.KeyPairSigner(keyPair);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getSignerFromKeyPair,
  getSignerFromKeystore,
  getSignerFromPrivateKey
});
