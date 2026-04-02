import { CircleDollarSign, ShieldOff, Telescope, Timer, UserStar, Wallet } from "lucide-react";
import { CommonTable, type CommonTableSection } from "@/components/ui/common-table";

const aiConfigTableData: CommonTableSection[] = [
  {
    title: "Timeouts",
    icon: <Timer className="size-6" />,
    items: [
      { label: "Dispute Window", value: "86400s (~24 hours)" },
      { label: "Resolution Timeout", value: "172800s (~2 days)" },
      { label: "Completion Timeout", value: "120s (~2 minutes)" },
      { label: "Ack Timeout", value: "30s (~30 seconds)" },
      { label: "Session Inactivity Timeout", value: "1800s (~30 minutes)" },
      { label: "Blob Retention Period", value: "1555200s (~18 days)" },
      { label: "Min Ack Timeout", value: "30s (~30 seconds)" },
      { label: "Min Dispute Window", value: "3600s (~60 minutes)" },
      { label: "Min Resolution Timeout", value: "3600s (~60 minutes)" },
    ],
  },
  {
    title: "Fee Distribution",
    icon: <CircleDollarSign className="size-6" />,
    items: [
      { label: "Protocol Fee", value: "15% (1500 bps)" },
      { label: "Worker Fee", value: "80% (8000 bps)" },
      { label: "Burn Fee", value: "5% (500 bps)" },
    ],
  },
  {
    title: "Slashing",
    icon: <ShieldOff className="size-6" />,
    items: [
      { label: "Timeout Slash", value: "7.5% (750 bps)" },
      { label: "Completion Timeout Slash", value: "15% (1500 bps)" },
      { label: "Dispute Slash", value: "25% (2500 bps)" },
      { label: "Dispute Bond Multiplier", value: "10000x" },
      { label: "Max Slash", value: "50% (5000 bps)" },
    ],
  },
  {
    title: "Quality & Sampling",
    icon: <Telescope className="size-6" />,
    items: [
      { label: "Similarity Threshold", value: "95% (9500 bps)" },
      { label: "Canary Similarity Threshold", value: "98% (9800 bps)" },
      { label: "Sampling Rate", value: "5% (500 bps)" },
    ],
  },
  {
    title: "Worker & Session",
    icon: <UserStar className="size-6" />,
    items: [
      { label: "Min Worker Stake", value: "5000.0 ETH" },
      { label: "Max Reassignments", value: "3" },
      { label: "Max Blobs Per Job", value: "6" },
      { label: "Suspension Threshold", value: "3 offenses" },
      { label: "Suspension Cooldown", value: "604800s (~7 days)" },
    ],
  },
  {
    title: "Addresses",
    icon: <Wallet className="size-6" />,
    items: [
      { label: "Dispatcher", value: "0x7099...79C8" },
      { label: "Disputer", value: "0x15d3...6A65" },
    ],
  },
];

const AiConfig = () => {
  return (
    <div>
      <div className="pt-2 pb-10 gap-3">
        <h2 className="text-4xl font-semibold leading-[1.2] tracking-[-0.36px] text-content-primary">AI Config</h2>
        <p className="text-base leading-normal tracking-[-0.16px] text-content-default">
          DAO-governed parameters for the AI inference network. Changes require a governance proposal.
        </p>
      </div>

      <CommonTable sections={aiConfigTableData} columns={4} />
    </div>
  )
}

export default AiConfig