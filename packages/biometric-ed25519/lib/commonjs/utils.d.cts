import { PublicKey } from '@near-js/crypto';

declare const preformatMakeCredReq: (makeCredReq: any) => any;
declare const get64BytePublicKeyFromPEM: (publicKey: PublicKey) => ArrayBuffer;
declare const validateUsername: (name: string) => string;
declare const preformatGetAssertReq: (getAssert: any) => any;
declare const publicKeyCredentialToJSON: (pubKeyCred: any) => any;
declare const recoverPublicKey: (r: any, s: any, message: any, recovery: any) => Promise<Uint8Array[]>;
declare const uint8ArrayToBigInt: (uint8Array: Uint8Array) => bigint;
declare const sanitizeCreateKeyResponse: (res: Credential) => Credential | {
    rawId: any;
    response: {
        clientDataJSON: any;
        attestationObject: any;
    };
    authenticatorAttachment: string;
    getClientExtensionResults(): AuthenticationExtensionsClientOutputs;
    id: string;
    type: string;
};
declare const sanitizeGetKeyResponse: (res: Credential) => Credential | {
    rawId: any;
    response: {
        authenticatorData: any;
        clientDataJSON: any;
        signature: any;
        userHandle: any;
    };
    authenticatorAttachment: string;
    getClientExtensionResults(): AuthenticationExtensionsClientOutputs;
    id: string;
    type: string;
};

export { get64BytePublicKeyFromPEM, preformatGetAssertReq, preformatMakeCredReq, publicKeyCredentialToJSON, recoverPublicKey, sanitizeCreateKeyResponse, sanitizeGetKeyResponse, uint8ArrayToBigInt, validateUsername };
