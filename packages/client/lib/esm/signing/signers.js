import { KeyPairSigner } from "@near-js/signers";
function getSignerFromKeyPair(keyPair) {
  return new KeyPairSigner(keyPair);
}
function getSignerFromPrivateKey(privateKey) {
  return KeyPairSigner.fromSecretKey(privateKey);
}
async function getSignerFromKeystore(account, network, keyStore) {
  const keyPair = await keyStore.getKey(network, account);
  return new KeyPairSigner(keyPair);
}
export {
  getSignerFromKeyPair,
  getSignerFromKeystore,
  getSignerFromPrivateKey
};
