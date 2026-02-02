"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Clock, Users } from "lucide-react";
import { compactNumber } from "@/lib/utils";
import $dayjs from "@/lib/dayjs";
import ProposalStatusBadge from "@/components/proposal/proposal-status-badge";
import { ProposalState } from "@/lib/constents";
import type { Proposal } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSparkle } from "@fortawesome/pro-regular-svg-icons";

interface ProposalListItemProps {
  proposal: Proposal;
  isLast?: boolean;
}

export function ProposalListItem({ proposal, isLast }: ProposalListItemProps) {
  const votingPower = Number(proposal.scores_total_parsed ?? 0);

  return (
    <Link
      href={`/proposal/${proposal.id}`}
      className={`sm:py-8 py-5 px-6 block transition-all duration-300 hover:bg-surface-soft hover:border-surface-soft/20 ${
        isLast ? "" : "border-b border-border-default"
      }`}
    >
      <h3 className="text-content-primary flex items-baseline font-semibold leading-[1.2] tracking-[-0.24px] md:text-2xl sm:text-xl text-lg capitalize">
        <ProposalStatusBadge status={proposal.state} />
        {proposal.metadata?.title}
      </h3>

      <div className="flex flex-wrap sm:flex-nowrap items-center gap-x-4 gap-y-2 mt-4">
        <div className="flex items-center gap-3">
          <span className="sm:text-base text-sm">
            #{proposal.proposal_id.toString().slice(0, 6)}...
          </span>
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
            {compactNumber(proposal.vote_count)} voters (
            {compactNumber(votingPower)})
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
  );
}
