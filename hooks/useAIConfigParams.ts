import config, { lcaiDevnet } from "@/config";
import useWeb3Clients from "./useWeb3Clients";
import { useQuery } from "@tanstack/react-query";
import aiConfigAbi from "@/contracts/abi/aiConfigAbi";

const PARAM_FUNCTIONS = [
  "getAckTimeout",
  "getBlobRetentionPeriod",
  "getBurnFeeBps",
  "getCanarySimilarityThreshold",
  "getCompletionTimeout",
  "getCompletionTimeoutSlashBps",
  "getDispatcherAddress",
  "getDisputeBondMultiplier",
  "getDisputeSlashBps",
  "getDisputeWindow",
  "getDisputerAddress",
  "getMaxBlobsPerJob",
  "getMaxReassignments",
  "getMaxSlashBps",
  "getMinAckTimeout",
  "getMinDisputeWindow",
  "getMinResolutionTimeout",
  "getMinWorkerStake",
  "getProtocolFeeBps",
  "getResolutionTimeout",
  "getSamplingRateBps",
  "getSessionInactivityTimeout",
  "getSimilarityThreshold",
  "getSuspensionCooldown",
  "getSuspensionThreshold",
  "getTimeoutSlashBps",
  "getWorkerFeeBps",
] as const;

const chain = lcaiDevnet;

export function useAIConfigParams() {
  const { publicClient } = useWeb3Clients();
  const aiConfigAddress = config.aiConfig[chain.id];

  return useQuery({
    queryKey: ["ai-config", chain.id],
    queryFn: async () => {
      const data = await Promise.all(
        PARAM_FUNCTIONS.map(
          async (functionName) =>
            await publicClient.readContract({
              address: aiConfigAddress,
              abi: aiConfigAbi,
              functionName,
            })
        )
      );

      return {
        ackTimeout: data[0] as bigint,
        blobRetentionPeriod: data[1] as bigint,
        burnFeeBps: data[2] as bigint,
        canarySimilarityThreshold: data[3] as bigint,
        completionTimeout: data[4] as bigint,
        completionTimeoutSlashBps: data[5] as bigint,
        dispatcherAddress: data[6] as `0x${string}`,
        disputeBondMultiplier: data[7] as bigint,
        disputeSlashBps: data[8] as bigint,
        disputeWindow: data[9] as bigint,
        disputerAddress: data[10] as `0x${string}`,
        maxBlobsPerJob: data[11] as bigint,
        maxReassignments: data[12] as bigint,
        maxSlashBps: data[13] as bigint,
        minAckTimeout: data[14] as bigint,
        minDisputeWindow: data[15] as bigint,
        minResolutionTimeout: data[16] as bigint,
        minWorkerStake: data[17] as bigint,
        protocolFeeBps: data[18] as bigint,
        resolutionTimeout: data[19] as bigint,
        samplingRateBps: data[20] as bigint,
        sessionInactivityTimeout: data[21] as bigint,
        similarityThreshold: data[22] as bigint,
        suspensionCooldown: data[23] as bigint,
        suspensionThreshold: data[24] as bigint,
        timeoutSlashBps: data[25] as bigint,
        workerFeeBps: data[26] as bigint,
      };
    },
  });
}
