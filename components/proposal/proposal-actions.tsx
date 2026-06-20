"use client";

import { useState } from "react";
import type { Proposal, DecodedExecution } from "@/types";
import { ChevronDown, ChevronUp, Layers } from "lucide-react";
import { truncateAddress } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import { Button } from "../ui/button";
import { mainnet } from "viem/chains";
import { lcai } from "@/config/chains";

function ActionRow({
  indexer,
  execution,
}: {
  indexer: string;
  execution: DecodedExecution;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasParams =
    execution.decodedCalldata &&
    execution.decodedCalldata.parameters.length > 0;
  const paramCount = execution.decodedCalldata?.parameters.length ?? 0;

  const functionDisplay = execution.decodedCalldata
    ? `${execution.decodedCalldata.signature}(..)`
    : execution.signature
      ? `${execution.signature.slice(0, 10)}...`
      : "transfer";

  const explorerUrl =
    indexer === "mainnet"
      ? mainnet.blockExplorers?.default.url
      : lcai.blockExplorers?.default.url;

  return (
    <div className="border-b border-border-default last:border-b-0">
      <button
        onClick={() => hasParams && setIsExpanded(!isExpanded)}
        className={`w-full grid grid-cols-[140px_1fr_1fr_120px] items-center py-4 px-4 text-left ${
          hasParams ? "hover:bg-surface-soft cursor-pointer" : ""
        } transition-colors`}
        disabled={!hasParams}
      >
        {/* Type */}
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-content-secondary" />
          <span className="text-sm font-medium text-content-primary capitalize">
            {execution.type}
          </span>
        </div>

        {/* Address */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-mono text-content-secondary">
            {truncateAddress(execution.target)}
          </span>
          <a
            href={`${explorerUrl}/address/${execution.target}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-content-secondary hover:text-content-primary"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Details / Function */}
        <div>
          <span className="text-sm font-semibold text-content-primary">
            {functionDisplay}
          </span>
        </div>

        {/* Params count + chevron */}
        <div className="flex items-center justify-end gap-2">
          {hasParams && (
            <>
              <span className="text-sm text-content-secondary">
                {paramCount} param{paramCount !== 1 ? "s" : ""}
              </span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-content-secondary" />
              ) : (
                <ChevronDown className="w-4 h-4 text-content-secondary" />
              )}
            </>
          )}
        </div>
      </button>

      {/* Expanded params */}
      {isExpanded && hasParams && (
        <div className="px-4 pb-4 pt-0">
          <div className="bg-surface-soft rounded-lg p-4 font-mono text-sm space-y-1">
            {execution.decodedCalldata?.parameters.map((param, idx) => (
              <div key={idx} className="flex gap-2">
                <span className="text-content-secondary">{param.name}:</span>
                <span className="text-content-primary break-all">
                  {param.value}
                  {idx < (execution.decodedCalldata?.parameters.length ?? 0) - 1
                    ? ","
                    : ""}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function RawView({ executions }: { executions: DecodedExecution[] }) {
  return (
    <div className="divide-y divide-border-default">
      {executions.map((execution, index) => (
        <div key={index} className="py-6 px-4">
          <h4 className="text-base font-semibold text-content-primary mb-4">
            Function {index + 1}:
          </h4>
          <div className="border border-border-default rounded-lg p-5 space-y-5">
            {/* Signature */}
            <div>
              <div className="text-sm font-medium text-content-primary mb-1">
                Signature:
              </div>
              <div className="text-sm font-mono text-content-secondary">
                {execution.decodedCalldata?.signature ||
                  execution.signature ||
                  "transfer()"}
              </div>
            </div>

            {/* Calldata parameters */}
            {execution.decodedCalldata?.parameters &&
              execution.decodedCalldata.parameters.length > 0 && (
                <div>
                  <div className="text-sm font-medium text-content-primary mb-2">
                    Calldata:
                  </div>
                  <div className="space-y-1.5">
                    {execution.decodedCalldata.parameters.map((param, idx) => (
                      <div key={idx} className="flex gap-3 text-sm font-mono">
                        <span className="text-content-primary shrink-0">
                          {param.type}:
                        </span>
                        <span className="text-content-secondary break-all">
                          {param.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Target */}
            <div>
              <div className="text-sm font-medium text-content-primary mb-1">
                Target:
              </div>
              <div className="text-sm font-mono text-content-secondary break-all">
                {execution.target}
              </div>
            </div>

            {/* Value */}
            <div>
              <div className="text-sm font-medium text-content-primary mb-1">
                Value:
              </div>
              <div className="text-sm font-mono text-content-secondary">
                {execution.value}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SummaryView({
  indexer,
  executions,
}: {
  indexer: string;
  executions: DecodedExecution[];
}) {
  return (
    <>
      {/* Table header */}
      <div className="grid grid-cols-[140px_1fr_1fr_120px] px-4 py-3 border-b border-border-default bg-surface-soft">
        <span className="text-xs font-semibold text-content-secondary uppercase tracking-wide">
          Type
        </span>
        <span className="text-xs font-semibold text-content-secondary uppercase tracking-wide">
          Address
        </span>
        <span className="text-xs font-semibold text-content-secondary uppercase tracking-wide">
          Details
        </span>
        <span className="text-xs font-semibold text-content-secondary uppercase tracking-wide text-right">
          &nbsp;
        </span>
      </div>

      {/* Rows */}
      {executions?.map((execution, index) => (
        <ActionRow key={index} indexer={indexer} execution={execution} />
      ))}
    </>
  );
}

// Type guard to check if execution is in new DecodedExecution format
function isDecodedExecution(exec: unknown): exec is DecodedExecution {
  return typeof exec === "object" && exec !== null && "target" in exec;
}

export function ProposalActions({ proposal }: { proposal: Proposal }) {
  const [showSummary, setShowSummary] = useState(true);

  if (!proposal.executions?.length) return null;

  // Normalize executions to DecodedExecution format
  // Handle both old RawTransaction format and new DecodedExecution format
  const executions: DecodedExecution[] = proposal.executions.map((exec) => {
    // New format from indexer (has 'target')
    if (isDecodedExecution(exec)) {
      return exec;
    }

    // Old RawTransaction format (has 'to')
    return {
      value: exec.value,
      target: exec.to,
      calldata: exec.calldata,
      signature: null,
      type: exec.calldata === "0x" ? "transfer" : "custom",
      decodedCalldata: null,
      offchaindata: null,
    };
  });

  return (
    <div className="border border-border-default rounded-xl bg-base-subtle overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-border-default">
        <h3 className="text-lg font-semibold text-content-primary">Actions</h3>
        <Button onClick={() => setShowSummary(!showSummary)}>
          {showSummary ? "Raw" : "Summary"}
        </Button>
      </div>

      {showSummary ? (
        <SummaryView indexer={proposal.indexer} executions={executions} />
      ) : (
        <RawView executions={executions} />
      )}
    </div>
  );
}
