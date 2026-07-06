import { usePublicClient } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { decodeEventLog } from "viem";
import { mainnet } from "viem/chains";
import governorAbi from "@/contracts/abi/governorAbi";
import { lcai } from "@/config/chains"; // adjust if your testnet/mainnet chain objects live elsewhere

export type OnChainProposalData = {
  targets: `0x${string}`[];
  values: bigint[];
  calldatas: `0x${string}`[];
  description: string;
};

function indexerToChainId(indexer: string): number {
  return indexer === "mainnet" ? mainnet.id : lcai.id;
}

/**
 * Reads the *exact* original targets/values/calldatas/description for a proposal
 * directly from its ProposalCreated event on-chain, instead of trusting a
 * reconstructed or indexer-parsed version.
 *
 * This matters because Governor.cancel() requires byte-for-byte matches of
 * targets/values/calldatas and a descriptionHash computed from the exact
 * original description string. Rebuilding that string from separately-stored
 * title/body fields is fragile — this reads it straight from the event log
 * instead, which is guaranteed accurate since it's literally what was
 * submitted on-chain.
 */
export function useProposalCreationEvent(
  txHash: `0x${string}` | undefined,
  proposalId: string | undefined,
  indexer: string | undefined,
) {
  const chainId = indexer ? indexerToChainId(indexer) : undefined;
  const publicClient = usePublicClient({ chainId });

  return useQuery({
    queryKey: ["proposalCreationEvent", txHash, proposalId, chainId],
    enabled: !!txHash && !!proposalId && !!publicClient,
    queryFn: async (): Promise<OnChainProposalData> => {
      const receipt = await publicClient!.getTransactionReceipt({
        hash: txHash!,
      });

      for (const log of receipt.logs) {
        try {
          const decoded = decodeEventLog({
            abi: governorAbi,
            data: log.data,
            topics: log.topics,
          });

          if (
            decoded.eventName === "ProposalCreated" &&
            (decoded.args as { proposalId: bigint }).proposalId.toString() ===
              proposalId
          ) {
            const args = decoded.args as {
              targets: readonly `0x${string}`[];
              values: readonly bigint[];
              calldatas: readonly `0x${string}`[];
              description: string;
            };

            return {
              targets: [...args.targets],
              values: [...args.values],
              calldatas: [...args.calldatas],
              description: args.description,
            };
          }
        } catch {
          // This log isn't a ProposalCreated event (could be a Transfer,
          // Approval, etc. from the same transaction) — skip and keep looking.
          continue;
        }
      }

      throw new Error(
        "Could not find a ProposalCreated event matching this proposal in its creation transaction.",
      );
    },
  });
}