"use client";

import { useState } from "react";
import { useConnection } from "wagmi";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import type { TransactionExecutionError } from "viem";
import { ProposalState } from "@/lib/constents";
import type { Proposal } from "@/types";
import { useGovernance } from "@/hooks/useGovernance";
import { useProposalCreationEvent } from "@/hooks/useProposalCreationEvent";
import { Button } from "../common/Button";

interface ProposalCancelButtonProps {
  proposal: Proposal;
}

export function ProposalCancelButton({ proposal }: ProposalCancelButtonProps) {
  const { address } = useConnection();
  const { cancel } = useGovernance();
  const [confirming, setConfirming] = useState(false);

  const isProposer =
    !!address && address.toLowerCase() === proposal.author.id.toLowerCase();
  const isPending = proposal.state === ProposalState.Pending;
  const canCancel = isProposer && isPending;

  // Only fetch the on-chain event data once the person actually opens the
  // confirmation step — no need to hit the RPC for every proposal card.
  const onChainData = useProposalCreationEvent(
    proposal.tx as `0x${string}` | undefined,
    proposal.proposal_id,
    proposal.indexer,
  );

  const cancelMutation = useMutation({
    mutationFn: () => {
      if (!onChainData.data) {
        throw new Error("On-chain proposal data hasn't loaded yet.");
      }
      const { targets, values, calldatas, description } = onChainData.data;
      return cancel(targets, values, calldatas, description);
    },
    onSuccess: () => {
      toast.success("Proposal cancelled");
      setConfirming(false);
    },
    onError: (error: TransactionExecutionError) => {
      console.error("Error cancelling proposal:", error?.walk?.().message ?? error);
      toast.error(
        "Failed to cancel proposal. It may have already changed state.",
      );
    },
  });

  if (!canCancel) return null;

  if (!confirming) {
    return (
      <Button
        variant="outline"
        size="lg"
        onClick={() => setConfirming(true)}
      >
        Cancel Proposal
      </Button>
    );
  }

  return (
    <div className="rounded-xl border border-red-300 bg-red-50 p-4 space-y-3">
      <p className="text-sm text-red-800">
        This will permanently cancel proposal #{proposal.proposal_id}. This
        cannot be undone.
      </p>

      {onChainData.isLoading && (
        <p className="text-sm text-content-secondary">
          Loading original proposal data from chain...
        </p>
      )}

      {onChainData.isError && (
        <p className="text-sm text-red-600">
          Couldn&apos;t load the original proposal data needed to cancel this
          proposal. Please try again in a moment.
        </p>
      )}

      <div className="flex gap-2">
        <Button
          onClick={() => cancelMutation.mutate()}
          disabled={!onChainData.data || cancelMutation.isPending}
          size="sm"
        >
          {cancelMutation.isPending ? "Cancelling..." : "Yes, cancel it"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setConfirming(false)}
          disabled={cancelMutation.isPending}
        >
          Never mind
        </Button>
      </div>
    </div>
  );
}