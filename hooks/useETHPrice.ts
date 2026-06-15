import { useQuery } from "@tanstack/react-query";
import { formatUnits } from "viem";
import useWeb3Clients from "./useWeb3Clients";
import chainlinkAggregatorAbi from "@/contracts/abi/chainlinkAggregatorAbi";
import config from "@/config";
import { mainnet } from "@/config/chains";

export default function useETHPrice() {
  const { publicClient } = useWeb3Clients({ chain: mainnet });
  return useQuery({
    queryKey: ["ethPrice", mainnet.id],
    queryFn: async () => {
      const latestAnswer = await publicClient.readContract({
        address: config.chainlinkAggregator[mainnet.id],
        abi: chainlinkAggregatorAbi,
        functionName: "latestAnswer",
      });
      return +formatUnits(latestAnswer, 8);
    },
  });
}
