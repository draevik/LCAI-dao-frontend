import { ExternalLinkIcon } from "lucide-react";
import { useMemo } from "react";
import Markdown from "react-markdown";

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
          <a
            href={discussion}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <ExternalLinkIcon className="h-4 w-4" />
            View Discussion
          </a>
        </div>
      )}
    </div>
  );
}
