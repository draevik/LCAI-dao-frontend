import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

export function ProposalHeader() {
  return (
    <div className="flex items-center gap-2 mb-8">
      <Link href="/">
        <Button variant="ghost" size="icon" type="button">
          <ArrowLeftIcon className="h-4 w-4" />
        </Button>
      </Link>
      <h1 className="text-3xl font-bold tracking-tight">Proposal</h1>
    </div>
  );
}
