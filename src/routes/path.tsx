import type { ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useApp, type Profile } from "@/lib/maldives/store";
import { playbook, quotaPhaseout, t } from "@/lib/maldives/knowledge";
import { cn } from "@/lib/utils";
import { SourceChips } from "@/components/source-chips";
import { pageHead } from "@/lib/maldives/seo";
import { AdUnit } from "@/components/ads/ad-unit";

export const Route = createFileRoute("/path")({
  head: () => pageHead("path"),
  component: PathPage,
});

const REGIONS: { id: Profile["region"]; ru: string; en: string }[] = [
  { id: "cis", ru: "СНГ / Восточная Европа", en: "CIS / Eastern Europe" },
  { id: "south-asia", ru: "Южная Азия", en: "South Asia" },
  { id: "philippines", ru: "Филиппины", en: "Philippines" },
  { id: "africa", ru: "Африка", en: "Africa" },
  { id: "other", ru: "Другое", en: "Other" },
];

const FAMILIES: { id: Profile["roleFamily"]; ru: string; en: string }[] = [
  { id: "fb", ru: "F&B / зал", en: "F&B / service" },
  { id: "housekeeping", ru: "Housekeeping", en: "Housekeeping" },
  { id: "kitchen", ru: "Кухня / stewarding", en: "Kitchen / stewarding" },
  { id: "spa", ru: "Spa", en: "Spa" },
  { id: "front-office", ru: "Front office / GRO", en: "Front office / GRO" },
  { id: "dive", ru: "Дайвинг", en: "Dive" },
  { id: "engineering", ru: "Инженерия / техника", en: "Engineering" },
  { id: "entertainment", ru: "Анимация", en: "Entertainment" },
  { id: "hr-admin", ru: "HR / accounts", en: "HR / accounts" },
  { id: "other", ru: "Другое", en: "Other" },
];

