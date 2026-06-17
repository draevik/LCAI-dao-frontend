import { Chain, mainnet as viemMainnet } from "viem/chains";

const infuraApiKey = process.env.NEXT_PUBLIC_INFURA_API_KEY;

export const mainnet: Chain = {
  ...viemMainnet,
  rpcUrls: {
    default: {
      http: [`https://mainnet.infura.io/v3/${infuraApiKey}`],
      webSocket: [`wss://mainnet.infura.io/ws/v3/${infuraApiKey}`],
    },
  },
};

export const lcai: Chain = {
  id: 9200,
  name: "Lightchain AI",
  nativeCurrency: {
    name: "LightchainAI",
    symbol: "LCAI",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.mainnet.lightchain.ai"],
    },
  },
  blockExplorers: {
    default: {
      name: "Lightchain AI Explorer",
      url: "https://lightscan.app",
    },
  },
};

export const lcaiTestnet: Chain = {
  id: 8200,
  name: "Lightchain AI Testnet",
  nativeCurrency: {
    name: "LightchainAI",
    symbol: "LCAI",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.lightchain.ai"],
    },
  },
  blockExplorers: {
    default: {
      name: "LCAI Testnet Explorer",
      url: "https://Testnet.lightscan.app",
    },
  },
};
