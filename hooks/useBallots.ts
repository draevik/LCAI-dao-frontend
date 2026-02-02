import config from "@/config";
import useCurrentChain from "./useCurrentChain";
import useWeb3Clients from "./useWeb3Clients";
import { useAccount, useReadContracts } from "wagmi";
import { useMemo } from "react";
import { erc20Abi, formatUnits, getContract, parseUnits } from "viem";
import { MAX_UINT256 } from "@/lib/utils";
import { toast } from "sonner";
import voteTokenAbi from "@/contracts/abi/voteTokenAbi";

const useBallots = () => {
  const chain = useCurrentChain();
  const { address } = useAccount();
  const { publicClient, walletClient } = useWeb3Clients();

  const voteTokenAddress = useMemo(
    () => config.voteToken[chain.id].address,
    [chain.id]
  );

  const underlyingToken = useMemo(
    () => config.underlyingToken[chain.id],
    [chain.id]
  );

  // Read only essential contract data for ballots functionality
  const { data: contractData, refetch: refetchContractData } = useReadContracts({
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
  });

  // Ballot token balance (wrapped voting tokens)
  const ballotBalance = useMemo(
    () =>
      contractData?.[0]?.result
        ? formatUnits(
            contractData[0].result as bigint,
            underlyingToken?.decimals || 18
          )
        : "0",
    [contractData, underlyingToken]
  );

  // Voting power
  const votingPower = useMemo(
    () =>
      contractData?.[1]?.result
        ? formatUnits(
            contractData[1].result as bigint,
            underlyingToken?.decimals || 18
          )
        : "0",
    [contractData, underlyingToken]
  );

  // Ballot token symbol
  const ballotSymbol = useMemo(
    () => (contractData?.[2]?.result as string) || "vLCAI",
    [contractData]
  );

  const checkAllowance = async (amount: bigint) => {
    if (
      !address ||
      !walletClient ||
      !underlyingToken?.address ||
      !voteTokenAddress
    )
      return;

    const tokenContract = getContract({
      abi: erc20Abi,
      address: underlyingToken.address as `0x${string}`,
      client: {
        public: publicClient,
        wallet: walletClient,
      },
    });

    const allowance = await tokenContract.read.allowance([
      address,
      voteTokenAddress,
    ]);

    if (allowance < amount) {
      const hash = await tokenContract.write.approve(
        [voteTokenAddress, MAX_UINT256],
        { account: address }
      );

      await publicClient.waitForTransactionReceipt({ hash });
      toast.success(`${underlyingToken.symbol} spend approved successfully`);
    }
  };

  // Deposit underlying tokens to get ballot tokens
  const deposit = async (amount: string) => {
    if (!address || !walletClient || !voteTokenAddress || !underlyingToken)
      return;

    try {
      const value = parseUnits(amount, underlyingToken.decimals);

      await checkAllowance(value);

      const { request } = await publicClient.simulateContract({
        abi: voteTokenAbi,
        address: voteTokenAddress,
        functionName: "depositFor",
        args: [address, value],
        account: address,
      });

      const hash = await walletClient.writeContract(request);

      await publicClient.waitForTransactionReceipt({ hash });
      refetchContractData();

      return hash;
    } catch (error: unknown) {
      console.error("deposit error:", error);
      const err = error as { walk?: () => { message: string }; message?: string };
      toast.error(
        err?.walk?.().message ||
          err?.message ||
          "Deposit failed, please try again!"
      );
    }
  };

  // Withdraw ballot tokens to get underlying tokens back
  const withdraw = async (amount: string) => {
    if (!address || !walletClient || !voteTokenAddress || !underlyingToken)
      return;

    try {
      const value = parseUnits(amount, underlyingToken.decimals);

      const { request } = await publicClient.simulateContract({
        abi: voteTokenAbi,
        address: voteTokenAddress,
        functionName: "withdrawTo",
        args: [address, value],
        account: address,
      });

      const hash = await walletClient.writeContract(request);

      await publicClient.waitForTransactionReceipt({ hash });
      refetchContractData();

      return hash;
    } catch (error: unknown) {
      console.error("withdraw error:", error);
      const err = error as { walk?: () => { message: string }; message?: string };
      toast.error(
        err?.walk?.().message ||
          err?.message ||
          "Withdrawal failed, please try again!"
      );
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
