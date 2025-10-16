import * as _near_js_types from '@near-js/types';
import { SerializedReturnValue, BlockReference } from '@near-js/types';
import * as _near_js_transactions from '@near-js/transactions';
import { j as TransactionComposer, i as SignedTransactionOptions, h as MetaTransactionOptions, g as TransactionOptions } from '../../index-BnsQ7zdL.cjs';
import { Account } from '@near-js/accounts';
import '../../interfaces/dependencies.cjs';
import '@near-js/providers';
import '@near-js/signers';
import '../../interfaces/view.cjs';
import '@near-js/crypto';

declare class SignedTransactionComposer extends TransactionComposer {
    account: Account;
    constructor({ deps, ...baseOptions }: SignedTransactionOptions);
    /**
     * Initialize the composer
     * @param options signed composer configuration
     */
    static init(options: SignedTransactionOptions): SignedTransactionComposer;
    /**
     * Return a signed delegate action encapsulating the composed transaction for inclusion in a meta transaction
     * @param transaction meta transaction configuration
     */
    toSignedDelegateAction(transaction?: MetaTransactionOptions): Promise<_near_js_transactions.SignedDelegate>;
    /**
     * Verify the transaction's signer matches the account mapped to the AccessKeySigner.
     *  Initialize the signer if not already done (i.e. for lazy setting of the transaction signer).
     *  Throw an error if there is a mismatch between the current AccessKeySigner and the transaction's specified signer.
     * @param signingAccount
     * @private
     */
    private verifySigner;
    /**
     * Return a signed transaction from the composed transaction
     * @param transactionOptions transaction configuration to override values set at composer initialization
     */
    toSignedTransaction(transactionOptions?: TransactionOptions): Promise<{
        encodedTransactionHash: Uint8Array;
        signedTransaction: _near_js_transactions.SignedTransaction;
    }>;
    /**
     * Sign and send the composed transaction
     * @param blockReference block to use for determining hash
     */
    signAndSend<T extends SerializedReturnValue>(blockReference?: BlockReference): Promise<{
        outcome: _near_js_types.FinalExecutionOutcome;
        result: T;
    }>;
}

export { SignedTransactionComposer };
