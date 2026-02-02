"use client";

import { useState, useCallback, useEffect } from "react";
import { useAccount } from "wagmi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { isAddress } from "viem";
import useDelegation from "@/hooks/useDelegation";
import { compactNumber } from "@/lib/utils";
import { toast } from "sonner";

interface DelegateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DelegateModal({
  open,
  onOpenChange,
  onSuccess,
}: DelegateModalProps) {
  const { address } = useAccount();
  const {
    delegate,
    delegateToSelf,
    fetchDelegationState,
    isConfirming,
    isConfirmed,
    hasTokenContract,
  } = useDelegation();

  const [customAddress, setCustomAddress] = useState("");
  const [mode, setMode] = useState<"self" | "custom">("self");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [votingPower, setVotingPower] = useState("0");
  const [currentDelegate, setCurrentDelegate] = useState<string | null>(null);

  const loadUserState = useCallback(async () => {
    if (!address || !hasTokenContract) return;
    try {
      const state = await fetchDelegationState(address);
      setVotingPower(state.votingPowerFormatted);
      setCurrentDelegate(state.currentDelegate);
    } catch (error) {
      console.error("Failed to load user state:", error);
    }
  }, [address, hasTokenContract, fetchDelegationState]);

  useEffect(() => {
    if (open) {
      loadUserState();
    }
  }, [open, loadUserState]);

  useEffect(() => {
    if (isConfirmed && isSubmitting) {
      setIsSubmitting(false);
      toast.success("Delegation successful!");
      onSuccess?.();
      onOpenChange(false);
    }
  }, [isConfirmed, isSubmitting, onSuccess, onOpenChange]);

  const handleDelegate = async () => {
    if (!address) return;

    setIsSubmitting(true);
    try {
      if (mode === "self") {
        await delegateToSelf();
      } else {
        if (!isAddress(customAddress)) {
          toast.error("Invalid address");
          setIsSubmitting(false);
          return;
        }
        await delegate(customAddress as `0x${string}`);
      }
    } catch (error) {
      console.error("Delegation failed:", error);
      toast.error("Delegation failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const generateAvatarUrl = (addr: string) => {
    return `https://effigy.im/a/${addr}.png`;
  };

  const isLoading = isSubmitting || isConfirming;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delegate Voting Power</DialogTitle>
          <DialogDescription>
            Delegate your voting power to yourself or another address. You can
            change your delegation at any time.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {currentDelegate && (
            <div className="rounded-lg bg-surface-soft p-3">
              <p className="text-sm text-content-secondary">
                Currently delegated to
              </p>
              <p className="font-medium text-content-primary">
                {currentDelegate.toLowerCase() === address?.toLowerCase()
                  ? "Yourself"
                  : truncateAddress(currentDelegate)}
              </p>
            </div>
          )}

          <div className="space-y-3">
            <button
              type="button"
              onClick={() => setMode("self")}
              className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                mode === "self"
                  ? "border-primary bg-primary/5"
                  : "border-border-default hover:border-border-hover"
              }`}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={address ? generateAvatarUrl(address) : undefined}
                  alt="Your avatar"
                />
                <AvatarFallback>
                  {address?.slice(2, 4).toUpperCase() || "??"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <p className="font-medium text-content-primary">
                  Delegate to yourself
                </p>
                <p className="text-sm text-content-secondary">
                  {address ? truncateAddress(address) : "Connect wallet"}
                </p>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  mode === "self"
                    ? "border-primary bg-primary"
                    : "border-content-secondary"
                }`}
              >
                {mode === "self" && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
            </button>

            <button
              type="button"
              onClick={() => setMode("custom")}
              className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                mode === "custom"
                  ? "border-primary bg-primary/5"
                  : "border-border-default hover:border-border-hover"
              }`}
            >
              <div className="h-10 w-10 rounded-full bg-surface-soft flex items-center justify-center text-content-secondary">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-content-primary">
                  Delegate to custom address
                </p>
                <p className="text-sm text-content-secondary">
                  Enter any Ethereum address
                </p>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  mode === "custom"
                    ? "border-primary bg-primary"
                    : "border-content-secondary"
                }`}
              >
                {mode === "custom" && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
            </button>
          </div>

          {mode === "custom" && (
            <div className="space-y-2">
              <Label htmlFor="delegateAddress">Delegate Address</Label>
              <Input
                id="delegateAddress"
                placeholder="0x..."
                value={customAddress}
                onChange={(e) => setCustomAddress(e.target.value)}
              />
              {customAddress && !isAddress(customAddress) && (
                <p className="text-sm text-red-500">Invalid address format</p>
              )}
            </div>
          )}

          <Separator />

          <div className="flex justify-between text-sm">
            <span className="text-content-secondary">Your voting power</span>
            <span className="font-medium text-content-primary">
              {compactNumber(parseFloat(votingPower))} LCAI
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className="flex-1"
            onClick={handleDelegate}
            disabled={
              isLoading ||
              !address ||
              (mode === "custom" && !isAddress(customAddress))
            }
          >
            {isLoading ? "Delegating..." : "Delegate"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
