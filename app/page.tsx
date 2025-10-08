"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Users,
  CheckCircle,
  XCircle,
  RadioIcon,
  ClockIcon,
  CircleMinusIcon,
} from "lucide-react";
import useContracts from "@/hooks/useContracts";
import useWeb3Clients from "@/hooks/useWeb3Clients";
import { formatEther, parseAbiItem } from "viem";
import { useQuery } from "@tanstack/react-query";
import { compactNumber, rmMarkdown } from "@/lib/utils";
import { ProposalState } from "@/lib/constents";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import $dayjs from "@/lib/dayjs";
import LoadingBlock from "@/components/loading-block";

function getStatusIcon(status: number) {
  switch (status) {
    case ProposalState.Active:
      return <RadioIcon className="size-5 text-green-500" />;
    case ProposalState.Succeeded:
      return <CheckCircle className="size-5 text-green-500" />;
    case ProposalState.Canceled || ProposalState.Defeated:
      return <XCircle className="size-5 text-red-500" />;
    case ProposalState.Expired:
      return <CircleMinusIcon className="size-5 text-gray-500" />;
    default:
      return <ClockIcon className="size-5 text-gray-500" />;
  }
}

export default function Home() {
  const { governorContract } = useContracts();
  const { publicClient } = useWeb3Clients();

  const fetchProposals = async () => {
    const latestBlock = await publicClient.getBlockNumber();
    const logs = await publicClient.getLogs({
      address: governorContract.address,
      event: parseAbiItem(
        "event ProposalCreated(uint256 proposalId, address proposer, address[] targets, uint256[] values, string[] signatures, bytes[] calldatas, uint256 voteStart, uint256 voteEnd, string description)"
      ),
      fromBlock: 0n,
      toBlock: latestBlock,
    });
    const proposals = await Promise.all(
      logs.map(async (log) => {
        console.log(log);
        const id = log.args.proposalId!;
        const [proposalState, votes, block] = await Promise.all([
          governorContract.read.state([id]),
          governorContract.read.proposalVotes([id]),
          publicClient.getBlock({ blockNumber: log.blockNumber }),
        ]);

        return {
          ...log.args,
          id,
          title: rmMarkdown(log.args.description?.split("\n\n")[0] || ""),
          state: proposalState,
          contractAddress: governorContract.address,
          votes,
          totalVotes: +formatEther(votes.reduce((a, b) => a + b)),
          voteStart:
            block.timestamp + (log.args.voteStart! - block.number) * 12n,
          voteEnd: block.timestamp + (log.args.voteEnd! - block.number) * 12n,
        };
      })
    );

    return proposals;
  };

  const proposals = useQuery({
    queryKey: ["proposals"],
    queryFn: fetchProposals,
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col gap-6 py-6 shadow-sm">
        <div className="flex items-center justify-between px-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              DAO Governance
            </h1>
            <p className="text-muted-foreground mt-2">
              Participate in community governance and vote on important
              proposals
            </p>
          </div>
          <Link href="/proposal/create">
            <Button>Create Proposal</Button>
          </Link>
        </div>
        <div className="px-6">
          <div className="divide-y">
            {proposals.isLoading ? (
              <LoadingBlock />
            ) : proposals.data && proposals.data?.length ? (
              proposals.data?.map((proposal) => (
                <Link
                  key={proposal.id}
                  href={`/proposal/${proposal.id}`}
                  className="py-4 flex hover:bg-border -mx-6 px-6 rounded-md"
                >
                  <div className="flex-auto mr-4 w-0">
                    <div className="flex items-start justify-betwee">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusIcon(proposal.state)}
                        <span className="text-xl font-semibold hover:text-primary transition-colors">
                          {proposal.title}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <span>#{proposal.id.toString().slice(0, 6)}...</span>
                        <span>by</span>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">
                            {proposal.proposer?.slice(0, 6)}...
                            {proposal.proposer?.slice(-4)}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            author
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{compactNumber(proposal.totalVotes)} votes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {proposal.state === ProposalState.Pending ? (
                          <span>
                            Start{" "}
                            {$dayjs.unix(Number(proposal.voteStart)).fromNow()}
                          </span>
                        ) : (
                          proposal.state === ProposalState.Active && (
                            <span>
                              {$dayjs.unix(Number(proposal.voteEnd)).fromNow()}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <Empty className="border border-dashed">
                <EmptyHeader>
                  <EmptyTitle>No proposals found</EmptyTitle>
                  <EmptyDescription>
                    Create your first proposal
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Button variant="outline" type="button" asChild>
                    <Link href="/proposal/create">Create Proposal</Link>
                  </Button>
                </EmptyContent>
              </Empty>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
