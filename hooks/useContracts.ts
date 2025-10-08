import { useMemo } from "react";
import useCurrentChain from "./useCurrentChain";
import useWeb3Clients from "./useWeb3Clients";
import { getContract } from "viem";
import governorAbi from "@/contracts/abi/governorAbi";
import config from "@/config";
import presaleVotingPowerAbi from "@/contracts/abi/presaleVotingPowerAbi";
import timelockAbi from "@/contracts/abi/timelockAbi";

const useContracts = () => {
  const chain = useCurrentChain();
  const { publicClient, walletClient } = useWeb3Clients();

  const client = useMemo(
    () => ({
      public: publicClient,
      wallet: walletClient,
    }),
    [publicClient, walletClient]
  );

  const governorContract = useMemo(
    () =>
      getContract({
        address: config.governor[chain.id],
        abi: governorAbi,
        client,
      }),
    [chain.id, client]
  );

  const presaleVotingPowerContract = useMemo(
    () =>
      getContract({
        address: config.presaleVotingPower[chain.id],
        abi: presaleVotingPowerAbi,
        client,
      }),
    [chain.id, client]
  );

  const timeLockContract = useMemo(
    () =>
      getContract({
        address: config.timeLock[chain.id],
        abi: timelockAbi,
        client,
      }),
    [chain.id, client]
  );

  return {
    governorContract,
    presaleVotingPowerContract,
    timeLockContract,
  };
};

export default useContracts;
