import { createFileRoute, Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { TrustBadge } from "@/components/trust-badge";
import { ScEstimator } from "@/components/sc-estimator";
import { AdUnit } from "@/components/ads/ad-unit";
import { useApp } from "@/lib/maldives/store";
import { islandLife, roles, t } from "@/lib/maldives/knowledge";
import { pageHead } from "@/lib/maldives/seo";

export const Route = createFileRoute("/roles")({
  head: () => pageHead("roles"),
  component: RolesPage,
});

export function RolesPage() {
  const lang = useApp((s) => s.lang);
  const ru = lang === "ru";
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-xs uppercase tracking-[0.18em] text-subtle">
        {ru ? "Роли и деньги" : "Roles and money"}
      </p>
      <h1 className="mt-2 font-display text-4xl">
        {ru ? "Что реально берут — и какие вилки встречаются" : "What actually hires — and which pay bands show up"}
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        {ru
          ? "Basic USD здесь — ориентир уровня C (влоги, сообщества, устаревшие обзоры). Это не оффер, не среднее по рынку и не обещание service charge. Реальная цифра — только в контракте конкретного резорта. Hire = насколько иностранцу реалистично войти. Quota risk = пресса 2025–2026, не gazette."
          : "Basic USD here is a C-level orientation (vlogs, communities, stale reviews). Not an offer, not a market average, not a service-charge promise. The real figure is only in that resort’s contract. Hire = how realistic entry is for a foreigner. Quota risk = 2025–2026 press, not the gazette."}
      </p>

      <div className="mt-8">
        <ScEstimator />
      </div>

      <div className="mt-10">
        <h2 className="font-display text-2xl">{ru ? "Быт острова — не закон" : "Island life — not statute"}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          {ru
            ? "Второй отчёт Gemini смешивает Reddit и «обязательное жильё». Ниже — боли сообществ (уровень C). Жильё, стол и билет появляются только если они в вашем контракте."
            : "The second Gemini report mixes Reddit with “housing is mandatory”. Below are community pains (trust C). Housing, meals and a ticket exist only if they are in your contract."}
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {islandLife.map((item) => (
            <Card key={item.id} className="min-w-0 p-4">
              <div className="flex items-center gap-2">
                <TrustBadge level="C" />
                <h3 className="font-display text-lg">{t(lang, item.title)}</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t(lang, item.text)}</p>
            </Card>
          ))}
        </div>
      </div>

      <AdUnit slot="mid" />

      <div className="mt-10 grid gap-3">
        {roles.map((r) => (
          <Card key={r.id} className="min-w-0 overflow-hidden">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h2 className="font-display text-2xl">{t(lang, r.title)}</h2>
                <p className="mt-1 font-mono text-sm tabular-nums text-accent">
                  basic ~ USD {r.basicUsd}
                </p>
                <div className="mt-2">
                  <TrustBadge level="C" />
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <Badge tone={r.hire === "high" ? "ok" : r.hire === "mid" ? "accent" : "muted"}>
                  hire {r.hire}
                </Badge>
                <Badge
                  tone={
                    r.quotaRisk === "high" ? "danger" : r.quotaRisk === "watch" ? "warn" : "ok"
                  }
                >
                  quota {r.quotaRisk}
                </Badge>
                <Badge tone="muted">EN {r.english}</Badge>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">{t(lang, r.note)}</p>
            <p className="mt-2 text-sm leading-relaxed">{t(lang, r.perks)}</p>
          </Card>
        ))}
      </div>

      <p className="mt-8 text-sm text-subtle">
        {ru ? "Дальше: " : "Next: "}
        <Link to="/contract" className="text-accent no-underline hover:underline">
          {ru ? "разобрать оффер" : "inspect an offer"}
        </Link>
        {" · "}
        <Link to="/reddit" className="text-accent no-underline hover:underline">
          {ru ? "спрос Reddit" : "Reddit demand"}
        </Link>
        {" · "}
        <Link to="/faq" className="text-accent no-underline hover:underline">
          FAQ
        </Link>
      </p>
    </div>
  );
}
