import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TrustBadge } from "@/components/trust-badge";
import { SourceChips } from "@/components/source-chips";
import { useApp } from "@/lib/maldives/store";
import {
  estimatePay,
  formatMvr,
  formatUsd,
  MIRA_EWT_ZERO_MVR,
  MVR_PER_USD,
} from "@/lib/maldives/pay";
import { cn } from "@/lib/utils";

export function ScEstimator() {
  const lang = useApp((s) => s.lang);
  const ru = lang === "ru";
  const [basicUsd, setBasicUsd] = useState("");
  const [scUsd, setScUsd] = useState("");
  const [tipsUsd, setTipsUsd] = useState("");
  const [housing, setHousing] = useState(false);
  const [meals, setMeals] = useState(false);
  const est = estimatePay({ basicUsd, scUsd, tipsUsd, housing, meals });

  return (
    <Card className="min-w-0 overflow-hidden">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.18em] text-subtle">
            {ru ? "Сценарий, не чужой январь" : "Your figures, not someone else’s January"}
          </p>
          <h2 className="mt-2 font-display text-2xl">
            {ru ? "Basic + service charge + налог MIRA" : "Basic + service charge + MIRA tax"}
          </h2>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <TrustBadge level="A" />
          <TrustBadge level="C" />
        </div>
      </div>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        {ru
          ? "Введите цифры из своего оффера или гипотезу. Таблицу Velaa / Cheval Blanc / Ritz за январь мы не копируем: это чужой пик, уровень C, не ваш контракт. Service charge не гарантирован. Порог EWT 0% — официальный MIRA: ≤ 60 000 MVR в месяц."
          : "Type figures from your offer, or a hypothesis. We do not copy the Velaa / Cheval Blanc / Ritz January table: that is someone else’s peak, trust C, not your contract. Service charge is not guaranteed. The EWT 0% band is official MIRA: ≤ 60,000 MVR per month."}
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Field
          label={ru ? "Basic, USD / мес" : "Basic, USD / month"}
          value={basicUsd}
          onChange={setBasicUsd}
          placeholder="600"
        />
        <Field
          label={ru ? "Service charge, USD" : "Service charge, USD"}
          value={scUsd}
          onChange={setScUsd}
          placeholder={ru ? "если известно" : "if known"}
        />
        <Field
          label={ru ? "Tips, USD" : "Tips, USD"}
          value={tipsUsd}
          onChange={setTipsUsd}
          placeholder="0"
        />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <Toggle
          pressed={housing}
          onPressed={() => setHousing((v) => !v)}
          label={ru ? "В контракте есть жильё staff village" : "Contract includes staff-village housing"}
        />
        <Toggle
          pressed={meals}
          onPressed={() => setMeals((v) => !v)}
          label={ru ? "В контракте есть питание canteen" : "Contract includes staff-canteen meals"}
        />
      </div>

      <div className="mt-6 rounded-xl border border-border bg-elevated p-4">
        {est.empty ? (
          <p className="text-sm text-muted">
            {ru
              ? "Пока пусто. Возьмите basic из письма HR, не из рекламы агентства."
              : "Empty until you type a basic from the HR letter, not from an agency ad."}
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-3">
            <Stat
              k={ru ? "Сумма USD" : "Gross USD"}
              v={`$${formatUsd(est.grossUsd)}`}
              hint={ru ? "basic + SC + tips, как вы ввели" : "basic + SC + tips, as you typed"}
            />
            <Stat
              k={ru ? "≈ MVR / мес" : "≈ MVR / month"}
              v={formatMvr(est.grossMvr)}
              hint={`${MVR_PER_USD} MVR/USD · ${ru ? "не курс банка" : "not a bank quote"}`}
            />
            <Stat
              k={ru ? "Порог MIRA" : "MIRA band"}
              v={
                est.underEwtZero
                  ? ru
                    ? "EWT 0%"
                    : "EWT 0%"
                  : ru
                    ? "выше 0%"
                    : "above 0%"
              }
              hint={`${ru ? "порог" : "threshold"} ${formatMvr(MIRA_EWT_ZERO_MVR)} MVR`}
              ok={est.underEwtZero}
              warn={!est.underEwtZero}
            />
          </div>
        )}
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-bg">
          <div
            className={cn(
              "h-full rounded-full transition-[width] duration-200",
              est.underEwtZero || est.empty ? "bg-ok" : "bg-warn",
            )}
            style={{ width: `${est.empty ? 0 : Math.max(est.meterPct, 3)}%` }}
          />
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {est.empty
            ? ru
              ? "Полоска — доля от порога 60 000 MVR, не «налог рассчитан»."
              : "The bar is the share of the 60,000 MVR band, not a computed tax."
            : est.underEwtZero
              ? ru
                ? "При этой сумме месячное вознаграждение ниже порога MIRA: EWT 0%. Это не «налога в стране нет». Если SC прыгнет в высокий сезон, пересчитайте."
                : "At this total, monthly remuneration sits under the MIRA band: EWT 0%. That is not “the country has no tax”. Recalculate if peak-season SC jumps."
              : ru
                ? "Выше порога 60 000 MVR в месяц. Ставки смотрите на mira.gov.mv — мы не считаем ваш налог и не подставляем чужие вилки."
                : "Above 60,000 MVR per month. Read the rates on mira.gov.mv — we do not compute your tax or paste someone else’s bands."}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {housing && meals
            ? ru
              ? "Если жильё и стол реально в контракте, кэш «на руки» может быть высоким — потому что вы мало тратите, не потому что закон обещает 90–95% накоплений."
              : "If housing and meals are actually in the contract, cash kept can be high — because you spend little, not because the law promises 90–95% savings."
            : ru
              ? "Не считайте остров бесплатным, пока жильё и стол не написаны в оффере. «Резорт всегда кормит» — не закон."
              : "Do not budget the island as free until housing and meals are written in the offer. “The resort always feeds you” is not statute."}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <SourceChips ids={["mira", "lra-reg"]} />
        <Link to="/contract" className="text-sm text-accent no-underline hover:underline">
          {ru ? "Проверить оффер →" : "Inspect the offer →"}
        </Link>
      </div>
    </Card>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <label className="block min-w-0">
      <span className="mb-1.5 block text-xs uppercase tracking-wide text-subtle">{label}</span>
      <Input
        inputMode="decimal"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function Toggle({
  pressed,
  onPressed,
  label,
}: {
  pressed: boolean;
  onPressed: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onPressed}
      className={cn(
        "min-h-11 rounded-xl border px-3 py-2 text-left text-sm leading-snug",
        pressed ? "border-ok/40 bg-ok/15 text-ok" : "border-border bg-elevated text-muted",
      )}
    >
      {label}
    </button>
  );
}

function Stat({
  k,
  v,
  hint,
  ok,
  warn,
}: {
  k: string;
  v: string;
  hint: string;
  ok?: boolean;
  warn?: boolean;
}) {
  return (
    <div className="min-w-0">
      <p className="text-xs uppercase tracking-wide text-subtle">{k}</p>
      <p
        className={cn(
          "mt-1 font-display text-2xl tabular-nums",
          ok && "text-ok",
          warn && "text-warn",
        )}
      >
        {v}
      </p>
      <p className="mt-1 text-xs text-subtle">{hint}</p>
    </div>
  );
}
