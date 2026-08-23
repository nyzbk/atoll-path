import { createFileRoute } from "@tanstack/react-router";
import { AdUnit } from "@/components/ads/ad-unit";
import { Card } from "@/components/ui/card";
import { useApp } from "@/lib/maldives/store";
import { faqs, t } from "@/lib/maldives/knowledge";
import { SourceChips } from "@/components/source-chips";
import { pageHead } from "@/lib/maldives/seo";

export const Route = createFileRoute("/faq")({
  head: () => pageHead("faq"),
  component: FaqPage,
});

export function FaqPage() {
  const lang = useApp((s) => s.lang);
  const ru = lang === "ru";
  const head = faqs.slice(0, 5);
  const rest = faqs.slice(5);
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-xs uppercase tracking-[0.18em] text-subtle">FAQ</p>
      <h1 className="mt-2 font-display text-4xl">
        {ru ? "Прямые ответы" : "Straight answers"}
      </h1>
      <div className="mt-8 grid gap-3">
        {head.map((f) => (
          <Card key={f.q.en}>
            <h2 className="font-display text-xl">{t(lang, f.q)}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{t(lang, f.a)}</p>
            <div className="mt-4">
              <SourceChips ids={f.sources} />
            </div>
          </Card>
        ))}
      </div>
      <AdUnit slot="mid" />
      <div className="grid gap-3">
        {rest.map((f) => (
          <Card key={f.q.en}>
            <h2 className="font-display text-xl">{t(lang, f.q)}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{t(lang, f.a)}</p>
            <div className="mt-4">
              <SourceChips ids={f.sources} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
