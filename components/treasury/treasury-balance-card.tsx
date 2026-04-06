"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { compactNumber } from "@/lib/utils";
import clsx from "clsx";

type TreasuryBalanceCardProps = {
  token: {
    symbol: string;
    decimals: number;
    balance: bigint;
    balanceParsed: number;
  };
} & React.HTMLAttributes<HTMLDivElement>;

export function TreasuryBalanceCard({
  token,
  className,
}: TreasuryBalanceCardProps) {
  return (
    <Card
      key={token.symbol}
      className={clsx(
        "gap-8 py-5 px-5 bg-[rgba(204,206,239,0.02)] bg-contain bg-center bg-no-repeat",
        className,
        'first:bg-[linear-gradient(129deg,rgba(255,255,255,0.04)_51.29%,rgba(255,107,226,0.24)_101.18%),url("/images/bg/bg-wave-lines.png")]',
        'bg-[linear-gradient(143deg,rgba(255,255,255,0.04)_61.49%,rgba(98,126,234,0.24)_106.01%),url("/images/bg/bg-wave-lines.png")]'
      )}
    >
      <CardHeader className="px-0 gap-0">
        <CardTitle className="text-sm font-medium text-content-secondary">
          {token.symbol}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <p className="text-2xl lg:text-[28px] font-semibold leading-[1.2] tracking-[-0.28px] text-content-primary">
          {compactNumber(token.balanceParsed)}
        </p>
        <p className="text-xs md:text-sm leading-[1.42] text-content-secondary mt-2">
          {token.symbol === "USD" && "~"}
          {token.balanceParsed.toLocaleString("en-US", {
            maximumFractionDigits: 4,
          })}{" "}
          {token.symbol}
        </p>
      </CardContent>
    </Card>
  );
}
