import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { compactNumber } from "@/lib/utils";
import ProposalVoteIcon from "./proposal-vote-icon";
import type { Proposal } from "@/types";

interface ProposalVoteResultsProps {
  proposal: Proposal;
}

export function ProposalVoteResults({ proposal }: ProposalVoteResultsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Vote Results
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm flex items-center justify-between gap-2">
          <span>Quorum</span>
          <span>
            {compactNumber(proposal.scores_1_parsed + proposal.scores_3_parsed)}{" "}
            of {compactNumber(proposal.quorum_parsed)}
          </span>
        </div>
        <div className="space-y-3">
          {proposal.metadata?.choices.map((choice, index) => {
            const score = proposal.scores[index];
            const percentage = score
              ? (Number(score) / Number(proposal.scores_total_parsed)) * 100
              : 0;

            return (
              <div key={index}>
                <div className="w-full p-3 text-left border rounded-lg transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <ProposalVoteIcon vote={index} />
                      <span className="font-medium text-sm">{choice}</span>
                    </div>

                    <span className="text-xs text-muted-foreground">
                      ({percentage}%) {compactNumber(score)}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <Progress value={percentage} className="h-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
