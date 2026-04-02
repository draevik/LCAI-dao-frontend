import {
  CommonTable,
  type CommonTableSection,
} from "@/components/ui/common-table";
import config from "@/config";
import { compactNumber } from "@/lib/utils";
import { Settings } from "lucide-react";
import { mainnet } from "viem/chains";

const DAY = 60 * 60 * 24;

const governanceTableData: CommonTableSection[] = [
  {
    title: "Governance Parameters",
    icon: <Settings className="size-6" />,
    items: [
      {
        label: "Voting Delay",
        value: `${compactNumber(
          config.daoSystem.proposalDelay / 12
        )} blocks (~${config.daoSystem.proposalDelay / DAY} days)`,
      },
      {
        label: "Voting Period",
        value: `${compactNumber(config.daoSystem.votingPeriod / 12)} blocks (~${
          config.daoSystem.votingPeriod / DAY
        } days)`,
      },
      {
        label: "Proposal Threshold",
        value: `${compactNumber(config.daoSystem.proposalThreshold)} ${
          config.underlyingToken[mainnet.id].symbol
        }`,
      },
      {
        label: "Quorum",
        value: `${config.daoSystem.quorumNeeded}% (${compactNumber(
          (config.daoSystem.totalSupply * config.daoSystem.quorumNeeded) / 100
        )} ${config.underlyingToken[mainnet.id].symbol})`,
      },
      {
        label: "Timelock Delay",
        value: `${config.daoSystem.timelockDelay / DAY} days`,
      },
    ],
  },
];

const Governance = () => {
  return (
    <div>
      <div className="pt-2 pb-10 gap-3">
        <h2 className="text-4xl font-semibold leading-[1.2] tracking-[-0.36px] text-content-primary">
          Governance
        </h2>
        <p className="text-base leading-normal tracking-[-0.16px] text-content-default">
          DAO-governed parameters for the protocol's decision-making process.
        </p>
      </div>

      <CommonTable sections={governanceTableData} columns={4} />
    </div>
  );
};

export default Governance;
