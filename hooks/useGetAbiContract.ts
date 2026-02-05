import { useQuery } from "@tanstack/react-query";
import { type Abi } from "viem";
import useCurrentChain from "./useCurrentChain";

const API_ENDPOINT =
  process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3000";

/**
 * Fetch contract ABI from REST API.
 */
async function fetchAbiFromApi(
  chainId: number,
  address: `0x${string}`
): Promise<Abi> {
  const url = `${API_ENDPOINT}/api/abi/${chainId}/${encodeURIComponent(address)}`;
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
      return fetchAbiFromApi(chainId, address);
    },
    enabled: !!address && chainId > 0,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
};

export default useGetAbiContract;
