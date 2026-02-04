"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DelegateModal } from "@/components/delegation/delegate-modal";
import { ProposalState } from "@/lib/constents";
import type { Proposal } from "@/types";
import { Clock, Info, CheckCircle2, AlertCircle } from "lucide-react";
import BallotsLockerModal from "../ballots-locker";
import { useAccount } from "wagmi";
import { useAppKit } from "@reown/appkit/react";
import useDelegation, { DelegationState } from "@/hooks/useDelegation";
import { compactNumber, truncateAddress } from "@/lib/utils";

interface ProposalDelegationReminderProps {
  proposal: Proposal;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetTimestamp: number): TimeLeft | null {
  const now = Math.floor(Date.now() / 1000);
  const difference = targetTimestamp - now;

  if (difference <= 0) {
    return null;
  }

  return {
    days: Math.floor(difference / (60 * 60 * 24)),
    hours: Math.floor((difference % (60 * 60 * 24)) / (60 * 60)),
    minutes: Math.floor((difference % (60 * 60)) / 60),
    seconds: difference % 60,
  };
}

function CountdownTimer({ targetTimestamp }: { targetTimestamp: number }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() =>
    calculateTimeLeft(targetTimestamp)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(targetTimestamp);
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTimestamp]);

  if (!timeLeft) {
    return (
      <div className="text-center py-2">
        <span className="text-gray-400">Voting has started</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-3 text-center">
      <div className="border border-surface-soft bg-surface-base-extralight rounded-xl p-3">
        <div className="text-3xl font-bold leading-none">
          {String(timeLeft.days).padStart(2, "0")}
        </div>
        <div className="text-xs text-content-secondary mt-1">Days</div>
      </div>
      <div className="border border-surface-soft bg-surface-base-extralight rounded-xl p-3">
        <div className="text-3xl font-bold leading-none">
          {String(timeLeft.hours).padStart(2, "0")}
        </div>
        <div className="text-xs text-content-secondary mt-1">Hours</div>
      </div>
      <div className="border border-surface-soft bg-surface-base-extralight rounded-xl p-3">
        <div className="text-3xl font-bold leading-none">
          {String(timeLeft.minutes).padStart(2, "0")}
        </div>
        <div className="text-xs text-content-secondary mt-1">Min</div>
      </div>
      <div className="border border-surface-soft bg-surface-base-extralight rounded-xl p-3">
        <div className="text-3xl font-bold leading-none">
          {String(timeLeft.seconds).padStart(2, "0")}
        </div>
        <div className="text-xs text-content-secondary mt-1">Sec</div>
      </div>
    </div>
  );
}

function DelegationStatus({
  delegationState,
  address,
  isLoading,
}: {
  delegationState: DelegationState | null;
  address: string | undefined;
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className="border border-surface-soft bg-surface-base-extralight rounded-xl p-4 animate-pulse">
        <div className="h-4 bg-surface-base-extralight rounded w-24 mb-2"></div>
        <div className="h-6 bg-surface-base-extralight rounded w-32"></div>
      </div>
    );
  }

  if (!delegationState || !address) {
    return null;
  }

  const { currentDelegate, votingPowerFormatted } = delegationState;
  const votingPower = parseFloat(votingPowerFormatted);
  const isDelegatedToSelf =
    currentDelegate?.toLowerCase() === address.toLowerCase();
  const hasDelegated = !!currentDelegate;
  const hasVotingPower = votingPower > 0;

  return (
    <div className="space-y-3">
      {/* Voting Power */}
      <div className="border border-surface-soft bg-surface-base-extralight rounded-xl p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-content-secondary">
            Your voting power
          </span>
          <span
            className={`text-lg font-semibold ${
              hasVotingPower ? "text-emerald-400" : "text-content-secondary"
            }`}
          >
            {compactNumber(votingPower)} LCAI
          </span>
        </div>
      </div>

      {/* Delegation Status */}
      <div className="border border-surface-soft bg-surface-base-extralight rounded-xl p-4">
        <div className="flex items-start gap-3">
          {hasDelegated ? (
            <>
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">Delegated to</p>
                <p className="text-sm text-gray-400 truncate">
                  {isDelegatedToSelf
                    ? "Yourself"
                    : truncateAddress(currentDelegate)}
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                <AlertCircle className="w-4 h-4 text-amber-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Not delegated</p>
                <p className="text-sm text-gray-400">Delegate to participate</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function ProposalDelegationReminder({
  proposal,
}: ProposalDelegationReminderProps) {
  const [isDelegateModalOpen, setIsDelegateModalOpen] = useState(false);
  const [isBallotsLockerOpen, setIsBallotsLockerOpen] = useState(false);
  const [delegationState, setDelegationState] =
    useState<DelegationState | null>(null);
  const [isLoadingDelegation, setIsLoadingDelegation] = useState(false);
  const { address, isConnected } = useAccount();
  const { open } = useAppKit();
  const { fetchDelegationState, hasTokenContract } = useDelegation();

  const loadDelegationState = useCallback(async () => {
    if (!address || !hasTokenContract) return;
    setIsLoadingDelegation(true);
    try {
      const state = await fetchDelegationState(address);
      setDelegationState(state);
    } catch (error) {
      console.error("Failed to load delegation state:", error);
    } finally {
      setIsLoadingDelegation(false);
    }
  }, [address, hasTokenContract, fetchDelegationState]);

  useEffect(() => {
    loadDelegationState();
  }, [loadDelegationState]);

  const handleDelegateSuccess = () => {
    loadDelegationState();
  };

  const isPending = proposal.state === ProposalState.Pending;

  if (isPending) {
    return (
      <>
        <Card className="py-0">
          <CardContent className="p-0">
            {/* Header */}
            <div className="p-4 border-b">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-white">
                    Voting starts soon
                  </h4>
                  <p className="text-sm text-gray-400 mt-0.5">
                    Delegate your tokens before voting begins to participate.
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              {/* Countdown */}
              <div>
                <p className="text-xs text-gray-400 mb-3 text-center uppercase tracking-wide">
                  Time until voting starts
                </p>
                <CountdownTimer targetTimestamp={Number(proposal.start_time)} />
              </div>

              {/* Delegation Status - Only show when connected */}
              {isConnected && (
                <DelegationStatus
                  delegationState={delegationState}
                  address={address}
                  isLoading={isLoadingDelegation}
                />
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                {isConnected ? (
                  <>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setIsBallotsLockerOpen(true)}
                    >
                      Wrap/Unwrap
                    </Button>
                    <Button
                      variant="default"
                      className="flex-1"
                      onClick={() => setIsDelegateModalOpen(true)}
                    >
                      Delegate
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="default"
                    className="flex-1"
                    onClick={() => open()}
                  >
                    Connect
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <DelegateModal
          open={isDelegateModalOpen}
          onOpenChange={setIsDelegateModalOpen}
          onSuccess={handleDelegateSuccess}
        />

        <BallotsLockerModal
          open={isBallotsLockerOpen}
          onOpenChange={setIsBallotsLockerOpen}
          onSuccess={() => {
            loadDelegationState();
            setIsDelegateModalOpen(true);
          }}
        />
      </>
    );
  }

  return null;
}
