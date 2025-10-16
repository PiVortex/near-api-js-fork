import { BlockReference } from '@near-js/types';
import { RpcProviderDependency } from './dependencies.cjs';
import '@near-js/providers';
import '@near-js/signers';

interface RpcProviderQueryParams {
    blockReference?: BlockReference;
}
interface ViewBaseParams extends RpcProviderDependency, RpcProviderQueryParams {
}
interface ViewAccountParams extends ViewBaseParams {
    account: string;
}
interface ViewValidatorStakeParams extends ViewAccountParams {
    validator: string;
}
interface ViewParams<T = object> extends ViewAccountParams {
    method: string;
    args?: T;
}
interface ViewContractStateParams extends ViewAccountParams {
    prefix: string | Uint8Array;
}
interface ViewAccessKeyParams extends ViewAccountParams {
    publicKey: string;
}
interface AccessKey {
    nonce: bigint;
    publicKey: string;
}
interface FullAccessKey extends AccessKey {
}
interface FunctionCallAccessKey extends AccessKey {
    contract: string;
    methods: string[];
    allowance: bigint;
}
interface AccessKeys {
    fullAccessKeys: FullAccessKey[];
    functionCallAccessKeys: FunctionCallAccessKey[];
}
interface AccountState {
    availableBalance: bigint;
    codeHash: string;
    locked: bigint;
    storageUsed: bigint;
}

export type { AccessKeys, AccountState, FullAccessKey, FunctionCallAccessKey, RpcProviderQueryParams, ViewAccessKeyParams, ViewAccountParams, ViewBaseParams, ViewContractStateParams, ViewParams, ViewValidatorStakeParams };
