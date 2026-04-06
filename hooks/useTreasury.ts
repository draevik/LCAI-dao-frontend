import { useQuery } from "@tanstack/react-query";
import useWeb3Clients from "./useWeb3Clients";
import useCurrentChain from "./useCurrentChain";
import config from "@/config";
import treasuryAbi from "@/contracts/abi/treasuryAbi";
import { formatUnits, getAddress } from "viem";
import { useMemo } from "react";
import useDexPrice from "./useDexPrice";
import useETHPrice from "./useETHPrice";

export default function useTreasury() {
  const { publicClient } = useWeb3Clients();
  const chain = useCurrentChain();
  const { data: dexPrice } = useDexPrice();
  const { data: ethPrice } = useETHPrice();

  const treasuryAddress = config.treasury?.[chain.id];
  const lcaiToken = config.underlyingToken[chain.id];

  const { data, isLoading } = useQuery({
    queryKey: ["treasury-balances", chain.id],
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
      // if (lcaibToken) {
      //   tokenBalanceCalls.push(
      //     publicClient.readContract({
      //       address,
      //       abi: treasuryAbi,
      //       functionName: "getBalance",
      //       args: [getAddress(lcaibToken.address)],
      //     })
      //   );
      // }

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

      // if (lcaibToken && tokenBalances[lcaiToken ? 1 : 0] !== undefined) {
      //   const idx = lcaiToken ? 1 : 0;
      //   balances.push({
      //     symbol: lcaibToken.symbol,
      //     decimals: lcaibToken.decimals,
      //     balance: tokenBalances[idx] as bigint,
      //     balanceParsed: parseFloat(
      //       formatUnits(tokenBalances[idx] as bigint, lcaibToken.decimals)
      //     ),
      //   });
      // }

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
