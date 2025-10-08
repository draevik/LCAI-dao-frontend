import { Chain, localhost } from "viem/chains";

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
// lcai counter 0xe7c2074eD35ed9F3e3eCe9E159B513260f571d4F

const config = {
  chains: [lcaiTestnet] as [Chain, ...Chain[]],

  daoSystem: {
    proposalThreshold: 0, // 0 LCAI
    quorumNeeded: 4, // 4 percent
    proposalDelay: 60 * 60, // 1 hour
    votingPeriod: 60 * 60 * 24 * 2, // 2 days
    timelockDelay: 60 * 60 * 24 * 2, // 2 days
  },

  timeLock: {
    [hardhat.id]: `0x5fbdb2315678afecb367f032d93f642f64180aa3`,
    [lcaiTestnet.id]: `0x2925fcaaAcC7b2c41BDc68383899f78Cd26b3B21`,
  } as Record<number, `0x${string}`>,

  governor: {
    [hardhat.id]: `0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0`,
    [lcaiTestnet.id]: `0xD61EEAD276De743393de11bBc9997Aa7Cc95ca31`,
  } as Record<number, `0x${string}`>,

  presaleVotingPower: {
    [hardhat.id]: `0xe7f1725e7734ce288f8367e1bb143e90bb3f0512`,
    [lcaiTestnet.id]: `0xaea6e8C8149b9aA996e3151C5aaB6855F6Fa8Daa`,
  } as Record<number, `0x${string}`>,
};

export default config;
