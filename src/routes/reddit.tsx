import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useApp } from "@/lib/maldives/store";
import { redditDemand, t } from "@/lib/maldives/knowledge";
import { pageHead } from "@/lib/maldives/seo";
import { AdUnit } from "@/components/ads/ad-unit";

export const Route = createFileRoute("/reddit")({
  head: () => pageHead("reddit"),
  component: RedditPage,
});

export function RedditPage() {
  const lang = useApp((s) => s.lang);
  const ru = lang === "ru";
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-xs uppercase tracking-[0.18em] text-subtle">Demand</p>
      <h1 className="mt-2 font-display text-4xl">
        {ru ? "Что люди реально спрашивают" : "What people actually ask"}
      </h1>
      <p className="mt-3 text-muted">
        {ru
          ? "Высокий и средний спрос: Reddit (r/maldives, r/askhotels, r/OFWs, r/expats) + темы плейлиста. Это не «идеи для стартапа вообще», а боли прямого найма на Мальдивы. Приложение закрывает каждую строку."
          : "High and mid demand: Reddit (r/maldives, r/askhotels, r/OFWs, r/expats) plus playlist topics. Not generic startup ideas — direct-hire Maldives pain. Each row maps to a screen in this app."}
      </p>
      <AdUnit slot="mid" />
      <div className="mt-8 grid gap-3">
        {redditDemand.map((d) => (
          <Card key={d.topic.en}>
            <Badge tone={d.demand === "high" ? "accent" : "muted"}>{d.demand} demand</Badge>
            <h2 className="mt-3 font-display text-xl">{t(lang, d.topic)}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{t(lang, d.evidence)}</p>
            <p className="mt-3 text-sm">{ru ? "В приложении: " : "In the app: "}{t(lang, d.app)}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
