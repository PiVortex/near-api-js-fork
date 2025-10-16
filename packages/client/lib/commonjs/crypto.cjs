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
var crypto_exports = {};
__export(crypto_exports, {
  generateRandomKeyPair: () => generateRandomKeyPair,
  parseKeyPair: () => parseKeyPair
});
module.exports = __toCommonJS(crypto_exports);
var import_crypto = require("@near-js/crypto");
function generateRandomKeyPair(curve) {
  return import_crypto.KeyPair.fromRandom(curve);
}
function parseKeyPair(privateKey) {
  return import_crypto.KeyPair.fromString(privateKey);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  generateRandomKeyPair,
  parseKeyPair
});
