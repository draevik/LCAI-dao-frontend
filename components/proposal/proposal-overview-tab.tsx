import { useMemo } from "react";
import Markdown from "react-markdown";
import { Button } from "../common/Button";
import { faPaperPlane } from "@fortawesome/pro-regular-svg-icons";

interface ProposalOverviewTabProps {
  content?: string;
}

export function ProposalOverviewTab({ content }: ProposalOverviewTabProps) {
  const description = useMemo(
    () => content?.split("\n\n").slice(1, -1).join("\n\n") ?? "",
    [content]
  );

  const discussion = useMemo(() => {
    const discussionUrl =
      (content?.split("\n\n").pop() || "").match(/\(([^)]+)\)/)?.[1] || "";
    return discussionUrl;
  }, [content]);

  return (
    <div className="prose prose-sm max-w-none dark:prose-invert">
      <Markdown>{description}</Markdown>

      {discussion && (
        <div className="pt-4">
          <Button className="no-underline" href={discussion} variant="outline"
            target="_blank"
            rel="noopener noreferrer" rightIcon={faPaperPlane}>View Discussion</Button>
        </div>
      )}
    </div>
  );
}
