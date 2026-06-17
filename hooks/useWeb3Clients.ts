import { useWalletClient } from "wagmi";
import useCurrentChain from "./useCurrentChain";
import { useMemo } from "react";
import { Chain, createPublicClient, http } from "viem";

type Props = {
  chain?: Chain;
};

const useWeb3Clients = ({ chain }: Props = { chain: undefined }) => {
  const currentChain = useCurrentChain();
  const { data: walletClient } = useWalletClient();

  const publicClient = useMemo(
    () =>
      createPublicClient({
        chain: chain || currentChain,
        transport: http(),
        batch: { multicall: true },
      }),
    [currentChain]
  );

  return { publicClient, walletClient };
};

export default useWeb3Clients;
