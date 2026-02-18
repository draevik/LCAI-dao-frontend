"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { compactNumber } from "@/lib/utils";

interface TreasuryBalanceCardProps {
  balances: {
    symbol: string;
    decimals: number;
    balance: bigint;
    balanceParsed: number;
  }[];
}

export function TreasuryBalanceCard({ balances }: TreasuryBalanceCardProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {balances.map((token) => (
        <Card key={token.symbol}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-content-secondary">
              {token.symbol}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-content-primary">
              {compactNumber(token.balanceParsed)}
            </p>
            <p className="text-xs text-content-secondary mt-1">
              {token.balanceParsed.toLocaleString("en-US", {
                maximumFractionDigits: 4,
              })}{" "}
              {token.symbol}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
