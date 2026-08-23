import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-opacity duration-150 disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-accent-fg hover:opacity-90 active:scale-[0.98]",
        secondary:
          "bg-elevated text-fg border border-border hover:border-border-strong",
        ghost: "text-fg hover:bg-elevated",
        outline:
          "border border-border-strong bg-transparent text-fg hover:bg-elevated",
        danger: "bg-danger/15 text-danger border border-danger/30 hover:bg-danger/25",
      },
      size: {
        sm: "h-9 px-3 text-sm rounded-[10px]",
        md: "h-11 px-4 text-sm rounded-xl",
        lg: "h-12 px-5 text-base rounded-[14px]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
