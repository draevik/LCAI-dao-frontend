import { Token } from "@/types";
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

export const lcaiDevnet: Chain = {
  id: 31337,
  name: "Lightchain AI Devnet",
  nativeCurrency: {
    name: "Lightchain AI Devnet",
    symbol: "LCAI",
    decimals: 18,
  },
  blockExplorers: {
    default: {
      name: "Lightchain AI Devnet Explorer",
      url: "http://localhost",
    },
  },
  rpcUrls: {
    default: {
      http: ["http://localhost:8545"],
      webSocket: ["ws://localhost:8546"],
    },
  },
};

// export const lcaiTestnet: Chain = {
//   id: 504,
//   name: "LCAI Testnet",
//   nativeCurrency: {
//     name: "LCAI Testnet",
//     symbol: "LCAI",
//     decimals: 18,
//   },
//   rpcUrls: {
//     default: {
//       http: ["https://light-testnet-rpc.lightchain.ai"],
//     },
//   },
//   blockExplorers: {
//     default: {
//       name: "LCAI Testnet Explorer",
//       url: "https://testnet.lightscan.app",
//     },
//   },
// };

const config = {
  chains: [lcaiDevnet] as [Chain, ...Chain[]],

  indexerName: {
    [mainnet.id]: "mainnet",
    [lcaiDevnet.id]: "lcaiDevnet",
  },

  blockTimeSeconds: {
    [mainnet.id]: 12,
    [lcaiDevnet.id]: 2,
  } as Record<number, number>,

  totalSupply: {
    [mainnet.id]: 10e9,
    [lcaiDevnet.id]: 95_000,
  } as Record<number, number>,

  predefinedContracts: {
    [mainnet.id]: [
      {
        name: "Lightchain Treasury",
        address: "0x07A716a551E5f4CA7D6C71Da9dF1cb1429Dba826",
      },
    ],
    [lcaiDevnet.id]: [
      {
        name: "Lightchain Governor",
        address: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
      },
    ],
  } as Record<number, { name: string; address: `0x${string}` }[]>,

  timeLock: {
    [mainnet.id]: `0xbE1c37F8C4DA77dD06F4A8AC5098Ec70273093d7`,
    [lcaiDevnet.id]: `0x5FbDB2315678afecb367f032d93F642f64180aa3`,
  } as Record<number, `0x${string}`>,

  governor: {
    [mainnet.id]: `0x6dfa413B5900a1a7947BC75E68AbBA093cB2492d`,
    [lcaiDevnet.id]: `0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0`,
  } as Record<number, `0x${string}`>,

  aiConfig: {
    [lcaiDevnet.id]: `0x8A791620dd6260079BF849Dc5567aDC3F2FdC318`,
  } as Record<number, `0x${string}`>,

  underlyingToken: {
    [mainnet.id]: {
      address: "0x9ca8530ca349c966fe9ef903df17a75b8a778927",
      symbol: "LCAI",
      name: "LCAI",
      logoURI: "/images/brand/lcai.svg",
      decimals: 18,
    },
    [lcaiDevnet.id]: {
      symbol: "LCAI",
      name: "LCAI",
      logoURI: "/images/brand/lcai.svg",
      decimals: 18,
    },
  } as Record<number, Token>,

  voteToken: {
    [mainnet.id]: {
      name: "LCAIBallot",
      symbol: "LCAIB",
      decimals: 18,
      address: "0x75F3D01c4D960FE986A598B7954A3b786B29cE49",
    },
    [lcaiDevnet.id]: {
      name: "LCAI",
      symbol: "LCAI",
      decimals: 18,
      address: `0x0000000000000000000000000000000000001001`,
    },
  } as Record<number, Token>,

  treasury: {
    [mainnet.id]: "0x07A716a551E5f4CA7D6C71Da9dF1cb1429Dba826",
  } as Record<number, `0x${string}`>,

  lcaiEthPair: {
    [mainnet.id]: "0x0D047a370611437a1B8e6c2a95eA36f69fdDa3Be",
  } as Record<number, `0x${string}`>,

  wETH: {
    [mainnet.id]: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  } as Record<number, `0x${string}`>,

  chainlinkAggregator: {
    [mainnet.id]: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
  } as Record<number, `0x${string}`>,
};

export default config;
