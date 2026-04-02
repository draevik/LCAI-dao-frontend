import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { compactNumber, formatNumber } from "@/lib/utils";
import ProposalVoteIcon from "./proposal-vote-icon";
import type { Proposal } from "@/types";

interface ProposalVoteResultsProps {
  proposal: Proposal;
}

export function ProposalVoteResults({ proposal }: ProposalVoteResultsProps) {
  return (
    <Card>
      <div className="px-6">
        <h5 className="leading-[1.7] text-lg -tracking-[0.18px] font-semibold text-content-primary">
          Current Votes
        </h5>
      </div>
      <CardContent className="space-y-3">
        <div className="text-sm flex items-center justify-between gap-2">
          <span className="text-content-primary text-body-15">Quorum</span>
          <span className="text-content-primary text-body-15">
            {compactNumber(proposal.scores_1_parsed + proposal.scores_3_parsed)}{" "}
            of {compactNumber(proposal.quorum_parsed)}
          </span>
        </div>
        <div className="space-y-2.5">
          {proposal.metadata?.choices.map((choice, index) => {
            const score = proposal.scores[index];
            const percentage = score
              ? (Number(score) / Number(proposal.scores_total_parsed)) * 100
              : 0;

            return (
              <div key={index}>
                <div className="w-full p-4 text-left border border-surface-soft bg-surface-base-extralight rounded-xl transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <ProposalVoteIcon vote={index} />
                      <span className="font-medium text-base text-content-primary">
                        {choice}
                      </span>
                    </div>

                    <span className="text-sm text-content-default">
                      ({formatNumber(percentage)}%) {compactNumber(score)}
                    </span>
                  </div>

                  <Progress value={percentage} className="h-1.5" />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
