import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check, FilePlus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useApp } from "@/lib/maldives/store";
import { completeness, useDocs } from "@/lib/maldives/docs-store";
import { TEMPLATES } from "@/lib/maldives/templates";
import { documents } from "@/lib/maldives/knowledge";
import { cn } from "@/lib/utils";
import { AdUnit } from "@/components/ads/ad-unit";
import type { DocLang } from "@/lib/maldives/docs-types";
import { pageHead } from "@/lib/maldives/seo";

export const Route = createFileRoute("/documents/")({
  head: () => pageHead("documents"),
  component: DocumentsHome,
});

export function DocumentsHome() {
  const lang = useApp((s) => s.lang);
  const ru = lang === "ru";
  const docsTick = useApp((s) => s.docs);
  const toggle = useApp((s) => s.toggleDoc);
  const files = useDocs((s) => s.files);
  const createFromTemplate = useDocs((s) => s.createFromTemplate);
  const createPack = useDocs((s) => s.createPack);
  const remove = useDocs((s) => s.remove);
  const candidate = useDocs((s) => s.candidate);
  const navigate = useNavigate();
  const [docLang, setDocLang] = useState<DocLang>(lang === "ru" ? "en" : "en");
  const { pct } = completeness(candidate);
  const done = documents.filter((d) => docsTick[d.id]).length;

  async function openTemplate(id: string) {
    const file = createFromTemplate(id, docLang);
    await navigate({ to: "/documents/editor/$fileId", params: { fileId: file.id } });
  }

  async function pack() {
    const made = createPack(docLang);
    const first = made[0];
    if (first) await navigate({ to: "/documents/editor/$fileId", params: { fileId: first.id } });
  }

  return (
    <div className="px-4 py-8 sm:px-8">
      <p className="text-[11px] uppercase tracking-[0.16em] text-[#80868b]">
        {ru ? "Бесплатный пакет" : "Free pack"}
      </p>
      <h1 className="mt-2 max-w-2xl font-display text-4xl text-[#202124]">
        {ru ? "Документы, как у агентства — без оплаты агентству" : "Agency-grade documents, without paying an agency"}
      </h1>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#5f6368]">
        {ru
          ? "Это не лицензированное агентство и не Maldives Immigration. Это редактор: CV, письма, трекер, проверка оффера. Work permit по-прежнему подаёт работодатель в Xpat. Файлы живут на этом устройстве."
          : "This is not a licensed agency and not Maldives Immigration. It is an editor: CV, letters, tracker, offer check. The employer still files the work permit in Xpat. Files live on this device."}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => void pack()}
          className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#071314] px-4 text-sm text-[#e7f1ef]"
        >
          <FilePlus className="size-4" />
          {ru ? "Собрать пакет отклика" : "Create application pack"}
        </button>
        <p className="text-[12px] text-[#80868b]">
          {ru ? `Профиль заполнен на ${pct}%` : `Profile ${pct}% complete`}
        </p>
        <label className="ml-auto flex items-center gap-2 text-[12px] text-[#5f6368]">
          {ru ? "Язык шаблона" : "Template language"}
          <select
            className="h-9 rounded-lg border border-[#dadce0] px-2"
            value={docLang}
            onChange={(e) => setDocLang(e.target.value as DocLang)}
          >
            <option value="en">English</option>
            <option value="ru">Русский notes</option>
            <option value="bilingual">Bilingual</option>
          </select>
        </label>
      </div>

      <h2 className="mt-10 font-display text-2xl text-[#202124]">
        {ru ? "Шаблоны" : "Templates"}
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => void openTemplate(t.id)}
            className="rounded-2xl border border-[#dadce0] bg-white p-5 text-left shadow-[0_1px_0_rgba(32,33,36,0.06)] transition-shadow hover:shadow-[0_8px_24px_rgba(32,33,36,0.08)]"
          >
            <p className="text-[11px] uppercase tracking-wide text-[#80868b]">{t.formats.join(" · ")}</p>
            <h3 className="mt-2 font-display text-xl text-[#202124]">{ru ? t.title.ru : t.title.en}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-[#5f6368]">{ru ? t.blurb.ru : t.blurb.en}</p>
          </button>
        ))}
      </div>

      <h2 className="mt-12 font-display text-2xl text-[#202124]">
        {ru ? "Мои файлы" : "My files"}
      </h2>
      {files.length === 0 ? (
        <p className="mt-3 text-sm text-[#80868b]">
          {ru ? "Пока пусто — выберите шаблон." : "Empty — pick a template."}
        </p>
      ) : (
        <ul className="mt-3 grid gap-2">
          {files.map((f) => (
            <li key={f.id}>
              <div className="flex items-center gap-2 rounded-xl border border-[#dadce0] bg-white px-3 py-2">
                <button
                  type="button"
                  className="min-h-11 flex-1 text-left text-sm text-[#202124]"
                  onClick={() =>
                    void navigate({ to: "/documents/editor/$fileId", params: { fileId: f.id } })
                  }
                >
                  <span className="block font-medium">{f.title}</span>
                  <span className="text-[12px] text-[#80868b]">
                    {f.templateId} · {new Date(f.updatedAt).toLocaleString()}
                  </span>
                </button>
                <button
                  type="button"
                  className="grid size-10 place-items-center rounded-lg text-[#80868b] hover:bg-[#f1f3f4] hover:text-[#c5221f]"
                  aria-label="Delete"
                  onClick={() => remove(f.id)}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <AdUnit slot="mid" tone="paper" />

      <h2 className="mt-12 font-display text-2xl text-[#202124]">
        {ru ? "Физический пакет" : "Physical file"}
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-[#5f6368]">
        {ru
          ? "Сканы, которые попросит работодатель для Xpat. Отметьте, что уже есть. Это не облако паспортов."
          : "Scans an employer will ask for Xpat. Tick what you already have. This is not a passport cloud."}
      </p>
      <p className="mt-2 font-mono text-sm tabular-nums text-[#80868b]">
        {done}/{documents.length}
      </p>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {documents.map((d) => {
          const on = !!docsTick[d.id];
          return (
            <li key={d.id}>
              <button
                type="button"
                onClick={() => toggle(d.id)}
                className={cn(
                  "flex min-h-12 w-full items-center gap-3 rounded-xl border px-3 text-left text-sm",
                  on ? "border-[#cde3d8] bg-[#f1f8f4]" : "border-[#dadce0] bg-white",
                )}
              >
                <span
                  className={cn(
                    "grid size-8 place-items-center rounded-md border",
                    on ? "border-[#3d8a83] text-[#1e6b4f]" : "border-[#dadce0] text-transparent",
                  )}
                >
                  <Check className="size-4" />
                </span>
                {ru ? d.ru : d.en}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