export function PathPage() {
  const lang = useApp((s) => s.lang);
  const ru = lang === "ru";
  const profile = useApp((s) => s.profile);
  const setProfile = useApp((s) => s.setProfile);
  const wizardDone = useApp((s) => s.wizardDone);
  const setWizardDone = useApp((s) => s.setWizardDone);
  const doneSteps = useApp((s) => s.doneSteps);
  const toggleStep = useApp((s) => s.toggleStep);

  const riskRoles =
    profile.roleFamily === "front-office" ||
    profile.roleFamily === "hr-admin" ||
    profile.roleFamily === "entertainment" ||
    profile.roleFamily === "engineering";

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-xs uppercase tracking-[0.18em] text-subtle">
        {ru ? "Операционный путь" : "Operating path"}
      </p>
      <h1 className="mt-2 font-display text-4xl">{ru ? "Путь на атолл" : "Path to the atoll"}</h1>
      <p className="mt-3 max-w-2xl text-muted">
        {ru
          ? "Сначала профиль — чтобы не вести вас в роль, которую государство закрывает для экспатов. Затем 14 шагов. Ничего не «гарантируем»: это карта, не билет."
          : "Profile first — so we do not walk you into a role the state is closing to expatriates. Then 14 steps. Nothing is “guaranteed”: this is a map, not a ticket."}
      </p>

      <Card className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-xl">{ru ? "Профиль" : "Profile"}</h2>
          {wizardDone ? (
            <Button variant="ghost" size="sm" onClick={() => setWizardDone(false)}>
              {ru ? "Изменить" : "Edit"}
            </Button>
          ) : null}
        </div>
        {wizardDone ? (
          <p className="mt-3 text-sm text-muted">
            {REGIONS.find((r) => r.id === profile.region)?.[lang]} ·{" "}
            {FAMILIES.find((r) => r.id === profile.roleFamily)?.[lang]} · {profile.experience} · English{" "}
            {profile.english}
          </p>
        ) : (
          <div className="mt-5 grid gap-6">
            <Field label={ru ? "Откуда вы" : "Where you are from"}>
              <Pills
                items={REGIONS.map((r) => ({ id: r.id, label: r[lang] }))}
                value={profile.region}
                onChange={(id) => setProfile({ region: id as Profile["region"] })}
              />
            </Field>
            <Field label={ru ? "Семья ролей" : "Role family"}>
              <Pills
                items={FAMILIES.map((r) => ({ id: r.id, label: r[lang] }))}
                value={profile.roleFamily}
                onChange={(id) => setProfile({ roleFamily: id as Profile["roleFamily"] })}
              />
            </Field>
            <Field label={ru ? "Опыт hospitality" : "Hospitality experience"}>
              <Pills
                items={[
                  { id: "none", label: ru ? "Нет" : "None" },
                  { id: "1-2", label: "1–2y" },
                  { id: "3plus", label: "3y+" },
                ]}
                value={profile.experience}
                onChange={(id) => setProfile({ experience: id as Profile["experience"] })}
              />
            </Field>
            <Field label={ru ? "Английский" : "English"}>
              <Pills
                items={[
                  { id: "basic", label: ru ? "Базовый" : "Basic" },
                  { id: "conversational", label: ru ? "Разговорный" : "Conversational" },
                  { id: "fluent", label: ru ? "Свободный" : "Fluent" },
                ]}
                value={profile.english}
                onChange={(id) => setProfile({ english: id as Profile["english"] })}
              />
            </Field>
            <Button onClick={() => setWizardDone(true)} className="w-fit">
              {ru ? "Показать мой путь" : "Show my path"}
            </Button>
          </div>
        )}
        {riskRoles ? (
          <div className="mt-4 rounded-xl border border-warn/30 bg-warn/10 p-4 text-sm text-warn">
            {ru
              ? "Эта семья ролей фигурирует в прессе о фазировании квот 2025–2026. Сверьте PDF на immigration.gov.mv/downloads до того, как платить кому-либо."
              : "This role family appears in 2025–2026 quota phase-out press. Verify the PDF on immigration.gov.mv/downloads before you pay anyone."}
          </div>
        ) : null}
      </Card>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {quotaPhaseout.map((q) => (
          <Card key={q.window.en} className="p-4">
            <Badge tone="warn">{t(lang, q.window)}</Badge>
            <p className="mt-3 text-sm leading-relaxed text-muted">{t(lang, q.roles)}</p>
            <p className="mt-2 text-[11px] uppercase tracking-wide text-subtle">
              {ru ? "Уровень: пресса, не gazette" : "Level: press, not gazette"}
            </p>
          </Card>
        ))}
      </div>

      <AdUnit slot="mid" />

      <ol className="mt-10 grid gap-4">
        {playbook.map((step, i) => {
          const on = doneSteps.includes(step.id);
          return (
            <li key={step.id} id={step.id}>
              <Card className={cn(on && "border-ok/35")}>
                <div className="flex flex-wrap items-start gap-4">
                  <button
                    type="button"
                    onClick={() => toggleStep(step.id)}
                    className={cn(
                      "grid size-11 shrink-0 place-items-center rounded-xl border",
                      on ? "border-ok/40 bg-ok/15 text-ok" : "border-border bg-elevated text-muted",
                    )}
                    aria-pressed={on}
                    aria-label={on ? "Mark incomplete" : "Mark complete"}
                  >
                    {on ? <Check className="size-4" /> : <span className="text-xs tabular-nums">{i + 1}</span>}
                  </button>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-display text-2xl leading-snug">{t(lang, step.title)}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{t(lang, step.summary)}</p>
                    {step.warn ? (
                      <p className="mt-3 rounded-lg border border-warn/25 bg-warn/10 px-3 py-2 text-sm text-warn">
                        {t(lang, step.warn)}
                      </p>
                    ) : null}
                    <div className="mt-4 grid gap-4 md:grid-cols-3">
                      <Col title={ru ? "Вы" : "You"} items={step.youDo.map((x) => t(lang, x))} />
                      <Col
                        title={ru ? "Работодатель" : "Employer"}
                        items={step.employerDoes.map((x) => t(lang, x))}
                      />
                      <Col title={ru ? "Не делать" : "Do not"} items={step.doNot.map((x) => t(lang, x))} danger />
                    </div>
                    <div className="mt-4">
                      <SourceChips ids={step.sources} />
                    </div>
                  </div>
                </div>
              </Card>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-xs uppercase tracking-wide text-subtle">{label}</p>
      {children}
    </div>
  );
}

function Pills({
  items,
  value,
  onChange,
}: {
  items: { id: string; label: string }[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it) => (
        <button
          key={it.id}
          type="button"
          onClick={() => onChange(it.id)}
          className={cn(
            "min-h-11 rounded-full border px-3.5 text-sm",
            value === it.id
              ? "border-accent bg-accent text-accent-fg"
              : "border-border bg-elevated text-fg",
          )}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}

function Col({ title, items, danger }: { title: string; items: string[]; danger?: boolean }) {
  return (
    <div>
      <p className={cn("text-xs uppercase tracking-wide", danger ? "text-danger" : "text-subtle")}>
        {title}
      </p>
      <ul className="mt-2 space-y-2">
        {items.map((it) => (
          <li key={it} className="text-sm leading-relaxed text-fg/90">
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
