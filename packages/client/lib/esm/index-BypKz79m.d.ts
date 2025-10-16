import { SignAndSendTransactionDependency, SignerDependency } from './interfaces/dependencies.js';
import { Action, Transaction, DelegateAction, Signature } from '@near-js/transactions';
import { BlockHash } from '@near-js/types';
import { RpcProviderQueryParams } from './interfaces/view.js';
import { PublicKey } from '@near-js/crypto';

declare class TransactionComposer {
    protected actions: Action[];
    receiver: string | undefined;
    sender: string | undefined;
    blockHash: BlockHash | undefined;
    nonce: bigint | undefined;
    publicKey: PublicKey | undefined;
    constructor(transaction: TransactionOptions);
    /**
     * Initialize the composer
     * @param transaction composer configuration
     */
    static init(transaction: TransactionOptions): TransactionComposer;
    /**
     * Validate and return the object used for Transaction instantiation
     * @param transaction transaction values to override composed transaction fields
     * @private
     */
    private buildTransactionObject;
    /**
     * Return a Transaction instance from the composed transaction
     * @param transaction transaction configuration to override values set at composer initialization
     */
    toTransaction(transaction?: TransactionOptions): Transaction;
    /**
     * Add an action to add a full access key
     * @param publicKey string representation of the public key on the new access key
     */
    addFullAccessKey(publicKey: string): this;
    /**
     * Add an action to create a function call access key
     * @param publicKey string representation of the public key on the new access key
     * @param contractId permitted contract
     * @param methodNames set of permitted methods
     * @param allowance max allowable balance attached to transactions signed with this key
     */
    addFunctionCallAccessKey(publicKey: string, contractId: string, methodNames: string[], allowance?: bigint): this;
    /**
     * Add an action to create a sub-account for the transaction recipient
     */
    createAccount(): this;
    /**
     * Add an action to delete the account signing the composed transaction
     * @param beneficiaryId designated recipient account for any remaining balance on the deleted account
     */
    deleteAccount(beneficiaryId: string): this;
    /**
     * Add an action to delete the specified access key
     * @param publicKey string representation of the public key on the access key to be deleted
     */
    deleteKey(publicKey: string): this;
    /**
     * Add an action to deploy code to a contract
     * @param code compiled smart contract binary
     */
    deployContract(code: Uint8Array): this;
    /**
     * Add an action to invoke a smart contract method
     * @param method name of the method to be executed
     * @param args named arguments to the invocation
     * @param gas amount of gas (in yN) included to cover execution cost
     * @param deposit amount of Near (in yN) to attach to the invocation
     */
    functionCall(method: string, args: object, gas?: bigint, deposit?: bigint): this;
    /**
     * Add an action wrapping a delegate action for inclusion in meta transaction
     * @param delegateAction delegate action encapsulating the set of actions to be executed on the requesting account's behalf
     * @param signature signature of the delegate action signed by the requesting account
     */
    signedDelegate(delegateAction: DelegateAction, signature: Signature): this;
    /**
     * Add an action to stake Near with a validator
     * @param stake amount of Near (in yN) to stake
     * @param publicKey string representation of the validator's key
     */
    stake(stake: bigint, publicKey: string): this;
    /**
     * Add an action to transfer Near to another account
     * @param deposit amount of Near (in yN) to transfer
     */
    transfer(deposit: bigint): this;
}

interface SignAndSendParams extends SignAndSendTransactionDependency, RpcProviderQueryParams {
}
interface ExternalActionTransaction extends SignAndSendParams {
    receiver: string;
    sender: string;
}
interface ReflexiveActionTransaction extends SignAndSendParams {
    account: string;
}
interface SignAndSendComposerParams extends SignAndSendParams, RpcProviderQueryParams {
    composer: TransactionComposer;
}
interface SignAndSendTransactionParams extends SignAndSendTransactionDependency {
    transaction: Transaction;
}
interface FunctionCallParams<T = object> extends ExternalActionTransaction {
    method: string;
    args?: T;
    deposit?: bigint;
    gas?: bigint;
}
interface TransferParams extends ExternalActionTransaction {
    amount: bigint;
}
interface StakeParams extends ReflexiveActionTransaction {
    amount: bigint;
    publicKey: string;
}
interface DeleteAccountParams extends ReflexiveActionTransaction {
    beneficiaryId: string;
}
interface DeployContractParams extends ReflexiveActionTransaction {
    code: Uint8Array;
}
interface AddAccessKeyParams extends ReflexiveActionTransaction {
    publicKey: string;
}
interface ModifyAccessKeyParams extends AddAccessKeyParams {
}
interface AddFunctionCallAccessKeyParams extends AddAccessKeyParams {
    contract: string;
    methodNames: string[];
    allowance?: bigint;
}
interface SignTransactionParams extends SignerDependency {
    transaction: Transaction;
}
interface NewAccountParams {
    newAccount: string;
    newPublicKey: string;
}
interface CreateAccountParams extends SignAndSendParams, NewAccountParams {
    account: string;
    initialBalance: bigint;
}
interface CreateTopLevelAccountParams extends CreateAccountParams {
    contract: string;
}
interface TransactionOptions {
    blockHash?: BlockHash;
    nonce?: bigint;
    publicKey?: PublicKey;
    receiver?: string;
    sender?: string;
}
interface MetaTransactionOptions extends TransactionOptions {
    blockHeightTtl?: bigint;
    maxBlockHeight?: bigint;
}
interface SignedTransactionOptions extends TransactionOptions, SignAndSendTransactionDependency {
}

export { type AddFunctionCallAccessKeyParams as A, type CreateAccountParams as C, type DeleteAccountParams as D, type ExternalActionTransaction as E, type FunctionCallParams as F, type ModifyAccessKeyParams as M, type NewAccountParams as N, type ReflexiveActionTransaction as R, type SignAndSendParams as S, type TransferParams as T, type SignAndSendComposerParams as a, type SignAndSendTransactionParams as b, type StakeParams as c, type DeployContractParams as d, type SignTransactionParams as e, type CreateTopLevelAccountParams as f, type TransactionOptions as g, type MetaTransactionOptions as h, type SignedTransactionOptions as i, TransactionComposer as j };
