import { useQuery } from "@tanstack/react-query";
import useWeb3Clients from "./useWeb3Clients";
import { erc20Abi, formatEther } from "viem";

type Props = {
  address?: `0x${string}`;
  token?: `0x${string}` | undefined;
};

export const useTokenBalance = ({ address, token }: Props) => {
  const { publicClient } = useWeb3Clients();
  return useQuery({
    queryKey: ["tokenBalance", address, token],
    queryFn: async () => {
      const value = token
        ? await publicClient.readContract({
          address: token,
          abi: erc20Abi,
          functionName: "balanceOf",
          args: [address!],
        })
        : await publicClient.getBalance({ address: address! });
      return { value, formatted: +formatEther(value) };
    },
    enabled: Boolean(address),
  });
};
