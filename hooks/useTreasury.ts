import { useQuery } from "@tanstack/react-query";
import useWeb3Clients from "./useWeb3Clients";
import config, { mainnet } from "@/config";
import treasuryAbi from "@/contracts/abi/treasuryAbi";
import { formatUnits, getAddress } from "viem";
import { useMemo } from "react";
import useDexPrice from "./useDexPrice";
import useETHPrice from "./useETHPrice";

export default function useTreasury() {
  const { publicClient } = useWeb3Clients({ chain: mainnet });
  const { data: dexPrice } = useDexPrice();
  const { data: ethPrice } = useETHPrice();

  const treasuryAddress = config.treasury[mainnet.id];
  const lcaiToken = config.underlyingToken[mainnet.id];

  const { data, isLoading } = useQuery({
    queryKey: ["treasury-balances", mainnet.id],
    queryFn: async () => {
      if (!treasuryAddress) return null;

      const address = getAddress(treasuryAddress);

      const calls = [
        publicClient.readContract({
          address,
          abi: treasuryAbi,
          functionName: "getETHBalance",
        }),
        publicClient.readContract({
          address,
          abi: treasuryAbi,
          functionName: "admin",
        }),
        publicClient.readContract({
          address,
          abi: treasuryAbi,
          functionName: "paused",
        }),
      ] as const;

      const tokenBalanceCalls = [];
      if (lcaiToken) {
        tokenBalanceCalls.push(
          publicClient.readContract({
            address,
            abi: treasuryAbi,
            functionName: "getBalance",
            args: [getAddress(lcaiToken.address)],
          })
        );
      }

      const [ethBalance, admin, paused] = await Promise.all(calls);
      const tokenBalances = await Promise.all(tokenBalanceCalls);

      const balances = [
        {
          symbol: "ETH",
          decimals: 18,
          balance: ethBalance as bigint,
          balanceParsed: parseFloat(formatUnits(ethBalance as bigint, 18)),
        },
      ];

      if (lcaiToken && tokenBalances[0] !== undefined) {
        balances.push({
          symbol: lcaiToken.symbol,
          decimals: lcaiToken.decimals,
          balance: tokenBalances[0] as bigint,
          balanceParsed: parseFloat(
            formatUnits(tokenBalances[0] as bigint, lcaiToken.decimals)
          ),
        });
      }

      return {
        address: treasuryAddress,
        admin: admin as string,
        paused: paused as boolean,
        balances,
      };
    },
    enabled: !!treasuryAddress,
    refetchInterval: 60_000,
  });

  const totalBalanceUSD = useMemo(() => {
    if (!dexPrice?.lcaiPrice) return 0;

    return data?.balances.reduce((acc, balance) => {
      if (balance.symbol === "ETH") {
        return acc + balance.balanceParsed * (ethPrice || 1);
      }
      if (balance.symbol === "LCAI") {
        return acc + balance.balanceParsed * dexPrice.lcaiPrice;
      }
      return acc + balance.balanceParsed;
    }, 0);
  }, [data, dexPrice]);

  return { treasury: data, totalBalanceUSD, isLoading };
}
