"use client";

import React from "react";
import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";

export type ButtonVariant = "primary" | "outline" | "gradient";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "href"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  block?: boolean;
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
}

const baseStyles =
  "inline-flex items-center justify-center gap-1 rounded-[10px] transition-colors focus:outline-none focus:ring-0 focus:ring-offset-0 disabled:opacity-60 disabled:cursor-not-allowed";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:text-white hover:bg-primary-600 active:bg-primary-600",
  outline:
    "border border-border-default-40 bg-surface-x-soft text-content-primary hover:text-white hover:bg-primary active:bg-primary",
  gradient: "bg-gradient-button-primary text-white hover:text-white",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-3 py-2 text-sm font-semibold",
  md: "px-4 py-2.5 text-base font-semibold",
  lg: "px-5 py-2.5 text-base font-medium",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = "primary",
      size = "sm",
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      block = false,
      disabled,
      href,
      target,
      rel,
      type = "button",
      ...props
    },
    ref
  ) => {
    const isDisabled = !!disabled;

    const classes = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      block && "w-full",
      isDisabled && "pointer-events-none opacity-60",
      className
    );

    const content = (
      <>
        {LeftIcon ? <LeftIcon className="w-4 h-4" aria-hidden /> : null}
        <span className="truncate">{children}</span>
        {RightIcon ? <RightIcon className="w-4 h-4" aria-hidden /> : null}
      </>
    );

    if (href) {
      const safeRel = target === "_blank" ? rel ?? "noopener noreferrer" : rel;

      return (
        <Link
          href={href}
          className={classes}
          aria-disabled={isDisabled}
          tabIndex={isDisabled ? -1 : undefined}
          onClick={(e) => {
            if (isDisabled) e.preventDefault();
          }}
          target={target}
          rel={safeRel}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={classes}
        {...props}
        type={type}
      >
        {content}
      </button>
    );
  }
);
Button.displayName = "Button";

export function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}