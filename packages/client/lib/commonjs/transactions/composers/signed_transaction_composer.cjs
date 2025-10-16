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
var signed_transaction_composer_exports = {};
__export(signed_transaction_composer_exports, {
  SignedTransactionComposer: () => SignedTransactionComposer
});
module.exports = __toCommonJS(signed_transaction_composer_exports);
var import_utils = require("@near-js/utils");
var import_constants = require('../../constants.cjs');
var import_sign_and_send = require('../sign_and_send.cjs');
var import_transaction_composer = require('./transaction_composer.cjs');
var import_accounts = require("@near-js/accounts");
class SignedTransactionComposer extends import_transaction_composer.TransactionComposer {
  account;
  constructor({ deps, ...baseOptions }) {
    super(baseOptions);
    this.account = new import_accounts.Account(this.sender, deps.rpcProvider, deps.signer);
  }
  /**
   * Initialize the composer
   * @param options signed composer configuration
   */
  static init(options) {
    return new SignedTransactionComposer(options);
  }
  /**
   * Return a signed delegate action encapsulating the composed transaction for inclusion in a meta transaction
   * @param transaction meta transaction configuration
   */
  async toSignedDelegateAction(transaction) {
    let maxBlockHeight = transaction?.maxBlockHeight;
    if (!maxBlockHeight) {
      const { header } = await this.account.provider.viewBlock({ finality: "optimistic" });
      const ttl = transaction?.blockHeightTtl || import_constants.DEFAULT_META_TRANSACTION_BLOCK_HEIGHT_TTL;
      maxBlockHeight = BigInt(header.height) + ttl;
    }
    return this.account.signedDelegate({
      actions: this.actions,
      receiverId: transaction?.receiver || this.receiver,
      blockHeightTtl: Number(maxBlockHeight)
    });
  }
  /**
   * Verify the transaction's signer matches the account mapped to the AccessKeySigner.
   *  Initialize the signer if not already done (i.e. for lazy setting of the transaction signer).
   *  Throw an error if there is a mismatch between the current AccessKeySigner and the transaction's specified signer.
   * @param signingAccount
   * @private
   */
  verifySigner(signingAccount) {
    if (signingAccount !== this.account.accountId) {
      throw new Error(`Cannot sign transaction as ${signingAccount} with Account for ${this.account.accountId}`);
    }
  }
  /**
   * Return a signed transaction from the composed transaction
   * @param transactionOptions transaction configuration to override values set at composer initialization
   */
  async toSignedTransaction(transactionOptions) {
    const transaction = this.toTransaction(transactionOptions);
    this.verifySigner(transaction.signerId);
    return (0, import_sign_and_send.signTransaction)({
      transaction,
      deps: { signer: this.account.getSigner() }
    });
  }
  /**
   * Sign and send the composed transaction
   * @param blockReference block to use for determining hash
   */
  async signAndSend(blockReference = { finality: "optimistic" }) {
    this.verifySigner(this.sender);
    const { signedTransaction } = await this.toSignedTransaction({
      publicKey: this.publicKey || await this.account.getSigner().getPublicKey(),
      blockHash: this.blockHash || (await this.account.provider.viewBlock(blockReference))?.header?.hash
    });
    const outcome = await this.account.provider.sendTransaction(signedTransaction);
    return {
      outcome,
      result: (0, import_utils.getTransactionLastResult)(outcome)
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SignedTransactionComposer
});
