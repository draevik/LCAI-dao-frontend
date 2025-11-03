import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import $dayjs from "@/lib/dayjs";
import type { Proposal } from "@/types";

interface ProposalTimelineProps {
  proposal: Proposal;
}

export function ProposalTimeline({ proposal }: ProposalTimelineProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-content-primary">Timeline</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-5">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-gray-400 mt-2" />
            <div>
              <span className="font-semibold text-content-primary block">Published onchain</span>
              <span className="text-xs text-content-secondary font-semibold">
                {$dayjs
                  .unix(Number(proposal.created))
                  .format("MMM D, YYYY · h:mm A")}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
            <div>
              <span className="font-semibold text-content-primary block">Voting period started</span>
              <span className="text-xs text-content-secondary font-semibold">
                {$dayjs
                  .unix(Number(proposal.start_time))
                  .format("MMM D, YYYY · h:mm A")}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-orange-500 mt-2" />
            <div>
              <span className="font-semibold text-content-primary block">End voting period</span>
              <span className="text-xs text-content-secondary font-semibold">
                {$dayjs
                  .unix(Number(proposal.end_time))
                  .format("MMM D, YYYY · h:mm A")}
              </span>
            </div>
          </div>

          <div
            className={cn("flex items-start gap-3", {
              "text-muted-foreground": !proposal.execution_time,
            })}
          >
            <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2" />
            <div>
              <span className="font-semibold text-content-primary block">Queue proposal</span>
              {proposal.execution_time ? (
                <span className="text-xs text-muted-foreground">
                  {$dayjs
                    .unix(
                      Number(proposal.execution_time - proposal.timelock_delay)
                    )
                    .format("MMM D, YYYY · h:mm A")}
                </span>
              ) : null}
            </div>
          </div>

          <div
            className={cn("flex items-start gap-3", {
              "text-muted-foreground": !proposal.execution_time,
            })}
          >
            <div className="w-2 h-2 rounded-full bg-gray-400 mt-2" />
            <div>
              <span className="font-semibold text-content-primary block">Execute proposal</span>
              {proposal.execution_time ? (
                <span className="text-xs text-content-secondary font-semibold">
                  {$dayjs
                    .unix(Number(proposal.execution_time))
                    .format("MMM D, YYYY · h:mm A")}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
