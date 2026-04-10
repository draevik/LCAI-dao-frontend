import { useQuery } from "@tanstack/react-query";
import config, { mainnet } from "@/config";
import { getAddress } from "viem";
import useETHPrice from "./useETHPrice";
import uniswapV3Pair from "@/contracts/abi/uniswapV3Pair";
import useWeb3Clients from "./useWeb3Clients";

const uniswapV3PairConfig = {
    address: config.lcaiEthPair[mainnet.id],
    abi: uniswapV3Pair,
}

export default function useDexPrice() {
    const { publicClient } = useWeb3Clients({ chain: mainnet });
    const { data: ethPrice } = useETHPrice();

    const lcai = config.underlyingToken[mainnet.id];
    const wethAddress = config.wETH[mainnet.id];

    return useQuery({
        queryKey: ["dexPrice", mainnet.id],
        queryFn: async () => {
            if (!lcai || !wethAddress) {
                return null;
            }

            const [slot0, token0Address, token1Address] = await Promise.all([
                publicClient.readContract({
                    ...uniswapV3PairConfig,
                    functionName: "slot0",
                }),
                publicClient.readContract({
                    ...uniswapV3PairConfig,
                    functionName: "token0",
                }),
                publicClient.readContract({
                    ...uniswapV3PairConfig,
                    functionName: "token1",
                }),
            ]);

            const token0 = getAddress(token0Address).toLowerCase();
            const token1 = getAddress(token1Address).toLowerCase();
            const lcaiAddress = getAddress(lcai.address).toLowerCase();
            const weth = getAddress(wethAddress).toLowerCase();

            const lcaiIsToken0 = token0 === lcaiAddress;
            const lcaiIsToken1 = token1 === lcaiAddress;
            const wethIsToken0 = token0 === weth;
            const wethIsToken1 = token1 === weth;

            if ((!lcaiIsToken0 && !lcaiIsToken1) || (!wethIsToken0 && !wethIsToken1)) {
                throw new Error("Configured pool does not contain LCAI and WETH");
            }

            const tick = Number(slot0[1]);
            const token1PerToken0 = Math.pow(1.0001, tick);

            const token0Decimals = lcaiIsToken0 ? lcai.decimals : 18;
            const token1Decimals = lcaiIsToken1 ? lcai.decimals : 18;
            const decimalAdjustment = Math.pow(10, token0Decimals - token1Decimals);
            const adjustedToken1PerToken0 = token1PerToken0 * decimalAdjustment;

            const lcaiPerEth = lcaiIsToken0
                ? 1 / adjustedToken1PerToken0
                : adjustedToken1PerToken0;

            const ethPerLcai = lcaiIsToken0
                ? adjustedToken1PerToken0
                : 1 / adjustedToken1PerToken0;

            const lcaiPrice = ethPrice! * ethPerLcai;

            return {
                lcaiPrice,
                ethPerLcai,
                lcaiPerEth,
            }
        },
        enabled: !!ethPrice,
    });
}
