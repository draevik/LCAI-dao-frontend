"use client";
import {
  Loader2Icon,
  LockIcon,
  UnlockIcon,
  CoinsIcon,
  ArrowRightLeftIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { useConnection, useBalance, useReadContract } from "wagmi";
import { useMemo, useState } from "react";
import { cn, formatNumber } from "@/lib/utils";
import useCurrentChain from "@/hooks/useCurrentChain";
import { useAppKit } from "@reown/appkit/react";
import { formatEther } from "viem";
import config from "@/config";
import useBallots from "@/hooks/useBallots";
import governorAbi from "@/contracts/abi/governorAbi";
import TransactionModal from "./transaction-modal";
import { useTokenBalance } from "@/hooks/useTokenBalance";

type TabType = "deposit" | "withdraw";

interface BallotsLockerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function BallotsLockerModal({
  open,
  onOpenChange,
  onSuccess,
}: BallotsLockerModalProps) {
  const chain = useCurrentChain();
  const { address, isConnected } = useConnection();
  const [amount, setAmount] = useState("");
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>("0x0");
  const [openTxModal, setOpenTxModal] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("deposit");
  const { open: openWallet } = useAppKit();
  const [loading, setLoading] = useState(false);

  const underlyingToken = config.underlyingToken[chain.id];
  const voteToken = config.voteToken[chain.id];

  const { ballotBalance, votingPower, ballotSymbol, deposit, withdraw } =
    useBallots();

  // Underlying LCAI token balance
  const tokenBalance = useTokenBalance({
    address: address,
    token: underlyingToken.address,
  });

  const proposalMin = useReadContract({
    address: config.governor[chain.id],
    abi: governorAbi,
    functionName: "proposalThreshold",
  });

  const insufficientBalance = useMemo(() => {
    if (activeTab === "deposit") {
      return tokenBalance.data
        ? Number(tokenBalance.data.formatted) < +amount
        : false;
    }
    return Number(ballotBalance) < +amount;
  }, [tokenBalance, amount, activeTab, ballotBalance]);

  const disableButton = useMemo(() => {
    if (loading) return true;
    if (!isConnected) return false;
    if (!amount) return true;
    if (insufficientBalance) return true;
    if (activeTab === "withdraw" && Number(ballotBalance) === 0) return true;
    return false;
  }, [
    loading,
    insufficientBalance,
    isConnected,
    amount,
    activeTab,
    ballotBalance,
  ]);

  const buttonTitle = useMemo(() => {
    if (loading) return "Processing";
    if (!isConnected) return "Connect Wallet";
    if (!amount) return "Enter an amount";
    if (insufficientBalance) {
      return activeTab === "deposit"
        ? "Insufficient balance"
        : "Insufficient ballot balance";
    }
    return activeTab === "deposit" ? "Deposit" : "Withdraw";
  }, [loading, isConnected, amount, insufficientBalance, activeTab]);

  const setMaxAmount = () => {
    if (activeTab === "deposit") {
      setAmount(String(tokenBalance.data?.formatted || 0));
    } else {
      setAmount(ballotBalance);
    }
  };

  const setProposalMin = () => {
    const value = formatEther(proposalMin.data ?? 0n);
    setAmount(value.toString());
  };

  const submit = async () => {
    if (!isConnected) {
      openWallet();
      return;
    }

    if (!+amount) return;

    setLoading(true);
    setOpenTxModal(true);

    let hash: `0x${string}` | undefined;

    if (activeTab === "deposit") {
      hash = await deposit(amount);
    } else {
      hash = await withdraw(amount);
    }

    setTxHash(hash);

    if (hash) {
      setAmount("");
      onSuccess?.();
    }

    setLoading(false);
  };

  if (!voteToken.address) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>LCAI Ballots</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground text-center py-6">
            Ballots Locker is not available on this network.
          </p>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CoinsIcon className="h-5 w-5 text-primary" />
              LCAI Ballots (LCAIB)
            </DialogTitle>
            <DialogDescription className="text-left">
              Wrap your LCAI tokens into LCAIB to participate in DAO governance.
              LCAIB is required for voting on proposals and creating new ones.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Helper Info Box */}
            <div className="rounded-lg bg-primary/5 border border-primary/20 p-3">
              <div className="flex items-start gap-2">
                <ArrowRightLeftIcon className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div className="text-xs text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">
                    How it works
                  </p>
                  <ul className="space-y-1">
                    <li>
                      <strong>Deposit:</strong> Wrap LCAI into LCAIB (1:1 ratio)
                    </li>
                    <li>
                      <strong>Withdraw:</strong> Unwrap LCAIB back to LCAI
                    </li>
                    <li>
                      <strong>Delegate:</strong> Activate your voting power
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Tab Switcher */}
            <div className="flex rounded-lg bg-muted p-1">
              <button
                type="button"
                className={cn(
                  "flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2",
                  activeTab === "deposit"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => {
                  setActiveTab("deposit");
                  setAmount("");
                }}
              >
                <LockIcon size={16} />
                Deposit
              </button>
              <button
                type="button"
                className={cn(
                  "flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2",
                  activeTab === "withdraw"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => {
                  setActiveTab("withdraw");
                  setAmount("");
                }}
              >
                <UnlockIcon size={16} />
                Withdraw
              </button>
            </div>

            {/* Stats Panel */}
            {isConnected && (
              <div className="rounded-lg bg-muted/50 border p-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground text-xs">
                      Your Ballots
                    </span>
                    <p className="font-semibold">
                      {formatNumber(ballotBalance)} {ballotSymbol}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs">
                      Voting Power
                    </span>
                    <p className="font-semibold">
                      {formatNumber(votingPower)} {ballotSymbol}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Input Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {activeTab === "deposit"
                    ? "Amount to Deposit"
                    : "Amount to Withdraw"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {activeTab === "deposit"
                    ? underlyingToken?.symbol
                    : ballotSymbol}
                </span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  min={0}
                  value={amount}
                  placeholder="0.0"
                  onChange={(e) => setAmount(e.currentTarget.value)}
                  readOnly={!isConnected}
                  className={cn(
                    "w-full px-3 py-3 text-lg rounded-lg border bg-background outline-none focus:ring-2 focus:ring-primary/20 pr-32",
                    {
                      "text-destructive border-destructive":
                        insufficientBalance,
                    }
                  )}
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                  {activeTab === "deposit" && (
                    <button
                      onClick={setProposalMin}
                      className="px-2 py-1 text-xs font-medium bg-primary rounded hover:bg-primary/90 text-primary-foreground transition-colors"
                    >
                      Min Proposal
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={setMaxAmount}
                    className="px-2 py-1 text-xs font-medium bg-secondary rounded hover:bg-secondary/80 text-secondary-foreground transition-colors"
                  >
                    Max
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  {activeTab === "deposit"
                    ? "LCAI Balance:"
                    : "Ballot Balance:"}
                  {activeTab === "deposit" ? (
                    tokenBalance.isFetching ? (
                      <Loader2Icon className="animate-spin" size={12} />
                    ) : (
                      `${formatNumber(tokenBalance.data?.formatted)} ${
                        underlyingToken?.symbol
                      }`
                    )
                  ) : (
                    `${formatNumber(ballotBalance)} ${ballotSymbol}`
                  )}
                </span>
              </div>

              {activeTab === "deposit" && (
                <p className="text-xs text-muted-foreground">
                  <strong>Proposal Min:</strong> 140,000 LCAI required to create
                  proposals
                </p>
              )}
            </div>

            <Button
              type="button"
              className="w-full"
              disabled={disableButton}
              onClick={submit}
            >
              {loading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
              {buttonTitle}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <TransactionModal
        open={openTxModal}
        loading={loading}
        txHash={txHash}
        content={
          activeTab === "deposit"
            ? `Depositing ${amount} ${underlyingToken?.symbol} for ${ballotSymbol}`
            : `Withdrawing ${amount} ${ballotSymbol} for ${underlyingToken?.symbol}`
        }
        setOpen={setOpenTxModal}
      />
    </>
  );
}
