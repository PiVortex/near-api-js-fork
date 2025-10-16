import { KeyPair, KeyPairString } from '@near-js/crypto';
import { KeyStore } from '@near-js/keystores';
import { Signer } from '@near-js/signers';

/**
 * Initialize a message signer from a KeyPair
 * @param keyPair used to sign transactions
 */
declare function getSignerFromKeyPair(keyPair: KeyPair): Signer;
/**
 * Initialize a message singer from a private key string
 * @param privateKey string representation of the private key used to sign transactions
 */
declare function getSignerFromPrivateKey(privateKey: KeyPairString): Signer;
/**
 * Initialize a message signer from a keystore instance
 * @param account used to sign transactions
 * @param network to sign transactions on
 * @param keyStore used to store the signing key
 */
declare function getSignerFromKeystore(account: string, network: string, keyStore: KeyStore): Promise<Signer>;

export { getSignerFromKeyPair, getSignerFromKeystore, getSignerFromPrivateKey };
