"use client";

import ReactMarkdown from "react-markdown";
import type { User } from "@/types";

interface ProfileStatementProps {
  user: User | null;
}

export function ProfileStatement({ user }: ProfileStatementProps) {
  const statement = user?.statement ?? null;
  if (!statement) {
    return (
      <div className="py-12 text-center text-content-secondary">
        This delegate hasn&apos;t published a statement yet.
      </div>
    );
  }

  return (
    <div className="prose prose-sm dark:prose-invert max-w-none">
      <ReactMarkdown>{statement}</ReactMarkdown>
    </div>
  );
}
