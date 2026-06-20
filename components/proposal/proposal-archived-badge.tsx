import { cn } from "@/lib/utils";

type ProposalArchivedBadgeProps = {
  className?: string;
};

export function ProposalArchivedBadge({
  className,
}: ProposalArchivedBadgeProps) {
  return (
    <div
      className={cn(
        "bg-surface-base-extralight rounded-full text-content-default px-2.5 py-1 w-fit text-xs",
        className
      )}
    >
      Archived
    </div>
  );
}
