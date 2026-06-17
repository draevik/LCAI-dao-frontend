"use client";

import {
  CommonTable,
  type CommonTableSection,
} from "@/components/ui/common-table";
import config from "@/config";
import useCurrentChain from "@/hooks/useCurrentChain";
import useGraphqlApi from "@/hooks/useGraphqlApi";
import { compactNumber } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Settings } from "lucide-react";
import { formatUnits } from "viem";
import LoadingBlock from "../loading-block";

const DAY = 60 * 60 * 24;

const Governance = () => {
  const api = useGraphqlApi();
  const chain = useCurrentChain();
  const spaceId = config.governor[chain.id];
  const voteToken = config.voteToken[chain.id];
  const BLOCK_TIME_SECONDS = config.blockTimeSeconds[chain.id];

  const { data: spaceStats, isLoading } = useQuery({
    queryKey: ["spaceStats", spaceId],
    queryFn: () => api.loadSpaceStats(spaceId),
    enabled: !!spaceId,
  });

  const quorumParsed = spaceStats
    ? Number(formatUnits(BigInt(spaceStats.quorum), voteToken.decimals))
    : 0;
  const proposalThresholdParsed = spaceStats
    ? Number(
        formatUnits(BigInt(spaceStats.proposalThreshold), voteToken.decimals),
      )
    : 0;
  const votingDelayBlocks = spaceStats?.votingDelay ?? 0;
  const votingPeriodBlocks = spaceStats?.votingPeriod ?? 0;
  const timelockDelaySeconds = Number(spaceStats?.timelockDelay ?? 0);

  const governanceTableData: CommonTableSection[] = [
    {
      title: "Governance Parameters",
      icon: <Settings className="size-6" />,
      items: [
        {
          label: "Voting Delay",
          value: `${compactNumber(votingDelayBlocks)} blocks (~${compactNumber(
            (votingDelayBlocks * BLOCK_TIME_SECONDS) / DAY,
          )} days)`,
        },
        {
          label: "Voting Period",
          value: `${compactNumber(votingPeriodBlocks)} blocks (~${compactNumber(
            (votingPeriodBlocks * BLOCK_TIME_SECONDS) / DAY,
          )} days)`,
        },
        {
          label: "Proposal Threshold",
          value: `${compactNumber(proposalThresholdParsed)} ${voteToken.symbol}`,
        },
        {
          label: "Quorum",
          value: `${compactNumber(quorumParsed)} ${voteToken.symbol}`,
        },
        {
          label: "Timelock Delay",
          value: `${compactNumber(timelockDelaySeconds / DAY)} days`,
        },
      ],
    },
  ];

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
