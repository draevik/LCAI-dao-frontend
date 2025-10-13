import { Badge } from "@/components/ui/badge";
import { ProposalState, ProposalStateLabel } from "@/lib/constents";
import { ClockIcon, CheckCircle, RadioIcon, XCircle } from "lucide-react";

type Props = {
  status: number;
  iconOnly?: boolean;
};

export default function ProposalStatusBadge({ status, iconOnly }: Props) {
  switch (status) {
    case ProposalState.Pending:
      return (
        <Badge className="bg-gray-500/10 text-gray-200 hover:bg-gray-500/20">
          <ClockIcon className="size-5 text-gray-200" />{" "}
          {iconOnly ? null : <span>Pending</span>}
        </Badge>
      );
    case ProposalState.Active:
      return (
        <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">
          <RadioIcon className="size-5 text-green-500" />{" "}
          {iconOnly ? null : <span>Active</span>}
        </Badge>
      );
    case ProposalState.Succeeded:
      return (
        <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">
          <CheckCircle className="size-5 text-green-500" />{" "}
          {iconOnly ? null : <span>Passed</span>}
        </Badge>
      );
    case ProposalState.Canceled:
    case ProposalState.Defeated:
      return (
        <Badge className="bg-red-500/10 text-red-600 hover:bg-red-500/20">
          <XCircle className="size-5 text-red-500" />{" "}
          {iconOnly ? null : <span>Rejected</span>}
        </Badge>
      );
    default:
      return <Badge variant="secondary">{ProposalStateLabel[status]}</Badge>;
  }
}
