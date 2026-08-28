import { createFileRoute } from "@tanstack/react-router";
import { useApp } from "@/lib/maldives/store";
import { pageHead } from "@/lib/maldives/seo";
import { CONTACT_EMAIL } from "@/lib/maldives/site-copy";

export const Route = createFileRoute("/contact")({
  head: () => pageHead("contact"),
  component: ContactPage,
});

export function ContactPage() {
  const lang = useApp((s) => s.lang);
  const ru = lang === "ru";
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="font-display text-4xl">{ru ? "Контакт" : "Contact"}</h1>
      <p className="mt-6 leading-relaxed text-muted">
        {ru
          ? "Atoll Path читает почту. Это не линия Immigration и не рекрутинг резорта: мы не подаём work permit, не бронируем билет и не обещаем оффер."
          : "Atoll Path reads email. This is not an Immigration desk and not resort recruiting: we do not file a work permit, book a ticket, or promise an offer."}
      </p>
      <p className="mt-4 text-lg">
        <a className="text-accent underline" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
      </p>
      <h2 className="mt-8 font-display text-2xl">{ru ? "Что написать" : "What to include"}</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted">
        <li>{ru ? "Адрес страницы, где возник вопрос (например /path или /contract)." : "The page URL (for example /path or /contract)."}</li>
        <li>{ru ? "Браузер и устройство." : "Browser and device."}</li>
        <li>
          {ru
            ? "Что вы ожидали и что увидели. Без номера паспорта, без скана IM30, без полного контракта с персональными данными."
            : "What you expected and what you saw. No passport number, no IM30 scan, no full contract with personal data."}
        </li>
      </ul>
      <p className="mt-6 leading-relaxed text-muted">
        {ru
          ? "На эту почту нельзя присылать файлы «на визу». Документы готовьте в браузерном редакторе и отправляйте работодателю сами. Вопросы квоты и Entry Pass — к резорту и immigration.gov.mv."
          : "Do not send “visa files” to this inbox. Prepare documents in the browser editor and send them to the employer yourself. Quota and Entry Pass questions belong to the resort and immigration.gov.mv."}
      </p>
    </div>
  );
}
