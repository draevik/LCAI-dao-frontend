import config from "@/config";
import useWeb3Clients from "./useWeb3Clients";
import { useQuery } from "@tanstack/react-query";
import aiConfigAbi from "@/contracts/abi/aiConfigAbi";

const PARAM_FUNCTIONS = [
  "getAckTimeout",
  "getBlobRetentionPeriod",
  "getCanarySimilarityThreshold",
  "getCompletionTimeout",
  "getCompletionTimeoutSlashBps",
  "getDispatcherAddress",
  "getDisputeBondMultiplier",
  "getDisputeSlashBps",
  "getDisputeWindow",
  "getDisputerAddress",
  "getFeePoolBps",
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

const chain = config.chains[0];

export function useAIConfigParams() {
  const { publicClient } = useWeb3Clients({ chain });
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
            }),
        ),
      );

      return {
        ackTimeout: data[0] as bigint,
        blobRetentionPeriod: data[1] as bigint,
        canarySimilarityThreshold: data[2] as bigint,
        completionTimeout: data[3] as bigint,
        completionTimeoutSlashBps: data[4] as bigint,
        dispatcherAddress: data[5] as `0x${string}`,
        disputeBondMultiplier: data[6] as bigint,
        disputeSlashBps: data[7] as bigint,
        disputeWindow: data[8] as bigint,
        disputerAddress: data[9] as `0x${string}`,
        feePoolBps: data[10] as bigint,
        maxReassignments: data[11] as bigint,
        maxSlashBps: data[12] as bigint,
        minAckTimeout: data[13] as bigint,
        minDisputeWindow: data[14] as bigint,
        minResolutionTimeout: data[15] as bigint,
        minWorkerStake: data[16] as bigint,
        protocolFeeBps: data[17] as bigint,
        resolutionTimeout: data[18] as bigint,
        samplingRateBps: data[19] as bigint,
        sessionInactivityTimeout: data[20] as bigint,
        similarityThreshold: data[21] as bigint,
        suspensionCooldown: data[22] as bigint,
        suspensionThreshold: data[23] as bigint,
        timeoutSlashBps: data[24] as bigint,
        workerFeeBps: data[25] as bigint,
      };
    },
  });
}
