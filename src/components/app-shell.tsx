import { Link, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  Briefcase,
  FileText,
  Flag,
  HelpCircle,
  Menu,
  MessagesSquare,
  Search,
  ShieldAlert,
  Ship,
  Waypoints,
  X,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { AdUnit, LEGAL_PATHS } from "@/components/ads/ad-unit";
import { useApp, type Lang } from "@/lib/maldives/store";
import { playbook } from "@/lib/maldives/knowledge";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/path", ru: "Путь", en: "Path", icon: Waypoints },
  { to: "/sources", ru: "Источники", en: "Sources", icon: Flag },
  { to: "/boards", ru: "Вакансии", en: "Boards", icon: Briefcase },
  { to: "/roles", ru: "Роли", en: "Roles", icon: Ship },
  { to: "/documents", ru: "Документы", en: "Documents", icon: FileText },
  { to: "/contract", ru: "Оффер", en: "Offer", icon: BookOpen },
  { to: "/scams", ru: "Скамы", en: "Scams", icon: ShieldAlert },
  { to: "/research", ru: "Исследование", en: "Research", icon: Search },
  { to: "/reddit", ru: "Спрос", en: "Demand", icon: MessagesSquare },
  { to: "/faq", ru: "FAQ", en: "FAQ", icon: HelpCircle },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const lang = useApp((s) => s.lang);
  const setLang = useApp((s) => s.setLang);
  const done = useApp((s) => s.doneSteps);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const pct = Math.round((done.length / playbook.length) * 100);

  useEffect(() => {
    void useApp.persist.rehydrate();
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const isDocs = pathname === "/documents" || pathname.startsWith("/documents/");
  if (isDocs) {
    return <>{children}</>;
  }

  const hideAds = LEGAL_PATHS.has(pathname);
  const ru = lang === "ru";

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-fg"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4">
          <Link to="/" className="flex items-center gap-2.5 no-underline">
            <span className="relative grid size-8 place-items-center rounded-lg bg-elevated">
              <span className="block size-4 rounded-full border-2 border-accent" />
            </span>
            <span className="font-display text-lg tracking-tight">Atoll Path</span>
          </Link>
          <nav className="ml-3 hidden items-center gap-0.5 xl:flex">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "rounded-lg px-2 py-1.5 text-[12px] text-muted no-underline transition-colors hover:bg-elevated hover:text-fg",
                  pathname === n.to && "bg-elevated text-fg",
                )}
              >
                {lang === "ru" ? n.ru : n.en}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden items-center gap-2 sm:flex">
              <span className="text-[11px] tabular-nums text-subtle">{pct}%</span>
              <span className="h-1 w-16 overflow-hidden rounded-full bg-elevated">
                <span className="block h-full bg-accent" style={{ width: `${pct}%` }} />
              </span>
            </div>
            <LangSwitch lang={lang} setLang={setLang} />
            <button
              type="button"
              className="grid size-11 place-items-center rounded-xl border border-border xl:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {open ? (
          <div className="border-t border-border bg-surface px-4 py-3 xl:hidden">
            <div className="grid grid-cols-2 gap-1">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm text-fg no-underline hover:bg-elevated",
                    pathname === n.to && "bg-elevated",
                  )}
                >
                  <n.icon className="size-4 text-muted" />
                  {lang === "ru" ? n.ru : n.en}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </header>
      <main id="main">{children}</main>
      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-8">
          {hideAds ? null : <AdUnit slot="footer" />}
          <div className="flex flex-col gap-3 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>
              {ru
                ? "Бесплатная платформа самопомощи. Не агентство, не Immigration, не гарантия оффера. Контент открытый."
                : "Free self-help platform. Not an agency, not Immigration, not an offer guarantee. The guide stays open."}
            </p>
            <nav className="flex flex-wrap gap-x-4 gap-y-1 text-subtle">
              <Link to="/path" className="no-underline hover:text-fg">
                {ru ? "Путь" : "Path"}
              </Link>
              <Link to="/faq" className="no-underline hover:text-fg">
                FAQ
              </Link>
              <Link to="/privacy" className="no-underline hover:text-fg">
                {ru ? "Конфиденциальность" : "Privacy"}
              </Link>
              <Link to="/terms" className="no-underline hover:text-fg">
                {ru ? "Условия" : "Terms"}
              </Link>
              <Link to="/about" className="no-underline hover:text-fg">
                {ru ? "О проекте" : "About"}
              </Link>
              <Link to="/contact" className="no-underline hover:text-fg">
                {ru ? "Контакт" : "Contact"}
              </Link>
            </nav>
          </div>
          <p className="mt-3 text-sm text-subtle">
            {ru
              ? "Не юрконсультация. Сверяйте immigration.gov.mv, xpat.egov.mv, lra.gov.mv."
              : "Not legal advice. Verify on immigration.gov.mv, xpat.egov.mv, lra.gov.mv."}
          </p>
        </div>
      </footer>
    </div>
  );
}

function LangSwitch({
  lang,
  setLang,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
}) {
  return (
    <div className="flex rounded-full border border-border p-0.5">
      {(["ru", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          className={cn(
            "h-8 min-w-11 rounded-full px-2 text-xs uppercase",
            lang === l ? "bg-accent text-accent-fg" : "text-muted",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
