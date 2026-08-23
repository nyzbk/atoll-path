import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { A4Editor, Toolbar, runCmd } from "@/components/docs/a4-editor";
import { FieldPanel } from "@/components/docs/field-panel";
import { TrackerGrid } from "@/components/docs/tracker-grid";
import { RiskForm } from "@/components/docs/risk-form";
import { CvWizard } from "@/components/docs/cv-wizard";
import { useApp } from "@/lib/maldives/store";
import { completeness, useDocs } from "@/lib/maldives/docs-store";
import {
  exportDocx,
  exportHtml,
  exportJson,
  exportTxt,
  printPdf,
} from "@/lib/maldives/export-docs";
import { TEMPLATES } from "@/lib/maldives/templates";
import { pageHead } from "@/lib/maldives/seo";

export const Route = createFileRoute("/documents/editor/$fileId")({
  head: () => pageHead("editor"),
  component: EditorPage,
});

export function EditorPage() {
  const { fileId } = Route.useParams();
  const lang = useApp((s) => s.lang);
  const ru = lang === "ru";
  const file = useDocs((s) => s.files.find((f) => f.id === fileId));
  const files = useDocs((s) => s.files);
  const candidate = useDocs((s) => s.candidate);
  const setCandidate = useDocs((s) => s.setCandidate);
  const setJob = useDocs((s) => s.setJob);
  const addJob = useDocs((s) => s.addJob);
  const updateFile = useDocs((s) => s.updateFile);
  const setTracker = useDocs((s) => s.setTracker);
  const setForm = useDocs((s) => s.setForm);
  const rename = useDocs((s) => s.rename);
  const restoreVersion = useDocs((s) => s.restoreVersion);
  const rebuildFromCandidate = useDocs((s) => s.rebuildFromCandidate);
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const [panel, setPanel] = useState(false);
  const { pct } = completeness(candidate);

  const meta = useMemo(
    () => TEMPLATES.find((t) => t.id === file?.templateId),
    [file?.templateId],
  );

  if (!file) {
    return (
      <div className="px-6 py-16">
        <p className="text-[#5f6368]">{ru ? "Файл не найден на этом устройстве." : "File not found on this device."}</p>
        <Link to="/documents" className="mt-3 inline-block text-[#3d8a83]">
          {ru ? "К шаблонам" : "Back to templates"}
        </Link>
      </div>
    );
  }

  if (file.templateId === "cv" && !file.wizardDone) {
    return (
      <CvWizard
        candidate={candidate}
        setCandidate={setCandidate}
        setJob={setJob}
        ru={ru}
        onDone={() => {
          rebuildFromCandidate(file.id);
          updateFile(file.id, { wizardDone: true });
        }}
      />
    );
  }

  const isSheet = file.kind === "sheet";
  const isForm = file.kind === "form";

  return (
    <div className="flex min-h-[calc(100dvh-48px)] flex-col">
      <div className="flex flex-wrap items-center gap-2 border-b border-[#dadce0] bg-white px-3 py-2">
        <input
          className="h-9 min-w-[140px] flex-1 rounded-lg border border-transparent px-2 text-sm font-medium text-[#202124] hover:border-[#dadce0] focus:border-[#3d8a83]"
          value={file.title}
          onChange={(e) => rename(file.id, e.target.value)}
        />
        <span className="text-[11px] text-[#80868b]">
          {ru ? "Сохранено на устройстве" : "Saved on this device"}
        </span>
        <Toolbar onCmd={runCmd} />
        <div className="relative">
          <button
            type="button"
            className="h-9 rounded-lg bg-[#071314] px-3 text-[13px] text-white"
            onClick={() => setMenu((v) => !v)}
          >
            {ru ? "Скачать" : "Download"}
          </button>
          {menu ? (
            <div className="absolute right-0 z-20 mt-1 w-44 rounded-xl border border-[#dadce0] bg-white py-1 shadow-[0_8px_24px_rgba(32,33,36,0.12)]">
              {[
                { id: "pdf", label: "PDF" },
                { id: "docx", label: "DOCX" },
                { id: "html", label: "HTML" },
                { id: "txt", label: "TXT" },
                { id: "json", label: "JSON" },
              ].map((x) => (
                <button
                  key={x.id}
                  type="button"
                  className="block w-full px-3 py-2 text-left text-[13px] hover:bg-[#f1f3f4]"
                  onClick={() => {
                    setMenu(false);
                    if (x.id === "pdf") printPdf(file);
                    if (x.id === "html") exportHtml(file);
                    if (x.id === "txt") exportTxt(file);
                    if (x.id === "json") exportJson(file, { candidate });
                    if (x.id === "docx") void exportDocx(file);
                  }}
                >
                  {x.label}
                </button>
              ))}
            </div>
          ) : null}
        </div>
        <button
          type="button"
          className="h-9 rounded-lg border border-[#dadce0] px-3 text-[13px] min-[1280px]:hidden"
          onClick={() => setPanel((v) => !v)}
        >
          {ru ? "Поля" : "Fields"}
        </button>
      </div>

      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-[200px] shrink-0 border-r border-[#dadce0] bg-[#f8f9fa] md:block">
          <p className="px-3 pt-3 text-[10px] uppercase tracking-[0.14em] text-[#80868b]">
            {ru ? "Файлы" : "Files"}
          </p>
          <ul className="mt-1 px-1">
            {files.map((f) => (
              <li key={f.id}>
                <button
                  type="button"
                  onClick={() =>
                    void navigate({ to: "/documents/editor/$fileId", params: { fileId: f.id } })
                  }
                  className="w-full rounded-lg px-2 py-2 text-left text-[12px] text-[#3c4043] data-[on=true]:bg-white"
                  data-on={f.id === file.id}
                >
                  {f.title}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="min-w-0 flex-1 overflow-auto bg-[#e8eaed]">
          {isSheet ? (
            <TrackerGrid
              rows={file.tracker}
              onChange={(rows) => setTracker(file.id, rows)}
              ru={ru}
            />
          ) : (
            <A4Editor
              fileId={file.id}
              html={file.html}
              onChange={(html) => updateFile(file.id, { html })}
            />
          )}
        </div>

        <aside className="hidden w-[300px] shrink-0 border-l border-[#dadce0] bg-white xl:block">
          <div className="border-b border-[#dadce0] px-4 py-3">
            <p className="text-[11px] uppercase tracking-[0.14em] text-[#80868b]">
              {meta ? (ru ? meta.title.ru : meta.title.en) : "Doc"}
            </p>
            <p className="mt-1 font-mono text-[12px] tabular-nums text-[#5f6368]">
              {ru ? `Готовность профиля ${pct}%` : `Profile ${pct}%`}
            </p>
          </div>
          {isForm ? (
            <RiskForm file={file} ru={ru} onChange={(form) => setForm(file.id, form)} />
          ) : (
            <FieldPanel
              candidate={candidate}
              setCandidate={setCandidate}
              setJob={setJob}
              addJob={addJob}
              ru={ru}
              onRebuild={() => rebuildFromCandidate(file.id)}
            />
          )}
          {file.versions.length ? (
            <div className="border-t border-[#dadce0] p-3">
              <p className="text-[10px] uppercase tracking-[0.14em] text-[#80868b]">
                {ru ? "Версии" : "Versions"}
              </p>
              <ul className="mt-2 max-h-32 overflow-auto text-[11px] text-[#5f6368]">
                {file.versions.slice(0, 8).map((v) => (
                  <li key={v.at}>
                    <button
                      type="button"
                      className="py-1 text-left hover:text-[#202124]"
                      onClick={() => restoreVersion(file.id, v.at)}
                    >
                      {new Date(v.at).toLocaleString()}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>
      </div>
      {panel ? (
        <div className="fixed inset-0 z-40 xl:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-[#202124]/40"
            aria-label="Close"
            onClick={() => setPanel(false)}
          />
          <div className="absolute inset-y-0 right-0 w-[min(100%,360px)] overflow-auto bg-white shadow-[0_16px_48px_rgba(32,33,36,0.2)]">
            <div className="flex items-center justify-between border-b border-[#dadce0] px-4 py-3">
              <p className="text-sm font-medium">{ru ? "Поля" : "Fields"}</p>
              <button type="button" className="text-sm text-[#5f6368]" onClick={() => setPanel(false)}>
                {ru ? "Закрыть" : "Close"}
              </button>
            </div>
            {isForm ? (
              <RiskForm file={file} ru={ru} onChange={(form) => setForm(file.id, form)} />
            ) : (
              <FieldPanel
                candidate={candidate}
                setCandidate={setCandidate}
                setJob={setJob}
                addJob={addJob}
                ru={ru}
                onRebuild={() => rebuildFromCandidate(file.id)}
              />
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
