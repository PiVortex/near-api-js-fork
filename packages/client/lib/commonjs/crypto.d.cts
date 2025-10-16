import { CurveType, KeyPair, KeyPairString } from '@near-js/crypto';

/**
 * Generate a random key pair for the specified elliptic curve
 * @param curve elliptic curve (e.g. `ed25519`)
 */
declare function generateRandomKeyPair(curve: CurveType): KeyPair;
/**
 * Parse a signing key pair from a private key string
 * @param privateKey private key string
 */
declare function parseKeyPair(privateKey: KeyPairString): KeyPair;

export { generateRandomKeyPair, parseKeyPair };
