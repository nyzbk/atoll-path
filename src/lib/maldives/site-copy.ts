export const CONTACT_EMAIL = "ultaultimatum@gmail.com";

export type CopyBlock = { title: string; paragraphs: string[] };

export const homeHow: Record<"ru" | "en", CopyBlock> = {
  ru: {
    title: "Как этим гидом пользоваться",
    paragraphs: [
      "Atoll Path — карта прямого найма на мальдивский резорт, а не биржа «купил визу». Сначала вы проверяете, что выбранная роль вообще нанимает иностранцев: линейный F&B, housekeeping, кухня, spa, dive, water sports. Офисные роли в Мале и работа «для мальдивцев» в MyCareer — другой рынок. Если квоты у работодателя нет, work permit в Xpat не появится, какой бы сильным ни было резюме.",
      "Дальше вы сами пишете в карьеру резорта или на борд вроде Jobsicle / Job-Maldives. Письмо с корпоративного домена отеля (@marriott.com, @sunsiyam.com и т.п.) — нормальный канал. Gmail, WhatsApp и «оплатите бронь за визу» — красный флаг, пока не доказано иное. Мы не рассылаем вас работодателю и не берём процент с оффера.",
      "Когда оффер есть на бумаге, смотрите три факта: кто подаёт work permit, есть ли Entry Pass до вылета, что написано про joining ticket, жильё и canteen. Работодатель подаёт Xpat и Entry Pass до рейса. Туристический штамп права работать не даёт. Work e-Visa — цифровой, его оформляют в течение 15 дней после прибытия. Это не туристическая виза и не то, что продают в Telegram за $300–3000.",
      "Билет, жильё и питание — не «всегда по закону». Квоту, сборы Xpat и work permit платит работодатель. Joining ticket и staff house — пункты конкретного контракта. Если пункта нет, государство его за вас не допишет. Зарплаты из влогов (basic + service charge) — ориентир уровня C: опыт людей, не оферта резорта.",
      "Документы на этом сайте (CV, письмо HR, трекер, разбор оффера) живут в браузере. Мы не просим аккаунт и не кладём паспорт в облако. Печать и HTML-файл вы делаете сами. Официальный бланк IM30 — только на immigration.gov.mv/downloads; его загружает работодатель в Xpat, а не вы «вместо визы».",
      "Реклама Google AdSense, когда сайт одобрят, оплачивает хостинг, чтобы гид оставался бесплатным. Слоты подписаны Advertisement. Мы не просим кликать рекламу и не читаем ваши документы ради баннера. Пока одобрения нет — на страницах стоят пустые плейсхолдеры, не живые объявления.",
    ],
  },
  en: {
    title: "How to use this guide",
    paragraphs: [
      "Atoll Path is a map for direct-hire Maldives resort work, not a “buy a visa” stall. First check that the role even hires foreigners: line F&B, housekeeping, kitchen, spa, dive, water sports. Male' office jobs and “Maldivians only” posts on MyCareer are a different market. If the employer has no quota, no Xpat work permit appears, however strong the CV.",
      "Then you write to the resort career page or a board such as Jobsicle / Job-Maldives. Mail from a hotel domain (@marriott.com, @sunsiyam.com) is a normal channel. Gmail, WhatsApp and “pay a visa deposit” are red flags until proven otherwise. We do not pitch you to employers and we do not take a cut of an offer.",
      "When an offer exists on paper, read three facts: who files the work permit, whether an Entry Pass exists before you fly, and what the contract says about the joining ticket, housing and canteen. The employer files Xpat and the Entry Pass before the flight. A tourist stamp is not the right to work. The Work e-Visa is digital, within 15 days of arrival. It is not a tourist visa and not what Telegram sells for $300–3,000.",
      "Ticket, housing and meals are not “always by law”. Quota, Xpat fees and the work permit are an employer cost. Joining ticket and staff house are clauses in that contract. If a clause is missing, the state will not write it in for you. Vlog pay (basic + service charge) is trust level C: someone’s story, not the resort’s offer.",
      "Documents on this site (CV, HR email, tracker, offer check) live in the browser. We do not ask for an account and we do not put a passport in a cloud. You print or export HTML yourself. The official IM30 blank is only on immigration.gov.mv/downloads; the employer uploads it in Xpat — you cannot “file IM30 instead of a visa”.",
      "Google AdSense, after the site is approved, pays for hosting so the guide stays free. Slots are labeled Advertisement. We do not ask you to click ads and ads do not read your documents. Until approval, you see empty placeholders, not live ads.",
    ],
  },
};

