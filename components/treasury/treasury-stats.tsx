"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CopyButton from "@/components/CopyButton";
import { truncateAddress } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

interface TreasuryStatsProps {
  address: string;
  admin: string;
  paused: boolean;
}

export function TreasuryStats({ address, admin, paused }: TreasuryStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Treasury Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-xs font-medium text-content-secondary mb-1">
            Contract Address
          </p>
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-content-primary">
              {truncateAddress(address)}
            </span>
            <CopyButton
              text={address}
              className="size-6 shrink-0 text-content-muted hover:text-content-primary [&_svg:not([class*='size-'])]:size-3"
            />
            <a
              href={`https://etherscan.io/address/${address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-content-muted hover:text-content-primary"
            >
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-content-secondary mb-1">
            Admin
          </p>
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-content-primary">
              {truncateAddress(admin)}
            </span>
            <CopyButton
              text={admin}
              className="size-6 shrink-0 text-content-muted hover:text-content-primary [&_svg:not([class*='size-'])]:size-3"
            />
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-content-secondary mb-1">
            Status
          </p>
          <Badge variant={paused ? "destructive" : "default"}>
            {paused ? "Paused" : "Active"}
          </Badge>
        </div>

        <div>
          <a
            href={`https://etherscan.io/address/${address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            View on Etherscan
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
