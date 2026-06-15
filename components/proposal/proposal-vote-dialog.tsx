import Blockies from "react-blockies";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import ProposalVoteIcon from "./proposal-vote-icon";
import { Proposal } from "@/types";
import { useGovernance } from "@/hooks/useGovernance";
import { convertChoice } from "@/lib/utils";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { formatEther, TransactionExecutionError } from "viem";
import { useConnection } from "wagmi";
import useContracts from "@/hooks/useContracts";
import { mainnet } from "@/config/chains";
import useCurrentChain from "@/hooks/useCurrentChain";
import useWeb3Clients from "@/hooks/useWeb3Clients";

interface ProposalVoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  proposal: Proposal;
}

export function ProposalVoteDialog({
  open,
  proposal,
  onOpenChange,
}: ProposalVoteDialogProps) {
  const chain = useCurrentChain();
  const { publicClient } = useWeb3Clients();
  const { address } = useConnection();
  const { castVote } = useGovernance();
  const { voteTokenContract } = useContracts();
  const [voteReason, setVoteReason] = useState("");
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const userVotingPower = useQuery({
    queryKey: ["votingPower", address],
    queryFn: async () =>
      chain.id === mainnet.id
        ? voteTokenContract.read.balanceOf([address!])
        : publicClient.getBalance({ address: address! }),
    select: (votingPower) => +formatEther(votingPower),
    enabled: Boolean(address),
  });

  const castVoteMutation = useMutation({
    mutationFn: () =>
      castVote(
        proposal.proposal_id,
        convertChoice(selectedChoice!),
        voteReason,
      ),
    onSuccess: () => {
      setSelectedChoice(null);
      setVoteReason("");
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["proposal", proposal.id] });
      toast.success(
        `Vote cast for choice: ${proposal?.metadata?.choices[selectedChoice!]}`,
      );
    },
    onError: (error: TransactionExecutionError) => {
      console.error("Error casting vote:", error?.walk().message);
      toast.error("Failed to cast vote");
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-2xl">
        <DialogHeader>
          <DialogTitle>Cast your vote</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {address && (
            <div className="flex items-center gap-2">
              <Blockies
                seed={address}
                size={16}
                scale={2}
                className="rounded-full"
              />
              <span>
                {address.slice(0, 6)}...
                {address.slice(-4)}
              </span>
            </div>
          )}
          <div className="pt-4 px-4 border rounded-md divide-y">
            <div className="text-xs mb-0 space-y-2 pb-4">
              <p>Voting power</p>
              <p className="font-medium text-xl">
                {userVotingPower.isLoading ? (
                  <Loader2Icon className="size-4 animate-spin" />
                ) : (
                  (userVotingPower?.data?.toLocaleString() ?? 0)
                )}
              </p>
            </div>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  How is my voting power calculated?
                </AccordionTrigger>
                <AccordionContent>
                  Your voting power is calculated as the number of tokens
                  (votes) that have been delegated to you before the proposal
                  became active. You can delegate your votes to yourself, or to
                  someone else. Others can also delegate their votes to you. For
                  votes that come from tokens that you own, if you delegated to
                  yourself after this proposal became active, they will not be
                  counted towards your voting power for this proposal. These
                  votes will be counted towards your voting power for future
                  proposals. This behavior is intended to prevent users from
                  changing the outcome of a vote in progress by buying or
                  borrowing additional votes.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="space-y-3">
            <Label>Vote</Label>
            {proposal.metadata?.choices?.map((choice, index) => (
              <div key={index}>
                <button
                  onClick={() => setSelectedChoice(index)}
                  className={`w-full p-3 text-left border rounded-lg transition-colors ${
                    selectedChoice === index
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ProposalVoteIcon vote={index} />
                      <span className="font-medium text-sm">{choice}</span>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="vote-reason"
              className="block text-sm font-medium text-muted-foreground mb-2"
            >
              Reason (optional)
            </Label>
            <Textarea
              id="vote-reason"
              placeholder="Share your reasoning with the community"
              className="min-h-[100px]"
              value={voteReason}
              onChange={(e) => setVoteReason(e.target.value)}
            />
          </div>
          <div className="text-xs text-muted-foreground">
            Your vote and reasoning will be publicly visible on the blockchain.
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={castVoteMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={() => castVoteMutation.mutate()}
            disabled={castVoteMutation.isPending}
          >
            {castVoteMutation.isPending && (
              <Loader2Icon className="animate-spin" />
            )}
            Cast vote
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
