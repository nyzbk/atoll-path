import { useEffect } from "react";

const SRC =
  "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7636435144500691";

/** One head script. Skip iframe (live preview) and loopback (Playwright). Auto ads stay OFF. */
export function AdSense() {
  useEffect(() => {
    if (window.self !== window.top) return;
    const host = window.location.hostname;
    if (host === "127.0.0.1" || host === "localhost") return;
    if (document.querySelector("script[data-atoll-ads]")) return;
    const s = document.createElement("script");
    s.async = true;
    s.src = SRC;
    s.crossOrigin = "anonymous";
    s.dataset.atollAds = "1";
    document.head.appendChild(s);
  }, []);
  return null;
}
