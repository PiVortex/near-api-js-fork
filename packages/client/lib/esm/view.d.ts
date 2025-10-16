import { QueryResponseKind, CodeResult, SerializedReturnValue } from '@near-js/types';
import { RpcProviderDependency } from './interfaces/dependencies.js';
import { RpcProviderQueryParams, ViewParams, ViewAccessKeyParams, FullAccessKey, ViewAccountParams, AccountState, FunctionCallAccessKey, ViewContractStateParams, ViewValidatorStakeParams } from './interfaces/view.js';
import '@near-js/providers';
import '@near-js/signers';

declare enum RequestType {
    CallFunction = "call_function",
    ViewAccessKey = "view_access_key",
    ViewAccessKeyList = "view_access_key_list",
    ViewAccount = "view_account",
    ViewCode = "view_code",
    ViewState = "view_state"
}
interface QueryParams extends RpcProviderDependency, RpcProviderQueryParams {
    account: string;
    request: `${RequestType}`;
    args?: object;
}
/**
 * Make a readonly request to an RPC endpoint targeting a specific account/contract
 * @param account target account/contract being queried
 * @param request type of request (e.g. `call_function`)
 * @param args named arguments passed in the request body
 * @param blockReference block ID/finality
 * @param rpcProvider RPC provider instance
 */
declare function query<T extends QueryResponseKind>({ account, request, args, blockReference, deps: { rpcProvider }, }: QueryParams): Promise<T>;
/**
 * Call a view method on an account/contract, returning the raw response
 * @param account target account/contract being queried
 * @param method name of the method being invoked
 * @param args named arguments passed in the request body
 * @param blockReference block ID/finality
 * @param deps readonly RPC dependencies
 */
declare function callViewMethod({ account, method, args, blockReference, deps }: ViewParams): Promise<CodeResult>;
/**
 * Call a view method on an account/contract, parsing the returned data
 * NB if the data returned is a byte array, this method will convert it
 *  to string - use `await (viewRaw(...)).result` to get the buffer
 * @param account target account/contract being queried
 * @param method name of the method being invoked
 * @param args named arguments passed in the request body
 * @param blockReference block ID/finality
 * @param deps readonly RPC dependencies
 */
declare function view<T extends SerializedReturnValue | bigint>({ account, method, args, blockReference, deps }: ViewParams): Promise<T>;
/**
 * Get metadata for the specified access key
 * @param account target account/contract being queried
 * @param publicKey public key string to be queried
 * @param blockReference block ID/finality
 * @param deps readonly RPC dependencies
 */
declare function getAccessKey({ account, publicKey, blockReference, deps }: ViewAccessKeyParams): Promise<FullAccessKey>;
/**
 * Get account metadata (e.g. balance, storage)
 * @param account target account/contract being queried
 * @param blockReference block ID/finality
 * @param deps readonly RPC dependencies
 */
declare function getAccountState({ account, blockReference, deps }: ViewAccountParams): Promise<AccountState>;
/**
 * Get list of access keys for the specified account/contract
 * @param account target account/contract being queried
 * @param blockReference block ID/finality
 * @param deps readonly RPC dependencies
 */
declare function getAccessKeys({ account, blockReference, deps }: ViewAccountParams): Promise<{
    fullAccessKeys: FullAccessKey[];
    functionCallAccessKeys: FunctionCallAccessKey[];
}>;
/**
 * Get the code for the contract deployed to the target account
 * @param account target account/contract being queried
 * @param blockReference block ID/finality
 * @param deps readonly RPC dependencies
 */
declare function getContractCode({ account, blockReference, deps }: ViewAccountParams): Promise<{
    code: string;
    code_base64: string;
    hash: string;
}>;
/**
 * Get the state on the contract deployed to the target account in key-value pairs
 * @param account target account/contract being queried
 * @param prefix target prefix filter (empty string/buffer returns all keys)
 * @param blockReference block ID/finality
 * @param deps readonly RPC dependencies
 * @returns object key-value pairs
 */
declare function getContractState({ account, prefix, blockReference, deps }: ViewContractStateParams): Promise<{}>;
/**
 * Get the nonce for the specified access key
 * @param account target account/contract being queried
 * @param publicKey public key string to be queried
 * @param blockReference block ID/finality
 * @param deps readonly RPC dependencies
 */
declare function getNonce({ account, publicKey, blockReference, deps }: ViewAccessKeyParams): Promise<bigint>;
/**
 * Get the balance staked with a validator
 * @param account the account staking Near with the validator
 * @param validator contract with which Near is staked
 * @param blockReference block ID/finality
 * @param deps readonly RPC dependencies
 */
declare function getStakedBalance({ account, validator, blockReference, deps }: ViewValidatorStakeParams): Promise<{
    canWithdraw: boolean;
    stakedBalance: bigint;
    unstakedBalance: bigint;
}>;

export { callViewMethod, getAccessKey, getAccessKeys, getAccountState, getContractCode, getContractState, getNonce, getStakedBalance, query, view };
