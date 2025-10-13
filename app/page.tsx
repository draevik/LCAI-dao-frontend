"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Loader2Icon } from "lucide-react";
import { compactNumber } from "@/lib/utils";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import $dayjs from "@/lib/dayjs";
import LoadingBlock from "@/components/loading-block";
import { GET_PROPOSALS } from "@/graphql/queries/get-proposals";
import { useQuery as useApolloQuery } from "@apollo/client/react";
import { useQuery } from "@tanstack/react-query";
import useContracts from "@/hooks/useContracts";
import ProposalStatusBadge from "@/components/proposal/proposal-status-badge";
import { ProposalState } from "@/lib/constents";

export default function Home() {
  const { data, loading } = useApolloQuery(GET_PROPOSALS);
  const { governorContract } = useContracts();

  const proposals = useMemo(() => data?.proposals || [], [data]);

  // TODO: calculate proposal state directly from proposal data
  const proposalState = useQuery({
    queryKey: ["proposalStates"],
    queryFn: () =>
      Promise.all(
        proposals.map((proposal) =>
          governorContract.read.state([BigInt(proposal.proposal_id)])
        )
      ),
    enabled: Boolean(proposals.length),
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
            {loading ? (
              <LoadingBlock />
            ) : proposals.length ? (
              proposals.map((proposal, index) => (
                <Link
                  key={proposal.id}
                  href={`/proposal/${proposal.id}`}
                  className="py-4 flex hover:bg-border -mx-6 px-6 rounded-md"
                >
                  <div className="flex-auto mr-4 w-0">
                    {proposalState.isLoading ? (
                      <Loader2Icon className="size-5 animate-spin" />
                    ) : (
                      <ProposalStatusBadge
                        status={proposalState.data?.[index] || 0}
                      />
                    )}
                    <div className="mt-2 flex items-start justify-between">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl font-semibold hover:text-primary transition-colors">
                          {proposal.metadata.title}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <span>#{proposal.id.toString().slice(0, 6)}...</span>
                        <span>by</span>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">
                            {proposal.author.id.slice(0, 6)}...
                            {proposal.author.id.slice(-4)}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            author
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{compactNumber(proposal.vote_count)} votes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {proposalState.data?.[index] ===
                        ProposalState.Pending ? (
                          <span>
                            Start{" "}
                            {$dayjs.unix(Number(proposal.start_time)).fromNow()}
                          </span>
                        ) : (
                          proposalState.data?.[index] ===
                            ProposalState.Active && (
                            <span>
                              {$dayjs.unix(Number(proposal.end_time)).fromNow()}
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
