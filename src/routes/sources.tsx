import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { TrustBadge, TrustLegend } from "@/components/trust-badge";
import { useApp } from "@/lib/maldives/store";
import { CHECKED_AT, sources, t } from "@/lib/maldives/knowledge";
import { trustOfSource } from "@/lib/maldives/trust";
import { pageHead } from "@/lib/maldives/seo";
import { AdUnit } from "@/components/ads/ad-unit";

export const Route = createFileRoute("/sources")({
  head: () => pageHead("sources"),
  component: SourcesPage,
});

export function SourcesPage() {
  const lang = useApp((s) => s.lang);
  const ru = lang === "ru";
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-xs uppercase tracking-[0.18em] text-subtle">
        {ru ? "Граф источников" : "Source graph"}
      </p>
      <h1 className="mt-2 font-display text-4xl">{ru ? "Официальное и первичное" : "Official and primary"}</h1>
      <p className="mt-3 max-w-2xl text-muted">
        {ru
          ? `Канон — gov.mv, LRA, oneGov, карьера самого резорта. Проверка ${CHECKED_AT}. Ни один пункт не «как будто официальный».`
          : `Canon is gov.mv, LRA, oneGov, the resort’s own careers page. Checked ${CHECKED_AT}. Nothing is “as if official”.`}
      </p>
      <div className="mt-6 min-w-0">
        <TrustLegend />
      </div>
      <AdUnit slot="mid" />
      <div className="mt-8 grid gap-3">
        {sources.map((s) => {
          const trust = trustOfSource(s);
          return (
            <a key={s.id} href={s.url} target="_blank" rel="noreferrer" className="block min-w-0 max-w-full no-underline">
              <Card className="flex w-full min-w-0 max-w-full flex-col gap-3 overflow-hidden transition-colors hover:border-border-strong">
                <div className="min-w-0 w-full">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="max-w-full break-words font-display text-xl">{s.name}</h2>
                    <TrustBadge level={trust} />
                    <Badge tone="muted">{s.kind}</Badge>
                    {s.foreignerUseful ? (
                      <Badge tone="ok">{ru ? "для экспатов" : "for expats"}</Badge>
                    ) : (
                      <Badge tone="warn">{ru ? "локальный" : "local"}</Badge>
                    )}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed break-words text-muted">{t(lang, s.note)}</p>
                  <p className="mt-2 max-w-full truncate font-mono text-xs text-subtle">{s.url}</p>
                </div>
              </Card>
            </a>
          );
        })}
      </div>
    </div>
  );
}
