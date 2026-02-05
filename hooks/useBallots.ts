import config from "@/config";
import useCurrentChain from "./useCurrentChain";
import useWeb3Clients from "./useWeb3Clients";
import { useConnection, useReadContracts } from "wagmi";
import { useMemo } from "react";
import { erc20Abi, formatUnits, getContract, parseUnits } from "viem";
import { MAX_UINT256 } from "@/lib/utils";
import { toast } from "sonner";
import voteTokenAbi from "@/contracts/abi/voteTokenAbi";

function handleTxError(error: unknown, action: string) {
  console.error(`${action.toLowerCase()} error:`, error);
  const err = error as { walk?: () => { message: string }; message?: string };
  toast.error(
    err?.walk?.().message ||
      err?.message ||
      `${action} failed, please try again!`
  );
}

const useBallots = () => {
  const chain = useCurrentChain();
  const { address } = useConnection();
  const { publicClient, walletClient } = useWeb3Clients();

  const voteTokenAddress = config.voteToken[chain.id]?.address;
  const underlyingToken = config.underlyingToken[chain.id];
  const decimals = underlyingToken?.decimals ?? 18;

  const underlyingTokenContract = useMemo(() => {
    if (!underlyingToken?.address || !walletClient) return null;
    return getContract({
      abi: erc20Abi,
      address: underlyingToken.address as `0x${string}`,
      client: { public: publicClient, wallet: walletClient },
    });
  }, [underlyingToken?.address, publicClient, walletClient]);

  const { data: contractData, refetch: refetchContractData } = useReadContracts(
    {
      contracts: voteTokenAddress
        ? [
            {
              abi: voteTokenAbi,
              address: voteTokenAddress,
              functionName: "balanceOf",
              args: address ? [address] : undefined,
            },
            {
              abi: voteTokenAbi,
              address: voteTokenAddress,
              functionName: "getVotes",
              args: address ? [address] : undefined,
            },
            {
              abi: voteTokenAbi,
              address: voteTokenAddress,
              functionName: "symbol",
            },
          ]
        : [],
      query: {
        enabled: !!voteTokenAddress,
      },
    }
  );

  const ballotBalance = useMemo(
    () =>
      contractData?.[0]?.result
        ? formatUnits(contractData[0].result, decimals)
        : "0",
    [contractData, decimals]
  );

  const votingPower = useMemo(
    () =>
      contractData?.[1]?.result
        ? formatUnits(contractData[1].result, decimals)
        : "0",
    [contractData, decimals]
  );

  const ballotSymbol = useMemo(
    () => contractData?.[2]?.result || "vLCAI",
    [contractData]
  );

  const checkAllowance = async (amount: bigint) => {
    if (
      !address ||
      !underlyingTokenContract ||
      !underlyingToken ||
      !voteTokenAddress
    )
      return;

    const allowance = await underlyingTokenContract.read.allowance([
      address,
      voteTokenAddress,
    ]);

    if (allowance < amount) {
      const hash = await underlyingTokenContract.write.approve(
        [voteTokenAddress, MAX_UINT256],
        { account: address }
      );

      await publicClient.waitForTransactionReceipt({ hash });
      toast.success(`${underlyingToken.symbol} spend approved successfully`);
    }
  };

  const executeVoteTokenTx = async (
    functionName: "depositFor" | "withdrawTo",
    value: bigint
  ) => {
    const { request } = await publicClient.simulateContract({
      abi: voteTokenAbi,
      address: voteTokenAddress!,
      functionName,
      args: [address!, value],
      account: address!,
    });

    const hash = await walletClient!.writeContract(request);
    await publicClient.waitForTransactionReceipt({ hash });
    refetchContractData();
    return hash;
  };

  const deposit = async (amount: string) => {
    if (!address || !walletClient || !voteTokenAddress || !underlyingToken)
      return;

    try {
      const value = parseUnits(amount, underlyingToken.decimals);
      await checkAllowance(value);
      return await executeVoteTokenTx("depositFor", value);
    } catch (error) {
      handleTxError(error, "Deposit");
    }
  };

  const withdraw = async (amount: string) => {
    if (!address || !walletClient || !voteTokenAddress || !underlyingToken)
      return;

    try {
      const value = parseUnits(amount, underlyingToken.decimals);
      return await executeVoteTokenTx("withdrawTo", value);
    } catch (error) {
      handleTxError(error, "Withdrawal");
    }
  };

  return {
    ballotBalance,
    votingPower,
    ballotSymbol,
    deposit,
    withdraw,
    refetchContractData,
  };
};

export default useBallots;
