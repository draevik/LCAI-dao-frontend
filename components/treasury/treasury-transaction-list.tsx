"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useGraphqlApi from "@/hooks/useGraphqlApi";
import { truncateAddress, compactNumber, cn } from "@/lib/utils";
import type { TreasuryTransaction } from "@/types";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

const PAGE_SIZE = 10;

export function TreasuryTransactionList() {
  const api = useGraphqlApi();
  const [page, setPage] = useState(0);

  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ["treasury-transactions", page],
    queryFn: () =>
      api.loadTreasuryTransactions({
        limit: PAGE_SIZE,
        skip: page * PAGE_SIZE,
      }),
  });

  const isDeposit = (type: string) => type.startsWith("deposit");

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card className="py-0 gap-0">
      <CardHeader className="border-b border-border-soft px-6 pt-4 [.border-b]:pb-4 gap-0">
        <CardTitle className="text-lg">Transaction History</CardTitle>
      </CardHeader>
      <CardContent className="p-0 py-6">
        {isLoading ? (
          <div className="py-12 lg:py-20 xl:py-30 2xl:py-40 text-center text-content-secondary">
            Loading transactions...
          </div>
        ) : transactions.length === 0 ? (
          <div className="py-12 lg:py-20 xl:py-30 2xl:py-40 text-center text-content-secondary">
            No transactions found
          </div>
        ) : (
          <div className="divide-y divide-border-default">
            {transactions.map((tx: TreasuryTransaction) => (
              <div
                key={tx.id}
                className="flex items-center gap-3 px-4 py-3 sm:px-6"
              >
                <div
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full shrink-0",
                    isDeposit(tx.type)
                      ? "bg-emerald-500/15 text-emerald-600"
                      : "bg-red-500/15 text-red-600"
                  )}
                >
                  {isDeposit(tx.type) ? (
                    <ArrowDownLeft className="w-4 h-4" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-content-primary">
                      {isDeposit(tx.type) ? "Deposit" : "Transfer"}
                    </span>
                    <Badge
                      variant="outline"
                      className="text-xs"
                    >
                      {tx.tokenSymbol}
                    </Badge>
                  </div>
                  <p className="text-xs text-content-secondary mt-0.5">
                    {isDeposit(tx.type) ? "From" : "To"}{" "}
                    {truncateAddress(
                      isDeposit(tx.type) ? tx.fromAddress : tx.toAddress
                    )}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <p
                    className={cn(
                      "text-sm font-semibold tabular-nums",
                      isDeposit(tx.type)
                        ? "text-emerald-600"
                        : "text-red-600"
                    )}
                  >
                    {isDeposit(tx.type) ? "+" : "-"}
                    {compactNumber(tx.amountParsed)} {tx.tokenSymbol}
                  </p>
                  <p className="text-xs text-content-secondary">
                    {formatDate(tx.created)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {transactions.length === PAGE_SIZE && (
          <div className="p-4 border-t border-border-default">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => setPage((p) => p + 1)}
            >
              Load More
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
