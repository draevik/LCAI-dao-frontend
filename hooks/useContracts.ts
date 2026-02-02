import { useMemo } from "react";
import useCurrentChain from "./useCurrentChain";
import useWeb3Clients from "./useWeb3Clients";
import { erc20Abi, getContract } from "viem";
import governorAbi from "@/contracts/abi/governorAbi";
import config from "@/config";
import timelockAbi from "@/contracts/abi/timelockAbi";
import voteTokenAbi from "@/contracts/abi/voteTokenAbi";

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

  const voteTokenContract = useMemo(
    () =>
      getContract({
        address: config.voteToken[chain.id].address,
        abi: voteTokenAbi,
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

  const underlyingTokenContract = useMemo(
    () =>
      getContract({
        address: config.underlyingToken[chain.id].address,
        abi: erc20Abi,
        client,
      }),
    [chain.id, client]
  );

  return {
    governorContract,
    voteTokenContract,
    timeLockContract,
    underlyingTokenContract,
  };
};

export default useContracts;
