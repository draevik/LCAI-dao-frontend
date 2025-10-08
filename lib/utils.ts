import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function rmMarkdown(text: string) {
  // #
  // **
  // *
  // ```
  // `
  // __
  // _
  // ~~~
  return text
    .replace(/\n/g, "")
    .replace(/\#|\*\*|\*|\`\`|\`|\_\_|\_|\~\~/g, "");
}

export function formatNumber(num?: string | number) {
  if (!num) return 0;

  return Number(num).toLocaleString("en-US", {
    maximumFractionDigits: 2,
  });
}

export function compactNumber(num?: string | number) {
  if (!num) return 0;

  return Number(num).toLocaleString(undefined, {
    maximumFractionDigits: 2,
    notation: "compact",
  });
}
