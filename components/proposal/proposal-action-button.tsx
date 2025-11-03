import { ProposalState } from "@/lib/constents";
import $dayjs from "@/lib/dayjs";
import type { Proposal } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useContracts from "@/hooks/useContracts";
import { useAccount } from "wagmi";
import { useGovernance } from "@/hooks/useGovernance";
import { toast } from "sonner";
import { TransactionExecutionError } from "viem";
import { useAppKit } from "@reown/appkit/react";
import { useMemo } from "react";
import { Button } from "../common/Button";

interface ProposalActionButtonProps {
  proposal: Proposal;
  onVoteAction: () => void;
}

export function ProposalActionButton({
  proposal,
  onVoteAction,
}: ProposalActionButtonProps) {
  const { open } = useAppKit();
  const { governorContract } = useContracts();
  const { queue, execute } = useGovernance();
  const { address } = useAccount();
  const queryClient = useQueryClient();

  const hasVoted = useQuery({
    queryKey: ["hasVoted", proposal.proposal_id, address],
    queryFn: async () =>
      governorContract.read.hasVoted([BigInt(proposal.proposal_id), address!]),
    enabled: Boolean(address),
  });

  const queueProposalMutation = useMutation({
    mutationFn: () => {
      if (!proposal) throw new Error("Proposal not found");
      return queue(
        proposal.executions.map((e) => e.to),
        proposal.executions.map((e) => BigInt(e.value)),
        proposal.executions.map((e) => e.data),
        proposal.metadata?.body ?? ""
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposal", proposal.id] });
      toast.success("Proposal queued");
    },
    onError: (error: TransactionExecutionError) => {
      console.error("Error queuing proposal:", error?.walk().message);
      toast.error("Failed to queue proposal");
    },
  });

  const executeProposalMutation = useMutation({
    mutationFn: () => {
      if (!proposal) throw new Error("Proposal not found");
      return execute(
        proposal.executions.map((e) => e.to),
        proposal.executions.map((e) => BigInt(e.value)),
        proposal.executions.map((e) => e.data),
        proposal.metadata?.body ?? ""
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposal", proposal.id] });
      toast.success("Proposal executed");
    },
    onError: (error: TransactionExecutionError) => {
      console.error("Error executing proposal:", error?.walk().message);
      toast.error("Failed to execute proposal");
    },
  });

  const canExecute = useMemo(() => {
    if (!proposal.execution_time) return false;
    return $dayjs.unix(proposal.execution_time).isBefore($dayjs());
  }, [proposal.execution_time]);

  const title = useMemo(() => {
    if (proposal.state === ProposalState.Active)
      return hasVoted.data ? "Already Voted" : "Vote on chain";
    if (proposal.state === ProposalState.Succeeded) return "Queue Action";
    if (proposal.state === ProposalState.Queued)
      return canExecute
        ? "Execute Action"
        : `Execute Action (${$dayjs.unix(proposal.execution_time).fromNow()})`;
    if (proposal.state === ProposalState.Executed) return "Executed";
    return "";
  }, [proposal.state, hasVoted.data, canExecute, proposal.execution_time]);

  const disabled = useMemo(() => {
    if (!address) return false;
    if (proposal.state === ProposalState.Active) return hasVoted.data;
    if (proposal.state === ProposalState.Succeeded)
      return queueProposalMutation.isPending;
    if (proposal.state === ProposalState.Queued) {
      return !canExecute || executeProposalMutation.isPending;
    }
    if (proposal.state === ProposalState.Executed) return true;
    return false;
  }, [
    proposal.state,
    address,
    hasVoted.data,
    queueProposalMutation.isPending,
    executeProposalMutation.isPending,
    canExecute,
  ]);

  const submitAction = () => {
    if (!address) {
      open();
      return;
    }
    if (proposal.state === ProposalState.Active) {
      onVoteAction();
    } else if (proposal.state === ProposalState.Succeeded) {
      queueProposalMutation.mutate();
    } else if (proposal.state === ProposalState.Queued) {
      executeProposalMutation.mutate();
    }
  };

  const states: number[] = [
    ProposalState.Active,
    ProposalState.Succeeded,
    ProposalState.Queued,
    ProposalState.Executed,
  ];

  if (states.includes(proposal.state)) {
    return (
      <Button onClick={submitAction} disabled={disabled} size="lg">
        {title}
      </Button>
    );
  }

  return null;
}
