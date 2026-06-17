import type { NextConfig } from "next";

const wagmiOptionalPeerStub = "./lib/wagmi/empty-module.js";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      accounts: wagmiOptionalPeerStub,
      "@coinbase/wallet-sdk": wagmiOptionalPeerStub,
      "@base-org/account": wagmiOptionalPeerStub,
      "@gemini-wallet/core": wagmiOptionalPeerStub,
      "@metamask/connect-evm": wagmiOptionalPeerStub,
      porto: wagmiOptionalPeerStub,
      "porto/internal": wagmiOptionalPeerStub,
      "@safe-global/safe-apps-sdk": wagmiOptionalPeerStub,
      "@safe-global/safe-apps-provider": wagmiOptionalPeerStub,
    },
  },
};

export default nextConfig;
