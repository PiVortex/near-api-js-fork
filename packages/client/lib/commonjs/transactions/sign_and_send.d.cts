import * as _near_js_types from '@near-js/types';
import { BlockReference } from '@near-js/types';
import * as _near_js_transactions from '@near-js/transactions';
import { e as SignTransactionParams, b as SignAndSendTransactionParams } from '../index-BnsQ7zdL.cjs';
import { SerializedReturnValue } from '@near-js/types/lib/esm/provider/response';
import '../interfaces/dependencies.cjs';
import '@near-js/providers';
import '@near-js/signers';
import '../interfaces/view.cjs';
import '@near-js/crypto';

/**
 * Sign a transaction, returning the signed transaction and encoded hash
 * @param transaction Transaction instance
 * @param signer MessageSigner
 */
declare function signTransaction({ transaction, deps: { signer } }: SignTransactionParams): Promise<{
    encodedTransactionHash: Uint8Array;
    signedTransaction: _near_js_transactions.SignedTransaction;
}>;
/**
 * Sign a transaction and publish to RPC
 * @param transaction Transaction instance to sign and publish
 * @param deps sign-and-send dependencies
 */
declare function signAndSendTransaction<T extends SerializedReturnValue>({ transaction, deps: { rpcProvider, signer } }: SignAndSendTransactionParams): Promise<{
    outcome: _near_js_types.FinalExecutionOutcome;
    result: T;
}>;
/**
 * Get the current nonce for an access key given an account and MessageSigner instance
 * @param account owner of the access key
 * @param blockReference block ID/finality
 * @param rpcProvider RPC provider instance
 * @param deps sign-and-send dependencies
 */
declare function getSignerNonce({ account, blockReference, deps: { rpcProvider, signer } }: {
    account: any;
    blockReference?: BlockReference;
    deps: {
        rpcProvider: any;
        signer: any;
    };
}): Promise<bigint>;

export { getSignerNonce, signAndSendTransaction, signTransaction };
