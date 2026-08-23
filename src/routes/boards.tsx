import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { TrustBadge, TrustLegend } from "@/components/trust-badge";
import { VacancyCard } from "@/components/vacancy-card";
import { useApp } from "@/lib/maldives/store";
import { useDocs } from "@/lib/maldives/docs-store";
import { sources, t } from "@/lib/maldives/knowledge";
import { trustOfSource } from "@/lib/maldives/trust";
import { decodeVacancy, vacancySnapshots, type Vacancy } from "@/lib/maldives/vacancies";
import { cn } from "@/lib/utils";
import { pageHead } from "@/lib/maldives/seo";
import { AdUnit } from "@/components/ads/ad-unit";

export const Route = createFileRoute("/boards")({
  head: () => pageHead("boards"),
  component: BoardsPage,
});

type Tab = "cards" | "decode" | "map" | "report";

export function BoardsPage() {
  const lang = useApp((s) => s.lang);
  const ru = lang === "ru";
  const addReport = useApp((s) => s.addReport);
  const reports = useApp((s) => s.reports);
  const removeReport = useApp((s) => s.removeReport);
  const createPack = useDocs((s) => s.createPack);
  const setCandidate = useDocs((s) => s.setCandidate);
  const logApplication = useDocs((s) => s.logApplication);
  const navigate = useNavigate();

  const [tab, setTab] = useState<Tab>("cards");
  const [paste, setPaste] = useState("");
  const [pasteUrl, setPasteUrl] = useState("");
  const [decoded, setDecoded] = useState<Vacancy | null>(null);
  const [report, setReport] = useState({ who: "", url: "", channel: "", note: "" });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    void useDocs.persist.rehydrate();
  }, []);

  const boards = useMemo(
    () => sources.filter((s) => s.kind === "board" || s.kind === "employer" || s.id === "mycareer" || s.id === "jobcenter"),
    [],
  );

  async function packFrom(v: Vacancy) {
    const role = t(lang, v.role);
    setCandidate({ targetRole: role === "Role not extracted" ? "" : role.slice(0, 80) });
    createPack(lang === "ru" ? "bilingual" : "en");
    logApplication({
      date: new Date().toISOString().slice(0, 10),
      resort: v.employer,
      role: role.slice(0, 80),
      channel: v.sourceUrl || v.sourceId,
      hrEmail: "",
      status: "draft",
      ticketAsked: false,
      notes: `trust ${v.trust}; checked ${v.checkedAt}`,
    });
    await navigate({ to: "/documents" });
  }

  function prefillReport(v: Vacancy) {
    setReport({
      who: v.employer,
      url: v.sourceUrl,
      channel: v.kind,
      note: "",
    });
    setTab("report");
    setSaved(false);
  }

  const tabs: { id: Tab; ru: string; en: string }[] = [
    { id: "cards", ru: "Карточки", en: "Cards" },
    { id: "decode", ru: "Разобрать объявление", en: "Decode a posting" },
    { id: "map", ru: "Куда писать", en: "Where to apply" },
    { id: "report", ru: "Подозрение", en: "Report" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-xs uppercase tracking-[0.18em] text-subtle">
        {ru ? "Проверяемые вакансии" : "Verifiable vacancies"}
      </p>
      <h1 className="mt-2 font-display text-4xl">
        {ru ? "Не живой ATS. Карта, снимок и разбор текста." : "Not a live ATS. A map, a snapshot, and a text decoder."}
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        {ru
          ? "Мы не высасываем чужие базы без разрешения и не выдумываем зарплаты. Каждое поле: указано / не указано / уточнить. Иностранцы — только если работодатель написал это сам."
          : "We do not scrape other people’s ATS without permission and we do not invent salaries. Each field is stated / not stated / needs check. Foreigners — only if the employer wrote it."}
      </p>

      <div className="mt-6">
        <TrustLegend compact />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-1 rounded-2xl border border-border p-1 sm:flex sm:flex-wrap">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={cn(
              "min-h-11 flex-1 rounded-xl px-3 text-sm",
              tab === item.id ? "bg-elevated text-fg" : "text-muted hover:text-fg",
            )}
          >
            {ru ? item.ru : item.en}
          </button>
        ))}
      </div>

      {tab === "cards" ? (
        <div className="mt-8 grid gap-4">
          {vacancySnapshots.map((v) => (
            <VacancyCard
              key={v.id}
              vacancy={v}
              onPack={() => void packFrom(v)}
              onReport={() => prefillReport(v)}
            />
          ))}
        </div>
      ) : null}

      {tab === "decode" ? (
        <div className="mt-8 grid gap-4">
          <Card>
            <h2 className="font-display text-2xl">
              {ru ? "Вставьте объявление" : "Paste a posting"}
            </h2>
            <p className="mt-2 text-sm text-muted">
              {ru
                ? "Текст с борда или письма HR. Разбор ищет зарплату, SC, жильё, билет, «Maldivians only». Это не подтверждение, что вакансия открыта."
                : "Text from a board or an HR email. The parser looks for salary, SC, housing, airfare, “Maldivians only”. It does not prove the vacancy is open."}
            </p>
            <label className="mt-4 block text-xs uppercase tracking-wide text-subtle">URL</label>
            <Input
              className="mt-1"
              value={pasteUrl}
              onChange={(e) => setPasteUrl(e.target.value)}
              placeholder="https://"
            />
            <label className="mt-3 block text-xs uppercase tracking-wide text-subtle">
              {ru ? "Текст" : "Text"}
            </label>
            <Textarea
              className="mt-1 min-h-40"
              value={paste}
              onChange={(e) => setPaste(e.target.value)}
            />
            <Button
              className="mt-4"
              type="button"
              onClick={() => setDecoded(paste.trim() ? decodeVacancy(paste, pasteUrl) : null)}
            >
              {ru ? "Разобрать" : "Decode"}
            </Button>
          </Card>
          {decoded ? (
            <>
              <VacancyCard
                vacancy={decoded}
                onPack={() => void packFrom(decoded)}
                onReport={() => prefillReport(decoded)}
              />
              <AdUnit slot="after-success" />
            </>
          ) : null}
        </div>
      ) : null}

      {tab === "map" ? (
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {boards.map((s) => (
            <Card key={s.id} className="flex flex-col">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display text-xl">{s.name}</h2>
                <TrustBadge level={trustOfSource(s)} />
                <Badge tone="muted">{s.kind}</Badge>
              </div>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{t(lang, s.note)}</p>
              <Button asChild variant="secondary" className="mt-4 w-fit" size="sm">
                <a href={s.url} target="_blank" rel="noreferrer" className="no-underline">
                  {ru ? "Открыть" : "Open"}
                </a>
              </Button>
            </Card>
          ))}
        </div>
      ) : null}

      {tab === "report" ? (
        <div className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <h2 className="font-display text-2xl">
              {ru ? "Сообщить о подозрении" : "Report a suspicion"}
            </h2>
            <p className="mt-2 text-sm text-muted">
              {ru
                ? "Запись остаётся на этом устройстве. Это не заявление в полицию и не письмо в Immigration."
                : "The record stays on this device. It is not a police filing and not a letter to Immigration."}
            </p>
            <label className="mt-4 block text-xs uppercase tracking-wide text-subtle">
              {ru ? "Кто / что" : "Who / what"}
            </label>
            <Input
              className="mt-1"
              value={report.who}
              onChange={(e) => setReport({ ...report, who: e.target.value })}
            />
            <label className="mt-3 block text-xs uppercase tracking-wide text-subtle">URL</label>
            <Input
              className="mt-1"
              value={report.url}
              onChange={(e) => setReport({ ...report, url: e.target.value })}
            />
            <label className="mt-3 block text-xs uppercase tracking-wide text-subtle">
              {ru ? "Канал" : "Channel"}
            </label>
            <Input
              className="mt-1"
              value={report.channel}
              onChange={(e) => setReport({ ...report, channel: e.target.value })}
              placeholder="Telegram / Gmail / WhatsApp"
            />
            <label className="mt-3 block text-xs uppercase tracking-wide text-subtle">
              {ru ? "Что произошло" : "What happened"}
            </label>
            <Textarea
              className="mt-1"
              value={report.note}
              onChange={(e) => setReport({ ...report, note: e.target.value })}
            />
            <Button
              className="mt-4"
              type="button"
              disabled={!report.who.trim()}
              onClick={() => {
                addReport(report);
                setSaved(true);
                setReport({ who: "", url: "", channel: "", note: "" });
              }}
            >
              {ru ? "Сохранить у себя" : "Save on this device"}
            </Button>
            {saved ? (
              <p className="mt-3 text-sm text-ok">
                {ru ? "Сохранено локально." : "Saved locally."}
              </p>
            ) : null}
          </Card>
          <div className="grid gap-3">
            {reports.length === 0 ? (
              <Card>
                <p className="text-sm text-muted">
                  {ru ? "Пока нет записей." : "No records yet."}
                </p>
              </Card>
            ) : (
              reports.map((r) => (
                <Card key={r.id}>
                  <p className="font-display text-lg">{r.who}</p>
                  <p className="mt-1 font-mono text-[11px] text-subtle">{r.at.slice(0, 10)}</p>
                  <p className="mt-2 text-sm text-muted">{r.note}</p>
                  <button
                    type="button"
                    className="mt-3 text-xs text-danger"
                    onClick={() => removeReport(r.id)}
                  >
                    {ru ? "Удалить" : "Delete"}
                  </button>
                </Card>
              ))
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
