import { createServerFn } from "@tanstack/react-start";
import {
  CHECKED_AT,
  fetchAllowlist,
  faqs,
  playbook,
  quotaPhaseout,
  roles,
  scams,
  sources,
} from "./knowledge";

function hostOf(url: string) {
  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return "";
  }
}

function stripHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&/g, "&")
    .replace(/"/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 18000);
}

const PACK = {
  checkedAt: CHECKED_AT,
  sources: sources.map((s) => ({
    id: s.id,
    name: s.name,
    url: s.url,
    kind: s.kind,
    note: s.note.en,
  })),
  steps: playbook.map((p) => ({
    id: p.id,
    title: p.title.en,
    summary: p.summary.en,
    sources: p.sources,
  })),
  roles: roles.map((r) => ({
    id: r.id,
    title: r.title.en,
    hire: r.hire,
    basicUsd: r.basicUsd,
    quotaRisk: r.quotaRisk,
    note: r.note.en,
  })),
  scams: scams.map((s) => ({ id: s.id, title: s.title.en, text: s.text.en })),
  faqs: faqs.map((f) => ({ q: f.q.en, a: f.a.en })),
  quotaPhaseout: quotaPhaseout.map((q) => ({
    window: q.window.en,
    roles: q.roles.en,
  })),
};

export const searchKnowledge = createServerFn({ method: "POST" })
  .validator((input: { q: string }) => input)
  .handler(async ({ data }) => {
    const q = data.q.trim().toLowerCase();
    if (q.length < 2) return { ok: true as const, hits: [] as { title: string; body: string; href?: string }[] };
    const hits: { title: string; body: string; href?: string }[] = [];
    for (const s of sources) {
      const blob = `${s.name} ${s.url} ${s.note.en} ${s.note.ru}`.toLowerCase();
      if (blob.includes(q)) hits.push({ title: s.name, body: s.note.en, href: s.url });
    }
    for (const p of playbook) {
      const blob = `${p.title.en} ${p.title.ru} ${p.summary.en} ${p.summary.ru}`.toLowerCase();
      if (blob.includes(q))
        hits.push({ title: p.title.en, body: p.summary.en, href: "/path" });
    }
    for (const r of roles) {
      const blob = `${r.title.en} ${r.title.ru} ${r.note.en} ${r.note.ru}`.toLowerCase();
      if (blob.includes(q))
        hits.push({
          title: r.title.en,
          body: `Basic USD ${r.basicUsd}. ${r.note.en}`,
          href: "/roles",
        });
    }
    for (const s of scams) {
      const blob = `${s.title.en} ${s.title.ru} ${s.text.en} ${s.text.ru}`.toLowerCase();
      if (blob.includes(q)) hits.push({ title: s.title.en, body: s.text.en, href: "/scams" });
    }
    return { ok: true as const, hits: hits.slice(0, 16) };
  });

export const fetchOfficial = createServerFn({ method: "POST" })
  .validator((input: { url: string }) => input)
  .handler(async ({ data }) => {
    const url = data.url.trim();
    let parsed: URL;
    try {
      parsed = new URL(url);
    } catch {
      return { ok: false as const, error: "Invalid URL" };
    }
    if (parsed.protocol !== "https:") {
      return { ok: false as const, error: "HTTPS only" };
    }
    const host = parsed.hostname.toLowerCase();
    if (!fetchAllowlist.includes(host)) {
      return {
        ok: false as const,
        error: `Host not on the official allowlist: ${host || "invalid URL"}`,
      };
    }
    try {
      const res = await fetch(parsed.href, {
        headers: { "User-Agent": "AtollPath/1.0 (research desk; allowlist fetch)" },
        signal: AbortSignal.timeout(12000),
        redirect: "follow",
      });
      const landed = hostOf(res.url);
      if (landed && !fetchAllowlist.includes(landed)) {
        return {
          ok: false as const,
          error: `Redirect left the official allowlist: ${landed}`,
        };
      }
      const html = await res.text();
      return {
        ok: true as const,
        status: res.status,
        url: res.url || url,
        text: stripHtml(html),
      };
    } catch (e) {
      return {
        ok: false as const,
        error: e instanceof Error ? e.message : "Fetch failed",
      };
    }
  });

export const askGrounded = createServerFn({ method: "POST" })
  .validator((input: { question: string; lang: "ru" | "en"; pageText?: string }) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false as const, error: "AI is not available in this environment" };

    const system = `You are Atoll Path, a Maldives direct-hire researcher.
Rules:
- Use ONLY the source pack JSON and any fetched page text. If a fact is missing, say you do not know and point to the official URL to check.
- Never invent visa fees, salary numbers, processing days, or legal rules.
- Distinguish official gov.mv facts from press/playlist/community claims.
- Prefer immigration.gov.mv and xpat.egov.mv over blogs.
- A tourist visa is not a work visa. The employer files work permit in Xpat. Work e-Visa within 15 days of arrival. Passport stickers invalid after 23 Nov 2025.
- Do not recommend paying agencies for a job offer.
- Answer in ${data.lang === "ru" ? "Russian" : "English"}.
- Cite source ids or URLs inline.
Source pack (checked ${CHECKED_AT}):
${JSON.stringify(PACK).slice(0, 14000)}
${data.pageText ? `\nFetched page text:\n${data.pageText.slice(0, 8000)}` : ""}`;

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: 1200,
        temperature: 0.1,
        messages: [
          { role: "system", content: system },
          { role: "user", content: data.question.slice(0, 1200) },
        ],
      }),
    });
    if (!res.ok) {
      return { ok: false as const, error: `xAI API error ${res.status}` };
    }
    const body = (await res.json()) as {
      choices: { message: { content: string } }[];
    };
    return { ok: true as const, text: body.choices[0]?.message.content ?? "" };
  });
