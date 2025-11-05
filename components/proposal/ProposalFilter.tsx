import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faGrid2Plus,
  faHourglassClock,
  faHourglassHalf,
  faMagnifyingGlass,
  faPlus,
  faSignalStream,
  faSquareCheck,
  faUserPen,
  faUsers,
  faUsersGear,
} from "@fortawesome/pro-regular-svg-icons";

interface ProposalFilterProps {
  filters: {
    status: string;
    createdBy: string;
    search: string;
  };
  onFilterChange: (name: string, value: string) => void;
}

const ProposalFilter = ({ filters, onFilterChange }: ProposalFilterProps) => {
  return (
    <div className="rounded-2xl">
      {/* Search input */}
      <div className="relative">
        <button className="absolute top-1/2 left-4 -translate-y-1/2 text-content-primary">
          <FontAwesomeIcon className="size-[18px]" icon={faMagnifyingGlass} />
        </button>
        <input
          className="h-14 w-full border border-border-default text-content-primary outline-none focus:border-primary placeholder:text-content-soft text-body-15 ring-0 bg-surface-x-soft rounded-t-2xl py-2 pr-4 pl-11"
          type="search"
          placeholder="Search Proposal, id and others"
          value={filters.search}
          onChange={(e) => onFilterChange("search", e.target.value)}
        />
      </div>

      {/* Filter section */}
      <div className="flex flex-wrap justify-between gap-x-5 gap-y-3 py-3 px-4 rounded-b-2xl border-x border-b border-border-default">
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-x-2 gap-y-4">
          {/* Status Filter */}
          <Select
            onValueChange={(v) => onFilterChange("status", v)}
            value={filters.status}
          >
            <SelectTrigger className="px-2.5 py-1.5 rounded-full border bg-content-primary-10 border-border-default text-sm sm:text-lg font-semibold leading-[1.3] tracking-[-0.18px] text-content-primary focus-visible:ring-0">
              <SelectValue placeholder="Active Proposals" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border border-border-default hidden bg-surface-soft backdrop-blur-xl py-3 min-w-[224px]">
              <SelectItem value="all" className="py-2.5 px-2 font-semibold leading-[1] tracking-[-0.16px] text-content-secondary cursor-pointer hover:bg-surface-x-soft outline-none">
                <FontAwesomeIcon className="inline-block size-4" icon={faGrid2Plus} />
                All
              </SelectItem>
              <SelectItem value="active" className="py-2.5 px-2 font-semibold leading-[1] tracking-[-0.16px] text-content-secondary cursor-pointer hover:bg-surface-x-soft outline-none">
                <FontAwesomeIcon className="inline-block size-4 text-content-success-strong" icon={faSignalStream} />
                Active
              </SelectItem>
              <SelectItem value="passed" className="py-2.5 px-2 font-semibold leading-[1] tracking-[-0.16px] text-content-secondary cursor-pointer hover:bg-surface-x-soft outline-none">
                <FontAwesomeIcon className="inline-block size-4" icon={faSquareCheck} />
                Passed
              </SelectItem>
              <SelectItem value="queued" className="py-2.5 px-2 font-semibold leading-[1] tracking-[-0.16px] text-content-secondary cursor-pointer hover:bg-surface-x-soft outline-none">
                <FontAwesomeIcon className="inline-block size-4" icon={faHourglassClock} />
                Queued
              </SelectItem>
              <SelectItem value="failed" className="py-2.5 px-2 font-semibold leading-[1] tracking-[-0.16px] text-content-secondary cursor-pointer hover:bg-surface-x-soft outline-none">
                <FontAwesomeIcon className="inline-block size-4" icon={faCircleXmark} />
                Failed
              </SelectItem>
              <SelectItem value="pending" className="py-2.5 px-2 font-semibold leading-[1] tracking-[-0.16px] text-content-secondary cursor-pointer hover:bg-surface-x-soft outline-none">
                <FontAwesomeIcon className="inline-block size-4" icon={faHourglassHalf} />
                Pending
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Created By Filter */}
          <Select
            onValueChange={(v) => onFilterChange("createdBy", v)}
            value={filters.createdBy}
          >
            <SelectTrigger className="px-2.5 py-1.5 rounded-full border bg-content-primary-10 border-border-default text-sm sm:text-lg font-semibold leading-[1.3] tracking-[-0.18px] text-content-primary focus-visible:ring-0">
              <SelectValue placeholder="By Core Team" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border border-border-default bg-surface-soft backdrop-blur-xl py-3 min-w-[224px]">
              <SelectItem value="all" className="py-2.5 px-2 font-semibold leading-[1] tracking-[-0.16px] text-content-secondary cursor-pointer hover:bg-surface-x-soft outline-none">
                <FontAwesomeIcon className="inline-block size-4" icon={faGrid2Plus} />
                All Proposals
              </SelectItem>
              <SelectItem value="core" className="py-2.5 px-2 font-semibold leading-[1] tracking-[-0.16px] text-content-secondary cursor-pointer hover:bg-surface-x-soft outline-none">
                <FontAwesomeIcon className="inline-block size-4" icon={faUsersGear} />
                By Core Team
              </SelectItem>
              <SelectItem value="community" className="py-2.5 px-2 font-semibold leading-[1] tracking-[-0.16px] text-content-secondary cursor-pointer hover:bg-surface-x-soft outline-none">
                <FontAwesomeIcon className="inline-block size-4" icon={faUsers} />
                By Community
              </SelectItem>
              <SelectItem value="me" className="py-2.5 px-2 font-semibold leading-[1] tracking-[-0.16px] text-content-secondary cursor-pointer hover:bg-surface-x-soft outline-none">
                <FontAwesomeIcon className="inline-block size-4" icon={faUserPen} />
                Created by Me
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          leftIcon={faPlus}
          href="/proposal/create"
          variant="outline"
          size="lg"
        >
          Create Proposal
        </Button>
      </div>
    </div>
  );
};

export default ProposalFilter;
