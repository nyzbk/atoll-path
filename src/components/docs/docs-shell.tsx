import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { FileText, Menu, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { useApp } from "@/lib/maldives/store";
import { useDocs } from "@/lib/maldives/docs-store";
import { TEMPLATES } from "@/lib/maldives/templates";
import { cn } from "@/lib/utils";
import type { DocLang } from "@/lib/maldives/docs-types";

export function DocsShell({ children }: { children: ReactNode }) {
  const lang = useApp((s) => s.lang);
  const setLang = useApp((s) => s.setLang);
  const ru = lang === "ru";
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const isEditor = pathname.includes("/editor/");

  useEffect(() => {
    void Promise.resolve(useDocs.persist.rehydrate()).finally(() => setReady(true));
  }, []);

  if (!ready) {
    return (
      <div className="docs-workspace grid min-h-dvh place-items-center text-sm text-[#5f6368]">
        {ru ? "Открываю документы…" : "Opening documents…"}
      </div>
    );
  }

  return (
    <div className="docs-workspace min-h-dvh">
      <header className="docs-topbar">
        <div className="flex h-12 items-center gap-2 px-3 sm:px-4">
          <Link to="/" className="flex items-center gap-2 no-underline">
            <span className="grid size-7 place-items-center rounded-md bg-[#071314]">
              <span className="block size-3.5 rounded-full border-2 border-[#b7d4ce]" />
            </span>
            <span className="text-[13px] font-medium tracking-tight text-[#202124]">
              Atoll Path
            </span>
          </Link>
          <span className="hidden text-[#9aa0a6] sm:inline">/</span>
          <Link
            to="/documents"
            className="hidden items-center gap-1 text-[13px] text-[#3c4043] no-underline sm:flex"
          >
            <FileText className="size-3.5" />
            {ru ? "Документы" : "Documents"}
          </Link>
          <div className="ml-auto flex items-center gap-1">
            <div className="flex rounded-full border border-[#dadce0] p-0.5">
              {(["ru", "en"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  className={cn(
                    "h-7 min-w-9 rounded-full px-2 text-[11px] uppercase",
                    lang === l ? "bg-[#071314] text-[#e7f1ef]" : "text-[#5f6368]",
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="grid size-10 place-items-center rounded-lg text-[#3c4043] lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {open ? (
          <div className="border-t border-[#dadce0] bg-white px-3 py-3 lg:hidden">
            <DocsNav ru={ru} lang={lang} pathname={pathname} onPick={() => setOpen(false)} />
          </div>
        ) : null}
      </header>
      <div className="mx-auto flex max-w-[1600px]">
        <aside
          className={cn(
            "docs-rail w-[240px] shrink-0 border-r border-[#dadce0]",
            isEditor ? "hidden" : "hidden lg:block",
          )}
        >
          <DocsNav ru={ru} lang={lang} pathname={pathname} />
        </aside>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
      {isEditor ? null : (
        <footer className="border-t border-[#dadce0] px-4 py-6 text-[12px] text-[#80868b]">
          <nav className="mx-auto flex max-w-[1600px] flex-wrap gap-x-4 gap-y-1">
            <Link to="/privacy" className="no-underline hover:text-[#202124]">
              {ru ? "Конфиденциальность" : "Privacy"}
            </Link>
            <Link to="/terms" className="no-underline hover:text-[#202124]">
              {ru ? "Условия" : "Terms"}
            </Link>
            <Link to="/about" className="no-underline hover:text-[#202124]">
              {ru ? "О проекте" : "About"}
            </Link>
          </nav>
        </footer>
      )}
    </div>
  );
}

function DocsNav({
  ru,
  lang,
  pathname,
  onPick,
}: {
  ru: boolean;
  lang: "ru" | "en";
  pathname: string;
  onPick?: () => void;
}) {
  const navigate = useNavigate();
  const createFromTemplate = useDocs((s) => s.createFromTemplate);
  const docLang: DocLang = "en";

  return (
    <nav className="flex flex-col gap-0.5 p-3">
      <p className="px-2 pb-1 text-[10px] uppercase tracking-[0.16em] text-[#80868b]">
        {ru ? "Кабинет" : "Studio"}
      </p>
      <Link
        to="/documents"
        onClick={onPick}
        className={cn(
          "rounded-lg px-2 py-2 text-[13px] text-[#3c4043] no-underline hover:bg-[#f1f3f4]",
          pathname === "/documents" && "bg-[#e8f0ee] text-[#071314]",
        )}
      >
        {ru ? "Шаблоны и мои файлы" : "Templates & my files"}
      </Link>
      <p className="mt-4 px-2 pb-1 text-[10px] uppercase tracking-[0.16em] text-[#80868b]">
        {ru ? "Библиотека" : "Library"}
      </p>
      {TEMPLATES.map((t) => (
        <button
          key={t.id}
          type="button"
          className="rounded-lg px-2 py-1.5 text-left text-[12px] text-[#5f6368] hover:bg-[#f1f3f4] hover:text-[#202124]"
          onClick={() => {
            const file = createFromTemplate(t.id, lang === "ru" ? "en" : docLang);
            onPick?.();
            void navigate({ to: "/documents/editor/$fileId", params: { fileId: file.id } });
          }}
        >
          {ru ? t.title.ru : t.title.en}
        </button>
      ))}
      <p className="mt-6 px-2 text-[11px] leading-relaxed text-[#80868b]">
        {ru
          ? "Бесплатно. Не агентство. Файлы остаются на этом устройстве."
          : "Free. Not an agency. Files stay on this device."}
      </p>
    </nav>
  );
}
