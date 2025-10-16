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
var view_exports = {};
__export(view_exports, {
  callViewMethod: () => callViewMethod,
  getAccessKey: () => getAccessKey,
  getAccessKeys: () => getAccessKeys,
  getAccountState: () => getAccountState,
  getContractCode: () => getContractCode,
  getContractState: () => getContractState,
  getNonce: () => getNonce,
  getStakedBalance: () => getStakedBalance,
  query: () => query,
  view: () => view
});
module.exports = __toCommonJS(view_exports);
const DEFAULT_VIEW_BLOCK_REFERENCE = { finality: "optimistic" };
var RequestType = /* @__PURE__ */ ((RequestType2) => {
  RequestType2["CallFunction"] = "call_function";
  RequestType2["ViewAccessKey"] = "view_access_key";
  RequestType2["ViewAccessKeyList"] = "view_access_key_list";
  RequestType2["ViewAccount"] = "view_account";
  RequestType2["ViewCode"] = "view_code";
  RequestType2["ViewState"] = "view_state";
  return RequestType2;
})(RequestType || {});
function query({
  account,
  request,
  args = {},
  blockReference,
  deps: { rpcProvider }
}) {
  return rpcProvider.query(
    {
      request_type: request,
      account_id: account,
      ...blockReference ? blockReference : DEFAULT_VIEW_BLOCK_REFERENCE,
      ...args
    }
  );
}
function callViewMethod({ account, method, args = {}, blockReference, deps }) {
  return query({
    request: "call_function" /* CallFunction */,
    account,
    args: {
      args_base64: Buffer.isBuffer(args) ? args : Buffer.from(JSON.stringify(args)).toString("base64"),
      method_name: method
    },
    blockReference,
    deps
  });
}
async function view({ account, method, args = {}, blockReference, deps }) {
  const { result } = await callViewMethod({ account, method, args, blockReference, deps });
  const stringResult = Buffer.from(result).toString();
  try {
    return JSON.parse(stringResult);
  } catch {
    const numeric = +stringResult;
    if (isNaN(numeric)) {
      return stringResult;
    }
    return Number.isSafeInteger(numeric) ? numeric : BigInt(numeric);
  }
}
async function getAccessKey({ account, publicKey, blockReference, deps }) {
  const { nonce, permission } = await query({
    request: "view_access_key" /* ViewAccessKey */,
    account,
    args: {
      public_key: publicKey
    },
    blockReference,
    deps
  });
  if (permission === "FullAccess") {
    return {
      nonce: BigInt(nonce),
      publicKey
    };
  }
  const { FunctionCall: { allowance, receiver_id, method_names } } = permission;
  return {
    allowance: BigInt(allowance),
    contract: receiver_id,
    methods: method_names,
    nonce: BigInt(nonce),
    publicKey
  };
}
async function getAccountState({ account, blockReference, deps }) {
  const accountState = await query({
    request: "view_account" /* ViewAccount */,
    account,
    blockReference,
    deps
  });
  return {
    availableBalance: BigInt(accountState.amount),
    codeHash: accountState.code_hash,
    locked: BigInt(accountState.locked),
    storageUsed: BigInt(accountState.storage_usage)
  };
}
async function getAccessKeys({ account, blockReference, deps }) {
  const { keys } = await query({
    request: "view_access_key_list" /* ViewAccessKeyList */,
    account,
    blockReference,
    deps
  });
  return keys.reduce((accessKeys, { access_key: { nonce, permission }, public_key: publicKey }) => {
    if (permission === "FullAccess") {
      accessKeys.fullAccessKeys.push({
        nonce,
        publicKey
      });
    } else {
      const { FunctionCall: { allowance, receiver_id, method_names } } = permission;
      accessKeys.functionCallAccessKeys.push({
        allowance: BigInt(allowance),
        contract: receiver_id,
        methods: method_names,
        nonce,
        publicKey
      });
    }
    return accessKeys;
  }, { fullAccessKeys: [], functionCallAccessKeys: [] });
}
async function getContractCode({ account, blockReference, deps }) {
  const { code_base64, hash } = await query({
    request: "view_code" /* ViewCode */,
    account,
    blockReference,
    deps
  });
  return { code: Buffer.from(code_base64, "base64").toString(), code_base64, hash };
}
async function getContractState({ account, prefix, blockReference, deps }) {
  const { values } = await query({
    request: "view_state" /* ViewState */,
    account,
    args: {
      prefix_base64: Buffer.from(prefix).toString("base64")
    },
    blockReference,
    deps
  });
  return values.reduce((state, { key, value }) => ({
    ...state,
    [key]: value
  }), {});
}
async function getNonce({ account, publicKey, blockReference, deps }) {
  const { nonce } = await getAccessKey({
    account,
    publicKey,
    blockReference,
    deps
  });
  return BigInt(nonce);
}
async function getStakedBalance({ account, validator, blockReference, deps }) {
  const staked = await view({
    account: validator,
    blockReference,
    method: "get_account",
    args: { account_id: account },
    deps
  });
  return {
    canWithdraw: staked.can_withdraw,
    stakedBalance: BigInt(staked.staked_balance),
    unstakedBalance: BigInt(staked.unstaked_balance)
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  callViewMethod,
  getAccessKey,
  getAccessKeys,
  getAccountState,
  getContractCode,
  getContractState,
  getNonce,
  getStakedBalance,
  query,
  view
});
