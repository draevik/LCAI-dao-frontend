import { CheckCircleIcon, XCircleIcon, CircleMinusIcon } from "lucide-react";

export default function ProposalVoteIcon({ vote }: { vote: number }) {
  switch (vote) {
    case 0:
      return <CheckCircleIcon className="size-4 text-green-500" />;
    case 1:
      return <XCircleIcon className="size-4 text-red-500" />;
    case 2:
      return <CircleMinusIcon className="size-4 text-gray-500" />;
    default:
      return null;
  }
}
