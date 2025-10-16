import * as _near_js_types from '@near-js/types';
import { F as FunctionCallParams, T as TransferParams, c as StakeParams, M as ModifyAccessKeyParams, A as AddFunctionCallAccessKeyParams, D as DeleteAccountParams, d as DeployContractParams } from '../index-BypKz79m.js';
import '../interfaces/dependencies.js';
import '@near-js/providers';
import '@near-js/signers';
import '@near-js/transactions';
import '../interfaces/view.js';
import '@near-js/crypto';

/**
 * Make a function call against a contract
 * @param sender transaction signer
 * @param receiver target account/contract
 * @param method method to be invoked
 * @param args method arguments
 * @param gas attached gas
 * @param deposit attached deposit in yN
 * @param blockReference block ID/finality
 * @param deps sign-and-send dependencies
 */
declare function functionCall({ sender, receiver, method, args, gas, deposit, blockReference, deps }: FunctionCallParams): Promise<{
    outcome: _near_js_types.FinalExecutionOutcome;
    result: _near_js_types.SerializedReturnValue;
}>;
/**
 * Send Near from one account to another
 * @param sender account sending Near
 * @param receiver account receiving Near
 * @param amount Near to send in yN
 * @param blockReference block ID/finality
 * @param deps sign-and-send dependencies
 */
declare function transfer({ sender, receiver, amount, blockReference, deps }: TransferParams): Promise<{
    outcome: _near_js_types.FinalExecutionOutcome;
    result: _near_js_types.SerializedReturnValue;
}>;
/**
 * Stake Near with the specified validator
 * @param account account staking Near
 * @param amount Near to stake in yN
 * @param publicKey public key for the target validator
 * @param blockReference block ID/finality
 * @param deps sign-and-send dependencies
 */
declare function stake({ account, amount, publicKey, blockReference, deps }: StakeParams): Promise<{
    outcome: _near_js_types.FinalExecutionOutcome;
    result: _near_js_types.SerializedReturnValue;
}>;
/**
 * Add a full access key to an account
 * @param account account to which the FAK is added
 * @param publicKey public key string for the new FAK
 * @param blockReference block ID/finality
 * @param deps sign-and-send dependencies
 */
declare function addFullAccessKey({ account, publicKey, blockReference, deps }: ModifyAccessKeyParams): Promise<{
    outcome: _near_js_types.FinalExecutionOutcome;
    result: _near_js_types.SerializedReturnValue;
}>;
/**
 * Add a function call access key to an account
 * @param account account to which the access key is added
 * @param publicKey public key string for the new access key
 * @param contract contract on which methods may be invoked
 * @param methodNames set of methods which may be invoked
 * @param allowance maximum amount of Near which can be attached to a transaction signed with this key
 * @param blockReference block ID/finality
 * @param deps sign-and-send dependencies
 */
declare function addFunctionCallAccessKey({ account, publicKey, contract, methodNames, allowance, blockReference, deps }: AddFunctionCallAccessKeyParams): Promise<{
    outcome: _near_js_types.FinalExecutionOutcome;
    result: _near_js_types.SerializedReturnValue;
}>;
/**
 * Remove the specified access key from an account
 * @param account account from which the access key will be removed
 * @param publicKey public key string of the access key to be removed
 * @param blockReference block ID/finality
 * @param deps sign-and-send dependencies
 */
declare function deleteAccessKey({ account, publicKey, blockReference, deps }: ModifyAccessKeyParams): Promise<{
    outcome: _near_js_types.FinalExecutionOutcome;
    result: _near_js_types.SerializedReturnValue;
}>;
/**
 * Delete an account; account funds will be transferred to the designated beneficiary
 * @param account account from which the access key will be removed
 * @param publicKey public key string of the access key to be removed
 * @param blockReference block ID/finality
 * @param deps sign-and-send dependencies
 */
declare function deleteAccount({ account, beneficiaryId, blockReference, deps }: DeleteAccountParams): Promise<{
    outcome: _near_js_types.FinalExecutionOutcome;
    result: _near_js_types.SerializedReturnValue;
}>;
/**
 * Deploy contract code to an account
 * @param account account to which the contract code will be deployed
 * @param code WASM code as byte array
 * @param blockReference block ID/finality
 * @param deps sign-and-send dependencies
 */
declare function deployContract({ account, code, blockReference, deps }: DeployContractParams): Promise<{
    outcome: _near_js_types.FinalExecutionOutcome;
    result: _near_js_types.SerializedReturnValue;
}>;

export { addFullAccessKey, addFunctionCallAccessKey, deleteAccessKey, deleteAccount, deployContract, functionCall, stake, transfer };
