import type { LocaleText, Source } from "./knowledge";

export type TrustLevel = "A" | "B" | "C" | "D";
export type FieldMark = "stated" | "missing" | "clarify";

export const TRUST_LABEL: Record<TrustLevel, LocaleText> = {
  A: { ru: "A — официальное", en: "A — official" },
  B: { ru: "B — проверяемое", en: "B — verifiable" },
  C: { ru: "C — опыт сообщества", en: "C — community" },
  D: { ru: "D — неподтверждено", en: "D — unconfirmed" },
};

export const TRUST_HINT: Record<TrustLevel, LocaleText> = {
  A: {
    ru: "Immigration, Xpat, MyCareer, LRA, OneGov или карьерная страница самого работодателя.",
    en: "Immigration, Xpat, MyCareer, LRA, OneGov, or the employer’s own careers page.",
  },
  B: {
    ru: "Борд с прямой ссылкой на работодателя. Лид, который ещё надо открыть и прочитать.",
    en: "A board with a direct employer link. A lead you still have to open and read.",
  },
  C: {
    ru: "Reddit, форум, блог, YouTube. Практика и боли — не юридический факт и не оффер.",
    en: "Reddit, forums, blogs, YouTube. Practice and pain — not law and not an offer.",
  },
  D: {
    ru: "Репост, Telegram, неизвестный аккаунт. Не показывать как вакансию без явной пометки.",
    en: "A repost, Telegram, or unknown account. Do not treat as a vacancy without a clear mark.",
  },
};

export const MARK_LABEL: Record<FieldMark, LocaleText> = {
  stated: { ru: "указано", en: "stated" },
  missing: { ru: "не указано", en: "not stated" },
  clarify: { ru: "уточнить", en: "needs check" },
};

export function trustOfSource(s: Source): TrustLevel {
  if (s.kind === "official" || s.kind === "employer") return "A";
  if (s.kind === "board") return "B";
  if (s.kind === "union" || s.kind === "press" || s.kind === "community") return "C";
  return "D";
}

export function trustTone(
  level: TrustLevel,
): "official" | "accent" | "muted" | "warn" {
  if (level === "A") return "official";
  if (level === "B") return "accent";
  if (level === "C") return "muted";
  return "warn";
}

export function markTone(mark: FieldMark): "ok" | "muted" | "warn" {
  if (mark === "stated") return "ok";
  if (mark === "clarify") return "warn";
  return "muted";
}
