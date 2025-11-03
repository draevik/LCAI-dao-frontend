import { VoteListItem } from "./vote-list-item";
import type { Vote } from "@/types";
import Image from "next/image";
import { useTheme } from "next-themes";

interface ProposalVotesTabProps {
  votes?: Vote[];
  choices?: string[];
}

export function ProposalVotesTab({ votes, choices }: ProposalVotesTabProps) {
  const { theme } = useTheme();
  return (
    <div className="space-y-4">
      <div className="text-sm text-content-secondary">
        Showing {votes?.length.toLocaleString() ?? 0} addresses
      </div>

      <div className="space-y-3">
        {!votes?.length ? (
          <div className="flex flex-col gap-6 items-center pt-15 pb-15">
            <Image
              className="max-w-30 sm:max-w-max"
              src={
                theme == "dark"
                  ? "/images/icons/folder-black.png"
                  : "/images/icons/folder-white.png"
              }
              width={167}
              height={132}
              alt="Folder icon"
            ></Image>
            <div className="text-center">
              <h4 className="text-2xl font-smeibold leading-[1.20] -tracking-[0.24px] text-content-primary mb-2">
                No votes found
              </h4>
              <p className="text-content-default -tracking-[0.16px]">
                Be the first to vote on this proposal
              </p>
            </div>
          </div>
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
