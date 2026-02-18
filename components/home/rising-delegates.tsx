"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/common/Button";
import { ArrowRight } from "lucide-react";
import { DelegateListItem } from "@/components/delegation/delegate-list-item";
import type { Delegate } from "@/types";

interface RisingDelegatesProps {
  delegates: Delegate[];
  isLoading?: boolean;
  onViewAll?: () => void;
}

export function RisingDelegates({
  delegates,
  isLoading,
  onViewAll,
}: RisingDelegatesProps) {
  const topDelegates = delegates.slice(0, 5);

  return (
    <Card className="py-0">
      <CardHeader className="flex flex-row items-center justify-between py-4 border-b border-border-default">
        <CardTitle>Top Participants</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={onViewAll}
          className="text-content-secondary hover:text-content-primary"
        >
          View all
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : topDelegates.length > 0 ? (
          <div className="divide-y divide-border-default">
            {topDelegates.map((delegate, idx) => (
              <DelegateListItem
                key={delegate.id}
                delegate={delegate}
                rank={idx + 1}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-content-secondary">No participants yet</p>
            <p className="mt-1 text-sm text-content-tertiary">
              Be the first to delegate and participate
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
