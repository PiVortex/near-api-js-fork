import { KITWALLET_FUNDED_TESTNET_ACCOUNT_ENDPOINT } from "./constants.js";
async function createFundedTestnetAccount({
  newAccount,
  newPublicKey,
  endpointUrl = KITWALLET_FUNDED_TESTNET_ACCOUNT_ENDPOINT
}) {
  const res = await fetch(endpointUrl, {
    method: "POST",
    body: JSON.stringify({
      newAccountId: newAccount,
      newAccountPublicKey: newPublicKey
    }),
    headers: { "Content-Type": "application/json" }
  });
  const { ok, status } = res;
  if (!ok) {
    throw new Error(`Failed to create account on ${endpointUrl}: ${status}`);
  }
  return await res.json();
}
export {
  createFundedTestnetAccount
};
