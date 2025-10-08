"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Clock,
  Users,
  ExternalLink,
  Share,
  MoreHorizontal,
  RadioIcon,
  CheckCircle,
  XCircle,
  ClockIcon,
  CircleMinusIcon,
  Loader2Icon,
} from "lucide-react";
import {
  formatEther,
  parseAbiItem,
  TransactionExecutionError,
  zeroAddress,
} from "viem";
import useWeb3Clients from "@/hooks/useWeb3Clients";
import useContracts from "@/hooks/useContracts";
import { compactNumber, rmMarkdown } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import LoadingBlock from "@/components/loading-block";
import { ProposalState, ProposalStateLabel } from "@/lib/constents";
import $dayjs from "@/lib/dayjs";
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

const getStatusBadge = (status: number) => {
  switch (status) {
    case ProposalState.Pending:
      return (
        <Badge className="bg-gray-500/10 text-gray-200 hover:bg-gray-500/20">
          <ClockIcon className="size-5 text-gray-200" /> Pending
        </Badge>
      );
    case ProposalState.Active:
      return (
        <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">
          <RadioIcon className="size-5 text-green-500" />
          Active
        </Badge>
      );
    case ProposalState.Succeeded:
      return (
        <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">
          <CheckCircle className="size-5 text-green-500" />
          Passed
        </Badge>
      );
    case ProposalState.Canceled || ProposalState.Defeated:
      return (
        <Badge className="bg-red-500/10 text-red-600 hover:bg-red-500/20">
          <XCircle className="size-5 text-red-500" />
          Rejected
        </Badge>
      );
    default:
      return <Badge variant="secondary">{ProposalStateLabel[status]}</Badge>;
  }
};

