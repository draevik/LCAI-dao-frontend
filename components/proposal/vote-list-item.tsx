import Blockies from "react-blockies";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Vote } from "@/types";
import { compactNumber, cn } from "@/lib/utils";
import { useCopyToClipboard } from "usehooks-ts";
import { toast } from "sonner";
import { Copy } from "lucide-react";

interface VoteListItemProps {
  vote: Vote;
  choiceLabel: string;
}

const voteBadgeVariant = (
  label: string
): "default" | "secondary" | "destructive" => {
  const key = label.toLowerCase();
  if (key === "for") return "default";
  if (key === "against") return "destructive";
  return "secondary"; // abstain, unknown
};

const voteBadgeClassName = (label: string): string | undefined => {
  if (label.toLowerCase() === "for") {
    return "border-emerald-500/40 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 dark:bg-emerald-500/20";
  }
  return undefined;
};

export function VoteListItem({ vote, choiceLabel }: VoteListItemProps) {
  const [, copy] = useCopyToClipboard();

  const handleCopy = () => {
    copy(vote.voter.id);
    toast.success("Address copied to clipboard");
  };

  return (
    <Card className="p-3 sm:p-4">
      <div className="flex items-center gap-3 sm:gap-4">
        <Blockies
          seed={vote.voter.id}
          size={18}
          scale={2}
          className="shrink-0 rounded-full ring-1 ring-border/80"
        />
        <div className="min-w-0 flex-1 flex items-center gap-2 sm:gap-3 flex-wrap">
          <span className="truncate font-medium text-sm text-content-primary">
            {vote.voter.id.slice(0, 6)}...{vote.voter.id.slice(-4)}
          </span>
          <Button
            variant="ghost"
            size="icon-sm"
            className="size-6 shrink-0 text-content-muted hover:text-content-primary"
            onClick={handleCopy}
            aria-label="Copy address"
          >
            <Copy className="size-3" />
          </Button>
        </div>
        <div className="shrink-0 flex items-center gap-3 sm:gap-4">
          <span className="font-semibold text-sm tabular-nums text-content-primary whitespace-nowrap">
            {compactNumber(Number(vote.vp_parsed))}
          </span>
          <Badge
            variant={voteBadgeVariant(choiceLabel)}
            className={cn("shrink-0", voteBadgeClassName(choiceLabel))}
          >
            {choiceLabel}
          </Badge>
        </div>
      </div>
    </Card>
  );
}
