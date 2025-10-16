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
var index_exports = {};
__export(index_exports, {
  PasskeyProcessCanceled: () => PasskeyProcessCanceled,
  createKey: () => createKey,
  getKeys: () => getKeys,
  isDeviceSupported: () => isDeviceSupported,
  isPassKeyAvailable: () => isPassKeyAvailable
});
module.exports = __toCommonJS(index_exports);
var import_base64 = require("@hexagon/base64");
var import_ed25519 = require("@noble/curves/ed25519");
var import_sha256 = require("@noble/hashes/sha256");
var import_buffer = require("buffer");
var import_asn1_parser = __toESM(require("asn1-parser"), 1);
var import_crypto = require("@near-js/crypto");
var import_utils = require("@near-js/utils");
var import_utils2 = require('./utils.cjs');
var import_fido2 = require('./fido2.cjs');
const CHALLENGE_TIMEOUT_MS = 90 * 1e3;
const RP_NAME = "NEAR_API_JS_WEBAUTHN";
const f2l = new import_fido2.Fido2();
const init = async () => {
  await f2l.init({
    rpId: location.hostname,
    rpName: RP_NAME,
    timeout: CHALLENGE_TIMEOUT_MS
  });
};
function setBufferIfUndefined() {
  if (window && !window.Buffer) {
    window.Buffer = import_buffer.Buffer;
  }
}
class PasskeyProcessCanceled extends Error {
  constructor(message) {
    super(message);
    this.name = "PasskeyProcessCanceled";
  }
}
const createKey = async (username) => {
  const cleanUserName = (0, import_utils2.validateUsername)(username);
  if (!f2l.f2l) {
    await init();
  }
  const id = import_base64.base64.fromString(cleanUserName, true);
  const challengeMakeCred = await f2l.registration({
    username: cleanUserName,
    displayName: cleanUserName,
    id
  });
  const publicKey = (0, import_utils2.preformatMakeCredReq)(challengeMakeCred);
  setBufferIfUndefined();
  return navigator.credentials.create({ publicKey }).then(async (res) => {
    if (!res) {
      throw new PasskeyProcessCanceled("Failed to retrieve response from navigator.credentials.create");
    }
    const sanitizedResponse = (0, import_utils2.sanitizeCreateKeyResponse)(res);
    const alg = await f2l.checkAlg(sanitizedResponse, {
      challenge: challengeMakeCred.challenge,
      origin,
      factor: "either"
    });
    if (+alg === -257) {
      throw new Error("Unsupported device");
    }
    const result = await f2l.attestation({
      clientAttestationResponse: sanitizedResponse,
      origin,
      challenge: challengeMakeCred.challenge
    });
    const publicKey2 = result.authnrData.get("credentialPublicKeyPem");
    const publicKeyBytes = (0, import_utils2.get64BytePublicKeyFromPEM)(publicKey2);
    const secretKey = import_sha256.sha256.create().update(import_buffer.Buffer.from(publicKeyBytes)).digest();
    const pubKey = import_ed25519.ed25519.getPublicKey(secretKey);
    return new import_crypto.KeyPairEd25519((0, import_utils.baseEncode)(import_buffer.Buffer.concat([import_buffer.Buffer.from(secretKey), import_buffer.Buffer.from(pubKey)])));
  });
};
const getKeys = async (username) => {
  const cleanUserName = (0, import_utils2.validateUsername)(username);
  if (!f2l.f2l) {
    await init();
  }
  const assertionOptions = await f2l.login();
  const options = {
    ...assertionOptions,
    username: cleanUserName,
    allowCredentials: []
  };
  const publicKey = (0, import_utils2.preformatGetAssertReq)(options);
  setBufferIfUndefined();
  return navigator.credentials.get({ publicKey }).then(async (response) => {
    const sanitizedResponse = (0, import_utils2.sanitizeGetKeyResponse)(response);
    const getAssertionResponse = (0, import_utils2.publicKeyCredentialToJSON)(sanitizedResponse);
    const signature = import_base64.base64.toArrayBuffer(getAssertionResponse.response.signature, true);
    const parser = import_asn1_parser.default?.ASN1?.parse || window?.ASN1?.parse;
    const rAndS = parser(new Uint8Array(signature));
    const clientDataJSONHash = import_sha256.sha256.create().update(
      import_buffer.Buffer.from(new Uint8Array(import_base64.base64.toArrayBuffer(getAssertionResponse.response.clientDataJSON, true)))
    ).digest();
    const authenticatorDataJSONHash = import_buffer.Buffer.from(new Uint8Array(import_base64.base64.toArrayBuffer(getAssertionResponse.response.authenticatorData, true)));
    const authenticatorAndClientDataJSONHash = import_buffer.Buffer.concat([import_buffer.Buffer.from(authenticatorDataJSONHash), import_buffer.Buffer.from(clientDataJSONHash)]);
    const r = rAndS.children[0].value;
    const s = rAndS.children[1].value;
    const correctPKs = await (0, import_utils2.recoverPublicKey)((0, import_utils2.uint8ArrayToBigInt)(r), (0, import_utils2.uint8ArrayToBigInt)(s), authenticatorAndClientDataJSONHash, 0);
    const firstEDSecret = import_sha256.sha256.create().update(import_buffer.Buffer.from(correctPKs[0])).digest();
    const firstEDPublic = import_ed25519.ed25519.getPublicKey(firstEDSecret);
    const secondEDSecret = import_sha256.sha256.create().update(import_buffer.Buffer.from(correctPKs[1])).digest();
    const secondEDPublic = import_ed25519.ed25519.getPublicKey(secondEDSecret);
    const firstKeyPair = new import_crypto.KeyPairEd25519((0, import_utils.baseEncode)(import_buffer.Buffer.concat([import_buffer.Buffer.from(firstEDSecret), import_buffer.Buffer.from(firstEDPublic)])));
    const secondKeyPair = new import_crypto.KeyPairEd25519((0, import_utils.baseEncode)(import_buffer.Buffer.concat([import_buffer.Buffer.from(secondEDSecret), import_buffer.Buffer.from(secondEDPublic)])));
    return [firstKeyPair, secondKeyPair];
  });
};
const isPassKeyAvailable = async () => {
  return window.PublicKeyCredential?.isUserVerifyingPlatformAuthenticatorAvailable?.() || false;
};
const isDeviceSupported = async () => {
  try {
    await createKey("test-device");
    return true;
  } catch (e) {
    return false;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PasskeyProcessCanceled,
  createKey,
  getKeys,
  isDeviceSupported,
  isPassKeyAvailable
});
