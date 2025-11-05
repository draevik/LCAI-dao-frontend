import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import $dayjs from "@/lib/dayjs";
import type { Proposal } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/pro-regular-svg-icons";

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
        <div className="mt-3 grid grid-cols-[24px_1fr_auto] gap-5">
          {/* Timeline dots */}
          <div className="flex flex-col items-center h-[calc(100% - 30px)]">
            <div className="w-6 h-6 rounded-full border border-border-default relative flex items-center justify-center shrink-0">
              <span className="w-3 h-3 absolute rounded-full bg-content-brand-light"></span>
            </div>
            <div className="w-[1px] h-[calc(100%_-80px)] border-r border-border-default"></div>
            <div className="w-6 h-6 rounded-full border border-border-default relative flex items-center justify-center shrink-0">
              <span className="w-3 h-3 absolute rounded-full bg-content-warning-light"></span>
            </div>
            <div className="w-[1px] h-[calc(100%_-80px)] border-r border-border-default"></div>
            <div className="w-6 h-6 rounded-full border border-border-default relative flex items-center justify-center shrink-0">
              <span className="w-3 h-3 absolute rounded-full bg-content-success-light"></span>
            </div>
            <div className="w-[1px] h-[calc(100%_-80px)] border-r border-border-default"></div>
            <div className="w-6 h-6 rounded-full border border-border-default relative flex items-center justify-center shrink-0">
              <span className="w-3 h-3 absolute rounded-full bg-content-secondary"></span>
            </div>
            <div className="w-[1px] h-[calc(100%_-80px)] border-r border-border-default"></div>
            <div className="w-6 h-6 rounded-full border border-border-default relative flex items-center justify-center shrink-0">
              <span className="w-3 h-3 absolute rounded-full bg-content-soft"></span>
            </div>
          </div>

          {/* Labels */}
          <div className="space-y-6 -mt-1">
            {/* Published onchain */}
            <div>
              <h4 className="text-h5-semibold text-content-primary mb-0.5">
                Published onchain
              </h4>
              <span className="text-label-12 font-semibold text-content-default">
                {$dayjs
                  .unix(Number(proposal.created))
                  .format("MMM D, YYYY · h:mm A")}
              </span>
            </div>

            {/* Voting period started */}
            <div>
              <h4 className="text-h5-semibold text-content-primary mb-0.5">
                Voting period started
              </h4>
              <span className="text-label-12 font-semibold text-content-default">
                {$dayjs
                  .unix(Number(proposal.start_time))
                  .format("MMM D, YYYY · h:mm A")}
              </span>
            </div>

            {/* End voting period */}
            <div>
              <h4 className="text-h5-semibold text-content-primary mb-0.5">
                End voting period
              </h4>
              <span className="text-label-12 font-semibold text-content-default">
                {$dayjs
                  .unix(Number(proposal.end_time))
                  .format("MMM D, YYYY · h:mm A")}
              </span>
            </div>

            {/* Queue proposal */}
            <div>
              <h4 className="text-h5-semibold text-content-primary mb-0.5">
                Queue proposal
              </h4>

              {proposal.execution_time ? (
                <span className="text-label-12 font-semibold text-content-default">
                  {$dayjs
                    .unix(
                      Number(proposal.execution_time - proposal.timelock_delay)
                    )
                    .format("MMM D, YYYY · h:mm A")}
                </span>
              ) : null}
            </div>

            {/* Execute proposal */}
            <div>
              <h4 className="text-h5-semibold text-content-primary mb-0.5">
                Execute proposal
              </h4>

              {proposal.execution_time ? (
                <span className="text-label-12 font-semibold text-content-default">
                  {$dayjs
                    .unix(Number(proposal.execution_time))
                    .format("MMM D, YYYY · h:mm A")}
                </span>
              ) : null}
            </div>
          </div>

          {/* calendar icons */}
          <div className="space-y-10">
            <div className="w-5 h-5">
              <FontAwesomeIcon
                icon={faCalendar}
                className="w-5 h-5 text-content-default"
              />
            </div>

            <div className="w-5 h-5">
              <FontAwesomeIcon
                icon={faCalendar}
                className="w-5 h-5 text-content-default"
              />
            </div>

            <div className="w-5 h-5">
              <FontAwesomeIcon
                icon={faCalendar}
                className="w-5 h-5 text-content-default"
              />
            </div>
            <div className="w-5 h-5">
              <FontAwesomeIcon
                icon={faCalendar}
                className="w-5 h-5 text-content-default"
              />
            </div>
            <div className="w-5 h-5">
              <FontAwesomeIcon
                icon={faCalendar}
                className="w-5 h-5 text-content-default"
              />
            </div>
            <div className="w-5 h-5">
              <FontAwesomeIcon
                icon={faCalendar}
                className="w-5 h-5 text-content-default"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
