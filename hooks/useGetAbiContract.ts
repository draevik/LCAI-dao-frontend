import { useQuery } from "@tanstack/react-query";
import { type Abi } from "viem";
import useCurrentChain from "./useCurrentChain";
import config from "@/config";
import governorAbi from "@/contracts/abi/governorAbi";
import aiConfigAbi from "@/contracts/abi/aiConfigAbi";
import treasuryAbi from "@/contracts/abi/treasuryAbi";

const API_ENDPOINT =
  process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3000";

/**
 * Fetch contract ABI from REST API.
 */
async function fetchAbiFromApi(
  chainId: number,
  address: `0x${string}`
): Promise<Abi> {
  const url = `${API_ENDPOINT}/api/abi/${chainId}/${encodeURIComponent(
    address
  )}`;
  const res = await fetch(url);

  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(body.error || "Failed to fetch ABI");
  }

  const payload = (await res.json()) as { abi?: Abi };
  const abi = payload.abi;
  if (!abi) {
    throw new Error("ABI not found");
  }

  return abi;
}

/**
 * Hook to fetch contract ABI from the API.
 */
const useGetAbiContract = (address: `0x${string}` | undefined) => {
  const chain = useCurrentChain();
  const chainId = chain?.id ?? 0;

  return useQuery({
    queryKey: ["getAbiContract", chainId, address],
    queryFn: async (): Promise<Abi> => {
      if (!address) throw new Error("No contract address");
      if (address === config.aiConfig[chainId]) return aiConfigAbi;
      if (address === config.governor[chainId]) return governorAbi;
      if (address === config.treasury[chainId]) return treasuryAbi;
      return fetchAbiFromApi(chainId, address);
    },
    enabled: !!address && chainId > 0,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
};

export default useGetAbiContract;
