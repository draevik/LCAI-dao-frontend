"use client";

import { useConnection } from "wagmi";
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
import timelockAbi from "@/contracts/abi/timelockAbi";

const API_ENDPOINT =
  process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3000";

const SIMULATE_URL = `${API_ENDPOINT}/api/simulate`;

// Friendly label shown in the pre-submit preview when a proposal has no
// real actions and falls back to the safe no-op placeholder.
const NO_OP_SIGNATURE_LABEL = "Signal proposal — no on-chain action";

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
  const { address } = useConnection();
  const { governorContract, timeLockContract } = useContracts();
  const { publicClient, walletClient } = useWeb3Clients();

  /**
   * Builds a single safe no-op action for signal-only proposals:
   * calls the Timelock's updateDelay with its own current getMinDelay()
   * value, so nothing actually changes if/when it executes.
   *
   * Note: this reads the delay at submission time. If the delay changes
   * via another proposal before this one executes, executing this
   * proposal will reset it back to the value read here — not a true
   * no-op in that edge case, just a low-risk placeholder action.
   */
  const buildNoOpAction = async () => {
    const timelockAddress = config.timeLock[chain.id];
    if (!timelockAddress) {
      throw new Error("Timelock address not configured for this chain");
    }

    const currentDelay = await timeLockContract.read.getMinDelay();
    const calldata = encodeFunctionData({
      abi: timelockAbi,
      functionName: "updateDelay",
      args: [currentDelay],
    });

    return { target: timelockAddress, value: 0n, calldata };
  };

  /**
   * Simulate actions via Tenderly (REST API).
   * Returns simulation results for display.
   */
  const simulateActions = async (
    contractActions: ContractAction[]
  ): Promise<SimulationAction[]> => {
    const timelockAddress = config.timeLock[chain.id];
    if (!timelockAddress) {
      throw new Error("Timelock address not configured for this chain");
    }

    let actions: { to: string; calldata: string; value: string }[];
    let decodedExecutions: { signature: string | null }[];

    if (contractActions.length === 0) {
      const noOp = await buildNoOpAction();
      actions = [
        { to: noOp.target, calldata: noOp.calldata, value: "0" },
      ];
      decodedExecutions = [{ signature: NO_OP_SIGNATURE_LABEL }];
    } else {
      actions = contractActions.map((action) => ({
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

      decodedExecutions = contractActions.map((action) => {
        const signature = getFunctionSignature(action.abi, action.method);
        return {
          signature,
        };
      });
    }

    const res = await fetch(SIMULATE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chainId: chain.id,
        timelockAddress,
        actions,
        decodedExecutions,
      }),
    });

    if (!res.ok) {
      const body = await res
        .json()
        .catch(() => ({ error: "Simulation failed" }));
      throw new Error(body.error || "Failed to simulate actions");
    }

    const payload = (await res.json()) as { results?: SimulationAction[] };
    const results = payload.results;
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

    let targets: `0x${string}`[];
    let values: bigint[];
    let calldatas: `0x${string}`[];

    if (contractActions.length === 0) {
      // Governor.propose() reverts with GovernorInvalidProposalLength on
      // empty arrays, so signal-only proposals need a placeholder action.
      const noOp = await buildNoOpAction();
      targets = [noOp.target as `0x${string}`];
      values = [noOp.value];
      calldatas = [noOp.calldata as `0x${string}`];
    } else {
      targets = contractActions.map((action) => action.target);
      values = contractActions.map((action) =>
        action.value ? parseEther(action.value) : 0n
      );
      calldatas = contractActions.map((action) =>
        encodeFunctionData({
          abi: action.abi || [],
          functionName: action.method,
          args: Object.values(action.args || {}),
        })
      );
    }

    const { request } = await governorContract.simulate.propose(
      [targets, values, calldatas, description],
      { account: address }
    );

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