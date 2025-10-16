const DEFAULT_META_TRANSACTION_BLOCK_HEIGHT_TTL = 100n;
const MAX_GAS = 300000000000000n;
const PAGODA_RPC_ENDPOINTS_MAINNET = [
  "https://rpc.near.org",
  "https://rpc.mainnet.pagoda.co"
];
const PAGODA_RPC_ARCHIVAL_ENDPOINTS_MAINNET = [
  "https://archival-rpc.near.org"
];
const PAGODA_RPC_ENDPOINTS_TESTNET = [
  "https://rpc.testnet.near.org",
  "https://rpc.testnet.pagoda.co"
];
const PAGODA_RPC_ARCHIVAL_ENDPOINTS_TESTNET = [
  "https://archival-rpc.testnet.near.org"
];
const KITWALLET_FUNDED_TESTNET_ACCOUNT_ENDPOINT = "https://testnet-api.kitwallet.app/account";
export {
  DEFAULT_META_TRANSACTION_BLOCK_HEIGHT_TTL,
  KITWALLET_FUNDED_TESTNET_ACCOUNT_ENDPOINT,
  MAX_GAS,
  PAGODA_RPC_ARCHIVAL_ENDPOINTS_MAINNET,
  PAGODA_RPC_ARCHIVAL_ENDPOINTS_TESTNET,
  PAGODA_RPC_ENDPOINTS_MAINNET,
  PAGODA_RPC_ENDPOINTS_TESTNET
};
