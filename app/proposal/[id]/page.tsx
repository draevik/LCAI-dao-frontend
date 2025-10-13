"use client";

import { useMemo, useState } from "react";
import Blockies from "react-blockies";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  CircleMinusIcon,
  Loader2Icon,
  CopyIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowLeftIcon,
  MoreHorizontalIcon,
  UsersIcon,
  ClockIcon,
} from "lucide-react";
import { formatEther, TransactionExecutionError } from "viem";
import useContracts from "@/hooks/useContracts";
import { compactNumber, convertChoice } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import LoadingBlock from "@/components/loading-block";
import Markdown from "react-markdown";
import { useGovernance } from "@/hooks/useGovernance";
import { toast } from "sonner";
import { useAppKit } from "@reown/appkit/react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCopyToClipboard } from "usehooks-ts";
import ProposalStatusBadge from "@/components/proposal/proposal-status-badge";
import { useQuery as useApolloQuery } from "@apollo/client/react";
import { GET_PROPOSAL } from "@/graphql/queries/get-proposal";
import { GET_VOTES_BY_PROPOSAL } from "@/graphql/queries/get-votes-by-proposal";
import $dayjs from "@/lib/dayjs";
import { ProposalState } from "@/lib/constents";
import { Execution } from "@/models";

const getVoteIcon = (vote: number) => {
  switch (vote) {
    case 0:
      return <CheckCircleIcon className="size-4 text-green-500" />;
    case 1:
      return <XCircleIcon className="size-4 text-red-500" />;
    case 2:
      return <CircleMinusIcon className="size-4 text-gray-500" />;
    default:
      return null;
  }
};

