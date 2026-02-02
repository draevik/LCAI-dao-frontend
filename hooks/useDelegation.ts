"use client";

import { useCallback, useState } from "react";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import useContracts from "./useContracts";
import useCurrentChain from "./useCurrentChain";
import config from "@/config";
import { formatUnits } from "viem";
import voteTokenAbi from "@/contracts/abi/voteTokenAbi";

export type DelegationState = {
  currentDelegate: string | null;
  votingPower: bigint;
  votingPowerFormatted: string;
  tokenBalance: bigint;
  tokenBalanceFormatted: string;
  isLoading: boolean;
  error: Error | null;
};

const useDelegation = () => {
  const { address } = useAccount();
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

  const tokenConfig = config.voteToken[chain.id];
  const decimals = tokenConfig.decimals;
  const tokenAddress = tokenConfig.address;

  const getCurrentDelegate = useCallback(
    async (account: `0x${string}`): Promise<string | null> => {
      if (!voteTokenContract) return null;
      try {
        const delegate = await voteTokenContract.read.delegates([account]);
        // Zero address means no delegate
        if (delegate === "0x0000000000000000000000000000000000000000") {
          return null;
        }
        return delegate;
      } catch (error) {
        console.error("Failed to get current delegate:", error);
        return null;
      }
    },
    [voteTokenContract]
  );

  const getVotingPower = useCallback(
    async (account: `0x${string}`): Promise<bigint> => {
      if (!voteTokenContract) return BigInt(0);
      try {
        return await voteTokenContract.read.getVotes([account]);
      } catch (error) {
        console.error("Failed to get voting power:", error);
        return BigInt(0);
      }
    },
    [voteTokenContract]
  );

  const getTokenBalance = useCallback(
    async (account: `0x${string}`): Promise<bigint> => {
      if (!voteTokenContract) return BigInt(0);
      try {
        return await voteTokenContract.read.balanceOf([account]);
      } catch (error) {
        console.error("Failed to get token balance:", error);
        return BigInt(0);
      }
    },
    [voteTokenContract]
  );

  const delegate = useCallback(
    async (delegatee: `0x${string}`): Promise<`0x${string}` | null> => {
      if (!tokenAddress || !address) {
        throw new Error("Token contract or wallet not connected");
      }

      try {
        const hash = await writeContractAsync({
          address: tokenAddress,
          abi: voteTokenAbi,
          functionName: "delegate",
          args: [delegatee],
        });
        setPendingTxHash(hash);
        return hash;
      } catch (error) {
        console.error("Failed to delegate:", error);
        throw error;
      }
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

  const formatVotingPower = useCallback(
    (power: bigint): string => {
      return formatUnits(power, decimals);
    },
    [decimals]
  );

  const fetchDelegationState = useCallback(
    async (account: `0x${string}`): Promise<DelegationState> => {
      const [currentDelegate, votingPower, tokenBalance] = await Promise.all([
        getCurrentDelegate(account),
        getVotingPower(account),
        getTokenBalance(account),
      ]);

      return {
        currentDelegate,
        votingPower,
        votingPowerFormatted: formatVotingPower(votingPower),
        tokenBalance,
        tokenBalanceFormatted: formatVotingPower(tokenBalance),
        isLoading: false,
        error: null,
      };
    },
    [getCurrentDelegate, getVotingPower, getTokenBalance, formatVotingPower]
  );

  return {
    delegate,
    delegateToSelf,
    getCurrentDelegate,
    getVotingPower,
    getTokenBalance,
    fetchDelegationState,
    formatVotingPower,
    isConfirming,
    isConfirmed,
    pendingTxHash,
    hasTokenContract: !!voteTokenContract,
  };
};

export default useDelegation;