const getVoteIcon = (vote: number) => {
  switch (vote) {
    case 0:
      return <XCircle className="size-4 text-red-500" />;
    case 1:
      return <CheckCircle className="size-4 text-green-500" />;
    case 2:
      return <CircleMinusIcon className="size-4 text-gray-500" />;
    default:
      return null;
  }
};
export default function ProposalDetail() {
  const { open } = useAppKit();
  const { address } = useAccount();
  const { publicClient } = useWeb3Clients();
  const { governorContract, presaleVotingPowerContract } = useContracts();
  const { castVote } = useGovernance();
  const params = useParams();
  const proposalId = params.id as string;
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);

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

  const fetchProposal = async () => {
    const latestBlock = await publicClient.getBlockNumber();
    const logs = await publicClient.getLogs({
      address: governorContract.address,
      event: parseAbiItem(
        "event ProposalCreated(uint256 proposalId, address proposer, address[] targets, uint256[] values, string[] signatures, bytes[] calldatas, uint256 voteStart, uint256 voteEnd, string description)"
      ),
      fromBlock: 0n,
      toBlock: latestBlock,
      args: { proposalId: BigInt(proposalId) },
    });
    const proposals = await Promise.all(
      logs.map(async (log) => {
        const id = log.args.proposalId!;
        const [proposalState, votes, block] = await Promise.all([
          governorContract.read.state([id]),
          governorContract.read.proposalVotes([id]),
          publicClient.getBlock({ blockNumber: log.blockNumber }),
        ]);

        const totalVotes = +formatEther(votes.reduce((a, b) => a + b));
        const forVotes = +formatEther(votes[1]);
        const againstVotes = +formatEther(votes[0]);
        const abstainVotes = +formatEther(votes[2]);

        const content = log.args.description?.split("\n\n");
        const title = content?.shift() || "";
        // parse [discussion](url) from content
        const discussionUrl =
          (content?.pop() || "").match(/\(([^)]+)\)/)?.[1] || "";
        const description = content?.join("\n\n") || "";

        return {
          id,
          title: rmMarkdown(title),
          auther: log.args.proposer || zeroAddress,
          description: description,
          discussion: discussionUrl,
          state: proposalState,
          contractAddress: governorContract.address,
          voteStartTime: Number(
            block.timestamp + (log.args.voteStart! - block.number) * 12n!
          ),
          voteEndTime: Number(
            block.timestamp + (log.args.voteEnd! - block.number) * 12n!
          ),
          createdTime: Number(block.timestamp),
          votes: {
            for: forVotes,
            against: againstVotes,
            abstain: abstainVotes,
            total: totalVotes,
          },
          choices: [
            {
              value: 1,
              label: "For",
              votes: forVotes,
              percentage: (totalVotes ? forVotes / totalVotes : 0) * 100,
            },
            {
              value: 0,
              label: "Against",
              votes: againstVotes,
              percentage: (totalVotes ? againstVotes / totalVotes : 0) * 100,
            },
            {
              value: 2,
              label: "Abstain",
              votes: abstainVotes,
              percentage: (totalVotes ? abstainVotes / totalVotes : 0) * 100,
            },
          ],
        };
      })
    );

    return proposals[0];
  };

  const fetchVoters = async () => {
    const latestBlock = await publicClient.getBlockNumber();
    const logs = await publicClient.getLogs({
      address: governorContract.address,
      event: parseAbiItem(
        "event VoteCast(address indexed voter, uint256 proposalId, uint8 support, uint256 weight, string reason)"
      ),
      fromBlock: 0n,
      toBlock: latestBlock,
    });

    const voters = await Promise.all(
      logs
        .filter((log) => log.args.proposalId === BigInt(proposalId))
        .map(async (log) => {
          const block = await publicClient.getBlock({
            blockNumber: log.blockNumber,
          });
          return {
            address: log.args.voter!,
            support: log.args.support!,
            weight: +formatEther(log.args.weight || 0n),
            createdTime: Number(block.timestamp),
          };
        })
    );

    console.log(voters);

    return voters;
  };

  const voters = useQuery({
    queryKey: ["voters", proposalId],
    queryFn: fetchVoters,
    enabled: Boolean(proposalId),
  });

  const {
    data: proposal,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["proposal", proposalId],
    queryFn: fetchProposal,
    enabled: Boolean(proposalId),
  });

  const castVoteMutation = useMutation({
    mutationFn: () => castVote(proposalId, selectedChoice!),
    onSuccess: () => {
      setSelectedChoice(null);
      refetch();
      toast.success(
        `Vote cast for choice: ${
          proposal?.choices.find((c) => c.value === selectedChoice)?.label
        }`
      );
    },
    onError: (error: TransactionExecutionError) => {
      console.error("Error casting vote:", error?.walk().message);
      toast.error("Failed to cast vote");
    },
  });

  if (isLoading) return <LoadingBlock />;

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
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Proposal Details</h1>
        <div className="flex items-center gap-2 ml-auto">
          <Button variant="ghost" size="sm">
            <Share className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="overview">OVERVIEW</TabsTrigger>
              <TabsTrigger value="votes">
                VOTES · {voters.data?.length?.toLocaleString()}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              {/* Title and Status */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {/* {getStatusIcon(proposal.status)} */}
                    <h1 className="text-2xl font-bold">{proposal.title}</h1>
                  </div>
                  {getStatusBadge(proposal.state)}
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <span>#{proposal.id.toString().slice(0, 6)}...</span>
                    <span>by</span>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">
                        {proposal.auther?.slice(0, 6)}...
                        {proposal.auther?.slice(-4)}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        author
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{compactNumber(proposal.votes.total)} votes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {proposal.state === ProposalState.Pending ? (
                      <span>
                        Start{" "}
                        {$dayjs.unix(Number(proposal.voteStartTime)).fromNow()}
                      </span>
                    ) : (
                      proposal.state === ProposalState.Active && (
                        <span>
                          {$dayjs.unix(Number(proposal.voteEndTime)).fromNow()}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <Markdown>{proposal.description}</Markdown>
              </div>

              {/* Discussion Link */}
              {proposal.discussion && (
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
              )}
            </TabsContent>

            <TabsContent value="votes" className="mt-6">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  Showing {voters.data?.length} votes
                </div>

                {/* Mock vote list */}
                <div className="space-y-3">
                  {!voters.data?.length ? (
                    <Empty className="border border-dashed">
                      <EmptyHeader>
                        <EmptyTitle>No votes found</EmptyTitle>
                        <EmptyDescription>
                          Be the first to vote on this proposal
                        </EmptyDescription>
                      </EmptyHeader>
                    </Empty>
                  ) : (
                    voters.data?.map((vote, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {vote.address.slice(2, 4).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-sm">
                                {vote.address}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Voted for:{" "}
                                <span className="font-medium">
                                  {vote.support}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-sm">
                              {vote.weight.toLocaleString()} LCAI
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {$dayjs
                                .unix(vote.createdTime)
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
              <div className="text-xs text-muted-foreground">
                Voting power: {userVotingPower.data?.toLocaleString()} LCAI
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {proposal.choices.map((choice) => (
                  <div key={choice.value}>
                    <button
                      onClick={() => setSelectedChoice(choice.value)}
                      className={`w-full p-3 text-left border rounded-lg transition-colors ${
                        selectedChoice === choice.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getVoteIcon(choice.value)}
                          <span className="font-medium text-sm">
                            {choice.label}
                          </span>
                        </div>

                        <span className="text-xs text-muted-foreground">
                          {compactNumber(choice.votes)} LCAI
                        </span>
                      </div>

                      <div className="space-y-1">
                        <Progress value={choice.percentage} className="h-1" />
                      </div>
                    </button>
                  </div>
                ))}
              </div>
              <Separator />

              <div className="text-xs text-muted-foreground">
                Total: {compactNumber(proposal.votes.total)} LCAI
              </div>
              <Button
                onClick={() => (address ? castVoteMutation.mutate() : open())}
                disabled={
                  proposal.state !== ProposalState.Active ||
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
                    <div className="font-medium text-sm">Created</div>
                    <div className="text-xs text-muted-foreground">
                      {$dayjs
                        .unix(Number(proposal.createdTime))
                        .format("MMM D, YYYY · h:mm A")}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                  <div>
                    <div className="font-medium text-sm">Start</div>
                    <div className="text-xs text-muted-foreground">
                      {$dayjs
                        .unix(Number(proposal.voteStartTime))
                        .format("MMM D, YYYY · h:mm A")}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2" />
                  <div>
                    <div className="font-medium text-sm">End</div>
                    <div className="text-xs text-muted-foreground">
                      {$dayjs
                        .unix(Number(proposal.voteEndTime))
                        .format("MMM D, YYYY · h:mm A")}
                    </div>
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
