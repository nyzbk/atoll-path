import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  emptyCandidate,
  nowIso,
  uid,
  type Candidate,
  type DocFile,
  type DocLang,
  type TrackerRow,
} from "./docs-types";
import { TEMPLATES, generateHtml, starterTracker } from "./templates";

type DocsState = {
  candidate: Candidate;
  setCandidate: (patch: Partial<Candidate>) => void;
  setJob: (index: number, patch: Partial<Candidate["jobs"][number]>) => void;
  addJob: () => void;
  files: DocFile[];
  createFromTemplate: (templateId: string, lang: DocLang) => DocFile;
  createPack: (lang: DocLang) => DocFile[];
  logApplication: (row: Omit<TrackerRow, "id">) => void;
  updateFile: (id: string, patch: Partial<DocFile>, snapshot?: boolean) => void;
  setHtml: (id: string, html: string) => void;
  setTracker: (id: string, rows: TrackerRow[]) => void;
  setForm: (id: string, form: Record<string, string>) => void;
  restoreVersion: (id: string, at: string) => void;
  rename: (id: string, title: string) => void;
  remove: (id: string) => void;
  duplicate: (id: string) => DocFile | undefined;
  rebuildFromCandidate: (id: string) => void;
};

function snap(file: DocFile, html: string): DocFile {
  const versions = [
    { at: nowIso(), html: file.html },
    ...file.versions,
  ].slice(0, 12);
  return { ...file, html, updatedAt: nowIso(), versions };
}

export const useDocs = create<DocsState>()(
  persist(
    (set, get) => ({
      candidate: emptyCandidate(),
      setCandidate: (patch) =>
        set({ candidate: { ...get().candidate, ...patch } }),
      setJob: (index, patch) => {
        const jobs = get().candidate.jobs.map((j, i) =>
          i === index ? { ...j, ...patch } : j,
        );
        set({ candidate: { ...get().candidate, jobs } });
      },
      addJob: () => {
        const jobs = [
          ...get().candidate.jobs,
          { employer: "", role: "", dates: "", duties: "" },
        ];
        set({ candidate: { ...get().candidate, jobs } });
      },
      files: [],
      createFromTemplate: (templateId, lang) => {
        const t = TEMPLATES.find((x) => x.id === templateId) ?? TEMPLATES[0];
        const c = get().candidate;
        const file: DocFile = {
          id: uid("doc"),
          templateId: t.id,
          title: lang === "ru" ? t.title.ru : t.title.en,
          kind: t.kind,
          lang,
          html: generateHtml(t.id, c, lang),
          tracker: t.kind === "sheet" ? starterTracker() : [],
          form: {},
          createdAt: nowIso(),
          updatedAt: nowIso(),
          versions: [],
          wizardDone: !t.needsWizard,
        };
        set({ files: [file, ...get().files] });
        return file;
      },
      createPack: (lang) => {
        const ids = ["cv", "cover", "email", "tracker"];
        const made = ids.map((id) => get().createFromTemplate(id, lang));
        return made;
      },
      logApplication: (row) => {
        const files = get().files;
        const created =
          files.find((f) => f.templateId === "tracker") ??
          get().createFromTemplate("tracker", "en");
        const rows = get().files.find((f) => f.id === created.id)?.tracker ?? [];
        const next: TrackerRow[] = [
          { id: uid("row"), ...row },
          ...rows.filter((r) => r.resort.trim() || r.role.trim()),
        ];
        set({
          files: get().files.map((f) =>
            f.id === created.id ? { ...f, tracker: next, updatedAt: nowIso() } : f,
          ),
        });
      },
      updateFile: (id, patch, snapshot) => {
        set({
          files: get().files.map((f) => {
            if (f.id !== id) return f;
            const next = { ...f, ...patch, updatedAt: nowIso() };
            if (snapshot && patch.html && patch.html !== f.html) {
              return snap(f, patch.html);
            }
            return next;
          }),
        });
      },
      setHtml: (id, html) => {
        set({
          files: get().files.map((f) => (f.id === id ? snap(f, html) : f)),
        });
      },
      setTracker: (id, rows) => {
        set({
          files: get().files.map((f) =>
            f.id === id ? { ...f, tracker: rows, updatedAt: nowIso() } : f,
          ),
        });
      },
      setForm: (id, form) => {
        set({
          files: get().files.map((f) =>
            f.id === id ? { ...f, form, updatedAt: nowIso() } : f,
          ),
        });
      },
      restoreVersion: (id, at) => {
        set({
          files: get().files.map((f) => {
            if (f.id !== id) return f;
            const v = f.versions.find((x) => x.at === at);
            if (!v) return f;
            return snap(f, v.html);
          }),
        });
      },
      rename: (id, title) => {
        set({
          files: get().files.map((f) =>
            f.id === id ? { ...f, title, updatedAt: nowIso() } : f,
          ),
        });
      },
      remove: (id) => set({ files: get().files.filter((f) => f.id !== id) }),
      duplicate: (id) => {
        const src = get().files.find((f) => f.id === id);
        if (!src) return;
        const copy: DocFile = {
          ...src,
          id: uid("doc"),
          title: `${src.title} copy`,
          createdAt: nowIso(),
          updatedAt: nowIso(),
          versions: [],
        };
        set({ files: [copy, ...get().files] });
        return copy;
      },
      rebuildFromCandidate: (id) => {
        const f = get().files.find((x) => x.id === id);
        if (!f) return;
        const html = generateHtml(f.templateId, get().candidate, f.lang);
        set({
          files: get().files.map((x) => (x.id === id ? snap(x, html) : x)),
        });
      },
    }),
    { name: "atoll-docs-v1", skipHydration: true },
  ),
);

export function completeness(c: Candidate): {
  pct: number;
  missing: string[];
} {
  const checks: { key: string; ok: boolean }[] = [
    { key: "fullName", ok: c.fullName.trim().length > 1 },
    { key: "nationality", ok: c.nationality.trim().length > 1 },
    { key: "email", ok: /@/.test(c.email) },
    { key: "phone", ok: c.phone.trim().length > 5 },
    { key: "targetRole", ok: c.targetRole.trim().length > 1 },
    { key: "english", ok: c.english.length > 0 },
    { key: "experience", ok: c.jobs.some((j) => j.employer.trim() && j.role.trim()) },
    { key: "skills", ok: c.skills.trim().length > 3 },
  ];
  const missing = checks.filter((x) => !x.ok).map((x) => x.key);
  const pct = Math.round(((checks.length - missing.length) / checks.length) * 100);
  return { pct, missing };
}
