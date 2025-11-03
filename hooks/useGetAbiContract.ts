import { useQuery } from "@tanstack/react-query";
import useCurrentChain from "./useCurrentChain";

const useGetAbiContract = (address: `0x${string}`) => {
  const chain = useCurrentChain();

  return useQuery({
    queryKey: ["getAbiContract", address],
    queryFn: async () => {
      const response = await fetch(
        `${chain.blockExplorers?.default?.url}/api?module=contract&action=getabi&address=${address}`
      );
      const data = await response.json();
      if (data.status !== "1") {
        throw new Error("Failed to fetch ABI");
      }
      return JSON.parse(data.result);
    },
    enabled: !!address && !!chain.blockExplorers?.default?.url,
  });
};

export default useGetAbiContract;
