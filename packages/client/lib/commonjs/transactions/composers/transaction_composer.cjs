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
var transaction_composer_exports = {};
__export(transaction_composer_exports, {
  TransactionComposer: () => TransactionComposer
});
module.exports = __toCommonJS(transaction_composer_exports);
var import_crypto = require("@near-js/crypto");
var import_transactions = require("@near-js/transactions");
var import_utils = require("@near-js/utils");
class TransactionComposer {
  actions = [];
  receiver;
  sender;
  blockHash;
  nonce;
  publicKey;
  constructor(transaction) {
    this.receiver = transaction.receiver;
    this.sender = transaction.sender;
    this.blockHash = transaction.blockHash;
    this.nonce = transaction.nonce;
    this.publicKey = transaction.publicKey;
  }
  /**
   * Initialize the composer
   * @param transaction composer configuration
   */
  static init(transaction) {
    return new TransactionComposer(transaction);
  }
  /**
   * Validate and return the object used for Transaction instantiation
   * @param transaction transaction values to override composed transaction fields
   * @private
   */
  buildTransactionObject(transaction) {
    const tx = {
      actions: this.actions,
      blockHash: (0, import_utils.baseDecode)(transaction?.blockHash || this.blockHash),
      nonce: transaction?.nonce || this.nonce,
      publicKey: transaction?.publicKey || this.publicKey,
      receiverId: transaction?.receiver || this.receiver,
      signerId: transaction?.sender || this.sender
    };
    if (!tx.actions.length || !tx.blockHash || !tx.nonce || !tx.publicKey || !tx.receiverId || !tx.signerId) {
      throw new Error(`invalid transaction: ${JSON.stringify(tx)}`);
    }
    return tx;
  }
  /**
   * Return a Transaction instance from the composed transaction
   * @param transaction transaction configuration to override values set at composer initialization
   */
  toTransaction(transaction) {
    return new import_transactions.Transaction(this.buildTransactionObject(transaction));
  }
  /**
   * Add an action to add a full access key
   * @param publicKey string representation of the public key on the new access key
   */
  addFullAccessKey(publicKey) {
    this.actions.push(import_transactions.actionCreators.addKey(import_crypto.PublicKey.from(publicKey), import_transactions.actionCreators.fullAccessKey()));
    return this;
  }
  /**
   * Add an action to create a function call access key
   * @param publicKey string representation of the public key on the new access key
   * @param contractId permitted contract
   * @param methodNames set of permitted methods
   * @param allowance max allowable balance attached to transactions signed with this key
   */
  addFunctionCallAccessKey(publicKey, contractId, methodNames, allowance) {
    const accessKey = import_transactions.actionCreators.functionCallAccessKey(contractId, methodNames, allowance);
    this.actions.push(import_transactions.actionCreators.addKey(import_crypto.PublicKey.from(publicKey), accessKey));
    return this;
  }
  /**
   * Add an action to create a sub-account for the transaction recipient
   */
  createAccount() {
    this.actions.push(import_transactions.actionCreators.createAccount());
    return this;
  }
  /**
   * Add an action to delete the account signing the composed transaction
   * @param beneficiaryId designated recipient account for any remaining balance on the deleted account
   */
  deleteAccount(beneficiaryId) {
    this.actions.push(import_transactions.actionCreators.deleteAccount(beneficiaryId));
    return this;
  }
  /**
   * Add an action to delete the specified access key
   * @param publicKey string representation of the public key on the access key to be deleted
   */
  deleteKey(publicKey) {
    this.actions.push(import_transactions.actionCreators.deleteKey(import_crypto.PublicKey.from(publicKey)));
    return this;
  }
  /**
   * Add an action to deploy code to a contract
   * @param code compiled smart contract binary
   */
  deployContract(code) {
    this.actions.push(import_transactions.actionCreators.deployContract(code));
    return this;
  }
  /**
   * Add an action to invoke a smart contract method
   * @param method name of the method to be executed
   * @param args named arguments to the invocation
   * @param gas amount of gas (in yN) included to cover execution cost
   * @param deposit amount of Near (in yN) to attach to the invocation
   */
  functionCall(method, args, gas = import_utils.DEFAULT_FUNCTION_CALL_GAS * BigInt(10), deposit = BigInt(0)) {
    this.actions.push(import_transactions.actionCreators.functionCall(method, args, gas, deposit));
    return this;
  }
  /**
   * Add an action wrapping a delegate action for inclusion in meta transaction
   * @param delegateAction delegate action encapsulating the set of actions to be executed on the requesting account's behalf
   * @param signature signature of the delegate action signed by the requesting account
   */
  signedDelegate(delegateAction, signature) {
    this.actions.push(import_transactions.actionCreators.signedDelegate({ delegateAction, signature }));
    return this;
  }
  /**
   * Add an action to stake Near with a validator
   * @param stake amount of Near (in yN) to stake
   * @param publicKey string representation of the validator's key
   */
  stake(stake, publicKey) {
    this.actions.push(import_transactions.actionCreators.stake(stake, import_crypto.PublicKey.from(publicKey)));
    return this;
  }
  /**
   * Add an action to transfer Near to another account
   * @param deposit amount of Near (in yN) to transfer
   */
  transfer(deposit) {
    this.actions.push(import_transactions.actionCreators.transfer(deposit));
    return this;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TransactionComposer
});
