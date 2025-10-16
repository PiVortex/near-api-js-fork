"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var fido2_exports = {};
__export(fido2_exports, {
  Fido2: () => Fido2
});
module.exports = __toCommonJS(fido2_exports);
var import_base64 = require("@hexagon/base64");
var import_fido2_lib = require("fido2-lib");
var import_cbor_js = __toESM(require("cbor-js"), 1);
class Fido2 {
  f2l;
  async init({ rpId, rpName, timeout }) {
    this.f2l = new import_fido2_lib.Fido2Lib({
      timeout,
      rpId,
      rpName,
      challengeSize: 128,
      attestation: "none",
      cryptoParams: [-8, -7, -257],
      authenticatorAttachment: "platform",
      authenticatorRequireResidentKey: true,
      authenticatorUserVerification: "preferred"
    });
  }
  async registration({ username, displayName, id }) {
    const registrationOptions = await this.f2l.attestationOptions();
    const user = {
      id,
      name: username,
      displayName
    };
    const challenge = import_base64.base64.fromArrayBuffer(registrationOptions.challenge, true);
    return {
      ...registrationOptions,
      user,
      status: "ok",
      challenge
    };
  }
  async attestation({ clientAttestationResponse, origin, challenge }) {
    const attestationExpectations = {
      challenge,
      origin,
      factor: "either"
    };
    const regResult = await this.f2l.attestationResult(clientAttestationResponse, attestationExpectations);
    return regResult;
  }
  async login() {
    const assertionOptions = await this.f2l.assertionOptions();
    const challenge = import_base64.base64.fromArrayBuffer(assertionOptions.challenge, true);
    return {
      ...assertionOptions,
      attestation: "direct",
      challenge,
      status: "ok"
    };
  }
  async checkAlg(res, exp) {
    const result = await this.f2l.attestationResult(res, exp);
    const cosePublicKey = result.authnrData.get("credentialPublicKeyCose");
    const decodedKey = import_cbor_js.default.decode(cosePublicKey);
    const algKey = 3;
    return decodedKey[algKey];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Fido2
});
