import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import { MarkBadge, TrustLegend } from "@/components/trust-badge";
import { useApp } from "@/lib/maldives/store";
import { contractChecks } from "@/lib/maldives/knowledge";
import {
  inspectOffer,
  OFFER_FIELD_LABEL,
  type OfferFieldKey,
} from "@/lib/maldives/risk";
import { cn } from "@/lib/utils";
import { pageHead } from "@/lib/maldives/seo";
import { AdUnit } from "@/components/ads/ad-unit";

export const Route = createFileRoute("/contract")({
  head: () => pageHead("contract"),
  component: ContractPage,
});

const KEYS: OfferFieldKey[] = [
  "legalName",
  "position",
  "startDate",
  "salary",
  "hours",
  "housing",
  "meals",
  "deductions",
  "airfare",
  "candidateFee",
  "emailDomain",
  "workPermit",
];

export function ContractPage() {
  const lang = useApp((s) => s.lang);
  const ru = lang === "ru";
  const flagsOn = useApp((s) => s.contractFlags);
  const toggle = useApp((s) => s.toggleContract);
  const done = contractChecks.filter((d) => flagsOn[d.id]).length;
  const ready = done === contractChecks.length;

  const [draft, setDraft] = useState({
    company: "",
    sender: "",
    url: "",
    text: "",
  });
  const { flags, fields } = useMemo(() => inspectOffer(draft), [draft]);
  const high = flags.filter((f) => f.severity === "high").length;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-xs uppercase tracking-[0.18em] text-subtle">
        {ru ? "Оффер, не вердикт" : "Offer, not a verdict"}
      </p>
      <h1 className="mt-2 font-display text-4xl">
        {ru ? "Проверка оффера и контракта" : "Offer and contract check"}
      </h1>
      <p className="mt-3 text-muted">
        {ru
          ? "Инструмент возвращает вопросы и риски, не юридическое заключение. Жильё, еда и билет — только если это написано. Билет не покупайте до Entry Pass."
          : "The tool returns questions and risks, not a legal opinion. Housing, meals and airfare only if written. Do not buy a ticket before the Entry Pass."}
      </p>
      <p className="mt-3">
        <Link to="/documents" className="text-sm text-accent">
          {ru ? "Открыть как документ в студии →" : "Open as a document in the studio →"}
        </Link>
      </p>

      <div className="mt-8">
        <TrustLegend compact />
      </div>

      <Card className="mt-8">
        <h2 className="font-display text-2xl">{ru ? "Вставьте оффер" : "Paste the offer"}</h2>
        <label className="mt-4 block text-xs uppercase tracking-wide text-subtle">
          {ru ? "Компания / резорт" : "Company / resort"}
        </label>
        <Input
          className="mt-1"
          value={draft.company}
          onChange={(e) => setDraft({ ...draft, company: e.target.value })}
        />
        <label className="mt-3 block text-xs uppercase tracking-wide text-subtle">
          {ru ? "Email отправителя" : "Sender email"}
        </label>
        <Input
          className="mt-1"
          value={draft.sender}
          onChange={(e) => setDraft({ ...draft, sender: e.target.value })}
        />
        <label className="mt-3 block text-xs uppercase tracking-wide text-subtle">URL</label>
        <Input
          className="mt-1"
          value={draft.url}
          onChange={(e) => setDraft({ ...draft, url: e.target.value })}
        />
        <label className="mt-3 block text-xs uppercase tracking-wide text-subtle">
          {ru ? "Текст письма или PDF" : "Letter or PDF text"}
        </label>
        <Textarea
          className="mt-1 min-h-40"
          value={draft.text}
          onChange={(e) => setDraft({ ...draft, text: e.target.value })}
        />
        <p className="mt-4 font-mono text-sm tabular-nums text-subtle">
          {high
            ? ru
              ? `${high} высоких риска`
              : `${high} high risks`
            : ru
              ? "Высоких автофлагов нет"
              : "No high auto-flags"}
        </p>
      </Card>

      <ul className="mt-4 grid gap-2">
        {KEYS.map((key) => {
          const f = fields[key];
          return (
            <li key={key}>
              <div
                className={cn(
                  "flex items-start justify-between gap-3 rounded-2xl border px-4 py-3",
                  f.risk ? "border-danger/35 bg-danger/10" : "border-border bg-surface",
                )}
              >
                <div>
                  <p className="text-sm font-medium">{OFFER_FIELD_LABEL[key][lang]}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{f.note[lang]}</p>
                </div>
                <MarkBadge mark={f.mark} />
              </div>
            </li>
          );
        })}
      </ul>

      {draft.text.trim().length > 40 ? <AdUnit slot="after-success" /> : null}

      <ul className="mt-6 grid gap-2">
        {flags.map((f) => (
          <li key={f.id}>
            <Card className="p-4">
              <Badge
                tone={f.severity === "high" ? "danger" : f.severity === "mid" ? "warn" : "ok"}
              >
                {f.severity}
              </Badge>
              <h3 className="mt-2 font-display text-lg">{lang === "ru" ? f.title.ru : f.title.en}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {lang === "ru" ? f.detail.ru : f.detail.en}
              </p>
            </Card>
          </li>
        ))}
      </ul>

      <p className={cn("mt-10 font-mono text-sm tabular-nums", ready ? "text-ok" : "text-subtle")}>
        {done}/{contractChecks.length}
        {ready
          ? ru
            ? " — можно подписывать, если PDF на бланке и Entry Pass есть"
            : " — sign only on letterhead PDF with an Entry Pass"
          : ru
            ? " — отметьте 12 строк контракта вручную"
            : " — tick the 12 contract lines by hand"}
      </p>
      <ul className="mt-4 grid gap-2">
        {contractChecks.map((d) => {
          const on = !!flagsOn[d.id];
          return (
            <li key={d.id}>
              <button
                type="button"
                onClick={() => toggle(d.id)}
                className={cn(
                  "flex min-h-14 w-full items-center gap-3 rounded-2xl border px-4 text-left",
                  on ? "border-ok/35 bg-ok/10" : "border-border bg-surface",
                )}
              >
                <span
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-lg border",
                    on ? "border-ok/40 bg-ok/20 text-ok" : "border-border text-muted",
                  )}
                >
                  {on ? <Check className="size-4" /> : null}
                </span>
                <span className="text-sm">{lang === "ru" ? d.ru : d.en}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <Card className="mt-8">
        <h2 className="font-display text-xl">{ru ? "Вопросы HR до подписи" : "Ask HR before you sign"}</h2>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
          <li>Average service charge, last 3 months, this property?</li>
          <li>Pay day? Currency on the slip — USD or MVR?</li>
          <li>Who holds the passport after arrival, and for how long?</li>
          <li>Staff room: how many people, AC, distance to guest island?</li>
          <li>Probation length and who pays the ticket if you fail it?</li>
          <li>Work Permit / Employment Approval number — when can I see it in Xpat?</li>
        </ul>
        <Button asChild variant="secondary" className="mt-4 w-fit" size="sm">
          <a
            href="https://xpat.egov.mv/"
            target="_blank"
            rel="noreferrer"
            className="no-underline"
          >
            {ru ? "Открыть Xpat (проверка permit)" : "Open Xpat (permit check)"}
          </a>
        </Button>
      </Card>
    </div>
  );
}
