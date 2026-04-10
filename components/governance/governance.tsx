"use client";

import { CommonTable } from "@/components/ui/common-table";
import config from "@/config";
import { useGovernanceParams } from "@/hooks/useGovernanceParams";
import { compactNumber, secondsToTime } from "@/lib/utils";
import { Settings } from "lucide-react";
import { useMemo } from "react";
import { mainnet } from "viem/chains";
import LoadingBlock from "@/components/loading-block";

const Governance = () => {
  const { data: governanceParams, isLoading } = useGovernanceParams();

  const governanceTableData = useMemo(() => {
    if (!governanceParams) return [];
    return [
      {
        title: "Governance Parameters",
        icon: <Settings className="size-6" />,
        items: [
          {
            label: "Voting Delay",
            value: `${compactNumber(
              governanceParams.votingDelayInBlocks
            )} blocks (${secondsToTime(governanceParams.votingDelay)})`,
          },
          {
            label: "Voting Period",
            value: `${compactNumber(
              governanceParams.votingPeriodInBlocks
            )} blocks (${secondsToTime(governanceParams.votingPeriod)})`,
          },
          {
            label: "Proposal Threshold",
            value: `${compactNumber(governanceParams.proposalThreshold)} ${
              config.underlyingToken[mainnet.id].symbol
            }`,
          },
          {
            label: "Quorum",
            value: `${governanceParams.quorumNumerator}% (${compactNumber(
              (governanceParams.totalSupply *
                governanceParams.quorumNumerator) /
                100
            )} ${config.underlyingToken[mainnet.id].symbol})`,
          },
          {
            label: "Timelock Delay",
            value: `${secondsToTime(governanceParams.timelockDelay)}`,
          },
        ],
      },
    ];
  }, [governanceParams]);

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

      {isLoading ? (
        <LoadingBlock className="max-w-full py-16" />
      ) : (
        <CommonTable sections={governanceTableData} columns={4} />
      )}
    </div>
  );
};

export default Governance;
