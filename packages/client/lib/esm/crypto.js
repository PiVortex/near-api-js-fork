import { KeyPair } from "@near-js/crypto";
function generateRandomKeyPair(curve) {
  return KeyPair.fromRandom(curve);
}
function parseKeyPair(privateKey) {
  return KeyPair.fromString(privateKey);
}
export {
  generateRandomKeyPair,
  parseKeyPair
};
