import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useApp } from "@/lib/maldives/store";
import { pageHead } from "@/lib/maldives/seo";
import { AdUnit } from "@/components/ads/ad-unit";

export const Route = createFileRoute("/fee")({
  head: () => pageHead("fee"),
  component: FeePage,
});

function monthsOfBasic(fee: number, basic: number): number | null {
  if (!Number.isFinite(fee) || !Number.isFinite(basic)) return null;
  if (fee <= 0 || basic <= 0) return null;
  return fee / basic;
}

function formatMonths(n: number, ru: boolean): string {
  const rounded = Math.round(n * 10) / 10;
  const label = ru ? "мес. basic" : "months of basic";
  return `${rounded.toLocaleString(ru ? "ru-RU" : "en-US", { maximumFractionDigits: 1 })} ${label}`;
}

export function FeePage() {
  const lang = useApp((s) => s.lang);
  const ru = lang === "ru";
  const [fee, setFee] = useState("800");
  const [basic, setBasic] = useState("400");
  const feeN = Number(fee.replace(",", "."));
  const basicN = Number(basic.replace(",", "."));
  const months = useMemo(() => monthsOfBasic(feeN, basicN), [feeN, basicN]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-xs uppercase tracking-[0.18em] text-subtle">
        {ru ? "Счёт агентства" : "Agency invoice"}
      </p>
      <h1 className="mt-2 font-display text-4xl">
        {ru
          ? "Сколько месяцев зарплаты стоит счёт агентства"
          : "How many months of basic pay the agency invoice costs"}
      </h1>
      <p className="mt-3 text-muted">
        {ru
          ? "Это деление счёта на basic в месяц. Не налог MIRA, не service charge и не калькулятор с /roles. Не юридическое заключение."
          : "This divides an invoice by monthly basic. It is not MIRA tax, not service charge, and not the calculator on /roles. Not legal advice."}
      </p>
      <p className="mt-4 flex flex-wrap gap-4">
        <Link to="/scams" className="text-sm text-accent">
          {ru ? "Схемы предоплаты →" : "Prepayment patterns →"}
        </Link>
        <Link to="/roles" className="text-sm text-accent">
          {ru ? "Вилки и SC на /roles →" : "Bands and SC on /roles →"}
        </Link>
        <Link to="/contract" className="text-sm text-accent">
          {ru ? "Проверить оффер →" : "Check an offer →"}
        </Link>
      </p>

      <Card className="mt-8">
        <h2 className="font-display text-2xl">
          {ru ? "Счёт ÷ basic" : "Invoice ÷ basic"}
        </h2>
        <p className="mt-2 text-sm text-muted">
          {ru
            ? "Цифры с вашего invoice и из письма HR. Мы ничего не списываем и не отправляем."
            : "Numbers from your invoice and the HR letter. We do not charge you and we do not send the figures."}
        </p>
        <label className="mt-4 block text-xs uppercase tracking-wide text-subtle">
          {ru ? "Счёт агентства, USD" : "Agency invoice, USD"}
        </label>
        <Input
          className="mt-1"
          inputMode="decimal"
          value={fee}
          onChange={(e) => setFee(e.target.value)}
        />
        <label className="mt-3 block text-xs uppercase tracking-wide text-subtle">
          {ru ? "Basic в месяц, USD" : "Monthly basic, USD"}
        </label>
        <Input
          className="mt-1"
          inputMode="decimal"
          value={basic}
          onChange={(e) => setBasic(e.target.value)}
        />
        <p className="mt-5 font-display text-3xl tabular-nums">
          {months == null
            ? ru
              ? "Нужны два числа больше нуля"
              : "Need two numbers above zero"
            : formatMonths(months, ru)}
        </p>
        {months != null ? (
          <p className="mt-2 text-sm text-muted">
            {ru
              ? `${feeN} ÷ ${basicN} = ${months.toFixed(2)} месяца basic до того, как этот счёт «отобьётся» одной окладной строкой. SC, еда и билет сюда не входят.`
              : `${feeN} ÷ ${basicN} = ${months.toFixed(2)} months of basic before that invoice is “earned back” on the basic line alone. SC, meals and the ticket are not in this ratio.`}
          </p>
        ) : null}
      </Card>

      <AdUnit slot="mid" />

      <article className="mt-10 grid gap-4 text-[15px] leading-relaxed text-muted">
        <h2 className="font-display text-2xl text-fg">
          {ru
            ? "Зачем делить счёт на basic, а не на «зарплату на руки»"
            : "Why divide by basic, not by “in-hand pay”"}
        </h2>
        <p>
          {ru
            ? "Агентство выставляет $300–3000 «за визу, квоту и трудоустройство». Basic в письме HR — единственная цифра, которую резорт обычно фиксирует как оклад. Service charge плавает. Чаевые не контракт. «На руки $2000» из рекламы — не строка, на которую можно делить invoice. Поэтому здесь только basic. Калькулятор на /roles считает другую задачу: basic + SC − ориентир MIRA. Эти два инструмента нельзя склеивать в один URL."
            : "An agency invoices $300–3,000 “for the visa, quota and placement”. Basic in the HR letter is the only figure a resort usually fixes as wage. Service charge moves. Tips are not a contract line. “$2,000 in hand” from an ad is not a number you can divide an invoice by. So this page uses basic only. The calculator on /roles is a different job: basic + SC − a MIRA compass. Those two tools must not share a URL."}
        </p>
        <p>
          {ru
            ? "Пример. Счёт $800, basic $400. Восемьсот делить на четыреста — два месяца оклада. Если basic $250, тот же счёт — уже больше трёх месяцев. Цифра не говорит, что агентство «имеет право». Она говорит, сколько вашей фиксированной строки вы отдаёте до первого рабочего дня за доступ к вакансии, которую резорт часто публикует сам."
            : "Example. Invoice $800, basic $400. Eight hundred over four hundred is two months of wage. If basic is $250, the same invoice is more than three months. The figure does not say the agency is entitled. It says how many months of your fixed line you hand over before day one for access to a vacancy the resort often already posts."}
        </p>
        <h2 className="font-display text-2xl text-fg">
          {ru ? "Что эта страница сознательно не считает" : "What this page will not compute"}
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            {ru
              ? "Налог MIRA EWT и порог MVR 60 000 — это /roles и mira.gov.mv, не invoice посредника."
              : "MIRA EWT and the MVR 60,000 threshold — that is /roles and mira.gov.mv, not a middleman invoice."}
          </li>
          <li>
            {ru
              ? "Средний service charge за три месяца — письмо HR и LRA, не это деление."
              : "A three-month service-charge average — the HR letter and LRA, not this ratio."}
          </li>
          <li>
            {ru
              ? "Пошлину государства за work permit. Её платит работодатель в Xpat, не соискатель «вместо визы»."
              : "The state work-permit fee. The employer pays that in Xpat. You do not buy it “instead of a visa”."}
          </li>
          <li>
            {ru
              ? "Справедлива ли сумма. Для схемы предоплаты до бланка смотрите /scams. Для текста оффера — /contract."
              : "Whether the amount is fair. For prepayment before letterhead see /scams. For the offer text see /contract."}
          </li>
        </ul>
        <p>
          {ru
            ? "Work permit по-прежнему подаёт работодатель с квотой. Счёт агентства не открывает кабинет Xpat на ваше имя. Если invoice пришёл до PDF на бланке резорта — сначала /scams, не «добить перевод, чтобы ускорить». Эта страница не лицензированное агентство и не Maldives Immigration."
            : "The employer with quota still files the work permit. An agency invoice does not open Xpat in your name. If the invoice arrived before a letterhead PDF, read /scams first. Do not “top up the transfer to speed it up”. This page is not a licensed employment agency and not Maldives Immigration."}
        </p>
        <p>
          {ru
            ? "Связанные двери на этом origin: /path (14 шагов), /scams (схемы), /roles (вилки и SC), /contract (разбор письма), /documents (CV без оплаты посреднику). Студия издателя — Ultimatum hub в подвале. Хаб не рекрутер Мальдив."
            : "Related doors on this origin: /path (14 steps), /scams (patterns), /roles (bands and SC), /contract (the letter), /documents (a CV without paying a middleman). The publisher studio is Ultimatum hub in the footer. The hub is not a Maldives recruiter."}
        </p>
      </article>
    </div>
  );
}
