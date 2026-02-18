"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { compactNumber } from "@/lib/utils";
import type { Delegate, User, Vote } from "@/types";

interface DelegateProfileStatsProps {
  delegate: Delegate | null;
  user: User | null;
  votes: Record<string, Vote>;
}

export function DelegateProfileStats({
  delegate,
  user,
  votes,
}: DelegateProfileStatsProps) {
  const voteCount = Object.keys(votes).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Governance Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-medium text-content-secondary">
              Voting Power
            </p>
            <p className="text-xl font-bold text-content-primary">
              {delegate ? compactNumber(delegate.votingPowerParsed) : "0"}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-content-secondary">
              Delegators
            </p>
            <p className="text-xl font-bold text-content-primary">
              {delegate?.delegatorCount ?? 0}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-content-secondary">
              Proposals Created
            </p>
            <p className="text-xl font-bold text-content-primary">
              {delegate?.user?.proposalCount ?? 0}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-content-secondary">
              Votes Cast
            </p>
            <p className="text-xl font-bold text-content-primary">
              {voteCount}
            </p>
          </div>
        </div>

        {(user?.created ?? 0) > 0 && (
          <div className="pt-2 border-t border-border-default">
            <p className="text-xs text-content-secondary">
              Member since{" "}
              {new Date(user.created * 1000).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
