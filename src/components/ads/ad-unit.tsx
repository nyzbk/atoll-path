import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type AdSlot = "after-success" | "mid" | "footer";

/** No Display units on these routes (AdSense policy + playbook). */
export const LEGAL_PATHS = new Set(["/privacy", "/terms", "/about", "/contact"]);

const CLIENT =
  (import.meta.env.VITE_ADSENSE_CLIENT as string | undefined) || "ca-pub-7636435144500691";

/** Static keys so Vite can replace them. Dynamic `env[name]` is stripped at build. */
const SLOT_IDS: Record<AdSlot, string | undefined> = {
  "after-success": import.meta.env.VITE_ADSENSE_SLOT_AFTER_SUCCESS as string | undefined,
  mid: import.meta.env.VITE_ADSENSE_SLOT_MID as string | undefined,
  footer: import.meta.env.VITE_ADSENSE_SLOT_FOOTER as string | undefined,
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * Manual Display units only. Auto ads stay OFF (Crush / Folio playbook).
 * LIVE after AdSense Site Ready + slot IDs in Vercel env. Until then: labeled placeholder.
 * Never mount next to a primary CTA, on /privacy /terms /about, or in the document editor (PII).
 */
export function AdUnit({
  slot,
  tone = "lagoon",
  className,
}: {
  slot: AdSlot;
  tone?: "lagoon" | "paper";
  className?: string;
}) {
  const live = import.meta.env.VITE_ADSENSE_LIVE === "true";
  const slotId = SLOT_IDS[slot];
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const inIframe = ready && window.self !== window.top;
  const showLive = ready && live && Boolean(CLIENT && slotId) && !inIframe;

  useEffect(() => {
    if (!showLive) return;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      /* strict-mode double mount */
    }
  }, [showLive]);

  if (!showLive) {
    return (
      <aside
        data-ad-slot={slot}
        aria-label="Advertisement placeholder"
        className={cn(
          "my-6 flex min-h-24 items-center justify-center rounded-xl border border-dashed px-4 py-6 text-center",
          tone === "paper"
            ? "border-[#dadce0] bg-[#f8f9fa] text-[#80868b]"
            : "border-border bg-elevated/60 text-subtle",
          className,
        )}
      >
        <p className="text-xs uppercase tracking-wide">Ad · {slot.replaceAll("-", " ")}</p>
      </aside>
    );
  }

  return (
    <aside data-ad-slot={slot} className={cn("my-6 min-h-24 w-full overflow-hidden", className)} aria-label="Advertisement">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={CLIENT}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
