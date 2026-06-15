"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CopyButton from "@/components/CopyButton";
import { truncateAddress } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import useCurrentChain from "@/hooks/useCurrentChain";

interface TreasuryStatsProps {
  address: string;
}

export function TreasuryStats({ address }: TreasuryStatsProps) {
  const chain = useCurrentChain();
  return (
    <Card className="py-0 gap-0">
      <CardHeader className="border-b border-border-soft px-6 pt-4 [.border-b]:pb-4 gap-0">
        <CardTitle className="text-lg">Treasury Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 py-4">
        <div>
          <p className="text-xs md:text-sm text-content-default leading-[1.42] mb-2">
            Contract Address
          </p>
          <div className="flex items-center gap-1 mt-2">
            <span className="text-sm md:text-base font-medium leading-normal tracking-[-0.16px] text-content-primary">
              {truncateAddress(address)}
            </span>
            <CopyButton
              text={address}
              className="size-6 shrink-0 text-content-muted hover:text-content-primary [&_svg:not([class*='size-'])]:size-3"
            />
            <a
              href={`${chain.blockExplorers?.default.url}/address/${address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-content-muted hover:text-content-primary"
            >
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* <div>
          <p className="text-xs md:text-sm text-content-default leading-[1.42] mb-2">
            Admin
          </p>
          <div className="flex items-center gap-1 mt-2">
            <span className="text-sm md:text-base font-medium leading-normal tracking-[-0.16px] text-content-primary">
              {truncateAddress(admin)}
            </span>
            <CopyButton
              text={admin}
              className="size-6 shrink-0 text-content-muted hover:text-content-primary [&_svg:not([class*='size-'])]:size-3"
            />
          </div>
        </div>

        <div className="mb-5">
          <p className="text-xs md:text-sm text-content-default leading-[1.42] mb-2">
            Status
          </p>
          <Badge variant={paused ? "destructive" : "active"} className="text-xs md:text-sm">
            {!paused && <FontAwesomeIcon icon={faSignalStream} className="size-3.5" />}
            {paused ? "Paused" : "Active"}
          </Badge>
        </div> */}

        <div>
          <a
            href={`${chain.blockExplorers?.default.url}/address/${address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            View on Lightchan
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
