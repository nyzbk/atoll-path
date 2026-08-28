import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Landmark, Ban } from "lucide-react";
import { AdUnit } from "@/components/ads/ad-unit";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/lib/maldives/store";
import { CHECKED_AT, sources } from "@/lib/maldives/knowledge";
import { homeHow, homeLimits } from "@/lib/maldives/site-copy";
import { pageHead } from "@/lib/maldives/seo";

export const Route = createFileRoute("/")({
  head: () => pageHead("home"),
  component: Home,
});

function Home() {
  const lang = useApp((s) => s.lang);
  const ru = lang === "ru";
  const official = sources.filter((s) => s.kind === "official").length;

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(80% 60% at 80% -10%, color-mix(in oklab, var(--color-lagoon) 28%, transparent), transparent 60%), radial-gradient(50% 40% at 10% 110%, color-mix(in oklab, var(--color-accent) 12%, transparent), transparent 50%)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <Badge tone="official">{ru ? "Прямой найм" : "Direct hire"}</Badge>
            <h1 className="mt-5 max-w-xl font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              {ru
                ? "Работа на Мальдивах без агентства и без оплаты посредникам"
                : "A Maldives job without an agency, and without paying a middleman"}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {ru
                ? "Пошаговый путь: оффер резорта → work permit работодателя в Xpat → Entry Pass → билет (только если это в контракте) → Work e-Visa за 15 дней. Официальные ссылки, а не Telegram."
                : "Step path: resort offer → employer work permit in Xpat → Entry Pass → ticket (only if the contract says so) → Work e-Visa in 15 days. Official links, not Telegram."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/path" className="no-underline">
                  {ru ? "Открыть путь" : "Open the path"}
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link to="/documents" className="no-underline">
                  {ru ? "Свободные документы" : "Free documents"}
                </Link>
              </Button>
            </div>
            <p className="mt-4 text-xs text-subtle">
              {ru
                ? `Проверка источников: ${CHECKED_AT}. Бесплатная платформа самопомощи: не агентство, не Immigration, не гарантия оффера.`
                : `Source check: ${CHECKED_AT}. Free self-help platform: not an agency, not Immigration, not an offer guarantee.`}
            </p>
          </div>
          <div className="grid gap-3">
            <Fact
              icon={Ban}
              title={ru ? "Нельзя купить билет и «устроиться на месте»" : "You cannot fly in and job-hunt on a tourist stamp"}
              body={
                ru
                  ? "Туристический въезд не даёт права работать. Нужен работодатель с квотой."
                  : "Tourist entry is not the right to work. You need an employer with quota."
              }
            />
            <Fact
              icon={Landmark}
              title={ru ? `${official} официальных точек входа` : `${official} official entry points`}
              body={
                ru
                  ? "immigration.gov.mv, xpat.egov.mv, MyCareer, MIRA — в графе источников, не «как будто»."
                  : "immigration.gov.mv, xpat.egov.mv, MyCareer, MIRA — in the source graph, not “as if”."
              }
            />
            <Fact
              icon={ShieldCheck}
              title={ru ? "Вы не платите за оффер" : "You do not pay for the offer"}
              body={
                ru
                  ? "Квоту и work permit подаёт работодатель. Агентство, берущее $300–3000 с вас, продаёт доступ, который резорт и так даёт."
                  : "The employer files quota and work permit. An agency charging you $300–3,000 is selling access the resort already gives."
              }
            />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            to: "/path",
            k: ru ? "01" : "01",
            t: ru ? "Путь из 14 шагов" : "A 14-step path",
            d: ru
              ? "От проверки профессии до e-Visa. Чекбоксы сохраняются на этом устройстве."
              : "From occupation check to e-Visa. Checkboxes stay on this device.",
          },
          {
            to: "/boards",
            k: "02",
            t: ru ? "Куда писать сегодня" : "Where to apply today",
            d: ru
              ? "Карточки с шкалой A–D. Зарплата и «берут иностранцев» — только если это написано. Не живой парсер чужих ATS."
              : "Cards with an A–D scale. Pay and “foreigners hired” only if written. Not a live scrape of someone else’s ATS.",
          },
          {
            to: "/documents",
            k: "03",
            t: ru ? "Документы как у агентства, бесплатно" : "Agency-style documents, free",
            d: ru
              ? "CV, письмо HR, трекер, проверка оффера. Редактор на этом устройстве, без подписки."
              : "CV, HR email, tracker, offer check. Editor on this device, no subscription.",
          },
          {
            to: "/research",
            k: "04",
            t: ru ? "Исследование с цитатами" : "Cited research",
            d: ru
              ? "Поиск по графу + живой fetch только с allowlist gov.mv и известных бордов. Без выдумок."
              : "Graph search + live fetch only from the gov.mv allowlist and known boards. No invention.",
          },
        ].map((c) => (
          <Link key={c.to} to={c.to} className="no-underline">
            <Card className="h-full transition-colors hover:border-border-strong">
              <p className="text-xs tabular-nums text-subtle">{c.k}</p>
              <h2 className="mt-3 font-display text-2xl">{c.t}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.d}</p>
            </Card>
          </Link>
        ))}
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-10">
        <h2 className="font-display text-3xl">{homeHow[lang].title}</h2>
        <div className="mt-6 grid gap-4">
          {homeHow[lang].paragraphs.map((p) => (
            <p key={p.slice(0, 40)} className="text-[15px] leading-relaxed text-muted">
              {p}
            </p>
          ))}
        </div>
        <h2 className="mt-12 font-display text-3xl">{homeLimits[lang].title}</h2>
        <div className="mt-6 grid gap-4">
          {homeLimits[lang].paragraphs.map((p) => (
            <p key={p.slice(0, 40)} className="text-[15px] leading-relaxed text-muted">
              {p}
            </p>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted">
          {ru ? "Дальше по делу: " : "Next: "}
          <Link to="/path" className="text-accent underline">
            {ru ? "14 шагов" : "14 steps"}
          </Link>
          {", "}
          <Link to="/faq" className="text-accent underline">
            FAQ
          </Link>
          {", "}
          <Link to="/scams" className="text-accent underline">
            {ru ? "скамы" : "scams"}
          </Link>
          {", "}
          <Link to="/roles" className="text-accent underline">
            {ru ? "роли и вилки" : "roles"}
          </Link>
          .
        </p>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        <AdUnit slot="mid" />
      </div>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <Card className="border-accent/20 bg-accent/5">
          <p className="text-xs uppercase tracking-[0.18em] text-subtle">
            {ru ? "Позиционирование" : "Positioning"}
          </p>
          <h2 className="mt-2 max-w-3xl font-display text-2xl">
            {ru
              ? "Бесплатная независимая платформа для самостоятельного поиска работы на Мальдивах."
              : "A free independent platform for finding Maldives work on your own."}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
            {ru
              ? "Мы не гарантируем оффер, не выдаём визы и не заменяем государственные органы, работодателя или лицензированного юриста. Лицензия employment agency — для тех, кто размещает людей через oneGov. Зарплаты из влогов — ориентир уровня C, не контракт."
              : "We do not guarantee an offer, issue visas, or replace the state, the employer or a licensed lawyer. An employment-agency licence is for businesses that place people, via oneGov. Vlog salaries are C-level orientation, not a contract."}
          </p>
        </Card>
      </section>
    </div>
  );
}

function Fact({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Ban;
  title: string;
  body: string;
}) {
  return (
    <Card className="flex gap-3 p-4">
      <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg bg-elevated">
        <Icon className="size-4 text-accent" />
      </span>
      <div>
        <h2 className="font-display text-base leading-snug">{title}</h2>
        <p className="mt-1 text-sm leading-relaxed text-muted">{body}</p>
      </div>
    </Card>
  );
}
