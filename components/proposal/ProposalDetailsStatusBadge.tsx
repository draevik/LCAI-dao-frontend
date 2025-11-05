import { ProposalState, ProposalStateLabel } from "@/lib/constents";

type Props = {
  status: number;
};

export default function ProposalDetailsStatusBadge({ status }: Props) {
  switch (status) {
    case ProposalState.Pending:
      return (
        <div className="bg-surface-base-extralight rounded-full text-content-default px-2.5 py-1 w-fit text-xs">
          Pending
        </div>
      );
    case ProposalState.Active:
      return (
        <div className="bg-surface-base-extralight rounded-full text-content-default px-2.5 py-1 w-fit text-xs">
          Active
        </div>
      );
    case ProposalState.Succeeded:
      return (
        <div className="bg-surface-base-extralight rounded-full text-content-default px-2.5 py-1 w-fit text-xs">
          Passed
        </div>
      );
    case ProposalState.Canceled:
    case ProposalState.Defeated:
      return (
        <div className="bg-surface-base-extralight rounded-full text-content-default px-2.5 py-1 w-fit text-xs">
          Rejected
        </div>
      );
    default:
      return (
        <div className="bg-surface-base-extralight rounded-full text-content-default px-2.5 py-1 w-fit text-xs capitalize">
          {ProposalStateLabel[status]}
        </div>
      );
  }
}
