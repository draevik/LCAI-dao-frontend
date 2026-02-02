"use client";

import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/common/Button";
import { Separator } from "@/components/ui/separator";
import useDelegation from "@/hooks/useDelegation";
import { compactNumber } from "@/lib/utils";
import type { SpaceStats, Delegation } from "@/types";

interface DaoSidebarProps {
  spaceStats: SpaceStats | null;
  userDelegation: Delegation | null;
  onDelegateClick: () => void;
  isLoading?: boolean;
}

export function DaoSidebar({
  spaceStats,
  userDelegation,
  onDelegateClick,
  isLoading,
}: DaoSidebarProps) {
  const { address, isConnected } = useAccount();
  const { fetchDelegationState, hasTokenContract } = useDelegation();
  const [votingPower, setVotingPower] = useState<string>("0");
  const [tokenBalance, setTokenBalance] = useState<string>("0");
  const [currentDelegate, setCurrentDelegate] = useState<string | null>(null);

  const loadUserData = useCallback(async () => {
    if (!address || !hasTokenContract) return;
    try {
      const state = await fetchDelegationState(address);
      setVotingPower(state.votingPowerFormatted);
      setTokenBalance(state.tokenBalanceFormatted);
      setCurrentDelegate(state.currentDelegate);
    } catch (error) {
      console.error("Failed to load user delegation state:", error);
    }
  }, [address, hasTokenContract, fetchDelegationState]);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  // Use blockchain data as primary source, fall back to indexed data
  const hasDelegated = currentDelegate !== null || userDelegation !== null;
  const delegateAddress = currentDelegate || userDelegation?.delegate || null;

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle>{spaceStats?.name || "Lightchain AI DAO"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-4">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : (
          <>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-content-secondary">Proposals</span>
                <span className="font-medium text-content-primary">
                  {compactNumber(spaceStats?.proposalCount || 0)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-content-secondary">Delegates</span>
                <span className="font-medium text-content-primary">
                  {compactNumber(spaceStats?.delegateCount || 0)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-content-secondary">Voters</span>
                <span className="font-medium text-content-primary">
                  {compactNumber(spaceStats?.voterCount || 0)}
                </span>
              </div>
            </div>

            {isConnected && (
              <>
                <Separator />
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-content-primary">
                    Your Voting Power
                  </h4>
                  <div className="flex justify-between text-sm">
                    <span className="text-content-secondary">Voting Power</span>
                    <span className="font-medium text-content-primary">
                      {compactNumber(parseFloat(votingPower))} {spaceStats?.symbol || "LCAI"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-content-secondary">Token Balance</span>
                    <span className="font-medium text-content-primary">
                      {compactNumber(parseFloat(tokenBalance))} {spaceStats?.symbol || "LCAI"}
                    </span>
                  </div>
                  {delegateAddress && delegateAddress !== "0x0000000000000000000000000000000000000000" && (
                    <div className="flex justify-between text-sm">
                      <span className="text-content-secondary">Delegated to</span>
                      <span className="font-medium text-content-primary">
                        {delegateAddress.toLowerCase() === address?.toLowerCase()
                          ? "Self"
                          : truncateAddress(delegateAddress)}
                      </span>
                    </div>
                  )}
                  {/* Show hint when user has tokens but no voting power */}
                  {parseFloat(tokenBalance) > 0 && parseFloat(votingPower) === 0 && !hasDelegated && (
                    <p className="text-xs text-amber-500">
                      Delegate to yourself to activate your voting power
                    </p>
                  )}
                </div>
              </>
            )}

            <Separator />

            <Button
              variant="primary"
              className="w-full"
              onClick={onDelegateClick}
              disabled={!isConnected}
            >
              {!isConnected
                ? "Connect Wallet to Delegate"
                : hasDelegated
                ? "Update Delegation"
                : "Delegate"}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
