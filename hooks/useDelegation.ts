"use client";

import { useCallback, useState } from "react";
import {
  useConnection,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import useContracts from "./useContracts";
import useCurrentChain from "./useCurrentChain";
import config from "@/config";
import { formatUnits, zeroAddress } from "viem";
import voteTokenAbi from "@/contracts/abi/voteTokenAbi";

export type DelegationState = {
  currentDelegate: string | null;
  votingPower: bigint;
  votingPowerFormatted: string;
  tokenBalance: bigint;
  tokenBalanceFormatted: string;
};

const useDelegation = () => {
  const { address } = useConnection();
  const chain = useCurrentChain();
  const { voteTokenContract } = useContracts();
  const [pendingTxHash, setPendingTxHash] = useState<`0x${string}` | undefined>(
    undefined
  );

  const { writeContractAsync } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: pendingTxHash,
    });

  const { decimals, address: tokenAddress } = config.voteToken[chain.id];

  const delegate = useCallback(
    async (delegatee: `0x${string}`): Promise<`0x${string}` | null> => {
      if (!tokenAddress || !address) {
        throw new Error("Token contract or wallet not connected");
      }

      const hash = await writeContractAsync({
        address: tokenAddress,
        abi: voteTokenAbi,
        functionName: "delegate",
        args: [delegatee],
      });
      setPendingTxHash(hash);
      return hash;
    },
    [tokenAddress, address, writeContractAsync]
  );

  const delegateToSelf = useCallback(async (): Promise<
    `0x${string}` | null
  > => {
    if (!address) {
      throw new Error("Wallet not connected");
    }
    return delegate(address);
  }, [address, delegate]);

  const fetchDelegationState = useCallback(
    async (account: `0x${string}`): Promise<DelegationState> => {
      if (!voteTokenContract) {
        return {
          currentDelegate: null,
          votingPower: 0n,
          votingPowerFormatted: "0",
          tokenBalance: 0n,
          tokenBalanceFormatted: "0",
        };
      }

      const [delegateAddr, votingPower, tokenBalance] = await Promise.all([
        voteTokenContract.read.delegates([account]),
        voteTokenContract.read.getVotes([account]),
        voteTokenContract.read.balanceOf([account]),
      ]);

      return {
        currentDelegate: delegateAddr === zeroAddress ? null : delegateAddr,
        votingPower,
        votingPowerFormatted: formatUnits(votingPower, decimals),
        tokenBalance,
        tokenBalanceFormatted: formatUnits(tokenBalance, decimals),
      };
    },
    [voteTokenContract, decimals]
  );

  return {
    delegate,
    delegateToSelf,
    fetchDelegationState,
    isConfirming,
    isConfirmed,
    hasTokenContract: !!voteTokenContract,
  };
};

export default useDelegation;
