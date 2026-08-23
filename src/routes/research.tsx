import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import { useApp } from "@/lib/maldives/store";
import { fetchAllowlist, sources } from "@/lib/maldives/knowledge";
import { askGrounded, fetchOfficial, searchKnowledge } from "@/lib/maldives/research";
import { pageHead } from "@/lib/maldives/seo";

export const Route = createFileRoute("/research")({
  head: () => pageHead("research"),
  component: ResearchPage,
});

type Hit = { title: string; body: string; href?: string };

export function ResearchPage() {
  const lang = useApp((s) => s.lang);
  const ru = lang === "ru";
  const [q, setQ] = useState("");
  const [hits, setHits] = useState<Hit[] | null>(null);
  const [url, setUrl] = useState("https://immigration.gov.mv/visa/work-visa");
  const [page, setPage] = useState<{ url: string; text: string; status: number } | null>(null);
  const [question, setQuestion] = useState(
    ru
      ? "Могу ли я вылететь туристом и оформить работу на месте? Кто подаёт work permit?"
      : "Can I arrive as a tourist and convert to work? Who files the work permit?",
  );
  const [answer, setAnswer] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  async function onSearch(e: FormEvent) {
    e.preventDefault();
    setBusy("search");
    setErr(null);
    const res = await searchKnowledge({ data: { q } });
    setBusy(null);
    if (res.ok) setHits(res.hits);
  }

  async function onFetch(e: FormEvent) {
    e.preventDefault();
    setBusy("fetch");
    setErr(null);
    const res = await fetchOfficial({ data: { url } });
    setBusy(null);
    if (!res.ok) setErr(res.error);
    else setPage({ url: res.url, text: res.text, status: res.status });
  }

  async function onAsk(e: FormEvent) {
    e.preventDefault();
    setBusy("ask");
    setErr(null);
    setAnswer(null);
    const res = await askGrounded({
      data: { question, lang, pageText: page?.text },
    });
    setBusy(null);
    if (!res.ok) setErr(res.error);
    else setAnswer(res.text);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-xs uppercase tracking-[0.18em] text-subtle">
        {ru ? "Исследование" : "Research"}
      </p>
      <h1 className="mt-2 font-display text-4xl">
        {ru ? "Граф, живая страница, затем модель" : "Graph, live page, then the model"}
      </h1>
      <p className="mt-3 text-muted">
        {ru
          ? "Это не «весь интернет». Сначала поиск по проверенному графу. Затем fetch только с allowlist. Модель отвечает только по этому пакету и не имеет права выдумывать пошлины и зарплаты."
          : "This is not “the whole internet”. Search the verified graph first. Then fetch only from the allowlist. The model may answer only from that pack and must not invent fees or salaries."}
      </p>

      <Card className="mt-8">
        <h2 className="font-display text-xl">{ru ? "1. Поиск по графу" : "1. Graph search"}</h2>
        <form onSubmit={onSearch} className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={ru ? "work visa, Jobsicle, налог, квота…" : "work visa, Jobsicle, tax, quota…"}
          />
          <Button type="submit" disabled={busy === "search"}>
            {busy === "search" ? (ru ? "Ищу…" : "Searching…") : ru ? "Искать" : "Search"}
          </Button>
        </form>
        {hits ? (
          <ul className="mt-4 space-y-3">
            {hits.length === 0 ? (
              <li className="text-sm text-muted">{ru ? "В графе нет совпадения." : "No match in the graph."}</li>
            ) : (
              hits.map((h) => (
                <li key={h.title + h.body.slice(0, 24)} className="border-t border-border pt-3">
                  <p className="text-sm font-medium">{h.title}</p>
                  <p className="mt-1 text-sm text-muted">{h.body}</p>
                </li>
              ))
            )}
          </ul>
        ) : null}
      </Card>

      <Card className="mt-4">
        <h2 className="font-display text-xl">{ru ? "2. Живая страница (allowlist)" : "2. Live page (allowlist)"}</h2>
        <p className="mt-2 text-xs text-subtle">{fetchAllowlist.join(" · ")}</p>
        <form onSubmit={onFetch} className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Input value={url} onChange={(e) => setUrl(e.target.value)} />
          <Button type="submit" variant="secondary" disabled={busy === "fetch"}>
            {busy === "fetch" ? "…" : ru ? "Снять текст" : "Fetch text"}
          </Button>
        </form>
        <div className="mt-3 flex flex-wrap gap-2">
          {sources
            .filter((s) => s.kind === "official")
            .slice(0, 6)
            .map((s) => (
              <button
                key={s.id}
                type="button"
                className="rounded-full border border-border px-3 py-1 text-xs text-muted"
                onClick={() => setUrl(s.url)}
              >
                {s.name}
              </button>
            ))}
        </div>
        {page ? (
          <pre className="mt-4 max-h-56 overflow-auto whitespace-pre-wrap rounded-xl bg-elevated p-3 font-mono text-xs text-muted">
            HTTP {page.status} · {page.url}
            {"\n\n"}
            {page.text.slice(0, 4000)}
          </pre>
        ) : null}
      </Card>

      <Card className="mt-4">
        <h2 className="font-display text-xl">
          {ru ? "3. Спросить модель (только по пакету)" : "3. Ask the model (pack only)"}
        </h2>
        <form onSubmit={onAsk} className="mt-4 grid gap-3">
          <Textarea value={question} onChange={(e) => setQuestion(e.target.value)} rows={4} />
          <Button type="submit" disabled={busy === "ask"} className="w-fit">
            {busy === "ask" ? (ru ? "Думаю…" : "Thinking…") : ru ? "Спросить" : "Ask"}
          </Button>
        </form>
        {answer ? (
          <div className="mt-4 whitespace-pre-wrap text-sm leading-relaxed">{answer}</div>
        ) : null}
      </Card>
      {err ? (
        <p className="mt-4 rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">{err}</p>
      ) : null}
    </div>
  );
}
