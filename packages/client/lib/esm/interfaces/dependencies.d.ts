import { Provider } from '@near-js/providers';
import { Signer } from '@near-js/signers';

interface Dependent<T> {
    deps: T;
}
interface RpcProviderDependent {
    rpcProvider: Provider;
}
interface SignerDependent {
    signer: Signer;
}
interface RpcProviderDependency extends Dependent<RpcProviderDependent> {
}
interface SignerDependency extends Dependent<SignerDependent> {
}
interface SignAndSendTransactionDependency extends Dependent<RpcProviderDependent & SignerDependent> {
}

export type { RpcProviderDependency, SignAndSendTransactionDependency, SignerDependency };
