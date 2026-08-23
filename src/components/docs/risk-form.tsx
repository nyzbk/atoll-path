import { useMemo, useState } from "react";
import { Input, Textarea } from "@/components/ui/input";
import {
  inspectOffer,
  OFFER_FIELD_LABEL,
  type OfferFieldKey,
} from "@/lib/maldives/risk";
import type { DocFile } from "@/lib/maldives/docs-types";
import { MARK_LABEL } from "@/lib/maldives/trust";

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

export function RiskForm({
  file,
  onChange,
  ru,
}: {
  file: DocFile;
  onChange: (form: Record<string, string>) => void;
  ru: boolean;
}) {
  const form = file.form;
  const [local, setLocal] = useState({
    text: form.text ?? "",
    sender: form.sender ?? "",
    company: form.company ?? "",
    url: form.url ?? "",
  });

  const { flags, fields } = useMemo(() => inspectOffer(local), [local]);
  const high = flags.filter((f) => f.severity === "high").length;
  const lang = ru ? "ru" : "en";

  function set(k: string, v: string) {
    const next = { ...local, [k]: v };
    setLocal(next);
    onChange(next);
  }

  return (
    <div className="docs-side-scroll">
      <p className="text-[11px] uppercase tracking-[0.14em] text-[#80868b]">
        {ru ? "Проверка предложения" : "Check the offer"}
      </p>
      <p className="mt-2 text-[12px] leading-relaxed text-[#5f6368]">
        {ru
          ? "Не юридическое заключение. Список вопросов и рисков до согласия и до билета."
          : "Not a legal opinion. A list of questions and risks before you agree or buy a ticket."}
      </p>
      <label className="docs-label">{ru ? "Компания / резорт" : "Company / resort"}</label>
      <Input className="docs-input" value={local.company} onChange={(e) => set("company", e.target.value)} />
      <label className="docs-label">{ru ? "Email отправителя" : "Sender email"}</label>
      <Input className="docs-input" value={local.sender} onChange={(e) => set("sender", e.target.value)} />
      <label className="docs-label">URL</label>
      <Input className="docs-input" value={local.url} onChange={(e) => set("url", e.target.value)} />
      <label className="docs-label">{ru ? "Текст" : "Text"}</label>
      <Textarea
        className="docs-input min-h-40"
        value={local.text}
        onChange={(e) => set("text", e.target.value)}
      />
      <p className="mt-4 text-[12px] tabular-nums text-[#3c4043]">
        {high
          ? ru
            ? `${high} высоких флага`
            : `${high} high flags`
          : ru
            ? "Высоких флагов нет"
            : "No high flags"}
      </p>
      <ul className="mt-3 grid gap-2">
        {KEYS.map((key) => {
          const f = fields[key];
          return (
            <li key={key} className="flex items-start justify-between gap-2 rounded-xl border border-[#dadce0] px-3 py-2">
              <div>
                <p className="text-[12px] font-medium">{OFFER_FIELD_LABEL[key][lang]}</p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-[#5f6368]">{f.note[lang]}</p>
              </div>
              <span
                className="shrink-0 rounded-full border px-2 py-0.5 text-[10px] uppercase"
                style={{
                  borderColor: f.risk ? "#e8b4b0" : f.mark === "stated" ? "#cde3d8" : "#dadce0",
                  color: f.risk ? "#8f3d38" : "#5f6368",
                }}
              >
                {MARK_LABEL[f.mark][lang]}
              </span>
            </li>
          );
        })}
      </ul>
      <ul className="mt-4 grid gap-2">
        {flags.map((f) => (
          <li
            key={f.id}
            className="rounded-xl border border-[#dadce0] p-3"
            style={{
              borderColor:
                f.severity === "high" ? "#e8b4b0" : f.severity === "mid" ? "#e6d3a8" : "#cde3d8",
            }}
          >
            <p className="text-[11px] uppercase tracking-wide text-[#80868b]">{f.severity}</p>
            <p className="mt-1 text-[13px] font-medium">{ru ? f.title.ru : f.title.en}</p>
            <p className="mt-1 text-[12px] leading-relaxed text-[#5f6368]">
              {ru ? f.detail.ru : f.detail.en}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
