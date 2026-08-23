import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  tone = "muted",
  children,
  ...props
}: {
  className?: string;
  tone?: "muted" | "accent" | "ok" | "warn" | "danger" | "official";
  children: ReactNode;
} & HTMLAttributes<HTMLSpanElement>) {
  const tones: Record<string, string> = {
    muted: "bg-elevated text-muted border-border",
    accent: "bg-accent/15 text-accent border-accent/25",
    ok: "bg-ok/12 text-ok border-ok/25",
    warn: "bg-warn/12 text-warn border-warn/25",
    danger: "bg-danger/12 text-danger border-danger/25",
    official: "bg-lagoon/15 text-accent border-lagoon/30",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide uppercase",
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
