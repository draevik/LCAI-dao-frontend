"use client";

import {
  CircleDollarSign,
  ShieldOff,
  Telescope,
  Timer,
  UserStar,
  Wallet,
} from "lucide-react";
import { CommonTable } from "@/components/ui/common-table";
import { useMemo } from "react";
import { useAIConfigParams } from "@/hooks/useAIConfigParams";
import { formatBps, secondsToTime, truncateAddress } from "@/lib/utils";
import { formatEther } from "viem";
import LoadingBlock from "@/components/loading-block";

const AiConfig = () => {
  const { data: aiConfigParams, isLoading } = useAIConfigParams();

  const aiConfigTableData = useMemo(() => {
    if (!aiConfigParams) return [];
    return [
      {
        title: "Timeouts",
        icon: <Timer className="size-6" />,
        items: [
          {
            label: "Dispute Window",
            value: `${aiConfigParams.disputeWindow}s (${secondsToTime(
              aiConfigParams.disputeWindow
            )})`,
          },
          {
            label: "Resolution Timeout",
            value: `${aiConfigParams.resolutionTimeout}s (${secondsToTime(
              aiConfigParams.resolutionTimeout
            )})`,
          },
          {
            label: "Completion Timeout",
            value: `${aiConfigParams.completionTimeout}s (${secondsToTime(
              aiConfigParams.completionTimeout
            )})`,
          },
          {
            label: "Ack Timeout",
            value: `${aiConfigParams.ackTimeout}s (${secondsToTime(
              aiConfigParams.ackTimeout
            )})`,
          },
          {
            label: "Session Inactivity Timeout",
            value: `${
              aiConfigParams.sessionInactivityTimeout
            }s (${secondsToTime(aiConfigParams.sessionInactivityTimeout)})`,
          },
          {
            label: "Blob Retention Period",
            value: `${aiConfigParams.blobRetentionPeriod}s (${secondsToTime(
              aiConfigParams.blobRetentionPeriod
            )})`,
          },
          {
            label: "Min Ack Timeout",
            value: `${aiConfigParams.minAckTimeout}s (${secondsToTime(
              aiConfigParams.minAckTimeout
            )})`,
          },
          {
            label: "Min Dispute Window",
            value: `${aiConfigParams.minDisputeWindow}s (${secondsToTime(
              aiConfigParams.minDisputeWindow
            )})`,
          },
          {
            label: "Min Resolution Timeout",
            value: `${aiConfigParams.minResolutionTimeout}s (${secondsToTime(
              aiConfigParams.minResolutionTimeout
            )})`,
          },
        ],
      },
      {
        title: "Fee Distribution",
        icon: <CircleDollarSign className="size-6" />,
        items: [
          {
            label: "Protocol Fee",
            value: `${formatBps(aiConfigParams.protocolFeeBps)}`,
          },
          {
            label: "Worker Fee",
            value: `${formatBps(aiConfigParams.workerFeeBps)}`,
          },
        ],
      },
      {
        title: "Slashing",
        icon: <ShieldOff className="size-6" />,
        items: [
          {
            label: "Timeout Slash",
            value: `${formatBps(aiConfigParams.timeoutSlashBps)}`,
          },
          {
            label: "Completion Timeout Slash",
            value: `${formatBps(aiConfigParams.completionTimeoutSlashBps)}`,
          },
          {
            label: "Dispute Slash",
            value: `${formatBps(aiConfigParams.disputeSlashBps)}`,
          },
          {
            label: "Dispute Bond Multiplier",
            value: `${aiConfigParams.disputeBondMultiplier}x`,
          },
          {
            label: "Max Slash",
            value: `${formatBps(aiConfigParams.maxSlashBps)}`,
          },
        ],
      },
      {
        title: "Quality & Sampling",
        icon: <Telescope className="size-6" />,
        items: [
          {
            label: "Similarity Threshold",
            value: `${formatBps(aiConfigParams.similarityThreshold)}`,
          },
          {
            label: "Canary Similarity Threshold",
            value: `${formatBps(aiConfigParams.canarySimilarityThreshold)}`,
          },
          {
            label: "Sampling Rate",
            value: `${formatBps(aiConfigParams.samplingRateBps)}`,
          },
        ],
      },
      {
        title: "Worker & Session",
        icon: <UserStar className="size-6" />,
        items: [
          {
            label: "Min Worker Stake",
            value: `${+formatEther(aiConfigParams.minWorkerStake)} LCAI`,
          },
          {
            label: "Max Reassignments",
            value: `${aiConfigParams.maxReassignments}`,
          },
          {
            label: "Fee Pool",
            value: `${formatBps(aiConfigParams.feePoolBps)}`,
          },
          {
            label: "Suspension Threshold",
            value: `${aiConfigParams.suspensionThreshold} offenses`,
          },
          {
            label: "Suspension Cooldown",
            value: `${aiConfigParams.suspensionCooldown}s (${secondsToTime(
              aiConfigParams.suspensionCooldown
            )})`,
          },
        ],
      },
      {
        title: "Addresses",
        icon: <Wallet className="size-6" />,
        items: [
          {
            label: "Dispatcher",
            value: `${truncateAddress(aiConfigParams.dispatcherAddress)}`,
          },
          {
            label: "Disputer",
            value: `${truncateAddress(aiConfigParams.disputerAddress)}`,
          },
        ],
      },
    ];
  }, [aiConfigParams]);

  return (
    <div>
      <div className="pt-2 pb-10 gap-3">
        <h2 className="text-4xl font-semibold leading-[1.2] tracking-[-0.36px] text-content-primary">
          AI Config
        </h2>
        <p className="text-base leading-normal tracking-[-0.16px] text-content-default">
          DAO-governed parameters for the AI inference network. Changes require
          a governance proposal.
        </p>
      </div>

      {isLoading ? (
        <LoadingBlock className="max-w-full py-16" />
      ) : (
        <CommonTable sections={aiConfigTableData} columns={4} />
      )}
    </div>
  );
};

export default AiConfig;
