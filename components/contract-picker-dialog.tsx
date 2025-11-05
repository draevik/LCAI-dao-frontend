"use client";

import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import useCurrentChain from "@/hooks/useCurrentChain";
import config from "@/config";

type ContractPickerDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (address: string) => void;
};

export function ContractPickerDialog({
  isOpen,
  onClose,
  onSelect,
}: ContractPickerDialogProps) {
  const chain = useCurrentChain();
  const [searchQuery, setSearchQuery] = useState("");

  const contracts = useMemo(() => {
    return config.predefinedContracts[chain.id] || [];
  }, [chain.id]);

  const filteredContracts = useMemo(() => {
    if (!searchQuery) return contracts;
    return contracts.filter(
      (contract) =>
        contract.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contract.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [contracts, searchQuery]);

  const handleSelect = (address: string) => {
    onSelect(address);
    setSearchQuery("");
  };

  const handleOpenChange = (open: boolean) => {
    onClose();
    if (!open) setSearchQuery("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-content-primary">Select Contract</DialogTitle>
          <DialogDescription className="text-content-secondary">
            Choose a predefined contract address
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Contract List */}
          <div className="space-y-2 max-h-[400px] overflow-auto">
            {filteredContracts.map((contract) => (
              <button
                key={contract.address}
                type="button"
                onClick={() => handleSelect(contract.address)}
                className="w-full flex items-center gap-3 p-3 rounded-lg border border-border-default hover:bg-surface-x-soft transition-colors text-left"
              >
                <div className="flex-1">
                  <p className="text-content-primary">{contract.name}</p>
                  <p className="text-sm text-content-secondary">
                    {contract.address}
                  </p>
                </div>
              </button>
            ))}
            {filteredContracts.length === 0 && contracts.length > 0 && (
              <p className="text-sm text-content-secondary text-center py-4">
                No contracts found matching &quot;{searchQuery}&quot;
              </p>
            )}
            {contracts.length === 0 && (
              <p className="text-sm text-content-secondary text-center py-4">
                No predefined contracts available for this network
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
