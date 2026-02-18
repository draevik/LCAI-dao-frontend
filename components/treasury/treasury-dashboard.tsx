"use client";

import useTreasury from "@/hooks/useTreasury";
import LoadingBlock from "@/components/loading-block";
import { TreasuryBalanceCard } from "./treasury-balance-card";
import { TreasuryTransactionList } from "./treasury-transaction-list";
import { TreasuryStats } from "./treasury-stats";

export function TreasuryDashboard() {
  const { treasury, isLoading } = useTreasury();

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
        <TreasuryBalanceCard balances={treasury.balances} />
        <TreasuryTransactionList />
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-1">
        <div className="sticky top-6">
          <TreasuryStats
            address={treasury.address}
            admin={treasury.admin}
            paused={treasury.paused}
          />
        </div>
      </div>
    </div>
  );
}
