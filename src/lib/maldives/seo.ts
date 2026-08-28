import { CHECKED_AT, faqs, playbook } from "./knowledge";

/** Production host. Canonicals point here so preview URLs do not split ranking. */
export const SITE_ORIGIN = "https://atoll-path.vercel.app";
export const SITE_NAME = "Atoll Path";

const KEYWORDS =
  "работа на Мальдивах, работа на мальдивах без агентства, Maldives jobs, Maldives resort jobs, work permit Maldives, Xpat eGov, Entry Pass, Work e-Visa, прямой найм резорт, Jobsicle";

export type PageId =
  | "home"
  | "path"
  | "sources"
  | "boards"
  | "roles"
  | "documents"
  | "editor"
  | "contract"
  | "scams"
  | "research"
  | "reddit"
  | "faq"
  | "privacy"
  | "terms"
  | "about"
  | "contact";

type PageSeo = {
  path: string;
  title: string;
  description: string;
  name: string;
  keywords?: string;
  noindex?: boolean;
  changefreq: "daily" | "weekly" | "monthly";
  priority: number;
};

export const PAGES: Record<PageId, PageSeo> = {
  home: {
    path: "/",
    name: SITE_NAME,
    title: "Работа на Мальдивах без агентства | Maldives Jobs Without Agency | Atoll Path",
    description:
      "Прямой найм на мальдивский резорт: оффер → work permit работодателя в Xpat → Entry Pass → Work e-Visa за 15 дней. Официальные ссылки immigration.gov.mv. Бесплатно, не агентство, не гарантия оффера.",
    changefreq: "weekly",
    priority: 1,
  },
  path: {
    path: "/path",
    name: "Путь",
    title: "Как уехать работать на Мальдивы легально — 14 шагов | Atoll Path",
    description:
      "Пошаговый путь экспата: квота работодателя, work permit в Xpat, Entry Pass, билет только после пропуска, Work e-Visa в течение 15 дней. Не туристический въезд.",
    changefreq: "weekly",
    priority: 0.9,
  },
  sources: {
    path: "/sources",
    name: "Источники",
    title: "Официальные источники: Immigration, Xpat, MyCareer, MIRA | Atoll Path",
    description:
      "Граф источников с шкалой A–D. immigration.gov.mv, xpat.egov.mv, MyCareer, MIRA, LRA, карьера резортов. Ничего «как будто официальное».",
    changefreq: "weekly",
    priority: 0.8,
  },
  boards: {
    path: "/boards",
    name: "Вакансии",
    title: "Вакансии на Мальдивах для иностранцев — Jobsicle и карьера резортов | Atoll Path",
    description:
      "Карта бордов и разбор объявлений. Зарплата и «берут иностранцев» только если написано. Не живой парсер чужого ATS.",
    changefreq: "weekly",
    priority: 0.8,
  },
  roles: {
    path: "/roles",
    name: "Роли",
    title: "Зарплаты и роли на Мальдивах: F&B, housekeeping, кухня, spa | Atoll Path",
    description:
      "Вилки basic USD — ориентир уровня C, не контракт. Service charge, квоты 2025–2026, кто реально нанимает иностранцев. Калькулятор SC.",
    changefreq: "weekly",
    priority: 0.8,
  },
  documents: {
    path: "/documents",
    name: "Документы",
    title: "Бесплатные CV и документы для работы на Мальдивах | Atoll Path",
    description:
      "CV, письмо HR, трекер откликов, проверка оффера. Редактор на этом устройстве, без подписки и без агентства. Work permit по-прежнему подаёт работодатель.",
    changefreq: "weekly",
    priority: 0.7,
  },
  editor: {
    path: "/documents/editor",
    name: "Редактор",
    title: "Редактор документов | Atoll Path",
    description: "Локальный редактор CV и писем. Файлы не индексируются.",
    noindex: true,
    changefreq: "monthly",
    priority: 0,
  },
  contract: {
    path: "/contract",
    name: "Оффер",
    title: "Проверка оффера и контракта на Мальдивах | Atoll Path",
    description:
      "Вставьте письмо HR: жильё, еда, билет, service charge, удержания. Это вопросы и риски, не юридическое заключение. Билет — после Entry Pass.",
    changefreq: "weekly",
    priority: 0.8,
  },
  scams: {
    path: "/scams",
    name: "Скамы",
    title: "Мошенничество с работой на Мальдивах: агентства и предоплата | Atoll Path",
    description:
      "Схемы «виза без оффера», плата за квоту, фейковый HR. Вы не платите за оффер. Work permit подаёт работодатель в Xpat.",
    changefreq: "weekly",
    priority: 0.8,
  },
  research: {
    path: "/research",
    name: "Исследование",
    title: "Исследование с цитатами: gov.mv, Xpat, MyCareer | Atoll Path",
    description:
      "Поиск по проверенному графу и живой fetch только с allowlist официальных доменов. Модель не выдумывает пошлины и зарплаты.",
    changefreq: "weekly",
    priority: 0.6,
  },
  reddit: {
    path: "/reddit",
    name: "Спрос",
    title: "Что спрашивают про работу на Мальдивах — Reddit и спрос | Atoll Path",
    description:
      "Боли r/maldives, r/OFWs, r/expats: work permit, SC, жильё, билет. Это опыт сообществ (уровень C), не закон.",
    changefreq: "weekly",
    priority: 0.6,
  },
  faq: {
    path: "/faq",
    name: "FAQ",
    title: "FAQ: виза, налог, билет и агентства на Мальдивах | Atoll Path",
    description:
      "Можно ли прилететь туристом и устроиться? Кто покупает билет? Налог MIRA EWT 0% до MVR 60 000. Atoll Path — не агентство.",
    changefreq: "weekly",
    priority: 0.9,
  },
  privacy: {
    path: "/privacy",
    name: "Конфиденциальность",
    title: "Конфиденциальность | Atoll Path",
    description:
      "CV и трекер живут в браузере. Нет аккаунта и облака паспортов. AdSense — после одобрения сайта.",
    changefreq: "monthly",
    priority: 0.3,
  },
  terms: {
    path: "/terms",
    name: "Условия",
    title: "Условия использования | Atoll Path",
    description:
      "Бесплатно «как есть». Не employment agency, не Immigration, не юрист. Оффер не гарантируется.",
    changefreq: "monthly",
    priority: 0.3,
  },
  about: {
    path: "/about",
    name: "О проекте",
    title: "О проекте Atoll Path — бесплатный гид прямого найма",
    description:
      "Независимая платформа самопомощи для работы на Мальдивах. Реклама оплачивает хостинг. Мы не размещаем людей у работодателя.",
    changefreq: "monthly",
    priority: 0.4,
  },
  contact: {
    path: "/contact",
    name: "Контакт",
    title: "Контакт | Atoll Path",
    description:
      "Почта оператора Atoll Path. Не Immigration и не рекрутинг. Не присылайте паспорт и IM30.",
    changefreq: "monthly",
    priority: 0.4,
  },
};

