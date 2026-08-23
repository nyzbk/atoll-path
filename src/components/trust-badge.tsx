import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  TRUST_HINT,
  TRUST_LABEL,
  trustTone,
  type FieldMark,
  type TrustLevel,
  MARK_LABEL,
  markTone,
} from "@/lib/maldives/trust";
import { t } from "@/lib/maldives/knowledge";
import { useApp } from "@/lib/maldives/store";

export function TrustBadge({ level }: { level: TrustLevel }) {
  const lang = useApp((s) => s.lang);
  return (
    <Badge tone={trustTone(level)} title={TRUST_LABEL[level][lang]}>
      {level}
    </Badge>
  );
}

export function MarkBadge({ mark }: { mark: FieldMark }) {
  const lang = useApp((s) => s.lang);
  return <Badge tone={markTone(mark)}>{MARK_LABEL[mark][lang]}</Badge>;
}

export function TrustLegend({ compact }: { compact?: boolean }) {
  const lang = useApp((s) => s.lang);
  const ru = lang === "ru";
  const levels: TrustLevel[] = ["A", "B", "C", "D"];
  return (
    <div className={compact ? "grid gap-2 sm:grid-cols-2" : "grid gap-3 md:grid-cols-4"}>
      {levels.map((level) => (
        <Card key={level} className="min-w-0 p-4">
          <div className="flex flex-wrap items-center gap-2">
            <TrustBadge level={level} />
            <p className="text-sm font-medium">{TRUST_LABEL[level][lang]}</p>
          </div>
          {compact ? null : (
            <p className="mt-2 text-sm leading-relaxed text-muted">{t(lang, TRUST_HINT[level])}</p>
          )}
        </Card>
      ))}
      {compact ? (
        <p className="sm:col-span-2 text-xs leading-relaxed text-subtle">
          {ru
            ? "Официальное правило, объявление работодателя и рассказ с Reddit — три разных уровня. Приложение их не смешивает."
            : "A government rule, an employer posting and a Reddit story are three different levels. The app does not mix them."}
        </p>
      ) : null}
    </div>
  );
}
