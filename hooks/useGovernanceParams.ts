import useContracts from "./useContracts";
import { useQuery } from "@tanstack/react-query";
import useCurrentChain from "./useCurrentChain";
import config from "@/config";
import { formatEther } from "viem";

export function useGovernanceParams() {
  const chain = useCurrentChain();
  const { governorContract, timeLockContract } = useContracts();

  return useQuery({
    queryKey: ["governance-params", chain.id],
    queryFn: async () => {
      const [
        votingDelay,
        votingPeriod,
        proposalThreshold,
        quorumNumerator,
        timelockDelay,
      ] = await Promise.all([
        governorContract.read.votingDelay(),
        governorContract.read.votingPeriod(),
        governorContract.read.proposalThreshold(),
        governorContract.read.quorumNumerator(),
        timeLockContract.read.getMinDelay(),
      ]);

      const blockTimeSeconds = config.blockTimeSeconds[chain.id];
      const totalSupply = config.totalSupply[chain.id];

      return {
        votingDelay: Number(votingDelay) * blockTimeSeconds,
        votingPeriod: Number(votingPeriod) * blockTimeSeconds,
        votingDelayInBlocks: Number(votingDelay),
        votingPeriodInBlocks: Number(votingPeriod),
        proposalThreshold: +formatEther(proposalThreshold),
        quorumNumerator: Number(quorumNumerator),
        timelockDelay: Number(timelockDelay),
        blockTimeSeconds,
        totalSupply,
      };
    },
  });
}
