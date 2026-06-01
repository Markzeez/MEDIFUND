import { createThirdwebClient } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { getContract } from "thirdweb";

export const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "your-client-id-here",
});

export const chain = defineChain(11155111); // Sepolia testnet

export const FUND_CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ||
  "0x0000000000000000000000000000000000000000";

export const fundContract = getContract({
  client,
  chain,
  address: FUND_CONTRACT_ADDRESS,
});
