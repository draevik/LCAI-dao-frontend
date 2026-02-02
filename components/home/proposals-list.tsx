"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Button } from "@/components/common/Button";
import { faPlus } from "@fortawesome/pro-regular-svg-icons";
import ProposalFilter from "@/components/proposal/ProposalFilter";
import { ProposalListItem } from "@/components/proposal/proposal-list-item";
import LoadingBlock from "@/components/loading-block";
import type { Proposal } from "@/types";

interface ProposalsListProps {
  proposals: Proposal[];
  isLoading?: boolean;
}

export function ProposalsList({ proposals, isLoading }: ProposalsListProps) {
  const { theme } = useTheme();

  const [filters, setFilters] = useState({
    status: "all",
    createdBy: "all",
    search: "",
  });

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredProposals = useMemo(() => {
    return proposals.filter((proposal) => {
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

      const matchesCreatedBy =
        filters.createdBy === "all" ||
        (filters.createdBy === "core" && proposal.author) ||
        (filters.createdBy === "community" && !proposal.author) ||
        (filters.createdBy === "me" &&
          proposal.author.id === "CURRENT_USER_ID");

      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        !filters.search ||
        proposal.metadata?.title?.toLowerCase().includes(searchLower) ||
        proposal.proposal_id.toString().includes(searchLower) ||
        proposal.author.id.toLowerCase().includes(searchLower);

      return matchesStatus && matchesCreatedBy && matchesSearch;
    });
  }, [filters, proposals]);

  return (
    <div>
      <ProposalFilter filters={filters} onFilterChange={handleFilterChange} />

      <div className="mt-4">
        {isLoading ? (
          <LoadingBlock />
        ) : filteredProposals.length ? (
          filteredProposals.map((proposal, idx) => (
            <ProposalListItem
              key={proposal.id}
              proposal={proposal}
              isLast={idx === filteredProposals.length - 1}
            />
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
