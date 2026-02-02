import { useQuery } from "@tanstack/react-query";
import { type Abi, getAddress } from "viem";
import useCurrentChain from "./useCurrentChain";

// Etherscan v2 API supports multiple chains via chainid param (see https://docs.etherscan.io/supported-chains)
const ETHERSCAN_API_BASE = "https://api.etherscan.io/v2/api";

// Chain IDs that Etherscan API supports (subset; add more as needed)
const ETHERSCAN_SUPPORTED_CHAIN_IDS = new Set([
  1, 5, 11155111, 137, 42161, 10, 43114, 56, 8453, 324, 534352, 5000, 81457,
]);

async function fetchAbiFromEtherscan(
  chainId: number,
  address: `0x${string}`,
  apiKey?: string
): Promise<Abi> {
  const params = new URLSearchParams({
    chainid: String(chainId),
    module: "contract",
    action: "getabi",
    address,
  });
  if (apiKey) params.set("apikey", apiKey);

  const res = await fetch(`${ETHERSCAN_API_BASE}?${params.toString()}`);
  const data = (await res.json()) as {
    status: string;
    message?: string;
    result?: string;
  };

  if (data.status !== "1" || typeof data.result !== "string") {
    const msg = data.message ?? "Contract not verified or ABI not found";
    throw new Error(msg);
  }

  return JSON.parse(data.result) as Abi;
}

async function fetchAbiFromSourcify(
  chainId: number,
  address: `0x${string}`
): Promise<Abi> {
  const checksummed = getAddress(address);
  const base = "https://repo.sourcify.dev/contracts";

  for (const match of ["full_match", "partial_match"]) {
    const url = `${base}/${match}/${chainId}/${checksummed}/metadata.json`;
    const res = await fetch(url);
    if (!res.ok) continue;

    const metadata = (await res.json()) as {
      output?: { abi?: Abi };
      outputs?: { abi?: Abi }[];
    };

    const abi =
      metadata.output?.abi ??
      metadata.outputs?.[0]?.abi ??
      (Array.isArray(metadata)
        ? (metadata as { abi?: Abi }[])[0]?.abi
        : undefined);

    if (abi && Array.isArray(abi) && abi.length > 0) {
      return abi as Abi;
    }
  }

  throw new Error("Contract not found on Sourcify");
}

const useGetAbiContract = (address: `0x${string}` | undefined) => {
  const chain = useCurrentChain();
  const chainId = chain?.id ?? 0;
  const apiKey =
    typeof process !== "undefined"
      ? process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY
      : undefined;

  return useQuery({
    queryKey: ["getAbiContract", chainId, address],
    queryFn: async (): Promise<Abi> => {
      if (!address) throw new Error("No contract address");

      const tryEtherscan =
        ETHERSCAN_SUPPORTED_CHAIN_IDS.has(chainId) || !!apiKey;

      if (tryEtherscan) {
        try {
          return await fetchAbiFromEtherscan(chainId, address, apiKey);
        } catch (e) {
          // Fall through to Sourcify
        }
      }

      return fetchAbiFromSourcify(chainId, address);
    },
    enabled: !!address && chainId > 0,
  });
};

export default useGetAbiContract;
