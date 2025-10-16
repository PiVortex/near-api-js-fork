import { getTransactionLastResult } from "@near-js/utils";
import { getNonce } from "../view.js";
const DEFAULT_FINALITY = { finality: "optimistic" };
async function signTransaction({ transaction, deps: { signer } }) {
  const [txHash, signedTransaction] = await signer.signTransaction(transaction);
  return {
    encodedTransactionHash: txHash,
    signedTransaction
  };
}
async function signAndSendTransaction({ transaction, deps: { rpcProvider, signer } }) {
  const { signedTransaction } = await signTransaction({ transaction, deps: { signer } });
  const outcome = await rpcProvider.sendTransaction(signedTransaction);
  return {
    outcome,
    result: getTransactionLastResult(outcome)
  };
}
async function getSignerNonce({ account, blockReference = DEFAULT_FINALITY, deps: { rpcProvider, signer } }) {
  return getNonce({
    account,
    publicKey: (await signer.getPublicKey()).toString(),
    blockReference,
    deps: { rpcProvider }
  });
}
export {
  getSignerNonce,
  signAndSendTransaction,
  signTransaction
};
