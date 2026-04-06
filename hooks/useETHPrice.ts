import { useQuery } from "@tanstack/react-query";
import useContracts from "./useContracts";
import useCurrentChain from "./useCurrentChain";
import { formatUnits } from "viem";

export default function useETHPrice() {
    const { chainlinkAggregatorContract } = useContracts();
    const chain = useCurrentChain();
    return useQuery({
        queryKey: ["ethPrice", chain.id],
        queryFn: async () => {
            const latestAnswer = await chainlinkAggregatorContract.read.latestAnswer();
            return +formatUnits(latestAnswer, 8);
        },
    });
}