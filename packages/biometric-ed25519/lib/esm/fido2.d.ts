import * as fido2_lib from 'fido2-lib';
import { Fido2Lib } from 'fido2-lib';

declare class Fido2 {
    f2l: Fido2Lib;
    init({ rpId, rpName, timeout }: {
        rpId: any;
        rpName: any;
        timeout: any;
    }): Promise<void>;
    registration({ username, displayName, id }: {
        username: any;
        displayName: any;
        id: any;
    }): Promise<{
        user: {
            id: any;
            name: any;
            displayName: any;
        };
        status: string;
        challenge: string;
        rp: {
            name: string;
            id: string;
            icon?: string;
        };
        pubKeyCredParams: {
            type: "public-key";
            alg: number;
        }[];
        timeout?: number;
        attestation?: fido2_lib.Attestation;
        authenticatorSelection?: fido2_lib.AuthenticatorSelectionCriteria;
        rawChallenge?: ArrayBuffer;
        extensions?: any;
    }>;
    attestation({ clientAttestationResponse, origin, challenge }: {
        clientAttestationResponse: any;
        origin: any;
        challenge: any;
    }): Promise<fido2_lib.Fido2AttestationResult>;
    login(): Promise<{
        attestation: string;
        challenge: string;
        status: string;
        timeout?: number;
        rpId?: string;
        userVerification?: fido2_lib.UserVerification;
        rawChallenge?: ArrayBuffer;
        extensions?: any;
        allowCredentials?: fido2_lib.PublicKeyCredentialDescriptor[];
    }>;
    checkAlg(res: any, exp: any): Promise<any>;
}

export { Fido2 };
