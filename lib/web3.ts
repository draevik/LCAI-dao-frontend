import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { mainnet, sepolia, arbitrum, polygon } from "@reown/appkit/networks";

// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!projectId) {
  throw new Error("Project ID is not defined");
}

// Create a metadata object - optional
const metadata = {
  name: "LCAI DAO",
  description: "LightchainAI Decentralized Governance",
  url: "https://lcai-dao.vercel.app", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

// Create Wagmi Adapter
export const wagmiAdapter = new WagmiAdapter({
  networks: [mainnet, sepolia, arbitrum, polygon],
  projectId,
  ssr: true,
});

// Create modal
export const modal = createAppKit({
  adapters: [wagmiAdapter],
  networks: [mainnet, sepolia, arbitrum, polygon],
  projectId,
  metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});

export const config = wagmiAdapter.wagmiConfig;
