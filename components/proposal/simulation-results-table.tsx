"use client";

import { useState } from "react";
import {
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  XCircle,
} from "lucide-react";
import CopyButton from "@/components/CopyButton";
import $dayjs from "@/lib/dayjs";
import type { SimulationAction } from "@/types";

function truncateAddress(address: string): string {
  if (!address || address.length < 12) return address;
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

interface SimulationResultsTableProps {
  simulations: SimulationAction[];
  className?: string;
  defaultExpanded?: boolean;
}

export function SimulationResultsTable({
  simulations,
  className = "",
  defaultExpanded = true,
}: SimulationResultsTableProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  if (!simulations?.length) return null;

  const allPassed = simulations.every((s) => s.status === "passed");
  const simulatedAt = simulations[0]?.simulated_at;

  return (
    <div className={className}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-content-secondary">
          {simulations.length} {simulations.length === 1 ? "action" : "actions"}{" "}
          simulated
          {simulatedAt && (
            <>
              {" "}
              • {$dayjs.unix(simulatedAt).format("MMM DD, YYYY")} –{" "}
              {$dayjs.unix(simulatedAt).format("h:mm a")}
            </>
          )}
        </p>
      </div>

      {/* Collapsible "Tenderly simulations" header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left py-2"
      >
        <div className="flex items-center gap-2">
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-content-secondary" />
          ) : (
            <ChevronDown className="w-4 h-4 text-content-secondary" />
          )}
          <span className="text-base font-semibold text-content-primary">
            Tenderly simulations
          </span>
          {allPassed ? (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          ) : (
            <XCircle className="w-5 h-5 text-red-500" />
          )}
        </div>

        <a
          href="https://docs.tenderly.co"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-content-brand-light hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          Learn more
        </a>
      </button>

      {/* Simulation table */}
      {isExpanded && (
        <div className="border border-border-default rounded-lg overflow-hidden mt-2">
          <table className="w-full text-left">
            <thead className="bg-surface-soft">
              <tr>
                <th className="px-4 py-2.5 text-xs text-content-secondary font-semibold w-[40px]">
                  #
                </th>
                <th className="px-4 py-2.5 text-xs text-content-secondary font-semibold">
                  Contract
                </th>
                <th className="px-4 py-2.5 text-xs text-content-secondary font-semibold w-[120px]">
                  Function
                </th>
                <th className="px-4 py-2.5 text-xs text-content-secondary font-semibold text-end">
                  Simulation
                </th>
              </tr>
            </thead>
            <tbody>
              {simulations.map((sim, index) => (
                <tr
                  key={index}
                  className="border-t border-border-default [&_td]:py-3 [&_td]:px-4"
                >
                  {/* # */}
                  <td className="text-sm text-content-secondary">
                    {index + 1}
                  </td>
                  {/* Contract address + copy */}
                  <td>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm text-content-primary font-medium font-mono">
                        {truncateAddress(sim.target)}
                      </span>
                      <CopyButton text={sim.target} />
                    </div>
                  </td>
                  {/* Function name/selector */}
                  <td className="text-sm text-content-secondary">
                    {sim.function_selector || "–"}
                  </td>
                  {/* Status badge + Tenderly link */}
                  <td className="text-end">
                    <div className="flex items-center gap-2 justify-end">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          sim.status === "passed"
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {sim.status === "passed" ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5" />
                        )}
                        {sim.status === "passed" ? "Passed" : "Failed"}
                      </span>
                      {sim.tenderly_sandbox_url && (
                        <a
                          href={sim.tenderly_sandbox_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-content-secondary hover:text-content-primary transition-colors"
                          title="View on Tenderly"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Show error messages for failed simulations */}
      {!allPassed && (
        <div className="space-y-2 mt-3">
          {simulations
            .filter((s) => s.status === "failed" && s.error_message)
            .map((sim, index) => (
              <div
                key={index}
                className="p-3 bg-red-50 border border-red-200 rounded-lg"
              >
                <p className="text-xs font-semibold text-red-700 mb-1">
                  Action {sim.action_index + 1} Error:
                </p>
                <p className="text-xs text-red-600 font-mono break-all">
                  {sim.error_message}
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

/** Summary badge for simulation status */
export function SimulationStatusBadge({
  simulations,
}: {
  simulations: SimulationAction[];
}) {
  if (!simulations?.length) return null;

  const allPassed = simulations.every((s) => s.status === "passed");
  const failedCount = simulations.filter((s) => s.status === "failed").length;

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
        allPassed
          ? "bg-green-50 text-green-700 border border-green-200"
          : "bg-red-50 text-red-700 border border-red-200"
      }`}
    >
      {allPassed ? (
        <CheckCircle2 className="w-4 h-4" />
      ) : (
        <XCircle className="w-4 h-4" />
      )}
      {allPassed
        ? "All simulations passed"
        : `${failedCount} simulation${failedCount > 1 ? "s" : ""} failed`}
    </span>
  );
}
