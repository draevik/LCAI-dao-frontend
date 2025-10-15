"use client";

import { useAccount } from "wagmi";
import {
  decodeEventLog,
  encodeFunctionData,
  encodePacked,
  keccak256,
  parseEther,
  SimulateContractReturnType,
} from "viem";
import useContracts from "./useContracts";
import useWeb3Clients from "./useWeb3Clients";
import { ContractAction } from "@/types";
import useCurrentChain from "./useCurrentChain";
import config from "@/config";

export function useGovernance() {
  const chain = useCurrentChain();
  const { address } = useAccount();
  const { governorContract } = useContracts();
  const { publicClient, walletClient } = useWeb3Clients();

  const simulateActions = async (contractActions: ContractAction[]) => {
    return Promise.all(
      contractActions.map((action) => {
        return publicClient.simulateContract({
          address: action.target,
          abi: action.abi || [],
          functionName: action.method || "",
          args: Object.values(action.args || {}),
          account: config.timeLock[chain.id],
        });
      })
    );
  };

  const createProposal = async (
    contractActions: ContractAction[],
    description: string
  ) => {
    if (!address || !walletClient) throw new Error("Wallet not connected");

    const targets = contractActions.map((action) => action.target);
    const values = contractActions.map((action) =>
      action.value ? parseEther(action.value) : 0n
    );
    const calldatas = contractActions.map((action) =>
      encodeFunctionData({
        abi: action.abi || [],
        functionName: action.method,
        args: Object.values(action.args || {}),
      })
    );

    const { request } = await governorContract.simulate.propose([
      targets,
      values,
      calldatas,
      description,
    ]);

    const hash = await walletClient.writeContract(request);

    const receipt = await publicClient.waitForTransactionReceipt({
      hash,
    });

    console.log("Receipt", receipt);

    const eventLog = decodeEventLog({
      abi: governorContract.abi,
      eventName: "ProposalCreated",
      topics: receipt.logs[0].topics,
      data: receipt.logs[0].data,
      strict: false,
    });

    console.log({ eventLog });

    return eventLog.args.proposalId;
  };

  const castVote = async (
    proposalId: string | number,
    support: number,
    reason?: string
  ) => {
    if (!address || !walletClient) throw new Error("Wallet not connected");

    let simulation:
      | SimulateContractReturnType<typeof governorContract.abi, "castVote">
      | SimulateContractReturnType<
          typeof governorContract.abi,
          "castVoteWithReason"
        >;

    if (reason) {
      simulation = await governorContract.simulate.castVoteWithReason(
        [BigInt(proposalId), support, reason],
        { account: address }
      );
    } else {
      simulation = await governorContract.simulate.castVote(
        [BigInt(proposalId), support],
        { account: address }
      );
    }

    const hash = await walletClient.writeContract(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      simulation.request as unknown as any
    );

    const receipt = await publicClient.waitForTransactionReceipt({
      hash,
    });

    console.log("Receipt", receipt);

    return receipt;
  };

  const cancel = async (
    targets: `0x${string}`[],
    values: bigint[],
    calldatas: `0x${string}`[],
    description: string
  ) => {
    if (!address || !walletClient) throw new Error("Wallet not connected");

    const descriptionHash = keccak256(encodePacked(["string"], [description]));

    const { request } = await governorContract.simulate.cancel([
      targets,
      values,
      calldatas,
      descriptionHash,
    ]);

    const hash = await walletClient.writeContract(request);

    const receipt = await publicClient.waitForTransactionReceipt({
      hash,
    });

    console.log("Receipt", receipt);

    return receipt;
  };

  const queue = async (
    targets: `0x${string}`[],
    values: bigint[],
    calldatas: `0x${string}`[],
    description: string
  ) => {
    if (!address || !walletClient) throw new Error("Wallet not connected");

    const descriptionHash = keccak256(encodePacked(["string"], [description]));

    const { request } = await governorContract.simulate.queue([
      targets,
      values,
      calldatas,
      descriptionHash,
    ]);

    const hash = await walletClient.writeContract(request);

    const receipt = await publicClient.waitForTransactionReceipt({
      hash,
    });

    console.log("Receipt", receipt);

    return receipt;
  };

  const execute = async (
    targets: `0x${string}`[],
    values: bigint[],
    calldatas: `0x${string}`[],
    description: string
  ) => {
    if (!address || !walletClient) throw new Error("Wallet not connected");

    const descriptionHash = keccak256(encodePacked(["string"], [description]));

    const { request } = await governorContract.simulate.execute([
      targets,
      values,
      calldatas,
      descriptionHash,
    ]);

    const hash = await walletClient.writeContract(request);

    const receipt = await publicClient.waitForTransactionReceipt({
      hash,
    });

    console.log("Receipt", receipt);

    return receipt;
  };

  return {
    createProposal,
    simulateActions,
    castVote,
    cancel,
    queue,
    execute,
  };
}
