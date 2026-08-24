import { useEffect } from "react";

const SRC =
  "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7636435144500691";

function alreadyInHead() {
  return Boolean(
    document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]') ||
      document.querySelector("script[data-atoll-ads]"),
  );
}

/**
 * Fallback loader. Production SSR already puts adsbygoogle.js in <head>
 * (`__root.tsx` head().scripts) so the AdSense crawler can verify ownership.
 * Skip iframe (live preview) and loopback (Playwright). Auto ads stay OFF.
 */
export function AdSense() {
  useEffect(() => {
    if (window.self !== window.top) return;
    const host = window.location.hostname;
    if (host === "127.0.0.1" || host === "localhost") return;
    if (alreadyInHead()) return;
    const s = document.createElement("script");
    s.async = true;
    s.src = SRC;
    s.crossOrigin = "anonymous";
    s.dataset.atollAds = "1";
    document.head.appendChild(s);
  }, []);
  return null;
}
