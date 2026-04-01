import * as React from "react";

import { cn } from "@/lib/utils";

export type CommonTableItem = {
  label: string;
  value: React.ReactNode;
};

export type CommonTableSection = {
  id?: string;
  title: string;
  icon?: React.ReactNode;
  items: CommonTableItem[];
};

type CommonTableProps = React.ComponentProps<"div"> & {
  sections: CommonTableSection[];
  columns?: 2 | 3 | 4;
};

function chunkItems(items: CommonTableItem[], size: number): CommonTableItem[][] {
  const chunks: CommonTableItem[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

export function CommonTable({
  sections,
  columns = 4,
  className,
  ...props
}: CommonTableProps) {
  return (
    <div className={cn("space-y-6", className)} {...props}>
      {sections.map((section) => {
        const rows = chunkItems(section.items, columns);
        return (
          <section
            key={section.id ?? section.title}
            className="overflow-hidden rounded-2xl border border-border-default"
          >
            <table className="w-full table-fixed border-collapse">
              <thead>
                <tr className="bg-[#a7a7a70f] dark:bg-surface-base-extralight">
                  <th
                    colSpan={columns}
                    className="px-4 lg:px-6 py-3 lg:py-5 text-left border-b border-border-default"
                  >
                    <div className="flex items-center gap-2.5">
                      {section.icon ? (
                        <span className="text-content-secondary">{section.icon}</span>
                      ) : null}
                      <h3 className="text-lg md:text-xl lg:text-2xl font-semibold tracking-[-0.24px] text-content-primary">
                        {section.title}
                      </h3>
                    </div>
                  </th>
                </tr>
              </thead>
            </table>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] table-fixed border-collapse">
                <colgroup>
                  {Array.from({ length: columns }).map((_, colIndex) => (
                    <col key={`${section.id ?? section.title}-col-${colIndex}`} />
                  ))}
                </colgroup>
                <tbody>
                  {rows.map((row, rowIndex) => (
                    <tr key={`${section.id ?? section.title}-row-${rowIndex}`}>
                      {Array.from({ length: columns }).map((_, colIndex) => {
                        const item = row[colIndex];
                        const isLastRow = rowIndex === rows.length - 1;
                        const isLastCol = colIndex === columns - 1;

                        return (
                          <td
                            key={`${section.id ?? section.title}-${rowIndex}-${colIndex}`}
                            className={cn(
                              "align-top min-h-24 p-4 lg:p-6",
                              !isLastRow && "border-b border-border-default",
                              !isLastCol && "border-r border-border-default"
                            )}
                          >
                            {item ? (
                              <>
                                <p className="text-content-medium text-sm leading-[1.42]">
                                  {item.label}
                                </p>
                                <p className="text-content-primary text-[15px] lg:text-base font-medium lg:font-bold leading-none mt-2 lg:mt-4">
                                  {item.value}
                                </p>
                              </>
                            ) : null}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );
      })}
    </div>
  );
}

