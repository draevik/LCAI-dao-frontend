import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CircleMinusIcon,
  Loader2Icon,
  CopyIcon,
  MoreHorizontalIcon,
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
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">{proposal.metadata?.title}</h1>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="sm">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-48">
              <DropdownMenuItem
                onClick={() => {
                  copy(window.location.href);
                  toast.success("URL copied to clipboard");
                }}
              >
                <CopyIcon className="size-4" />
                Copy URL
              </DropdownMenuItem>
              {proposal.state === ProposalState.Pending &&
                proposal.author.id === address && (
                  <DropdownMenuItem
                    onClick={() => cancelProposalMutation.mutate()}
                  >
                    {cancelProposalMutation.isPending ? (
                      <Loader2Icon className="size-4 animate-spin" />
                    ) : (
                      <CircleMinusIcon className="size-4" />
                    )}
                    Cancel Proposal
                  </DropdownMenuItem>
                )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <span>#{proposal.id.toString().slice(0, 6)}...</span>
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
          <span>{compactNumber(proposal.vote_count)} votes</span>
        </div>
        {(proposal.state === ProposalState.Pending ||
          proposal.state === ProposalState.Active) && (
          <div className="flex items-center gap-1">
            <ClockIcon className="h-4 w-4" />
            {proposal.state === ProposalState.Pending ? (
              <span>
                Voting Start{" "}
                {$dayjs.unix(Number(proposal.start_time)).fromNow()}
              </span>
            ) : (
              <span>
                Voting End {$dayjs.unix(Number(proposal.end_time)).fromNow()}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
