import { Token } from "@/types";
import { Chain, localhost, mainnet } from "viem/chains";

const customMainnet: Chain = {
  ...mainnet,
  rpcUrls: {
    default: {
      http: ["https://mainnet.infura.io/v3/e4c15472e4824fefae8a9d5b265e8180"],
    },
  },
};

export const lcaiTestnet: Chain = {
  id: 504,
  name: "LCAI Testnet",
  nativeCurrency: {
    name: "LCAI Testnet",
    symbol: "LCAI",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://light-testnet-rpc.lightchain.ai"],
    },
  },
  blockExplorers: {
    default: {
      name: "LCAI Testnet Explorer",
      url: "https://testnet.lightscan.app",
    },
  },
};

const hardhat = {
  ...localhost,
  id: 31337,
};

// counter 0x610178da211fef7d417bc0e6fed39f05609ad788
// lcai counter 0x2CA89a0add8553752e37d2f455937ca739a1069C

const config = {
  chains: [customMainnet] as [Chain, ...Chain[]],

  daoSystem: {
    proposalThreshold: 140_000, // 0 LCAI
    quorumNeeded: 3, // 3 percent
    proposalDelay: 60 * 60 * 24, // 1 day
    votingPeriod: 60 * 60 * 24 * 7, // 7 days
    timelockDelay: 60 * 60 * 24 * 2, // 2 days
    totalSupply: 10_000_000_000,
  },

  predefinedContracts: {
    [hardhat.id]: [
      {
        name: "Counter (Example)",
        address: "0x2CA89a0add8553752e37d2f455937ca739a1069C",
      },
    ],
    [lcaiTestnet.id]: [
      {
        name: "Counter (Example)",
        address: "0x2CA89a0add8553752e37d2f455937ca739a1069C",
      },
    ],
  } as Record<number, { name: string; address: `0x${string}` }[]>,

  timeLock: {
    [customMainnet.id]: `0xbE1c37F8C4DA77dD06F4A8AC5098Ec70273093d7`,
    [hardhat.id]: `0x5fbdb2315678afecb367f032d93f642f64180aa3`,
    [lcaiTestnet.id]: `0x6FDA6BFfdf8f6ea638D1AdED3d5Bdf337dec7DAc`,
  } as Record<number, `0x${string}`>,

  governor: {
    [customMainnet.id]: `0x6dfa413B5900a1a7947BC75E68AbBA093cB2492d`,
    [hardhat.id]: `0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0`,
    [lcaiTestnet.id]: `0x58Fc79c5DeF257b0DD86ca59b48870E343946Fe5`,
  } as Record<number, `0x${string}`>,

  underlyingToken: {
    [customMainnet.id]: {
      address: "0x9ca8530ca349c966fe9ef903df17a75b8a778927",
      symbol: "LCAI",
      name: "LCAI",
      logoURI: "/images/brand/lcai.svg",
      decimals: 18,
    },
  } as Record<number, Token>,

  voteToken: {
    [customMainnet.id]: {
      name: "LCAIBallot",
      symbol: "LCAIB",
      decimals: 18,
      address: "0x75F3D01c4D960FE986A598B7954A3b786B29cE49",
    },
    [lcaiTestnet.id]: {
      name: "LCAIBallot",
      symbol: "LCAIB",
      decimals: 18,
      address: "0xF1c352E47C3c2498aA809e4d4E19295089aCF360",
    },
  } as Record<number, Token>,
};

export default config;
