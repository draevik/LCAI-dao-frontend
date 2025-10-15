import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { VoteListItem } from "./vote-list-item";
import type { Vote } from "@/types";

interface ProposalVotesTabProps {
  votes?: Vote[];
  choices?: string[];
}

export function ProposalVotesTab({ votes, choices }: ProposalVotesTabProps) {
  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Showing {votes?.length.toLocaleString() ?? 0} addresses
      </div>

      <div className="space-y-3">
        {!votes?.length ? (
          <Empty className="border border-dashed">
            <EmptyHeader>
              <EmptyTitle>No votes found</EmptyTitle>
              <EmptyDescription>
                Be the first to vote on this proposal
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          votes.map((vote, index) => (
            <VoteListItem
              key={index}
              vote={vote}
              choiceLabel={choices?.[vote.choice - 1] ?? "Unknown"}
            />
          ))
        )}
      </div>
    </div>
  );
}
