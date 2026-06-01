import { useMemo } from "react";
import Markdown from "react-markdown";

interface ProposalOverviewTabProps {
  content?: string;
}

export function ProposalOverviewTab({ content }: ProposalOverviewTabProps) {
  const description = useMemo(() => {
    if (!content) return "";
    const lines = content.split("\n");
    const firstLine = lines[0]?.trim() ?? "";
    // Strip only the first title (H1 line starting with "# ")
    let desc = content;
    if (firstLine.startsWith("# ")) {
      desc = lines.slice(1).join("\n").trim() || "";
    }
    // Remove <u></u> tags from the description
    desc = desc.replace(/<\/?u>/g, "");
    return desc;
  }, [content]);

  // const discussion = useMemo(() => {
  //   const discussionUrl =
  //     (content?.split("\n\n").pop() || "").match(/\(([^)]+)\)/)?.[1] || "";
  //   return discussionUrl;
  // }, [content]);

  return (
    <div className="prose prose-sm max-w-none dark:prose-invert break-words">
      <Markdown>{description}</Markdown>

      {/* {discussion && (
        <div className="pt-4">
          <Button className="no-underline" href={discussion} variant="outline"
            target="_blank"
            rel="noopener noreferrer" rightIcon={faPaperPlane}>View Discussion</Button>
        </div>
      )} */}
    </div>
  );
}
