import { createFileRoute } from "@tanstack/react-router";
import { useApp } from "@/lib/maldives/store";
import { pageHead } from "@/lib/maldives/seo";

export const Route = createFileRoute("/terms")({
  head: () => pageHead("terms"),
  component: TermsPage,
});

export function TermsPage() {
  const lang = useApp((s) => s.lang);
  const ru = lang === "ru";
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="font-display text-4xl">{ru ? "Условия" : "Terms"}</h1>
      <p className="mt-2 text-sm text-subtle">{ru ? "Обновлено 28 августа 2026" : "Last updated 28 August 2026"}</p>
      <p className="mt-6 leading-relaxed text-muted">
        {ru
          ? "Atoll Path предоставляется бесплатно «как есть». Это карта прямого найма, не лицензированное employment agency, не Maldives Immigration и не юрист. Оффер не гарантируется."
          : "Atoll Path is free, as-is. It is a direct-hire map, not a licensed employment agency, not Maldives Immigration, and not a lawyer. An offer is not guaranteed."}
      </p>
      <p className="mt-4 leading-relaxed text-muted">
        {ru
          ? "Вы сами откликаетесь на резорт, сами читаете контракт и сами сверяете immigration.gov.mv, xpat.egov.mv и lra.gov.mv. Зарплаты из влогов — уровень C, не контракт."
          : "You apply to the resort, you read the contract, you verify immigration.gov.mv, xpat.egov.mv and lra.gov.mv. Vlog salaries are trust C, not a contract."}
      </p>
      <p className="mt-4 leading-relaxed text-muted">
        {ru
          ? "Реклама, когда она живая, идёт через Google AdSense по правилам Google. Слоты помечены Advertisement. Не кликайте по своей рекламе."
          : "Ads, when live, are served by Google AdSense under Google’s policies. Slots are labeled Advertisement. Do not click your own ads."}
      </p>
      <p className="mt-4 leading-relaxed text-muted">
        {ru
          ? "Шаблоны документов — помощники. Официальный бланк IM30 — только на immigration.gov.mv/downloads. Work permit подаёт работодатель."
          : "Document templates are helpers. The official IM30 blank is only on immigration.gov.mv/downloads. The employer files the work permit."}
      </p>
      <p className="mt-4 leading-relaxed text-muted">
        {ru
          ? "Вопросы по сайту: ultaultimatum@gmail.com. Не присылайте паспорт. Мы не сторона вашего контракта с резортом."
          : "Site questions: ultaultimatum@gmail.com. Do not send a passport. We are not a party to your resort contract."}
      </p>
    </div>
  );
}