export const homeLimits: Record<"ru" | "en", CopyBlock> = {
  ru: {
    title: "Чего этот сайт сознательно не делает",
    paragraphs: [
      "Не агентство занятости, не Maldives Immigration, не MIRA и не адвокат. Лицензия employment agency нужна тем, кто размещает людей у работодателя через oneGov. Мы публикуем открытые инструкции и шаблоны. Оффер, квоту и визу выдаёт не эта страница.",
      "Не обещаем «вылет через 5 дней», «$10–25k за год» и «налог отсутствует». EWT у MIRA 0% до MVR 60 000 в месяц (~USD 3 890) — порог, а не офшор. Service charge регулирует LRA, но формула пула — практика резорта. Спрашивайте средний SC письменно.",
      "Не парсим чужие ATS вживую и не выдумываем вилки зарплат. На карточках вакансий «берут иностранцев» и сумма — только если это написано в источнике. Редактор документов скрыт от индекса: туда не ходят ни Googlebot, ни реклама.",
    ],
  },
  en: {
    title: "What this site will not do",
    paragraphs: [
      "Not an employment agency, not Maldives Immigration, not MIRA, not a lawyer. An employment-agency licence is for businesses that place people, via oneGov. We publish open instructions and templates. The offer, the quota and the visa do not come from this page.",
      "We do not promise “you fly in five days”, “$10–25k a year” or “no tax”. MIRA EWT is 0% up to MVR 60,000 a month (~USD 3,890) — a threshold, not an offshore. LRA regulates service charge; the pool formula is that resort’s practice. Ask for a three-month average in writing.",
      "We do not live-scrape someone else’s ATS and we do not invent pay bands. On vacancy cards, “hires foreigners” and a number appear only if the source wrote them. The document editor is not indexed: Googlebot and ads stay out.",
    ],
  },
};

export const aboutCopy: Record<"ru" | "en", string[]> = {
  ru: [
    "Atoll Path сделан для людей, которые хотят уехать на мальдивский резорт своим ходом: без оплаты «агенту» за доступ к вакансии, которую резорт и так публикует. Это гид самопомощи. Мы не заключаем договор с работодателем от вашего имени и не стоим между вами и Xpat.",
    "Почему не агентство. На Мальдивах placement — лицензируемая деятельность (employment agency через oneGov). Сбор $300–3000 с соискателя «за визу и билет» часто продаёт то, что по контракту и так делает резорт: joining ticket, staff transfer, подача work permit. Мы показываем официальные входы: immigration.gov.mv, xpat.egov.mv, MyCareer, MIRA, LRA, карьера брендов. Дальше вы пишете сами.",
    "Почему local документы. CV, письмо и трекер не должны уезжать на чужой сервер вместе с серией паспорта. Здесь текст остаётся в localStorage этого браузера. Хостинг Vercel может писать технический лог (IP, путь) — не содержимое резюме. Живой fetch на странице исследования ходит только на allowlist госдоменов, которые вы сами запросили.",
    "Откуда деньги. Сайт бесплатный для читателя. Если Google AdSense одобрит ресурс, показ объявлений оплатит домен и сборку. До одобрения слоты пустые. Мы не просим кликать рекламу, не обещаем доход с кликов и не включаем Auto ads.",
    "Чего ждать по срокам. Прямая рассылка линейной роли — недели или пара месяцев. После оффера work permit и Entry Pass — ещё дни или недели. Истории «вылетел за пять дней» бывают у тех, у кого пакет уже был готов и квота ждала. Не планируйте увольнение с текущей работы, пока Entry Pass не на руках.",
    "Кто читает гид. В первую очередь линейный персонал с русским или английским: официант, steward, housekeeper, commis, spa therapist, dive и water sports. Мы не закрываем путь поварам и супервайзерам, но не рисуем «IT remote на атолле» как массовый трек. Офис в Мале — чаще рынок граждан.",
    "Связь: напишите на почту на странице контакта. Не присылайте разворот паспорта. Вопросы про конкретную визу и квоту всё равно решаются у работодателя и на immigration.gov.mv — мы не подписываем Entry Pass. Битую официальную ссылку тоже можно прислать — сверим шкалу A–D.",
  ],
  en: [
    "Atoll Path is for people who want a Maldives resort job on their own: without paying an “agent” for access the resort already publishes. It is a self-help guide. We do not contract with the employer in your name and we do not stand between you and Xpat.",
    "Why not an agency. In the Maldives, placement is licensed (employment agency via oneGov). Charging a seeker $300–3,000 “for the visa and ticket” often resells what the contract already gives: joining ticket, staff transfer, filing the work permit. We show the official doors: immigration.gov.mv, xpat.egov.mv, MyCareer, MIRA, LRA, brand careers. You write the mail.",
    "Why local documents. A CV, a letter and a tracker should not leave with a passport number to someone else’s server. Here the text stays in this browser’s localStorage. Vercel may log IP and path — not the résumé body. The research-page fetch only hits an allowlist of government hosts you request.",
    "Who pays. The site is free to read. If Google AdSense approves it, ads pay for hosting. Until then the slots are empty. We do not ask you to click ads, we do not promise ad income, and Auto ads stay off.",
    "Timing. Direct-apply line roles take weeks to a couple of months. After the offer, work permit and Entry Pass can take more days or weeks. “I flew in five days” belongs to people with a complete file and waiting quota. Do not quit a current job until the Entry Pass is in hand.",
    "Who the guide is for. Mostly line staff with Russian or English: waiter, steward, housekeeper, commis, spa therapist, dive and water sports. Chefs and supervisors are not blocked, but we do not paint “remote IT on an atoll” as a mass path. Male' offices are more often a citizen market.",
    "Contact: use the address on the contact page. Do not send a passport spread. A specific visa and quota still sit with the employer and immigration.gov.mv — we do not sign Entry Passes.",
  ],
};
