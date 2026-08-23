import { createFileRoute } from "@tanstack/react-router";
import { useApp } from "@/lib/maldives/store";
import { pageHead } from "@/lib/maldives/seo";

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
      <p className="mt-6 leading-relaxed">
        {ru
          ? "Atoll Path — бесплатный гид самостоятельного найма на Мальдивы: официальные ссылки, путь, проверка оффера, документы без оплаты агентству."
          : "Atoll Path is a free self-hire guide for Maldives work: official links, a path, an offer check, and documents without paying an agency."}
      </p>
      <p className="mt-4 leading-relaxed text-muted">
        {ru
          ? "Мы не размещаем людей у работодателя и не берём комиссию за оффер. Реклама Google AdSense оплачивает хостинг, чтобы гид оставался открытым."
          : "We do not place people with employers and we do not take a fee for an offer. Google AdSense pays for hosting so the guide stays open."}
      </p>
      <p className="mt-4 leading-relaxed text-muted">
        {ru
          ? "Тот же издатель делает локальные браузерные инструменты без загрузки файлов на сервер:"
          : "The same publisher makes local browser tools that do not upload your files:"}
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm">
        <li>
          <a className="text-accent underline" href="https://heic-local.vercel.app">
            HEIC Local
          </a>
        </li>
        <li>
          <a className="text-accent underline" href="https://folio-pdf-toolkit.vercel.app">
            Folio PDF Toolkit
          </a>
        </li>
        <li>
          <a className="text-accent underline" href="https://crush-local.vercel.app">
            Crush
          </a>
        </li>
        <li>
          <a className="text-accent underline" href="https://bg-local.vercel.app">
            Peel
          </a>
        </li>
      </ul>
    </div>
  );
}
