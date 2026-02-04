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
import { ContractAction, SimulationAction } from "@/types";
import useCurrentChain from "./useCurrentChain";
import config from "@/config";

const API_ENDPOINT =
  process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3000";

/**
 * Generate full function signature from ABI and method name.
 * e.g., "transferERC20(address,address,uint256)"
 */
function getFunctionSignature(
  abi: ContractAction["abi"],
  methodName: string | undefined
): string | null {
  if (!abi || !methodName) return null;

  const fn = abi.find((item) => item.name === methodName);
  if (!fn || !fn.inputs) return methodName;

  const types = fn.inputs.map((input) => input.type).join(",");
  return `${methodName}(${types})`;
}

export function useGovernance() {
  const chain = useCurrentChain();
  const { address } = useAccount();
  const { governorContract } = useContracts();
  const { publicClient, walletClient } = useWeb3Clients();

  /**
   * Simulate actions via Tenderly (GraphQL mutation).
   * Returns simulation results for display.
   */
  const simulateActions = async (
    contractActions: ContractAction[]
  ): Promise<SimulationAction[]> => {
    const timelockAddress = config.timeLock[chain.id];
    if (!timelockAddress) {
      throw new Error("Timelock address not configured for this chain");
    }

    const actions = contractActions.map((action) => ({
      to: action.target,
      calldata:
        action.abi && action.method
          ? encodeFunctionData({
              abi: action.abi,
              functionName: action.method,
              args: Object.values(action.args || {}),
            })
          : "0x",
      value: action.value || "0",
    }));

    const decodedExecutions = contractActions.map((action) => {
      const signature = getFunctionSignature(action.abi, action.method);
      return {
        signature,
      };
    });

    const res = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          mutation SimulateTenderly($input: SimulationInput!) {
            simulateTenderly(input: $input) {
              results {
                action_index
                target
                function_selector
                status
                tenderly_simulation_id
                tenderly_sandbox_url
                error_message
                simulated_at
              }
            }
          }
        `,
        variables: {
          input: {
            chainId: chain.id,
            timelockAddress,
            actions,
            decodedExecutions,
          },
        },
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to simulate actions");
    }

    const payload = (await res.json()) as {
      data?: { simulateTenderly?: { results?: SimulationAction[] } };
      errors?: Array<{ message?: string }>;
    };

    if (payload.errors?.length) {
      throw new Error(payload.errors[0]?.message || "Simulation failed");
    }

    const results = payload.data?.simulateTenderly?.results;
    if (!results) {
      throw new Error("No simulation results returned");
    }

    return results;
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

    const eventLog = decodeEventLog({
      abi: governorContract.abi,
      eventName: "ProposalCreated",
      topics: receipt.logs[0].topics,
      data: receipt.logs[0].data,
      strict: false,
    });

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

    return receipt;
  };

  // cancel, queue, and execute share an identical flow: hash the description,
  // simulate, write, and wait for the receipt. The only difference is the method name.
  const executeLifecycleAction = async (
    action: "cancel" | "queue" | "execute",
    targets: `0x${string}`[],
    values: bigint[],
    calldatas: `0x${string}`[],
    description: string
  ) => {
    if (!address || !walletClient) throw new Error("Wallet not connected");

    const descriptionHash = keccak256(encodePacked(["string"], [description]));

    const { request } = (await governorContract.simulate[action]([
      targets,
      values,
      calldatas,
      descriptionHash,
    ])) as SimulateContractReturnType<
      typeof governorContract.abi,
      typeof action
    >;

    const hash = await walletClient.writeContract(request);

    return publicClient.waitForTransactionReceipt({ hash });
  };

  const cancel = (
    targets: `0x${string}`[],
    values: bigint[],
    calldatas: `0x${string}`[],
    description: string
  ) =>
    executeLifecycleAction("cancel", targets, values, calldatas, description);

  const queue = (
    targets: `0x${string}`[],
    values: bigint[],
    calldatas: `0x${string}`[],
    description: string
  ) => executeLifecycleAction("queue", targets, values, calldatas, description);

  const execute = (
    targets: `0x${string}`[],
    values: bigint[],
    calldatas: `0x${string}`[],
    description: string
  ) =>
    executeLifecycleAction("execute", targets, values, calldatas, description);

  return {
    createProposal,
    simulateActions,
    castVote,
    cancel,
    queue,
    execute,
  };
}
