import { ExternalLink, FilePlus, Flag } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrustBadge, MarkBadge } from "@/components/trust-badge";
import { t } from "@/lib/maldives/knowledge";
import { FIELD_LABEL, type Vacancy, type VacancyFieldKey } from "@/lib/maldives/vacancies";
import { useApp } from "@/lib/maldives/store";

const KEYS: VacancyFieldKey[] = [
  "salary",
  "serviceCharge",
  "housing",
  "meals",
  "ticket",
  "insurance",
  "schedule",
  "foreigners",
];

export function VacancyCard({
  vacancy,
  onPack,
  onReport,
}: {
  vacancy: Vacancy;
  onPack?: () => void;
  onReport?: () => void;
}) {
  const lang = useApp((s) => s.lang);
  const ru = lang === "ru";

  return (
    <Card className="flex min-w-0 flex-col gap-4 overflow-hidden">
      <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-display text-xl">{vacancy.employer}</h2>
            <TrustBadge level={vacancy.trust} />
            <Badge tone="muted">
              {vacancy.kind === "employer-desk"
                ? ru
                  ? "стол"
                  : "desk"
                : vacancy.kind === "board-signal"
                  ? ru
                    ? "борд"
                    : "board"
                  : ru
                    ? "разбор"
                    : "decoded"}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted">{t(lang, vacancy.role)}</p>
        </div>
        <p className="shrink-0 font-mono text-[11px] tabular-nums text-subtle">
          {ru ? "проверка" : "checked"} {vacancy.checkedAt}
        </p>
      </div>

      <p className="text-sm leading-relaxed text-muted">{t(lang, vacancy.note)}</p>
      {vacancy.warn ? (
        <p className="rounded-xl border border-warn/30 bg-warn/10 px-3 py-2 text-sm text-warn">
          {t(lang, vacancy.warn)}
        </p>
      ) : null}

      <dl className="grid gap-2 sm:grid-cols-2">
        {KEYS.map((key) => {
          const f = vacancy.fields[key];
          return (
            <div
              key={key}
              className="flex items-start justify-between gap-2 rounded-xl border border-border px-3 py-2"
            >
              <div className="min-w-0">
                <dt className="text-[11px] uppercase tracking-wide text-subtle">
                  {t(lang, FIELD_LABEL[key])}
                </dt>
                {f.value ? (
                  <dd className="mt-0.5 truncate text-xs text-muted">{t(lang, f.value)}</dd>
                ) : (
                  <dd className="mt-0.5 text-xs text-subtle">—</dd>
                )}
              </div>
              <MarkBadge mark={f.mark} />
            </div>
          );
        })}
      </dl>

      <div className="mt-auto flex flex-wrap gap-2">
        {vacancy.sourceUrl ? (
          <Button asChild variant="secondary" size="sm">
            <a href={vacancy.sourceUrl} target="_blank" rel="noreferrer" className="no-underline">
              {ru ? "Открыть источник" : "Open source"}
              <ExternalLink />
            </a>
          </Button>
        ) : null}
        {onPack ? (
          <Button type="button" size="sm" onClick={onPack}>
            <FilePlus className="size-4" />
            {ru ? "Пакет отклика" : "Application pack"}
          </Button>
        ) : (
          <Button asChild size="sm">
            <Link to="/documents" className="no-underline">
              <FilePlus className="size-4" />
              {ru ? "Пакет отклика" : "Application pack"}
            </Link>
          </Button>
        )}
        {onReport ? (
          <Button type="button" variant="secondary" size="sm" onClick={onReport}>
            <Flag className="size-4" />
            {ru ? "Сообщить о подозрении" : "Report suspicion"}
          </Button>
        ) : null}
      </div>
    </Card>
  );
}
