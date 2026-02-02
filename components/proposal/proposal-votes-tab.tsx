import { useState } from "react";
import { VoteListItem } from "./vote-list-item";
import type { Proposal } from "@/types";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useQuery } from "@tanstack/react-query";
import useGraphqlApi from "@/hooks/useGraphqlApi";
import { cn, compactNumber } from "@/lib/utils";
import LoadingBlock from "@/components/loading-block";

type VoteFilter = "any" | "for" | "against" | "abstain";

interface ProposalVotesTabProps {
  proposal: Proposal;
}

const VOTE_TABS: { value: VoteFilter; label: string }[] = [
  { value: "any", label: "All" },
  { value: "for", label: "For" },
  { value: "against", label: "Against" },
  { value: "abstain", label: "Abstain" },
];

export function ProposalVotesTab({ proposal }: ProposalVotesTabProps) {
  const { theme } = useTheme();
  const api = useGraphqlApi();
  const [activeFilter, setActiveFilter] = useState<VoteFilter>("any");

  const { data: votes, isLoading } = useQuery({
    queryKey: ["votes", proposal.id, activeFilter],
    queryFn: () =>
      api.loadProposalVotes(
        proposal,
        { limit: 100, skip: 0 },
        activeFilter,
        "vp-desc"
      ),
    enabled: Boolean(proposal),
  });

  const choices = proposal.metadata?.choices ?? proposal.choices;

  return (
    <div className="space-y-4">
      {/* Vote Type Tabs */}
      <div className="flex gap-2 flex-wrap">
        {VOTE_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveFilter(tab.value)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors",
              activeFilter === tab.value
                ? "bg-[image:var(--gradient-primary)] text-white"
                : "bg-surface-soft text-content-primary hover:bg-surface-soft/80"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="text-sm text-content-primary">
          {compactNumber(votes?.length ?? 0)} addresses
        </div>
        <div className="text-sm text-content-primary">
          {compactNumber(
            votes?.reduce((acc, vote) => acc + Number(vote.vp_parsed), 0)
          ) ?? 0}{" "}
          Votes
        </div>
      </div>

      {isLoading ? (
        <LoadingBlock />
      ) : (
        <div className="space-y-3">
          {!votes?.length ? (
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
                <h4 className="text-2xl font-semibold leading-[1.20] -tracking-[0.24px] text-content-primary mb-2">
                  No votes found
                </h4>
                <p className="text-content-default -tracking-[0.16px]">
                  {activeFilter === "any"
                    ? "Be the first to vote on this proposal"
                    : `No ${activeFilter} votes yet`}
                </p>
              </div>
            </div>
          ) : (
            votes.map((vote, index) => (
              <VoteListItem
                key={vote.id || index}
                vote={vote}
                choiceLabel={choices?.[vote.choice - 1] ?? "Unknown"}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
