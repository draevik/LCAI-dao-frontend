"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  className?: string;
}

export function StatsCard({ title, value, icon, className }: StatsCardProps) {
  return (
    <Card className={cn("py-4", className)}>
      <CardContent className="flex items-center gap-4">
        {icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface-soft border border-border-soft">
            {icon}
          </div>
        )}
        <div>
          <p className="text-sm leading-[1.42] text-content-secondary">{title}</p>
          <p className="text-2xl font-semibold leading-[1.33] text-content-primary">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
