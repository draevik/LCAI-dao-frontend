import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        active:
          "py-0.5 md:py-1 pl-1 md:pl-2 pr-1.5 md:pr-2.5 gap-1 rounded-lg border-transparent bg-[#CBF6DC] text-[#067647] dark:bg-[#013B24] dark:text-[#0FB46A]",
        pending:
          "py-0.5 md:py-1 pl-1 md:pl-2 pr-1.5 md:pr-2.5 gap-1 rounded-lg border-transparent bg-[#FCEACF] text-[#B93815] dark:bg-[#511C10] dark:text-[#EC9B59]",
        succeed:
          "py-0.5 md:py-1 pl-1 md:pl-2 pr-1.5 md:pr-2.5 gap-1 rounded-lg border-transparent bg-[#D9ECF9] text-[#026AA2] dark:bg-[#003656] dark:text-[#47B2E4]",
        queued:
          "py-0.5 md:py-1 pl-1 md:pl-2 pr-1.5 md:pr-2.5 gap-1 rounded-lg border-transparent bg-[#E8EAF5] text-[#333B75] dark:bg-[#212749] dark:text-[#B3B8DB]",
        defeated:
          "py-0.5 md:py-1 pl-1 md:pl-2 pr-1.5 md:pr-2.5 gap-1 rounded-lg border-transparent bg-[rgba(233,53,68,0.20)] text-[#E93544] dark:bg-[#4A050B] dark:text-[#E93544]",
        canceled:
          "py-0.5 md:py-1 pl-1 md:pl-2 pr-1.5 md:pr-2.5 gap-1 rounded-lg border-transparent bg-[#E2E9F0] text-[#344054] dark:bg-[#1E2535] dark:text-[#CECFD2]",
        expired:
          "py-0.5 md:py-1 pl-1 md:pl-2 pr-1.5 md:pr-2.5 gap-1 rounded-lg border-transparent bg-[#FFF2CE] text-[#B54708] dark:bg-[#4C2D02] dark:text-[#EAB12F]",
        executed:
          "py-0.5 md:py-1 pl-1 md:pl-2 pr-1.5 md:pr-2.5 gap-1 rounded-lg border-transparent bg-[#E4E1FF] text-[#5925DC] dark:bg-[#2C1C5F] dark:text-[#D6BBFB]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
