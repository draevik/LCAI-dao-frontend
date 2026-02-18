"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { compactNumber, cn } from "@/lib/utils";
import type { Vote } from "@/types";
import config from "@/config";
import useCurrentChain from "@/hooks/useCurrentChain";

const CHOICE_LABELS: Record<number, string> = {
  1: "For",
  2: "Against",
  3: "Abstain",
};

const choiceBadgeVariant = (
  choice: number
): "default" | "secondary" | "destructive" => {
  if (choice === 1) return "default";
  if (choice === 2) return "destructive";
  return "secondary";
};

const choiceBadgeClassName = (choice: number): string | undefined => {
  if (choice === 1) {
    return "border-emerald-500/40 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400";
  }
  return undefined;
};

interface DelegateVotingHistoryProps {
  address: string;
  votes: Record<string, Vote>;
}

export function DelegateVotingHistory({
  address,
  votes,
}: DelegateVotingHistoryProps) {
  const chain = useCurrentChain();
  const spaceId = config.governor[chain.id];
  const voteList = Object.values(votes).sort((a, b) => b.created - a.created);

  if (voteList.length === 0) {
    return (
      <div className="py-12 text-center text-content-secondary">
        No votes recorded yet.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {voteList.map((vote) => (
        <Link key={vote.id} href={`/proposal/${spaceId}/${vote.proposal}`}>
          <Card className="p-3 sm:p-4 hover:bg-surface-soft transition-colors cursor-pointer">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-content-primary truncate">
                  Proposal #{vote.proposal}
                </p>
                {vote.metadata?.reason && (
                  <p className="text-xs text-content-secondary mt-0.5 line-clamp-1">
                    {vote.metadata.reason}
                  </p>
                )}
                <p className="text-xs text-content-secondary mt-1">
                  {new Date(vote.created * 1000).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="font-semibold text-sm tabular-nums text-content-primary">
                  {compactNumber(Number(vote.vp_parsed))}
                </span>
                <Badge
                  variant={choiceBadgeVariant(vote.choice)}
                  className={cn(choiceBadgeClassName(vote.choice))}
                >
                  {CHOICE_LABELS[vote.choice] || "Unknown"}
                </Badge>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
