import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import $dayjs from "@/lib/dayjs";
import config from "@/config";
import type { Proposal } from "@/types";

interface ProposalTimelineProps {
  proposal: Proposal;
}

export function ProposalTimeline({ proposal }: ProposalTimelineProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>TIMELINE</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-gray-400 mt-2" />
            <div>
              <div className="font-medium text-sm">Published onchain</div>
              <div className="text-xs text-muted-foreground">
                {$dayjs
                  .unix(Number(proposal.created))
                  .format("MMM D, YYYY · h:mm A")}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
            <div>
              <div className="font-medium text-sm">Voting period started</div>
              <div className="text-xs text-muted-foreground">
                {$dayjs
                  .unix(Number(proposal.start_time))
                  .format("MMM D, YYYY · h:mm A")}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-orange-500 mt-2" />
            <div>
              <div className="font-medium text-sm">End voting period</div>
              <div className="text-xs text-muted-foreground">
                {$dayjs
                  .unix(Number(proposal.end_time))
                  .format("MMM D, YYYY · h:mm A")}
              </div>
            </div>
          </div>

          <div
            className={cn("flex items-start gap-3", {
              "text-muted-foreground": !proposal.execution_time,
            })}
          >
            <div className="w-2 h-2 rounded-full bg-gray-400 mt-2" />
            <div>
              <div className="font-medium text-sm">Queue proposal</div>
              {proposal.execution_time ? (
                <div className="text-xs text-muted-foreground">
                  {$dayjs
                    .unix(
                      Number(
                        proposal.execution_time - config.daoSystem.timelockDelay
                      )
                    )
                    .format("MMM D, YYYY · h:mm A")}
                </div>
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
              <div className="font-medium text-sm">Execute proposal</div>
              {proposal.execution_time ? (
                <div className="text-xs text-muted-foreground">
                  {$dayjs
                    .unix(Number(proposal.execution_time))
                    .format("MMM D, YYYY · h:mm A")}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
