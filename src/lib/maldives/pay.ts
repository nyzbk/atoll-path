/** MIRA income-tax FAQ: EWT 0% if monthly remuneration ≤ 60,000 MVR. */
export const MIRA_EWT_ZERO_MVR = 60_000;

/**
 * Illustrative MVR per USD used in MIRA recaps (~USD 3,890 ≈ 60,000 MVR).
 * Not a live FX feed. Do not treat as a bank quote.
 */
export const MVR_PER_USD = 15.42;

export type PayEstimate = {
  basicUsd: number;
  scUsd: number;
  tipsUsd: number;
  grossUsd: number;
  grossMvr: number;
  underEwtZero: boolean;
  empty: boolean;
  housingNoted: boolean;
  mealsNoted: boolean;
  meterPct: number;
};

export function parseMoney(raw: string): number {
  const n = Number(String(raw).replace(/[,\s$]/g, ""));
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.round(n * 100) / 100;
}

export function estimatePay(input: {
  basicUsd: string;
  scUsd: string;
  tipsUsd: string;
  housing: boolean;
  meals: boolean;
}): PayEstimate {
  const basicUsd = parseMoney(input.basicUsd);
  const scUsd = parseMoney(input.scUsd);
  const tipsUsd = parseMoney(input.tipsUsd);
  const grossUsd = Math.round((basicUsd + scUsd + tipsUsd) * 100) / 100;
  const grossMvr = Math.round(grossUsd * MVR_PER_USD * 100) / 100;
  const empty = grossUsd <= 0;
  const meterPct = empty
    ? 0
    : Math.min(100, Math.round((grossMvr / MIRA_EWT_ZERO_MVR) * 100));
  return {
    basicUsd,
    scUsd,
    tipsUsd,
    grossUsd,
    grossMvr,
    underEwtZero: !empty && grossMvr <= MIRA_EWT_ZERO_MVR,
    empty,
    housingNoted: input.housing,
    mealsNoted: input.meals,
    meterPct,
  };
}

export function formatUsd(n: number): string {
  return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

export function formatMvr(n: number): string {
  return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}
