import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import { useApp } from "@/lib/maldives/store";
import { scams, t } from "@/lib/maldives/knowledge";
import { pageHead } from "@/lib/maldives/seo";
import { AdUnit } from "@/components/ads/ad-unit";

export const Route = createFileRoute("/scams")({
  head: () => pageHead("scams"),
  component: ScamsPage,
});

export function ScamsPage() {
  const lang = useApp((s) => s.lang);
  const ru = lang === "ru";
  const addReport = useApp((s) => s.addReport);
  const [form, setForm] = useState({ who: "", url: "", channel: "Telegram", note: "" });
  const [saved, setSaved] = useState(false);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-xs uppercase tracking-[0.18em] text-subtle">
        {ru ? "Защита" : "Defense"}
      </p>
      <h1 className="mt-2 font-display text-4xl">
        {ru ? "Как с вас берут деньги за работу, которую резорт и так даёт" : "How they charge you for a job the resort already gives"}
      </h1>
      <p className="mt-3 text-muted">
        {ru
          ? "Плейлист содержит и честные влоги, и рекламу иммиграционных контор. Мы не клеймим бренд без суда — описываем схему. Если вам выставили счёт до оффера на бланке, вы в схеме."
          : "The playlist mixes honest vlogs and immigration-shop ads. We do not brand a company without a judgment — we describe the pattern. If you were invoiced before a letterhead offer, you are in the pattern."}
      </p>
      <p className="mt-4 flex flex-wrap gap-4">
        <Link to="/contract" className="text-sm text-accent">
          {ru ? "Проверить оффер →" : "Check an offer →"}
        </Link>
        <Link to="/documents" className="text-sm text-accent">
          {ru ? "Редактор документов →" : "Document editor →"}
        </Link>
      </p>
      <div className="mt-8 grid gap-3">
        {scams.map((s) => (
          <Card key={s.id}>
            <Badge tone={s.severity === "high" ? "danger" : "warn"}>{s.severity}</Badge>
            <h2 className="mt-3 font-display text-xl">{t(lang, s.title)}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{t(lang, s.text)}</p>
          </Card>
        ))}
      </div>

      <AdUnit slot="mid" />

      <Card className="mt-8">
        <h2 className="font-display text-2xl">
          {ru ? "Сообщить о подозрении" : "Report a suspicion"}
        </h2>
        <p className="mt-2 text-sm text-muted">
          {ru
            ? "Сохраняется только на этом устройстве. Не заявление в полицию и не жалоба в LRA — для LRA используйте lra.gov.mv."
            : "Saved only on this device. Not a police filing and not an LRA complaint — use lra.gov.mv for that."}
        </p>
        <label className="mt-4 block text-xs uppercase tracking-wide text-subtle">
          {ru ? "Кто / канал" : "Who / channel"}
        </label>
        <Input className="mt-1" value={form.who} onChange={(e) => setForm({ ...form, who: e.target.value })} />
        <label className="mt-3 block text-xs uppercase tracking-wide text-subtle">URL</label>
        <Input className="mt-1" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} />
        <label className="mt-3 block text-xs uppercase tracking-wide text-subtle">
          {ru ? "Что случилось" : "What happened"}
        </label>
        <Textarea
          className="mt-1"
          value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
        />
        <Button
          className="mt-4"
          type="button"
          disabled={!form.who.trim()}
          onClick={() => {
            addReport(form);
            setSaved(true);
            setForm({ who: "", url: "", channel: "Telegram", note: "" });
          }}
        >
          {ru ? "Сохранить у себя" : "Save on this device"}
        </Button>
        {saved ? (
          <p className="mt-3 text-sm text-ok">{ru ? "Сохранено локально." : "Saved locally."}</p>
        ) : null}
        <p className="mt-4 text-xs text-subtle">
          <a href="https://lra.gov.mv/" target="_blank" rel="noreferrer" className="text-accent">
            lra.gov.mv
          </a>
          {" · "}
          <a href="https://one.gov.mv/" target="_blank" rel="noreferrer" className="text-accent">
            one.gov.mv
          </a>
        </p>
      </Card>
    </div>
  );
}
