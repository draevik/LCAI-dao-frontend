"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DelegateListItem } from "@/components/delegation/delegate-list-item";
import type { Delegate } from "@/types";

interface ParticipantsListProps {
  delegates: Delegate[];
  isLoading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

type SortOption = "voting_power" | "delegator_count" | "created";

export function ParticipantsList({
  delegates,
  isLoading,
  onLoadMore,
  hasMore,
}: ParticipantsListProps) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("voting_power");

  const filteredDelegates = delegates.filter((delegate) => {
    if (!search) return true;
    return delegate.address.toLowerCase().includes(search.toLowerCase());
  });

  const sortedDelegates = [...filteredDelegates].sort((a, b) => {
    switch (sortBy) {
      case "voting_power":
        return b.votingPowerParsed - a.votingPowerParsed;
      case "delegator_count":
        return b.delegatorCount - a.delegatorCount;
      case "created":
        return b.created - a.created;
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-content-secondary" />
          <Input
            placeholder="Search by address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={sortBy}
          onValueChange={(value) => setSortBy(value as SortOption)}
        >
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="voting_power">Voting Power</SelectItem>
            <SelectItem value="delegator_count">Delegators</SelectItem>
            <SelectItem value="created">Newest</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : sortedDelegates.length > 0 ? (
        <div className="divide-y divide-border-default rounded-lg border border-border-default bg-base-subtle">
          {sortedDelegates.map((delegate, idx) => (
            <DelegateListItem
              key={delegate.id}
              delegate={delegate}
              displayName={delegate.user?.displayName}
              rank={idx + 1}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-content-secondary">No delegates found</p>
          {search && (
            <button
              onClick={() => setSearch("")}
              className="mt-2 text-sm text-primary hover:underline"
            >
              Clear search
            </button>
          )}
        </div>
      )}

      {hasMore && !isLoading && (
        <div className="flex justify-center pt-4">
          <button
            onClick={onLoadMore}
            className="text-sm text-primary hover:underline"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
