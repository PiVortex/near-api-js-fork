import { SignedTransactionComposer } from "./composers/index.js";
function functionCall({ sender, receiver, method, args, gas, deposit, blockReference, deps }) {
  return SignedTransactionComposer.init({ sender, receiver, deps }).functionCall(method, args, gas, deposit).signAndSend(blockReference);
}
function transfer({ sender, receiver, amount, blockReference, deps }) {
  return SignedTransactionComposer.init({ sender, receiver, deps }).transfer(amount).signAndSend(blockReference);
}
function stake({ account, amount, publicKey, blockReference, deps }) {
  return SignedTransactionComposer.init({ sender: account, receiver: account, deps }).stake(amount, publicKey).signAndSend(blockReference);
}
function addFullAccessKey({ account, publicKey, blockReference, deps }) {
  return SignedTransactionComposer.init({ sender: account, receiver: account, deps }).addFullAccessKey(publicKey).signAndSend(blockReference);
}
function addFunctionCallAccessKey({ account, publicKey, contract, methodNames, allowance, blockReference, deps }) {
  return SignedTransactionComposer.init({ sender: account, receiver: account, deps }).addFunctionCallAccessKey(publicKey, contract, methodNames, allowance).signAndSend(blockReference);
}
function deleteAccessKey({ account, publicKey, blockReference, deps }) {
  return SignedTransactionComposer.init({ sender: account, receiver: account, deps }).deleteKey(publicKey).signAndSend(blockReference);
}
function deleteAccount({ account, beneficiaryId, blockReference, deps }) {
  return SignedTransactionComposer.init({ sender: account, receiver: account, deps }).deleteAccount(beneficiaryId).signAndSend(blockReference);
}
function deployContract({ account, code, blockReference, deps }) {
  return SignedTransactionComposer.init({ sender: account, receiver: account, deps }).deployContract(code).signAndSend(blockReference);
}
export {
  addFullAccessKey,
  addFunctionCallAccessKey,
  deleteAccessKey,
  deleteAccount,
  deployContract,
  functionCall,
  stake,
  transfer
};
