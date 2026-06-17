"use client";

import useTreasury from "@/hooks/useTreasury";
import LoadingBlock from "@/components/loading-block";
import { TreasuryBalanceCard } from "./treasury-balance-card";
import { TreasuryTransactionList } from "./treasury-transaction-list";
import { TreasuryStats } from "./treasury-stats";
import { parseEther } from "viem";

export function TreasuryDashboard() {
  const { treasury, totalBalanceUSD, isLoading } = useTreasury();

  if (isLoading) return <LoadingBlock />;

  if (!treasury) {
    return (
      <div className="py-8 text-center text-content-secondary">
        Treasury data unavailable for this chain.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main content */}
      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TreasuryBalanceCard
            className="sm:col-span-2"
            token={{
              symbol: "USD",
              decimals: 18,
              balance: parseEther(`${totalBalanceUSD || 0}`),
              balanceParsed: totalBalanceUSD || 0,
            }}
          />

          {treasury.balances.map((token, index) => (
            <TreasuryBalanceCard key={index + 1} token={token} />
          ))}
        </div>
        <TreasuryTransactionList />
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-1">
        <div className="sticky top-6">
          <TreasuryStats address={treasury.address} />
        </div>
      </div>
    </div>
  );
}
