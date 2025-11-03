import Blockies from "react-blockies";
import { Card } from "@/components/ui/card";
import $dayjs from "@/lib/dayjs";
import type { Vote } from "@/types";

interface VoteListItemProps {
  vote: Vote;
  choiceLabel: string;
}

export function VoteListItem({ vote, choiceLabel }: VoteListItemProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Blockies
            seed={vote.voter.id}
            size={16}
            scale={2}
            className="rounded-full"
          />
          <div>
            <div className="font-medium text-sm text-content-primary">{vote.voter.id}</div>
            <div className="text-xs text-content-secondary">
              Voted for: <span className="font-medium">{choiceLabel}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-medium text-sm text-content-primary">
            {vote.vp_parsed.toLocaleString()}
          </div>
          <div className="text-xs text-content-secondary">
            {$dayjs.unix(vote.created).format("MMM D, YYYY · h:mm A")}
          </div>
        </div>
      </div>
    </Card>
  );
}
