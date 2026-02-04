import { useQuery } from "@tanstack/react-query";
import { type Abi } from "viem";
import useCurrentChain from "./useCurrentChain";

const API_ENDPOINT =
  process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3000";

/**
 * Fetch contract ABI from GraphQL.
 */
async function fetchAbiFromGraphql(
  chainId: number,
  address: `0x${string}`
): Promise<Abi> {
  const res = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query:
        "query Abi($chainId: Int!, $address: String!) { abi(chainId: $chainId, address: $address) { abi } }",
      variables: { chainId, address },
    }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(error.message || error.error || "Failed to fetch ABI");
  }

  const payload = (await res.json()) as {
    data?: { abi?: { abi?: Abi } };
    errors?: Array<{ message?: string }>;
  };

  if (payload.errors?.length) {
    throw new Error(payload.errors[0]?.message || "GraphQL error");
  }

  const abi = payload.data?.abi?.abi;
  if (!abi) {
    throw new Error("ABI not found");
  }

  return abi;
}

/**
 * Hook to fetch contract ABI from GraphQL.
 */
const useGetAbiContract = (address: `0x${string}` | undefined) => {
  const chain = useCurrentChain();
  const chainId = chain?.id ?? 0;

  return useQuery({
    queryKey: ["getAbiContract", chainId, address],
    queryFn: async (): Promise<Abi> => {
      if (!address) throw new Error("No contract address");
      return fetchAbiFromGraphql(chainId, address);
    },
    enabled: !!address && chainId > 0,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
};

export default useGetAbiContract;
