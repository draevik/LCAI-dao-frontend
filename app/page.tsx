"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Loader2Icon, Plus } from "lucide-react";
import { compactNumber } from "@/lib/utils";
import $dayjs from "@/lib/dayjs";
import LoadingBlock from "@/components/loading-block";
import { useQuery } from "@tanstack/react-query";
import ProposalStatusBadge from "@/components/proposal/proposal-status-badge";
import { ProposalState } from "@/lib/constents";
import useGraphqlApi from "@/hooks/useGraphqlApi";
import Image from "next/image";

export default function Home() {
  const api = useGraphqlApi();

  const { isLoading, data: proposals } = useQuery({
    queryKey: ["proposals"],
    queryFn: () =>
      api.loadProposals(
        [],
        { limit: 10, skip: 0 },
        Math.floor(Date.now() / 1000)
      ),
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col gap-6 pb-6 sm:py-6">
        <div className="flex flex-wrap gap-y-3 gap-x-5 items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-content-primary">
              DAO Governance
            </h1>
            <p className="text-content-secondary mt-2">
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
            {isLoading ? (
              <LoadingBlock />
            ) : proposals?.length ? (
              proposals.map((proposal) => (
                <Link
                  key={proposal.id}
                  href={`/proposal/${proposal.id}`}
                  className="py-4 flex hover:bg-border -mx-6 px-6 rounded-md"
                >
                  <div className="flex-auto mr-4 w-0">
                    {isLoading ? (
                      <Loader2Icon className="size-5 animate-spin" />
                    ) : (
                      <ProposalStatusBadge status={proposal.state} />
                    )}
                    <div className="mt-2 flex items-start justify-between">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl font-semibold hover:text-primary transition-colors">
                          {proposal.metadata?.title}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <span>
                          #{proposal.proposal_id.toString().slice(0, 6)}...
                        </span>
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
                        {proposal.state === ProposalState.Pending ? (
                          <span>
                            Start{" "}
                            {$dayjs.unix(Number(proposal.start_time)).fromNow()}
                          </span>
                        ) : (
                          proposal.state === ProposalState.Active && (
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
              <div className="flex flex-col gap-6 items-center mt-10">
                <Image src="/images/icons/folder-black.png" width={167} height={132} alt="Folder icon"></Image>
                <div className="text-center">
                  <h4 className="text-2xl font-smeibold leading-[1.20] -tracking-[0.24px] text-content-primary mb-2">No proposals found</h4>
                  <p className="text-content-default -tracking-[0.16px]">Create your first proposal</p>
                </div>
                <Button>
                  <Link className="flex items-center gap-1" href="/proposal/create"><Plus /> Create Proposal</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