export default function ProposalDetail() {
  const { open } = useAppKit();
  const { address } = useAccount();
  const { governorContract, presaleVotingPowerContract } = useContracts();
  const { castVote, cancel } = useGovernance();
  const params = useParams();
  const proposalId = params.id as string;
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [, copy] = useCopyToClipboard();

  const { data, loading, refetch } = useApolloQuery(GET_PROPOSAL, {
    variables: { id: proposalId },
  });

  const proposal = useMemo(() => data?.proposal || null, [data]);

  const proposalState = useQuery({
    queryKey: ["proposalStates", proposalId],
    queryFn: () => governorContract.read.state([BigInt(proposalId)]),
    enabled: Boolean(proposal),
  });

  const { data: votesData } = useApolloQuery(GET_VOTES_BY_PROPOSAL, {
    variables: { proposalId },
  });

  const votes = useMemo(() => votesData?.votes || [], [votesData]);

  const hasVoted = useQuery({
    queryKey: ["hasVoted", proposalId, address],
    queryFn: async () =>
      governorContract.read.hasVoted([BigInt(proposalId), address!]),
    enabled: Boolean(address),
  });

  const userVotingPower = useQuery({
    queryKey: ["votingPower", address],
    queryFn: async () => presaleVotingPowerContract.read.balanceOf([address!]),
    select: (votingPower) => +formatEther(votingPower),
    enabled: Boolean(address),
  });

  const castVoteMutation = useMutation({
    mutationFn: () => castVote(proposalId, convertChoice(selectedChoice!)),
    onSuccess: () => {
      setSelectedChoice(null);
      refetch();
      toast.success(
        `Vote cast for choice: ${proposal?.metadata.choices[selectedChoice!]}`
      );
    },
    onError: (error: TransactionExecutionError) => {
      console.error("Error casting vote:", error?.walk().message);
      toast.error("Failed to cast vote");
    },
  });

  const cancelProposalMutation = useMutation({
    mutationFn: () => {
      if (!proposal) throw new Error("Proposal not found");
      const execution: Execution[] = JSON.parse(proposal.metadata.execution);
      return cancel(
        execution.map((e) => e.to),
        execution.map((e) => BigInt(e.value)),
        execution.map((e) => e.data),
        proposal.metadata.body
      );
    },
    onSuccess: () => {
      refetch();
      toast.success("Proposal cancelled");
    },
    onError: (error: TransactionExecutionError) => {
      console.error("Error cancelling proposal:", error?.walk().message);
      toast.error("Failed to cancel proposal");
    },
  });

  if (loading) return <LoadingBlock />;

  if (!proposal) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Proposal Not Found</h1>
          <Link href="/">
            <Button>Back to Proposals</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      {/* Header */}
      <div className="flex items-center gap-2 mb-8">
        <Link href="/">
          <Button variant="ghost" size="icon" type="button">
            <ArrowLeftIcon className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Proposal</h1>
      </div>

      {/* Title and Status */}
      <div className="space-y-4">
        {/* TODO: add status badge */}
        {proposalState.isLoading ? (
          <Loader2Icon className="size-5 animate-spin" />
        ) : (
          <ProposalStatusBadge status={proposalState.data || 0} />
        )}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{proposal.metadata.title}</h1>
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
                {proposalState.data === ProposalState.Pending &&
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
            <span>{compactNumber(proposal.scores_total_parsed)} votes</span>
          </div>
          <div className="flex items-center gap-1">
            <ClockIcon className="h-4 w-4" />
            {proposalState.data === ProposalState.Pending ? (
              <span>
                Start {$dayjs.unix(Number(proposal.start_time)).fromNow()}
              </span>
            ) : (
              proposalState.data === ProposalState.Active && (
                <span>{$dayjs.unix(Number(proposal.end_time)).fromNow()}</span>
              )
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="overview">OVERVIEW</TabsTrigger>
              <TabsTrigger value="votes">VOTES</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              {/* Description */}
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <Markdown>{proposal.metadata.body}</Markdown>
              </div>

              {/* Discussion Link */}
              {/* {proposal.discussion && (
                <div className="pt-4">
                  <a
                    href={proposal.discussion}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Discussion
                  </a>
                </div>
              )} */}
            </TabsContent>

            <TabsContent value="votes" className="mt-6">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  Showing {votes?.length?.toLocaleString()} addresses
                </div>

                {/* Mock vote list */}
                <div className="space-y-3">
                  {!votes?.length ? (
                    <Empty className="border border-dashed">
                      <EmptyHeader>
                        <EmptyTitle>No votes found</EmptyTitle>
                        <EmptyDescription>
                          Be the first to vote on this proposal
                        </EmptyDescription>
                      </EmptyHeader>
                    </Empty>
                  ) : (
                    votes?.map((vote, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Blockies
                              seed={vote.voter.id}
                              size={16}
                              scale={2}
                              className="rounded-full"
                            />
                            <div>
                              <div className="font-medium text-sm">
                                {vote.voter.id}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Voted for:{" "}
                                <span className="font-medium">
                                  {vote.choice}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-sm">
                              {vote.vp_parsed.toLocaleString()}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {$dayjs
                                .unix(vote.created)
                                .format("MMM D, YYYY · h:mm A")}
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Cast Your Vote */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                CAST YOUR VOTE
              </CardTitle>
              {address && (
                <>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Blockies
                      seed={address}
                      size={8}
                      scale={2}
                      className="rounded-full"
                    />
                    <span>
                      {address.slice(0, 6)}...
                      {address.slice(-4)}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Voting power: {userVotingPower.data?.toLocaleString()}
                  </div>
                </>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {proposal.metadata.choices.map((choice, index) => (
                  <div key={index}>
                    <button
                      onClick={() => setSelectedChoice(index)}
                      className={`w-full p-3 text-left border rounded-lg transition-colors ${
                        selectedChoice === index
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getVoteIcon(index)}
                          <span className="font-medium text-sm">{choice}</span>
                        </div>

                        <span className="text-xs text-muted-foreground">
                          {compactNumber(
                            proposal[
                              `scores_${index + 1}_parsed` as "scores_1_parsed"
                            ]
                          )}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <Progress
                          value={
                            (Number(
                              proposal[
                                `scores_${
                                  index + 1
                                }_parsed` as "scores_1_parsed"
                              ]
                            ) /
                              Number(proposal.scores_total_parsed)) *
                            100
                          }
                          className="h-1"
                        />
                      </div>
                    </button>
                  </div>
                ))}
              </div>
              <Separator />

              <div className="text-xs text-muted-foreground">
                Total: {compactNumber(proposal.scores_total_parsed)}
              </div>
              <Button
                onClick={() => (address ? castVoteMutation.mutate() : open())}
                disabled={
                  proposal.execution_ready ||
                  hasVoted.data ||
                  selectedChoice === null ||
                  castVoteMutation.isPending
                }
                className="w-full"
              >
                {castVoteMutation.isPending && (
                  <Loader2Icon className="animate-spin" />
                )}
                {hasVoted.data ? "Already Voted" : "Vote"}
              </Button>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">TIMELINE</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-gray-400 mt-2" />
                  <div>
                    <div className="font-medium text-sm">Published onchain</div>
                    <div className="text-xs text-muted-foreground">
                      {$dayjs
                        .unix(Number(proposal.created))
                        .format("MMM D, YYYY · h:mm A")}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                  <div>
                    <div className="font-medium text-sm">
                      Voting period started
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {$dayjs
                        .unix(Number(proposal.start_time))
                        .format("MMM D, YYYY · h:mm A")}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2" />
                  <div>
                    <div className="font-medium text-sm">End voting period</div>
                    <div className="text-xs text-muted-foreground">
                      {$dayjs
                        .unix(Number(proposal.end_time))
                        .format("MMM D, YYYY · h:mm A")}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-gray-400" />
                  <div>
                    <div className="font-medium text-sm">Queue proposal</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-gray-400" />
                  <div>
                    <div className="font-medium text-sm">Execute proposal</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
