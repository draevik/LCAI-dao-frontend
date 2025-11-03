"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Plus, Sparkle } from "lucide-react";
import { compactNumber } from "@/lib/utils";
import $dayjs from "@/lib/dayjs";
import LoadingBlock from "@/components/loading-block";
import { useQuery } from "@tanstack/react-query";
import ProposalStatusBadge from "@/components/proposal/proposal-status-badge";
import { ProposalState } from "@/lib/constents";
import useGraphqlApi from "@/hooks/useGraphqlApi";
import Image from "next/image";
import { Button } from "@/components/common/Button";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme } = useTheme();
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
    <div className="container mx-auto px-4">
      <div className="flex flex-col gap-6 py-6 sm:py-10">
        <div className="flex flex-wrap gap-y-3 gap-x-5 items-center justify-between">
          <div>
            <h1 className="page-title">DAO Governance</h1>
            <p className="text-content-secondary mt-2">
              Participate in community governance and vote on important
              proposals
            </p>
          </div>
          <Button
            leftIcon={Plus}
            href="/proposal/create"
            variant="outline"
            size="lg"
          >
            Create Proposal
          </Button>
        </div>
        <div>
          {isLoading ? (
            <LoadingBlock />
          ) : proposals?.length ? (
            proposals.map((proposal, idx) => (
              <Link
                key={proposal.id}
                href={`/proposal/${proposal.id}`}
                className={`sm:py-8 py-5 block transition-all duration-300 hover:px-4 sm:hover:px-6 hover:bg-surface-soft hover:border-surface-soft/20 ${
                  proposals.length - 1 === idx
                    ? ""
                    : "border-b border-border-default"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-col sm:flex-row items-baseline gap-2 mb-2">
                    <ProposalStatusBadge status={proposal.state} />
                    <h3 className="text-content-primary font-semibold leading-[1.2] tracking-[-0.24px] md:text-2xl sm:text-xl text-lg capitalize">
                      {proposal.metadata?.title}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-wrap sm:flex-nowrap items-center gap-x-4 gap-y-2 mt-3.5">
                  <div className="flex items-center gap-3">
                    <span>
                      #{proposal.proposal_id.toString().slice(0, 6)}...
                    </span>
                  </div>
                  <Sparkle className="hidden sm:block" size={14} />
                  <div className="flex items-center gap-1">
                    <span className="text-content-primary">by</span>
                    <span className="font-medium">
                      {proposal.author.id.slice(0, 6)}...
                      {proposal.author.id.slice(-4)}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      author
                    </Badge>
                  </div>
                  <Sparkle className="hidden sm:block" size={14} />
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span className="whitespace-nowrap">
                      {compactNumber(proposal.vote_count)} votes
                    </span>
                  </div>
                  <Sparkle className="hidden sm:block" size={14} />
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {proposal.state === ProposalState.Pending ? (
                      <span className="whitespace-nowrap">
                        Start{" "}
                        {$dayjs.unix(Number(proposal.start_time)).fromNow()}
                      </span>
                    ) : (
                      proposal.state === ProposalState.Active && (
                        <span className="whitespace-nowrap">
                          {$dayjs.unix(Number(proposal.end_time)).fromNow()}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="flex flex-col gap-6 items-center pt-15 pb-15">
              <Image
                className="max-w-30 sm:max-w-max"
                src={
                  theme == "dark"
                    ? "/images/icons/folder-black.png"
                    : "/images/icons/folder-white.png"
                }
                width={167}
                height={132}
                alt="Folder icon"
              ></Image>
              <div className="text-center">
                <h4 className="text-2xl font-smeibold leading-[1.20] -tracking-[0.24px] text-content-primary mb-2">
                  No proposals found
                </h4>
                <p className="text-content-default -tracking-[0.16px]">
                  Create your first proposal
                </p>
              </div>
              <Button
                leftIcon={Plus}
                href="/proposal/create"
                variant="primary"
                size="lg"
              >
                Create Proposal
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
