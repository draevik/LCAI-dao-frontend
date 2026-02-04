"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronRight } from "lucide-react";
import type { Proposal } from "@/types";
import {
  SimulationResultsTable,
  SimulationStatusBadge,
} from "./simulation-results-table";

export function ProposalSimulationReport({ proposal }: { proposal: Proposal }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!proposal.simulations?.length) return null;

  return (
    <>
      {/* Clickable badge trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-border-default bg-base-subtle hover:bg-surface-soft transition-colors"
      >
        <SimulationStatusBadge simulations={proposal.simulations} />
        <ChevronRight className="w-5 h-5 text-content-secondary" />
      </button>

      {/* Simulation report dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-content-primary">
              Simulation report
            </DialogTitle>
          </DialogHeader>

          <SimulationResultsTable
            simulations={proposal.simulations}
            className="mt-4"
            defaultExpanded={true}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
