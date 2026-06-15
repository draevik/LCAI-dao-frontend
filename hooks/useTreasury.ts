import { useQuery } from "@tanstack/react-query";
import useWeb3Clients from "./useWeb3Clients";
import config, { mainnet } from "@/config";
import treasuryAbi from "@/contracts/abi/treasuryAbi";
import { formatUnits, getAddress } from "viem";
import { useMemo } from "react";
import useDexPrice from "./useDexPrice";
import useETHPrice from "./useETHPrice";
import useCurrentChain from "./useCurrentChain";

export default function useTreasury() {
  const chain = useCurrentChain();
  const { publicClient } = useWeb3Clients();
  const { data: dexPrice } = useDexPrice();
  const { data: ethPrice } = useETHPrice();

  const treasuryAddress = config.treasury[chain.id];

  const { data, isLoading } = useQuery({
    queryKey: ["treasury-balances", mainnet.id],
    queryFn: async () => {
      if (!treasuryAddress) return null;

      const address = getAddress(treasuryAddress);

      const [ethBalance] = await Promise.all([
        publicClient.getBalance({ address }),
      ]);

      const balances = [
        {
          symbol: chain.nativeCurrency.symbol,
          decimals: chain.nativeCurrency.decimals,
          balance: ethBalance,
          balanceParsed: parseFloat(
            formatUnits(ethBalance, chain.nativeCurrency.decimals),
          ),
        },
      ];

      return {
        address: treasuryAddress,
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
