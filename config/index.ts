import { Token } from "@/types";
import { Chain, mainnet } from "viem/chains";

const infuraApiKey = process.env.NEXT_PUBLIC_INFURA_API_KEY;
const customMainnet: Chain = {
  ...mainnet,
  rpcUrls: {
    default: {
      http: [`https://mainnet.infura.io/v3/${infuraApiKey}`],
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
  chains: [customMainnet] as [Chain, ...Chain[]],

  predefinedContracts: {
    [mainnet.id]: [
      {
        name: "Lightchain Treasury",
        address: "0x07A716a551E5f4CA7D6C71Da9dF1cb1429Dba826",
      },
    ],
  } as Record<number, { name: string; address: `0x${string}` }[]>,

  timeLock: {
    [mainnet.id]: `0xbE1c37F8C4DA77dD06F4A8AC5098Ec70273093d7`,
  } as Record<number, `0x${string}`>,

  governor: {
    [mainnet.id]: `0x6dfa413B5900a1a7947BC75E68AbBA093cB2492d`,
  } as Record<number, `0x${string}`>,

  underlyingToken: {
    [mainnet.id]: {
      address: "0x9ca8530ca349c966fe9ef903df17a75b8a778927",
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
