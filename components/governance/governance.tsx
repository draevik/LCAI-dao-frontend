import { CommonTable, type CommonTableSection } from "@/components/ui/common-table";
import { Settings } from "lucide-react";

const governanceTableData: CommonTableSection[] = [
  {
    title: "Governance Parameters",
    icon: <Settings className="size-6" />,
    items: [
      { label: "Voting Delay", value: "150 blocks (~5 minutes)" },
      { label: "Voting Period", value: "450 blocks (~15 minutes)" },
      { label: "Proposal Threshold", value: "1000.0 ETH" },
      { label: "Quorum", value: "4%" },
      { label: "Timelock Delay", value: "120 seconds (~2 minutes)" },
    ],
  },
];

const Governance = () => {
  return (
    <div>
      <div className="pt-2 pb-10 gap-3">
        <h2 className="text-4xl font-semibold leading-[1.2] tracking-[-0.36px] text-content-primary">Governance</h2>
        <p className="text-base leading-normal tracking-[-0.16px] text-content-default">
          DAO-governed parameters for the protocol's decision-making process.
        </p>
      </div>

      <CommonTable sections={governanceTableData} columns={4} />
    </div>
  )
}

export default Governance