import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function ProposalHeader() {
  return (
    <div className="border-b border-border-default">
        <div className="container mx-auto py-4">
          <Link href="/" className="inline-flex items-center gap-1.5 text-content-primary hover:text-content-secondary transition-colors duration-200">
              <ArrowLeft size={16} /> Proposal Details
          </Link>
        </div>
      </div>
  );
}
