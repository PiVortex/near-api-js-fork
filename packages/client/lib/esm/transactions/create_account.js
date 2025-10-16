import { SignedTransactionComposer } from "./composers/index.js";
import { functionCall } from "./actions.js";
async function createTopLevelAccount({ account, contract, newAccount, newPublicKey, initialBalance, blockReference, deps }) {
  return functionCall({
    sender: account,
    receiver: contract,
    method: "create_account",
    args: {
      new_account_id: newAccount,
      new_public_key: newPublicKey
    },
    deposit: initialBalance,
    blockReference,
    deps
  });
}
async function createSubAccount({ account, newAccount, newPublicKey, initialBalance, blockReference, deps }) {
  return SignedTransactionComposer.init({ sender: account, receiver: newAccount, deps }).createAccount().transfer(initialBalance).addFullAccessKey(newPublicKey).signAndSend(blockReference);
}
export {
  createSubAccount,
  createTopLevelAccount
};
