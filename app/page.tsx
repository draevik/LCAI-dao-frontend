"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Clock, Users} from "lucide-react";
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
import { faPlus, faSparkle } from "@fortawesome/pro-regular-svg-icons";
import ProposalFilter from "@/components/proposal/ProposalFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
  const { theme } = useTheme();
  const api = useGraphqlApi();

  const { isLoading, data: proposals = [] } = useQuery({
    queryKey: ["proposals"],
    queryFn: () =>
      api.loadProposals([], { limit: 10, skip: 0 }, Math.floor(Date.now() / 1000)),
  });

  // Manage filters
  const [filters, setFilters] = useState({
    status: "all",
    createdBy: "all",
    search: "",
  });

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Apply filters
  const filteredProposals = useMemo(() => {
    return proposals.filter((proposal) => {
      // status filter
      const stateMap: Record<string, number[]> = {
        pending: [0],
        active: [1],
        passed: [2],
        queued: [5],
        failed: [3, 4, 6, 7], 
      };
      const matchesStatus =
        filters.status === "all" ||
        (stateMap[filters.status] || []).includes(proposal.state);

      // createdBy filter (adjust this logic as needed)
      const matchesCreatedBy =
        filters.createdBy === "all" ||
        (filters.createdBy === "core" && proposal.author) ||
        (filters.createdBy === "community" && !proposal.author) ||
        (filters.createdBy === "me" && proposal.author.id === "CURRENT_USER_ID");

      // search filter
      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        !filters.search ||
        proposal.metadata?.title?.toLowerCase().includes(searchLower) ||
        proposal.proposal_id.toString().includes(searchLower) ||
        proposal.author.id.toLowerCase().includes(searchLower);

      return matchesStatus && matchesCreatedBy && matchesSearch;
    });
  }, [filters, proposals]);

  console.log(filteredProposals)

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-10">
      <div className="sm:mb-7.5 mb-5">
        <h1 className="page-title">DAO Governance</h1>
        <p className="text-content-secondary mt-2">
          Participate in community governance and vote on important proposals
        </p>
      </div>

      <ProposalFilter filters={filters} onFilterChange={handleFilterChange} />

      <div className="mt-4">
        {isLoading ? (
          <LoadingBlock />
        ) : filteredProposals.length ? (
          filteredProposals.map((proposal, idx: number) => (
            <Link
              key={proposal.id}
              href={`/proposal/${proposal.id}`}
              className={`sm:py-8 py-5 block transition-all duration-300 hover:px-4 sm:hover:px-6 hover:bg-surface-soft hover:border-surface-soft/20 ${
                filteredProposals.length - 1 === idx
                  ? ""
                  : "border-b border-border-default"
              }`}
            >
              <h3 className="text-content-primary flex items-baseline font-semibold leading-[1.2] tracking-[-0.24px] md:text-2xl sm:text-xl text-lg capitalize">
                <ProposalStatusBadge status={proposal.state} />
                {proposal.metadata?.title}
              </h3>

              <div className="flex flex-wrap sm:flex-nowrap items-center gap-x-4 gap-y-2 mt-4">
                <div className="flex items-center gap-3">
                  <span className="sm:text-base text-sm">#{proposal.proposal_id.toString().slice(0, 6)}...</span>
                </div>
                <span className="hidden sm:block">
                <FontAwesomeIcon icon={faSparkle} className="size-3.5" />
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-content-primary sm:text-base text-sm">by</span>
                  <span className="font-medium sm:text-base text-sm">
                    {proposal.author.id.slice(0, 6)}...
                    {proposal.author.id.slice(-4)}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    author
                  </Badge>
                </div>
                <span className="hidden sm:block">
                <FontAwesomeIcon icon={faSparkle} className="size-3.5" />
                </span>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 sm:text-base text-sm" />
                  <span className="whitespace-nowrap sm:text-base text-sm">
                    {compactNumber(proposal.vote_count)} votes
                  </span>
                </div>
                <span className="hidden sm:block">
                <FontAwesomeIcon icon={faSparkle} className="size-3.5" />
                </span>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 sm:text-base text-sm" />
                  {proposal.state === ProposalState.Pending ? (
                    <span className="whitespace-nowrap sm:text-base text-sm">
                      Start {$dayjs.unix(Number(proposal.start_time)).fromNow()}
                    </span>
                  ) : (
                    proposal.state === ProposalState.Active && (
                      <span className="whitespace-nowrap sm:text-base text-sm">
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
                theme === "dark"
                  ? "/images/icons/folder-black.png"
                  : "/images/icons/folder-white.png"
              }
              width={167}
              height={132}
              alt="Folder icon"
            />
            <div className="text-center">
              <h4 className="text-2xl font-semibold leading-[1.20] -tracking-[0.24px] text-content-primary mb-2">
                No proposals found
              </h4>
              <p className="text-content-default -tracking-[0.16px]">
                Create your first proposal
              </p>
            </div>
            <Button
              leftIcon={faPlus}
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
  );
}
