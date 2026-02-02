"use client";

import Link from "next/link";

const OFFICIAL_CHANNELS_URL = "https://discord.gg/lightchain";

export function BetaBanner() {
  return (
    <div
      role="banner"
      aria-label="Beta release notice"
      className="relative w-full bg-surface-soft border-b border-border-default text-content-secondary text-sm"
    >
      <div className="container flex flex-wrap items-center justify-center gap-x-2 gap-y-1 py-2.5 px-4 text-center">
        <span className="inline-flex items-center gap-1.5 font-medium text-content-primary">
          <span className="rounded bg-primary/15 px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-content-brand">
            Beta
          </span>
          This release is in active development.
        </span>
        <span className="text-content-secondary">
          If you encounter any issues, please report them through{" "}
          <Link
            href={OFFICIAL_CHANNELS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-content-brand underline decoration-content-brand/40 underline-offset-2 transition-colors hover:text-content-brand-light hover:decoration-content-brand"
          >
            LCAI DAO&apos;s official channels
          </Link>
          .
        </span>
      </div>
    </div>
  );
}
