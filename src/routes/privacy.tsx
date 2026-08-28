import { createFileRoute } from "@tanstack/react-router";
import { useApp } from "@/lib/maldives/store";
import { pageHead } from "@/lib/maldives/seo";

export const Route = createFileRoute("/privacy")({
  head: () => pageHead("privacy"),
  component: PrivacyPage,
});

export function PrivacyPage() {
  const lang = useApp((s) => s.lang);
  const ru = lang === "ru";
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="font-display text-4xl">{ru ? "Конфиденциальность" : "Privacy"}</h1>
      <p className="mt-2 text-sm text-subtle">{ru ? "Обновлено 28 августа 2026" : "Last updated 28 August 2026"}</p>

      <h2 className="mt-8 font-display text-2xl">{ru ? "Кратко" : "Summary"}</h2>
      <p className="mt-4 leading-relaxed text-muted">
        {ru
          ? "Atoll Path — бесплатная платформа самопомощи. CV, письма и трекер живут в этом браузере (localStorage). Мы не агентство, не Immigration и не облако паспортов."
          : "Atoll Path is a free self-help platform. CV, letters and the tracker live in this browser (localStorage). We are not an agency, not Immigration, and not a passport cloud."}
      </p>

      <h2 className="mt-8 font-display text-2xl">{ru ? "Что обрабатывается" : "What we process"}</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted">
        <li>
          {ru
            ? "Текст, который вы вводите в документы и проверку оффера, остаётся на этом устройстве. Закрытие профиля в браузере его стирает, если вы очистите данные сайта."
            : "Text you type into documents and the offer check stays on this device. Clearing site data removes it."}
        </li>
        <li>
          {ru
            ? "Хостинг (Vercel) может писать технические логи: IP, user-agent, путь. В логах нет содержимого вашего CV."
            : "Hosting (Vercel) may log IP, user-agent and path. Those logs do not include CV contents."}
        </li>
        <li>
          {ru
            ? "Реклама: Google AdSense (издатель ca-pub-7636435144500691) может ставить cookie после одобрения сайта. Реклама не читает ваши документы. Политика Google: "
            : "Advertising: Google AdSense (publisher ca-pub-7636435144500691) may set cookies after the site is approved. Ads do not read your documents. Google policy: "}
          <a className="text-accent underline" href="https://policies.google.com/privacy">
            policies.google.com/privacy
          </a>
          .
        </li>
        <li>
          {ru
            ? "Живой fetch на странице исследования ходит только на allowlist официальных доменов, которые вы сами запрашиваете."
            : "The research-page live fetch only hits an allowlist of official domains you request."}
        </li>
      </ul>

      <h2 className="mt-8 font-display text-2xl">{ru ? "Чего нет" : "What we do not do"}</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted">
        <li>{ru ? "Не требуем аккаунт." : "We do not require an account."}</li>
        <li>{ru ? "Не загружаем паспорт на свой сервер." : "We do not upload your passport to our server."}</li>
        <li>{ru ? "Не продаём данные соискателей." : "We do not sell jobseeker data."}</li>
        <li>{ru ? "Не представляем вас работодателю." : "We do not represent you to an employer."}</li>
      </ul>

      <h2 className="mt-8 font-display text-2xl">{ru ? "Ваш выбор" : "Your choices"}</h2>
      <p className="mt-4 leading-relaxed text-muted">
        {ru ? "Настройки рекламы: " : "Ad settings: "}
        <a className="text-accent underline" href="https://adssettings.google.com/">
          adssettings.google.com
        </a>
        {ru
          ? ". Не вводите номер паспорта в общедоступные поля CV. Почта: "
          : ". Do not type a passport number into a CV you email widely. Email: "}
        <a className="text-accent underline" href="mailto:ultaultimatum@gmail.com">
          ultaultimatum@gmail.com
        </a>
        {ru ? " — без сканов паспорта." : " — no passport scans."}
      </p>
    </div>
  );
}