const INDEXABLE: PageId[] = [
  "home",
  "path",
  "sources",
  "boards",
  "roles",
  "documents",
  "contract",
  "scams",
  "research",
  "reddit",
  "faq",
  "privacy",
  "terms",
  "about",
  "contact",
];

export function sitemapEntries(_origin?: string) {
  return INDEXABLE.map((id) => {
    const p = PAGES[id];
    return {
      loc: `${SITE_ORIGIN}${p.path === "/" ? "" : p.path}`,
      lastmod: CHECKED_AT,
      changefreq: p.changefreq,
      priority: p.priority,
    };
  });
}

function abs(path: string) {
  return `${SITE_ORIGIN}${path === "/" ? "" : path}`;
}

function ld(data: unknown) {
  return { type: "application/ld+json" as const, children: JSON.stringify(data) };
}

function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_ORIGIN,
    inLanguage: ["ru", "en"],
    description: PAGES.home.description,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_ORIGIN,
    },
  };
}

function crumbs(id: PageId) {
  const p = PAGES[id];
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: SITE_NAME,
      item: SITE_ORIGIN,
    },
  ];
  if (id !== "home") {
    items.push({
      "@type": "ListItem",
      position: 2,
      name: p.name,
      item: abs(p.path),
    });
  }
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items };
}

function faqLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "ru",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q.ru,
      acceptedAnswer: { "@type": "Answer", text: f.a.ru },
    })),
  };
}

function howToLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Как легально уехать работать на Мальдивы",
    description: PAGES.path.description,
    inLanguage: "ru",
    step: playbook.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.title.ru,
      text: step.summary.ru,
      url: `${abs("/path")}#${step.id}`,
    })),
  };
}

function webAppLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_NAME,
    url: SITE_ORIGIN,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: PAGES.home.description,
    inLanguage: ["ru", "en"],
    featureList: [
      "14-step direct-hire path",
      "Official source graph",
      "Offer inspector",
      "Free CV editor (on-device)",
      "Vacancy decoder",
    ],
  };
}

export function pageHead(id: PageId) {
  const p = PAGES[id];
  const scripts = [ld(websiteLd()), ld(crumbs(id))];
  if (id === "home") scripts.push(ld(webAppLd()));
  if (id === "faq") scripts.push(ld(faqLd()));
  if (id === "path") scripts.push(ld(howToLd()));

  return {
    meta: [
      { title: p.title },
      { name: "description", content: p.description },
      {
        name: "robots",
        content: p.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large",
      },
      { name: "keywords", content: p.keywords ?? KEYWORDS },
      { name: "author", content: SITE_NAME },
    ],
    links: p.noindex
      ? []
      : [
          { rel: "canonical", href: abs(p.path) },
          { rel: "alternate", hrefLang: "x-default", href: abs(p.path) },
        ],
    scripts,
  };
}
