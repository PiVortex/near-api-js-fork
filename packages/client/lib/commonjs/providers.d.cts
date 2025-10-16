import { Provider } from '@near-js/providers';

/**
 * Get the set of public endpoints for the provided network
 * @param network target blockchain network (e.g. `mainnet`)
 */
declare function getEndpointsByNetwork(network: string): string[];
/**
 * Initialize a failover RPC provider capable of retrying requests against a set of endpoints
 * @param urls RPC endpoint URLs
 */
declare function createRpcClientWrapper(urls: string[]): Provider;
/**
 * Initialize a failover RPC provider for the given network
 * @param network target blockchain network (e.g. `mainnet`)
 */
declare function getProviderByNetwork(network: string): Provider;
/**
 * Initialize a failover RPC provider for a set of RPC endpoint URLs
 * @param urls RPC endpoint URLs
 */
declare function getProviderByEndpoints(...urls: string[]): Provider;
/**
 * Initialize a testnet RPC provider
 */
declare function getTestnetRpcProvider(): Provider;
/**
 * Initialize a testnet archival RPC provider
 */
declare function getTestnetRpcArchivalProvider(): Provider;
/**
 * Initialize a mainnet RPC provider
 */
declare function getMainnetRpcProvider(): Provider;

export { createRpcClientWrapper, getEndpointsByNetwork, getMainnetRpcProvider, getProviderByEndpoints, getProviderByNetwork, getTestnetRpcArchivalProvider, getTestnetRpcProvider };
