import { createFileRoute, Link } from "@tanstack/react-router";
import { useApp } from "@/lib/maldives/store";
import { pageHead } from "@/lib/maldives/seo";
import { aboutCopy, CONTACT_EMAIL } from "@/lib/maldives/site-copy";

export const Route = createFileRoute("/about")({
  head: () => pageHead("about"),
  component: AboutPage,
});

export function AboutPage() {
  const lang = useApp((s) => s.lang);
  const ru = lang === "ru";
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="font-display text-4xl">{ru ? "О проекте" : "About"}</h1>
      <div className="mt-6 grid gap-4">
        {aboutCopy[lang].map((p) => (
          <p key={p.slice(0, 40)} className="leading-relaxed text-muted">
            {p}
          </p>
        ))}
      </div>
      <p className="mt-6 leading-relaxed text-muted">
        {ru ? "Почта: " : "Email: "}
        <a className="text-accent underline" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
        {ru ? " — страница " : " — "}
        <Link to="/contact" className="text-accent underline">
          {ru ? "контакты" : "contact"}
        </Link>
        .
      </p>
      <p className="mt-4 text-sm leading-relaxed text-subtle">
        {ru
          ? "Тот же издатель делает браузерный конвертер без загрузки файлов: "
          : "The same publisher also makes a browser converter that does not upload files: "}
        <a className="text-accent underline" href="https://heic-local.vercel.app">
          HEIC Local
        </a>
        .
      </p>
    </div>
  );
}
