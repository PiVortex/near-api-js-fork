import * as _near_js_types from '@near-js/types';
import { f as CreateTopLevelAccountParams, C as CreateAccountParams } from '../index-BnsQ7zdL.cjs';
import '../interfaces/dependencies.cjs';
import '@near-js/providers';
import '@near-js/signers';
import '@near-js/transactions';
import '../interfaces/view.cjs';
import '@near-js/crypto';

/**
 * Create a new top-level account using an existing account
 *  (e.g. create `new.near` by signing with `creator.near`)
 * @param account name of the account creating and funding the account
 * @param contract root contract for the target network (e.g. `near`)
 * @param newAccount name of the created account
 * @param newPublicKey public key for the created account's initial full access key
 * @param initialBalance initial account balance in yN
 * @param blockReference block ID/finality
 * @param deps sign-and-send dependencies
 */
declare function createTopLevelAccount({ account, contract, newAccount, newPublicKey, initialBalance, blockReference, deps }: CreateTopLevelAccountParams): Promise<{
    outcome: _near_js_types.FinalExecutionOutcome;
    result: _near_js_types.SerializedReturnValue;
}>;
/**
 * Create a new sub-account under an existing account
 *  (e.g. create `sub.new.near` by signing with `new.near`)
 * @param account name of the existing account under which the new account is created
 * @param contract root contract for the target network (e.g. `testnet`)
 * @param newAccount name of the created account
 * @param newPublicKey public key for the created account's initial full access key
 * @param initialBalance initial account balance in yN
 * @param blockReference block ID/finality
 * @param deps sign-and-send dependencies
 */
declare function createSubAccount({ account, newAccount, newPublicKey, initialBalance, blockReference, deps }: CreateAccountParams): Promise<{
    outcome: _near_js_types.FinalExecutionOutcome;
    result: _near_js_types.SerializedReturnValue;
}>;

export { createSubAccount, createTopLevelAccount };
