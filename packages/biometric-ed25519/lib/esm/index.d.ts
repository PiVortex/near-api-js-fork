import { KeyPair } from '@near-js/crypto';

declare class PasskeyProcessCanceled extends Error {
    constructor(message: any);
}
declare const createKey: (username: string) => Promise<KeyPair>;
declare const getKeys: (username: string) => Promise<[KeyPair, KeyPair]>;
declare const isPassKeyAvailable: () => Promise<boolean>;
declare const isDeviceSupported: () => Promise<boolean>;

export { PasskeyProcessCanceled, createKey, getKeys, isDeviceSupported, isPassKeyAvailable };
