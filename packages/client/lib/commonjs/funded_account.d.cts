import { FinalExecutionOutcome } from '@near-js/types';
import { N as NewAccountParams } from './index-BnsQ7zdL.cjs';
import './interfaces/dependencies.cjs';
import '@near-js/providers';
import '@near-js/signers';
import '@near-js/transactions';
import './interfaces/view.cjs';
import '@near-js/crypto';

interface CreateFundedTestnetAccountParams extends NewAccountParams {
    endpointUrl?: string;
}
/**
 * Create a new funded testnet account via faucet REST endpoint
 *  (e.g. create `new.testnet` with a preset amount of Near)
 * @param endpointUrl REST endpoint for the funded testnet account creation (defaults to the current Near Contract Helper endpoint)
 * @param newAccount name of the created account
 * @param newPublicKey public key for the created account's initial full access key
 */
declare function createFundedTestnetAccount({ newAccount, newPublicKey, endpointUrl, }: CreateFundedTestnetAccountParams): Promise<FinalExecutionOutcome>;

export { createFundedTestnetAccount };
