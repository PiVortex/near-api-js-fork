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
var utils_exports = {};
__export(utils_exports, {
  get64BytePublicKeyFromPEM: () => get64BytePublicKeyFromPEM,
  preformatGetAssertReq: () => preformatGetAssertReq,
  preformatMakeCredReq: () => preformatMakeCredReq,
  publicKeyCredentialToJSON: () => publicKeyCredentialToJSON,
  recoverPublicKey: () => recoverPublicKey,
  sanitizeCreateKeyResponse: () => sanitizeCreateKeyResponse,
  sanitizeGetKeyResponse: () => sanitizeGetKeyResponse,
  uint8ArrayToBigInt: () => uint8ArrayToBigInt,
  validateUsername: () => validateUsername
});
module.exports = __toCommonJS(utils_exports);
var import_base64 = require("@hexagon/base64");
var import_p256 = require("@noble/curves/p256");
var import_sha256 = require("@noble/hashes/sha256");
const preformatMakeCredReq = (makeCredReq) => {
  const challenge = import_base64.base64.toArrayBuffer(makeCredReq.challenge, true);
  const userId = import_base64.base64.toArrayBuffer(makeCredReq.user.id, true);
  return {
    ...makeCredReq,
    challenge,
    user: {
      ...makeCredReq.user,
      id: userId
    },
    ...makeCredReq.excludeCredentials ? {
      excludeCredentials: makeCredReq.excludeCredentials.map((e) => {
        return { id: import_base64.base64.toArrayBuffer(e.id, true), type: e.type };
      })
    } : {}
  };
};
const get64BytePublicKeyFromPEM = (publicKey) => {
  const prefix = "\n";
  const publicKeyBase64 = publicKey.toString().split(prefix);
  return import_base64.base64.toArrayBuffer(`${publicKeyBase64[1]}${publicKeyBase64[2]}`).slice(27, 59);
};
const validateUsername = (name) => {
  if (!name) {
    throw new Error("username is required");
  }
  return name;
};
const preformatGetAssertReq = (getAssert) => {
  getAssert.challenge = import_base64.base64.toArrayBuffer(getAssert.challenge, true);
  for (const allowCred of getAssert.allowCredentials) {
    allowCred.id = import_base64.base64.toArrayBuffer(allowCred.id, true);
  }
  return getAssert;
};
const publicKeyCredentialToJSON = (pubKeyCred) => {
  if (pubKeyCred instanceof Array) {
    const arr = [];
    for (const i of pubKeyCred)
      arr.push(publicKeyCredentialToJSON(i));
    return arr;
  }
  if (pubKeyCred instanceof ArrayBuffer) {
    return import_base64.base64.fromArrayBuffer(pubKeyCred, true);
  }
  if (pubKeyCred instanceof Object) {
    const obj = {};
    for (const key in pubKeyCred) {
      obj[key] = publicKeyCredentialToJSON(pubKeyCred[key]);
    }
    return obj;
  }
  return pubKeyCred;
};
const recoverPublicKey = async (r, s, message, recovery) => {
  if (recovery !== 0 && recovery !== 1) {
    throw new Error("Invalid recovery parameter");
  }
  const sigObjQ = new import_p256.p256.Signature(r, s).addRecoveryBit(0);
  const sigObjP = new import_p256.p256.Signature(r, s).addRecoveryBit(1);
  const hash = import_sha256.sha256.create().update(message).digest();
  const Q = sigObjQ.recoverPublicKey(hash);
  const P = sigObjP.recoverPublicKey(hash);
  return [Q.toRawBytes().subarray(1, 33), P.toRawBytes().subarray(1, 33)];
};
const uint8ArrayToBigInt = (uint8Array) => {
  const array = Array.from(uint8Array);
  return BigInt("0x" + array.map((byte) => byte.toString(16).padStart(2, "0")).join(""));
};
const convertUint8ArrayToArrayBuffer = (obj) => {
  if (obj instanceof Uint8Array) {
    return obj.buffer.slice(obj.byteOffset, obj.byteOffset + obj.byteLength);
  }
  return obj;
};
const sanitizeCreateKeyResponse = (res) => {
  if (res instanceof PublicKeyCredential && (res.rawId instanceof Uint8Array || res.response.clientDataJSON instanceof Uint8Array || //  eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //  @ts-ignore - attestationObject is not defined in Credential
  res.response.attestationObject instanceof Uint8Array)) {
    return {
      ...res,
      rawId: convertUint8ArrayToArrayBuffer(res.rawId),
      response: {
        ...res.response,
        clientDataJSON: convertUint8ArrayToArrayBuffer(res.response.clientDataJSON),
        //  eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //  @ts-ignore - attestationObject is not defined in Credential
        attestationObject: convertUint8ArrayToArrayBuffer(res.response.attestationObject)
      }
    };
  }
  return res;
};
const sanitizeGetKeyResponse = (res) => {
  if (res instanceof PublicKeyCredential && (res.rawId instanceof Uint8Array || //   eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   @ts-ignore - authenticatorData is not defined in Credential
  res.response.authenticatorData instanceof Uint8Array || res.response.clientDataJSON instanceof Uint8Array || //   eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   @ts-ignore - signature is not defined in Credential
  res.response.signature instanceof Uint8Array || //   eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   @ts-ignore - userHandle is not defined in Credential
  res.response.userHandle instanceof Uint8Array)) {
    return {
      ...res,
      rawId: convertUint8ArrayToArrayBuffer(res.rawId),
      response: {
        ...res.response,
        //   eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //   @ts-ignore - authenticatorData is not defined in Credential
        authenticatorData: convertUint8ArrayToArrayBuffer(res.response.authenticatorData),
        clientDataJSON: convertUint8ArrayToArrayBuffer(res.response.clientDataJSON),
        //   eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //   @ts-ignore - signature is not defined in Credential
        signature: convertUint8ArrayToArrayBuffer(res.response.signature),
        //   eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //   @ts-ignore - userHandle is not defined in Credential
        userHandle: convertUint8ArrayToArrayBuffer(res.response.userHandle)
      }
    };
  }
  return res;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  get64BytePublicKeyFromPEM,
  preformatGetAssertReq,
  preformatMakeCredReq,
  publicKeyCredentialToJSON,
  recoverPublicKey,
  sanitizeCreateKeyResponse,
  sanitizeGetKeyResponse,
  uint8ArrayToBigInt,
  validateUsername
});
