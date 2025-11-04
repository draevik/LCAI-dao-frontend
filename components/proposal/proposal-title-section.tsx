import { Badge } from "@/components/ui/badge";
import {
  UsersIcon,
  ClockIcon,
} from "lucide-react";
import { compactNumber } from "@/lib/utils";
import { toast } from "sonner";
import { useCopyToClipboard } from "usehooks-ts";
import ProposalStatusBadge from "./proposal-status-badge";
import $dayjs from "@/lib/dayjs";
import { ProposalState } from "@/lib/constents";
import type { Proposal } from "@/types";
import { useGovernance } from "@/hooks/useGovernance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { TransactionExecutionError } from "viem";
import { Button } from "../common/Button";
import { faCircleMinus, faClone } from "@fortawesome/pro-regular-svg-icons";

interface ProposalTitleSectionProps {
  proposal: Proposal;
}

export function ProposalTitleSection({ proposal }: ProposalTitleSectionProps) {
  const [, copy] = useCopyToClipboard();
  const { cancel } = useGovernance();
  const queryClient = useQueryClient();
  const { address } = useAccount();

  const cancelProposalMutation = useMutation({
    mutationFn: () => {
      if (!proposal) throw new Error("Proposal not found");
      return cancel(
        proposal.executions.map((e) => e.to),
        proposal.executions.map((e) => BigInt(e.value)),
        proposal.executions.map((e) => e.data),
        proposal.metadata?.body ?? ""
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["proposal", proposal.id],
      });
      toast.success("Proposal cancelled");
    },
    onError: (error: TransactionExecutionError) => {
      console.error("Error cancelling proposal:", error?.walk().message);
      toast.error("Failed to cancel proposal");
    },
  });
  return (
    <div className="space-y-4">
      <ProposalStatusBadge status={proposal.state} />
      <div className="flex flex-col sm:flex-row sm:items-start gap-x-5 gap-y-2 justify-between">
        <h1 className="page-title">{proposal.metadata?.title}</h1>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              copy(window.location.href);
              toast.success("URL copied to clipboard");
            }}
            variant="outline"
            leftIcon={faClone}
          >
            Copy URL
          </Button>
          {proposal.state === ProposalState.Pending &&
            proposal.author.id === address && (
              <Button
                leftIcon={faCircleMinus}
                onClick={() => cancelProposalMutation.mutate()}
              >
                Cancel Proposal
              </Button>
            )}
        </div>
      </div>

      <div className="flex items-center gap-x-4 gap-y-2 flex-wrap text-sm">
        <div className="flex items-center gap-1">
          <span>#{proposal.proposal_id.toString().slice(0, 6)}...</span>
          <span>by</span>
          <div className="flex items-center gap-1">
            <span className="font-medium">
              {proposal.author?.id.slice(0, 6)}...
              {proposal.author?.id.slice(-4)}
            </span>
            <Badge variant="outline" className="text-xs">
              author
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <UsersIcon className="h-4 w-4" />
          <span className="whitespace-nowrap">{compactNumber(proposal.vote_count)} votes</span>
        </div>
        {(proposal.state === ProposalState.Pending ||
          proposal.state === ProposalState.Active) && (
          <div className="flex items-center gap-1">
            <ClockIcon className="h-4 w-4" />
            {proposal.state === ProposalState.Pending ? (
              <span className="whitespace-nowrap">
                Voting Start{" "}
                {$dayjs.unix(Number(proposal.start_time)).fromNow()}
              </span>
            ) : (
              <span className="whitespace-nowrap">
                Voting End {$dayjs.unix(Number(proposal.end_time)).fromNow()}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
