export type LocaleText = { ru: string; en: string };

export type Source = {
  id: string;
  name: string;
  url: string;
  kind: "official" | "board" | "employer" | "union" | "press" | "community";
  lang: string[];
  note: LocaleText;
  foreignerUseful: boolean;
};

export type PlaybookStep = {
  id: string;
  title: LocaleText;
  summary: LocaleText;
  youDo: LocaleText[];
  employerDoes: LocaleText[];
  doNot: LocaleText[];
  sources: string[];
  warn?: LocaleText;
};

export const CHECKED_AT = "2026-08-23";

export const sources: Source[] = [
  {
    id: "immig",
    name: "Maldives Immigration",
    url: "https://immigration.gov.mv/",
    kind: "official",
    lang: ["en", "dv"],
    foreignerUseful: true,
    note: {
      ru: "Официальный сайт иммиграции. Work Visa, e-Visa, статусы, формы. Единственный канон по въезду и рабочей визе.",
      en: "Official immigration site. Work Visa, e-Visa, status check, forms. Canonical source for entry and work visas.",
    },
  },
  {
    id: "immig-work",
    name: "Work Visa Service",
    url: "https://immigration.gov.mv/visa/work-visa",
    kind: "official",
    lang: ["en"],
    foreignerUseful: true,
    note: {
      ru: "Процесс Work e-Visa через Xpat. Работодатель подаёт. Виза в течение 15 дней после прибытия. Стикеры в паспорте недействительны после 23.11.2025.",
      en: "Work e-Visa via Xpat. Employer files. Visa within 15 days of arrival. Passport stickers invalid after 23 Nov 2025.",
    },
  },
  {
    id: "xpat",
    name: "Xpat (eGov)",
    url: "https://xpat.egov.mv/",
    kind: "official",
    lang: ["en", "dv"],
    foreignerUseful: true,
    note: {
      ru: "Система Минбезопасности и технологий: квоты, work permit, verify permit. Вход через eFaas. Соискатель сам себе work permit не оформляет.",
      en: "Homeland Security system: quotas, work permits, verify permit. eFaas login. A jobseeker cannot issue their own work permit.",
    },
  },
  {
    id: "immig-status",
    name: "Visa Status Check",
    url: "https://www.immigration.gov.mv/visa/status",
    kind: "official",
    lang: ["en"],
    foreignerUseful: true,
    note: {
      ru: "Проверка визы по гражданству и номеру паспорта. Используйте после того, как работодатель заявил e-Visa.",
      en: "Check visa by nationality and passport number after the employer files the e-Visa.",
    },
  },
  {
    id: "immig-dl",
    name: "Immigration Downloads",
    url: "https://immigration.gov.mv/downloads",
    kind: "official",
    lang: ["en", "dv"],
    foreignerUseful: true,
    note: {
      ru: "Официальные регламенты, включая Employment Approval Regulation (поправки 2026) и Business Visa Regulation.",
      en: "Official regulations including Employment Approval Regulation (2026 amendments) and Business Visa Regulation.",
    },
  },
  {
    id: "mycareer",
    name: "MyCareer (National Careers Service)",
    url: "https://mycareer.gov.mv/en/jobs",
    kind: "official",
    lang: ["en", "dv"],
    foreignerUseful: false,
    note: {
      ru: "Госпортал вакансий. Министр призывает регистрироваться мальдивцев. Много офисных вакансий в Мале. Не путать с «официальным сайтом для иностранцев на курорты». Иностранец может смотреть, но квоты и work permit всё равно через работодателя.",
      en: "Government careers portal. Ministers urge Maldivians to register. Many Male' office jobs. Not a foreigner-resort hiring desk. You may browse; work permits still go through an employer.",
    },
  },
  {
    id: "mira",
    name: "MIRA — Income Tax FAQ",
    url: "https://www.mira.gov.mv/Pages/View/FAQ_IncomeTax",
    kind: "official",
    lang: ["en", "dv"],
    foreignerUseful: true,
    note: {
      ru: "Официальный налог на вознаграждение с 1.04.2020. EWT 0% при месячной базе ≤ MVR 60 000 (~USD 3 890). «Tax-free» в влогах — разговорное: у большинства линейного персонала база ниже порога, а не «налога нет».",
      en: "Official remuneration tax since 1 Apr 2020. EWT 0% if monthly base ≤ MVR 60,000 (~USD 3,890). Vlog “tax-free” is colloquial: most line staff sit under the threshold, tax law still exists.",
    },
  },
  {
    id: "lra",
    name: "Labour Relations Authority",
    url: "https://lra.gov.mv/",
    kind: "official",
    lang: ["en", "dv"],
    foreignerUseful: true,
    note: {
      ru: "Трудовой регулятор. Employment Act распространяется и на экспатов. Жалобы по условиям, часам, зарплате — сюда, не в Telegram-агентство.",
      en: "Labour regulator. The Employment Act covers expatriates too. Conditions, hours and pay complaints go here — not to a Telegram agency.",
    },
  },
  {
    id: "lra-reg",
    name: "LRA — Regulations (expatriate employment)",
    url: "https://lra.gov.mv/regulations/",
    kind: "official",
    lang: ["en", "dv"],
    foreignerUseful: true,
    note: {
      ru: "Среди прочего Regulation on Employment of Expatriates in the Maldives (2023/R-111) и Service Charge Regulation. Первичный текст, не пересказ.",
      en: "Includes the Regulation on Employment of Expatriates in the Maldives (2023/R-111) and the Service Charge Regulation. Primary text, not a recap.",
    },
  },
  {
    id: "onegov",
    name: "oneGov",
    url: "https://one.gov.mv/",
    kind: "official",
    lang: ["en", "dv"],
    foreignerUseful: true,
    note: {
      ru: "Госуслуги. Здесь бизнес регистрирует employment agency и получает лицензию. Atoll Path лицензию не заменяет и агентством не является.",
      en: "Government services. Businesses register an employment agency and obtain a licence here. Atoll Path is not that licence and is not an agency.",
    },
  },
  {
    id: "jobcenter",
    name: "JobCenter Maldives",
    url: "https://jobcenter.mv/",
    kind: "official",
    lang: ["en", "dv"],
    foreignerUseful: false,
    note: {
      ru: "Государственная площадка сопоставления вакансий (семья National Careers Service / MyCareer). Смотреть можно; это не курортный стол для иностранцев.",
      en: "Government job-matching platform (National Careers Service / MyCareer family). Browsable; not a foreigner-resort hiring desk.",
    },
  },
  {
    id: "jobsicle",
    name: "Jobsicle.mv",
    url: "https://www.jobsicle.mv/",
    kind: "board",
    lang: ["en", "dv"],
    foreignerUseful: true,
    note: {
      ru: "Крупнейший частный борд Мальдив с 2016. Часть вакансий «Maldivians only». Смотрите фильтр гражданства. Не госсайт.",
      en: "Largest private board since 2016. Some jobs are Maldivians-only. Check nationality filters. Not a government site.",
    },
  },
  {
    id: "jobmaldives",
    name: "Job-Maldives.com",
    url: "https://www.job-maldives.com/",
    kind: "board",
    lang: ["en"],
    foreignerUseful: true,
    note: {
      ru: "Гостеприимство и резорты. На 22.08.2026 видны вакансии VARU by Atmosphere, Sun Siyam Vilu Reef и др. Бесплатный просмотр для соискателя.",
      en: "Hospitality and resorts. As of 22 Aug 2026 listed VARU by Atmosphere, Sun Siyam Vilu Reef and others. Free for jobseekers to browse.",
    },
  },
  {
    id: "career-mv",
    name: "Career Maldives",
    url: "https://career-maldives.com/",
    kind: "board",
    lang: ["en"],
    foreignerUseful: true,
    note: {
      ru: "Частный карьерный портал. Не госсайт. Проверяйте работодателя и не платите за «размещение резюме», если это не прозрачный тариф.",
      en: "Private career portal. Not government. Verify the employer; do not pay to “boost a CV” unless the fee is transparent and optional.",
    },
  },
  {
    id: "caterer",
    name: "CatererGlobal — Maldives",
    url: "https://www.catererglobal.com/jobs/maldives/",
    kind: "board",
    lang: ["en"],
    foreignerUseful: true,
    note: {
      ru: "Международный hospitality-борд. Часто люкс-резорты и сезонные контракты.",
      en: "International hospitality board. Often luxury resorts and seasonal contracts.",
    },
  },
  {
    id: "linkedin",
    name: "LinkedIn Jobs — Maldives",
    url: "https://www.linkedin.com/jobs/maldives-jobs/",
    kind: "board",
    lang: ["en"],
    foreignerUseful: true,
    note: {
      ru: "Ищите по location Maldives + resort/hospitality. Пишите HR напрямую. Не платите LinkedIn Premium ради этого — бесплатного поиска достаточно.",
      en: "Search location Maldives + resort/hospitality. Message HR directly. LinkedIn Premium is not required.",
    },
  },
  {
    id: "sunsiyam",
    name: "Sun Siyam Careers",
    url: "https://www.sunsiyam.com/about-sun-siyam/careers/",
    kind: "employer",
    lang: ["en"],
    foreignerUseful: true,
    note: {
      ru: "Прямой карьерный раздел мальдивской группы. Front office, F&B, spa, recreation и др.",
      en: "Direct careers page of a Maldivian group. Front office, F&B, spa, recreation and more.",
    },
  },
  {
    id: "villa",
    name: "Villa Resorts Careers",
    url: "https://villaresorts.com/careers/",
    kind: "employer",
    lang: ["en"],
    foreignerUseful: true,
    note: {
      ru: "Прямые вакансии группы Villa (Nautica, Park, Royal Island и др.).",
      en: "Direct vacancies for Villa group (Nautica, Park, Royal Island and others).",
    },
  },
  {
    id: "fourseasons",
    name: "Four Seasons Careers",
    url: "https://careers.fourseasons.com/us/en/",
    kind: "employer",
    lang: ["en"],
    foreignerUseful: true,
    note: {
      ru: "Глобальный карьерный портал. Фильтр country = Maldives.",
      en: "Global careers portal. Filter country = Maldives.",
    },
  },
  {
    id: "marriott",
    name: "Marriott Careers",
    url: "https://careers.marriott.com/jobs",
    kind: "employer",
    lang: ["en"],
    foreignerUseful: true,
    note: {
      ru: "Глобальный поиск. Location = Maldives. JW / W / St. Regis / Le Méridien и др.",
      en: "Global search. Location = Maldives. JW / W / St. Regis / Le Méridien and others.",
    },
  },
  {
    id: "hilton",
    name: "Hilton Careers",
    url: "https://jobs.hilton.com/",
    kind: "employer",
    lang: ["en"],
    foreignerUseful: true,
    note: {
      ru: "Глобальный ATS. Фильтр location = Maldives. Пишите с корпоративной формы Hilton, не посреднику.",
      en: "Global ATS. Filter location = Maldives. Apply through Hilton’s form, not a middleman.",
    },
  },
  {
    id: "accor",
    name: "Accor Careers",
    url: "https://careers.accor.com/",
    kind: "employer",
    lang: ["en"],
    foreignerUseful: true,
    note: {
      ru: "Глобальный ATS группы Accor. Фильтр Maldives. Raffles / Pullman / Mövenpick и др.",
      en: "Accor group ATS. Filter Maldives. Raffles / Pullman / Mövenpick and others.",
    },
  },
  {
    id: "atmosphere",
    name: "Atmosphere Core Careers",
    url: "https://careers.atmospherecore.com/jobs",
    kind: "employer",
    lang: ["en"],
    foreignerUseful: true,
    note: {
      ru: "Прямой ATS Atmosphere Core (в т.ч. VARU). Не копируйте роли с чужих бордов — открывайте эту страницу.",
      en: "Direct Atmosphere Core ATS (including VARU). Do not copy roles from third-party boards — open this page.",
    },
  },
  {
    id: "crown",
    name: "Crown & Champa Careers",
    url: "https://www.crownandchamparesorts.com/careers.html",
    kind: "employer",
    lang: ["en"],
    foreignerUseful: true,
    note: {
      ru: "Прямая карьерная страница группы (Nala и др.). Пишите на домен группы, не посреднику.",
      en: "Direct group careers page (Nala and others). Write to the group domain, not a middleman.",
    },
  },
  {
    id: "efaas",
    name: "eFaas (National Digital ID)",
    url: "https://efaas.egov.mv/",
    kind: "official",
    lang: ["en", "dv"],
    foreignerUseful: true,
    note: {
      ru: "Национальный логин. Работодатель заходит в Xpat через eFaas. Соискатель сам себе work permit отсюда не выдаёт. Позже worker может завести ID по work permit.",
      en: "National login. The employer opens Xpat via eFaas. A jobseeker cannot issue a work permit here. Later a worker can create an ID from work-permit credentials.",
    },
  },
  {
    id: "im30",
    name: "IM30 Visa Applicant Information Form",
    url: "https://immigration.gov.mv/downloads",
    kind: "official",
    lang: ["en", "dv"],
    foreignerUseful: true,
    note: {
      ru: "Официальный бланк IM30 на Downloads (релиз 2026). Заполняет/загружает сторона работодателя в Xpat. Не путать с «я сам подал визу».",
      en: "Official IM30 blank on Downloads (2026 release). The employer side uploads it in Xpat. This is not “I filed my own visa”.",
    },
  },
  {
    id: "maldivesjobsinfo",
    name: "maldivesjobs.info",
    url: "https://maldivesjobs.info/",
    kind: "board",
    lang: ["en"],
    foreignerUseful: true,
    note: {
      ru: "Частный каталог «прямых HR email». Не госсайт и не работодатель. Сверяйте ящик с доменом отеля, прежде чем слать паспорт.",
      en: "A private “direct HR email” catalogue. Not government and not the employer. Match the inbox to the hotel domain before you send a passport scan.",
    },
  },
  {
    id: "usemb",
    name: "U.S. Mission Maldives jobs",
    url: "https://mv.usembassy.gov/jobs/",
    kind: "official",
    lang: ["en"],
    foreignerUseful: false,
    note: {
      ru: "Вакансии посольства США — не курортный найм, другие требования и визы.",
      en: "U.S. Mission vacancies — not resort hiring; different requirements and visas.",
    },
  },
  {
    id: "foreign",
    name: "Ministry of Foreign Affairs careers",
    url: "https://foreign.gov.mv/index.php/en/ministry/careers",
    kind: "official",
    lang: ["en", "dv"],
    foreignerUseful: false,
    note: {
      ru: "Госвакансии МИД. Обычно для граждан Мальдив.",
      en: "MFA government vacancies. Typically for Maldivian citizens.",
    },
  },
  {
    id: "team",
    name: "TEAM (press via Adhadhu)",
    url: "https://adhadhu.com/63913",
    kind: "union",
    lang: ["en", "dv"],
    foreignerUseful: true,
    note: {
      ru: "Ассоциация работников туризма призывает не соглашаться на зарплату в руфиях вместо исторического USD. Это позиция профсоюза, не закон.",
      en: "Tourism employees association urges staff not to accept Rufiyaa pay instead of the historical USD practice. Union position, not statute.",
    },
  },
];

export const quotaPhaseout: {
  window: LocaleText;
  roles: LocaleText;
  source: string;
}[] = [
  {
    window: {
      ru: "Квоты не выдаются сразу (0 лет)",
      en: "No new quotas at all (0 years)",
    },
    roles: {
      ru: "Таксисты, вторые пилоты, капитаны судов, артисты/enterainers, кассиры — по сообщениям местных СМИ о поправках 2025–2026.",
      en: "Taxi drivers, aircraft co-pilots, boat/vessel captains, entertainers, cashiers — per local press on 2025–2026 amendments.",
    },
    source: "press",
  },
  {
    window: { ru: "Снятие за ~2 года", en: "Phase-out ~2 years" },
    roles: {
      ru: "Парикмахеры, косметологи, няни, персональные тренеры, электрики, англоязычные GRO, гиды, бухгалтеры, имамы.",
      en: "Hairdressers, beauticians, babysitters, personal trainers, electricians, English-speaking GROs, tour guides, accountants, imams.",
    },
    source: "press",
  },
  {
    window: { ru: "Снятие за ~3 года", en: "Phase-out ~3 years" },
    roles: {
      ru: "Дайверы, медсёстры, инспекторы стройки, сюрвейеры, супервайзеры площадки, пилоты, фотографы.",
      en: "Divers, nurses, building inspectors, surveyors, site supervisors, pilots, photographers.",
    },
    source: "press",
  },
  {
    window: { ru: "Снятие за ~4–5 лет", en: "Phase-out ~4–5 years" },
    roles: {
      ru: "Инженеры-электрики, dive inspectors; менеджерские роли (housekeeping / HR / front office managers), учителя школ.",
      en: "Electrical engineers, dive inspectors; managerial roles (housekeeping / HR / front office managers), school teachers.",
    },
    source: "press",
  },
];

export const playbook: PlaybookStep[] = [
  {
    id: "reality",
    title: {
      ru: "Реальность: вы не «просто вылетаете и устраиваетесь»",
      en: "Reality: you do not just fly in and start working",
    },
    summary: {
      ru: "Работать на Мальдивах иностранец может только по work permit работодателя + Work e-Visa. Туристическая виза работу не даёт. Купить билет за свой счёт и «найти работу на месте» — путь к нелегальному статусу и депортации.",
      en: "A foreigner may work only on an employer work permit + Work e-Visa. A tourist visa is not permission to work. Buying your own ticket to “find a job on the island” is a path to illegal status and removal.",
    },
    youDo: [
      {
        ru: "Примите, что найм идёт от мальдивского работодателя (резорт / управляющая компания / подрядчик), а не от вас лично в иммиграцию.",
        en: "Accept that hiring starts with a Maldivian employer (resort / operator / contractor), not with you filing immigration yourself.",
      },
      {
        ru: "Если кто-то обещает «визу без оффера» — это красный флаг.",
        en: "Anyone promising a visa without a job offer is a red flag.",
      },
    ],
    employerDoes: [
      {
        ru: "Должен иметь квоту (quota) в Xpat и подать work permit / employment approval на вас.",
        en: "Must hold a quota in Xpat and file a work permit / employment approval in your name.",
      },
      {
        ru: "Для нового въезда — Entry Pass от Министерства внутренней безопасности и технологий.",
        en: "For a new arrival — an Entry Pass from the Ministry of Homeland Security and Technology.",
      },
    ],
    doNot: [
      {
        ru: "Не работайте по туристическому штампу. Официально это запрещено.",
        en: "Do not work on a tourist stamp. It is prohibited.",
      },
      {
        ru: "Не платите «за квоту» незнакомцу в WhatsApp. Квоту покупает работодатель в госсистеме.",
        en: "Do not pay a WhatsApp stranger “for a quota”. The employer buys quota in the government system.",
      },
    ],
    sources: ["immig-work", "xpat", "immig"],
    warn: {
      ru: "Сторонние гайды (в т.ч. EOR-сайты) иногда пишут «прилетите туристом, потом конвертируем». С 2025 рабочий въезд завязан на Entry Pass + e-Visa. Не опирайтесь на схемы 2016–2020 годов.",
      en: "Third-party guides (including some EOR blogs) still say “arrive as a tourist, then convert”. From 2025, worker entry is tied to Entry Pass + e-Visa. Do not rely on 2016–2020 playbooks.",
    },
  },
  {
    id: "occupation",
    title: {
      ru: "Проверьте профессию: часть ролей закрывают для экспатов",
      en: "Check the occupation: some roles are being closed to expatriates",
    },
    summary: {
      ru: "В 2025–2026 правительство публиковало регулирование занятости экспатов (в т.ч. 2025/R-120 на Xpat) и план замещения мальдивцами. Ряд профессий — без новых квот сразу, другие — за 2–5 лет. Список в прессе; канон — PDF на immigration.gov.mv/downloads.",
      en: "In 2025–2026 the government published expatriate employment rules (including 2025/R-120 notices on Xpat) and a localisation plan. Some jobs get no new quotas; others phase out over 2–5 years. Press lists exist; the canon is the PDF on immigration.gov.mv/downloads.",
    },
    youDo: [
      {
        ru: "Сверьте свою роль с таблицей фазирования в разделе «Квоты». Если роль в зоне 0–2 лет — ищите смежную (F&B, housekeeping, kitchen), а не «бухгалтер / GRO / тренер» как план на годы.",
        en: "Match your role to the phase-out table. If it sits in the 0–2 year zone, pivot to adjacent resort work (F&B, housekeeping, kitchen) rather than accountant / GRO / trainer as a multi-year plan.",
      },
      {
        ru: "Скачайте Employment Approval Regulation с официальной страницы Downloads и читайте первоисточник, не Telegram-пересказы.",
        en: "Download the Employment Approval Regulation from the official Downloads page and read the primary text, not Telegram recaps.",
      },
    ],
    employerDoes: [
      {
        ru: "Не может законно выдать квоту на закрытую роль. «Мы проведём как другую должность» — риск для вас.",
        en: "Cannot lawfully issue quota on a closed role. “We’ll file you under another title” is your risk.",
      },
    ],
    doNot: [
      {
        ru: "Не платите агентству за трудоустройство в заведомо закрывающуюся роль.",
        en: "Do not pay an agency to place you into a role that is being closed.",
      },
    ],
    sources: ["immig-dl", "xpat"],
    warn: {
      ru: "Таблица фазирования в приложении помечена как press-level, пока вы не сверите PDF. Мы не подменяем официальный gazette.",
      en: "The in-app phase-out table is press-level until you verify the PDF. We do not replace the official gazette.",
    },
  },
  {
    id: "no-agency-fee",
    title: {
      ru: "Правило денег: вы не платите за оффер",
      en: "Money rule: you do not pay for the offer",
    },
    summary: {
      ru: "Резорт, которому вы нужны, сам подаёт квоту, work permit и обычно билет joining. Агентство, которое берёт с вас $300–3000 «за трудоустройство», продаёт доступ, который работодатель и так даёт. Исключение — вы сами покупаете билет, если это явно написано в подписанном контракте.",
      en: "A resort that needs you files quota, work permit, and usually the joining ticket. An agency charging you $300–3,000 “for placement” is selling access the employer already provides. Exception: you buy the ticket only if the signed contract says so.",
    },
    youDo: [
      {
        ru: "Любой запрос предоплаты до подписанного оффера = стоп.",
        en: "Any request for a deposit before a signed offer = stop.",
      },
      {
        ru: "Спросите HR: joining ticket, return ticket after contract, visa/work permit fees — who pays? Ответ должен быть в контракте.",
        en: "Ask HR: joining ticket, return after contract, visa/work permit fees — who pays? The answer must be in the contract.",
      },
    ],
    employerDoes: [
      {
        ru: "Платит госборды work permit / quota (это его расход в Xpat).",
        en: "Pays government work permit / quota fees (its Xpat cost).",
      },
      {
        ru: "Часто оплачивает joining airfare и staff boat/seaplane до острова — если это в оффере.",
        en: "Often pays joining airfare and staff boat/seaplane to the island — if the offer says so.",
      },
    ],
    doNot: [
      {
        ru: "Не отправляйте паспорт «на визу» курьером незнакомцу.",
        en: "Do not courier your passport “for a visa” to a stranger.",
      },
      {
        ru: "Не путайте рекрутера резорта (email @marriott.com / @sunsiyam.com / домен отеля) с посредником gmail/whatsapp.",
        en: "Do not confuse resort recruiting mail (@marriott.com / @sunsiyam.com / hotel domain) with a gmail/whatsapp middleman.",
      },
    ],
    sources: ["immig-work", "xpat"],
  },
  {
    id: "documents",
    title: {
      ru: "Соберите пакет до рассылки резюме",
      en: "Build the file before you spray CVs",
    },
    summary: {
      ru: "Работодатель не начнёт work permit без сканов. Типичный минимум: паспорт ≥12 месяцев, фото по стандарту иммиграции, CV на английском, дипломы/сертификаты, рекомендации, полицейская справка, готовность к медосмотру (флюорография, инфекции — по списку клиники работодателя).",
      en: "An employer will not start a work permit without scans. Typical minimum: passport ≥12 months, immigration-standard photo, English CV, certificates, references, police clearance, readiness for medicals (chest X-ray, infectious-disease panel per the employer clinic list).",
    },
    youDo: [
      {
        ru: "Паспорт: срок ≥ 12 месяцев на дату въезда. Имя как в дипломах.",
        en: "Passport valid ≥ 12 months on arrival. Name matches certificates.",
      },
      {
        ru: "Police clearance / справка о несудимости — свежая, с переводом на английский при необходимости.",
        en: "Police clearance — recent, English translation if needed.",
      },
      {
        ru: "CV 1–2 страницы, английский, фото деловое, без эмодзи, с датами и названиями отелей.",
        en: "CV 1–2 pages, English, business photo, no emoji, dates and hotel names.",
      },
      {
        ru: "Короткое видео 60–90 сек: кто вы, роль, английский, готовность жить на staff island.",
        en: "A 60–90s clip: who you are, the role, English, willingness to live on a staff island.",
      },
    ],
    employerDoes: [
      {
        ru: "Пришлёт список медосмотра и иногда клинику. Не оплачивайте «медкомиссию агентства» заранее, пока нет оффера.",
        en: "Will send the medical list and sometimes a clinic. Do not pre-pay an “agency medical” before an offer.",
      },
    ],
    doNot: [
      {
        ru: "Не подделывайте сертификаты. Проверка на маленьком острове быстрая, а депортация реальная.",
        en: "Do not forge certificates. Checks on a small island are fast; removal is real.",
      },
    ],
    sources: ["immig-work", "immig-dl"],
  },
  {
    id: "cv-hunt",
    title: {
      ru: "Где искать: только прямые каналы",
      en: "Where to hunt: direct channels only",
    },
    summary: {
      ru: "Порядок силы: (1) карьера самого резорта, (2) Jobsicle / Job-Maldives / CatererGlobal / LinkedIn, (3) HR email с сайта отеля. MyCareer.gov.mv — смотреть можно, но это не «иностранный курортный портал». Платные «базы вакансий СНГ» не нужны.",
      en: "Order of strength: (1) the resort’s own careers page, (2) Jobsicle / Job-Maldives / CatererGlobal / LinkedIn, (3) HR email from the hotel site. MyCareer.gov.mv is browsable, not a foreigner-resort desk. Paid CIS “vacancy databases” are unnecessary.",
    },
    youDo: [
      {
        ru: "Составьте таблицу: 40 резортов × карьерный URL × HR email. Это ваша настоящая «база».",
        en: "Build a sheet: 40 resorts × careers URL × HR email. That is the actual database.",
      },
      {
        ru: "На Jobsicle снимайте фильтр Maldivians-only. На Job-Maldives.com смотрите hospitality-ленту ежедневно.",
        en: "On Jobsicle, skip Maldivians-only roles. On Job-Maldives.com, watch the hospitality feed daily.",
      },
      {
        ru: "Фильтр LinkedIn: Maldives + waiter / commis / spa therapist / guest service / stewarding / bartender.",
        en: "LinkedIn filter: Maldives + waiter / commis / spa therapist / guest service / stewarding / bartender.",
      },
    ],
    employerDoes: [
      {
        ru: "Крупные сети публикуют на своём ATS (Marriott, Four Seasons, Hilton). Независимые мальдивские группы — на своём сайте или Jobsicle.",
        en: "Big brands post on their ATS (Marriott, Four Seasons, Hilton). Independent Maldivian groups use their site or Jobsicle.",
      },
    ],
    doNot: [
      {
        ru: "Не отвечайте на объявления «гарантия трудоустройства, оплата до вылета».",
        en: "Do not answer ads that say “guaranteed job, pay before departure”.",
      },
    ],
    sources: [
      "jobsicle",
      "jobmaldives",
      "caterer",
      "linkedin",
      "sunsiyam",
      "villa",
      "fourseasons",
      "marriott",
      "mycareer",
    ],
  },
  {
    id: "apply",
    title: {
      ru: "Рассылка: объём, не «одно идеальное письмо»",
      en: "Apply at volume, not one perfect letter",
    },
    summary: {
      ru: "На линейные роли (F&B, HK, stewarding, commis) ответ даёт статистика: 30–80 откликов, 3–8 интервью, 1 оффер. Письмо короткое, на английском, с CV и готовностью к контракту 12 месяцев.",
      en: "Line roles (F&B, HK, stewarding, commis) are a numbers game: 30–80 applications, 3–8 interviews, 1 offer. Keep the email short, in English, CV attached, 12-month contract ready.",
    },
    youDo: [
      {
        ru: "Тема: Role — Your Name — Nationality — Immediate joiner.",
        en: "Subject: Role — Your Name — Nationality — Immediate joiner.",
      },
      {
        ru: "Тело: 6–8 строк. Опыт, английский, дата готовности, просьба подтвердить joining ticket / accommodation / service charge.",
        en: "Body: 6–8 lines. Experience, English, join date, ask them to confirm joining ticket / accommodation / service charge.",
      },
      {
        ru: "Трекинг в таблице: дата, резорт, роль, статус, имя HR.",
        en: "Track in a sheet: date, resort, role, status, HR name.",
      },
    ],
    employerDoes: [
      {
        ru: "HR резорта отвечает медленно. Напоминание через 7–10 дней — норма.",
        en: "Resort HR is slow. A nudge after 7–10 days is normal.",
      },
    ],
    doNot: [
      {
        ru: "Не рассылайте одно и то же с Gmail-подписью «immigration consultant».",
        en: "Do not send the same blast with an “immigration consultant” Gmail signature.",
      },
    ],
    sources: ["jobsicle", "jobmaldives"],
  },
  {
    id: "interview",
    title: {
      ru: "Интервью: английский, остров, ночные смены",
      en: "Interview: English, island life, night shifts",
    },
    summary: {
      ru: "Собеседование Zoom/Teams. Вопросы: опыт, конфликт с гостем, почему остров, алкоголь/свинина (мусульманская страна, резорты с барами — отдельная этика), готовность 6 дней в неделю, жизнь в staff village.",
      en: "Zoom/Teams interview. Expect: experience, a guest conflict, why an island, alcohol/pork (Muslim country, resorts still run bars — separate ethics), 6-day weeks, staff-village life.",
    },
    youDo: [
      {
        ru: "Говорите просто и медленно. Честно скажите уровень английского.",
        en: "Speak simply and slowly. Be honest about your English.",
      },
      {
        ru: "Спросите: basic salary, service charge average last 3 months, contract currency (USD vs MVR), days off, staff room sharing, probation.",
        en: "Ask: basic salary, service charge average last 3 months, contract currency (USD vs MVR), days off, staff room sharing, probation.",
      },
    ],
    employerDoes: [
      {
        ru: "Может дать 2–3 раунда: HR, department head, иногда operations.",
        en: "May run 2–3 rounds: HR, department head, sometimes operations.",
      },
    ],
    doNot: [
      {
        ru: "Не обещайте «fluent», если вы этого не потянете на ресепшене люкса.",
        en: "Do not claim “fluent” if you cannot hold a luxury-front-desk conversation.",
      },
    ],
    sources: ["jobmaldives"],
  },
  {
    id: "offer",
    title: {
      ru: "Оффер и контракт: читайте кто платит билет",
      en: "Offer and contract: read who pays the ticket",
    },
    summary: {
      ru: "Без пункта joining airfare / repatriation / work permit sponsorship вы не «вылетаете за счёт компании» — это миф, пока не прописано. Жильё и питание на резорте обычно включены. Проверьте валюту зарплаты (USD vs MVR) и формулу service charge.",
      en: "Without a joining airfare / repatriation / work-permit sponsorship clause you are not “flying on the company” — that is a myth until it is written. Resort housing and meals are usually included. Check salary currency (USD vs MVR) and the service-charge formula.",
    },
    youDo: [
      {
        ru: "Чеклист контракта в разделе Contract. Не подписывайте, пока 8 обязательных пунктов не отмечены.",
        en: "Use the Contract checklist. Do not sign until the 8 mandatory items are ticked.",
      },
      {
        ru: "Попросите PDF на бланке компании с печатью/подписью, не «оффер в WhatsApp».",
        en: "Ask for a company-letterhead PDF with signature, not a WhatsApp “offer”.",
      },
    ],
    employerDoes: [
      {
        ru: "После подписи запускает quota slot → work permit → Entry Pass.",
        en: "After signature, starts quota slot → work permit → Entry Pass.",
      },
    ],
    doNot: [
      {
        ru: "Не вносите «залог за визу» на личную карту HR.",
        en: "Do not send a “visa deposit” to an HR personal card.",
      },
    ],
    sources: ["immig-work", "xpat", "team"],
  },
  {
    id: "permit",
    title: {
      ru: "Work permit делает работодатель в Xpat",
      en: "The employer files the work permit in Xpat",
    },
    summary: {
      ru: "Вы не регистрируетесь на xpat.egov.mv «как соискатель за квотой». Работодатель заходит под организацией (eFaas), выбирает слот квоты, подаёт employment approval / work permit, затем Entry Pass. Вы присылаете сканы и ждёте. Проверить факт можно через Verify Work Permit.",
      en: "You do not register on xpat.egov.mv “as a jobseeker for quota”. The employer logs in as the organisation (eFaas), uses a quota slot, files employment approval / work permit, then Entry Pass. You send scans and wait. You can later use Verify Work Permit.",
    },
    youDo: [
      {
        ru: "Держите один комплект сканов (цвет, читаемый MRZ паспорта).",
        en: "Keep one scan pack (colour, readable passport MRZ).",
      },
      {
        ru: "Запросите номер work permit / копию Entry Pass до покупки своего билета.",
        en: "Ask for the work permit number / Entry Pass copy before you buy any self-funded ticket.",
      },
    ],
    employerDoes: [
      {
        ru: "Xpat: Work Permit → Details → Visa → Apply / New Request после прибытия.",
        en: "Xpat: Work Permit → Details → Visa → Apply / New Request after arrival.",
      },
      {
        ru: "Work e-Visa должна быть получена в течение 15 дней с даты прибытия.",
        en: "Work e-Visa must be obtained within 15 days of arrival.",
      },
    ],
    doNot: [
      {
        ru: "Не вылетайте, пока нет подтверждённого Entry Pass / инструкции иммиграции от работодателя. «Прилетай туристом, мы потом» — устаревшая и опасная схема.",
        en: "Do not fly until there is a confirmed Entry Pass / employer immigration instruction. “Come as a tourist, we’ll sort it” is an outdated and dangerous pattern.",
      },
    ],
    sources: ["xpat", "immig-work"],
  },
  {
    id: "travel",
    title: {
      ru: "Билет и прибытие в MLE",
      en: "Ticket and arrival at MLE",
    },
    summary: {
      ru: "Если контракт обещает joining ticket — билет покупает работодатель или вы покупаете по их PNR. Трансфер staff boat / domestic / seaplane до острова обычно за счёт резорта. На границе: паспорт, Entry Pass / инструкции, обратный билет если вы турист (вы не должны быть туристом-работником).",
      en: "If the contract promises a joining ticket, the employer buys it or you buy against their PNR. Staff boat / domestic / seaplane to the island is usually on the resort. At the border: passport, Entry Pass / instructions — you should not be arriving as a working tourist.",
    },
    youDo: [
      {
        ru: "Возьмите распечатку/PDF Entry Pass и оффера. Не сдавайте оригиналы незнакомцам в аэропорту «помогалам».",
        en: "Carry a print/PDF of the Entry Pass and offer. Do not hand originals to airport “helpers”.",
      },
      {
        ru: "Связь: eSIM/роуминг на первые 48 часов, пока не выдадут staff SIM.",
        en: "Keep an eSIM/roaming for the first 48 hours until a staff SIM is issued.",
      },
    ],
    employerDoes: [
      {
        ru: "Встречает staff transfer. Если не встретили — звонок HR, не «агент в Мале, заплати $80».",
        en: "Meets you with staff transfer. If nobody is there — call HR, not a Male' “agent” asking $80.",
      },
    ],
    doNot: [
      {
        ru: "Не соглашайтесь отдать паспорт «на оформление» частному лицу вне HR резорта.",
        en: "Do not hand your passport “for processing” to anyone outside resort HR.",
      },
    ],
    sources: ["immig-work", "immig"],
  },
  {
    id: "first15",
    title: {
      ru: "Первые 15 дней: e-Visa или вы вне закона",
      en: "First 15 days: e-Visa or you are out of status",
    },
    summary: {
      ru: "Официально: работодатель обязан получить Work e-Visa в течение 15 дней с прибытия. С 23.11.2025 стикер в паспорте не считается. В Xpat должен появиться логотип e-Visa, файл можно скачать. Проверяйте статус на immigration.gov.mv/visa/status.",
      en: "Officially: the employer must obtain the Work e-Visa within 15 days of arrival. From 23 Nov 2025 a passport sticker does not count. Xpat should show an e-Visa mark; you can download the file. Check status at immigration.gov.mv/visa/status.",
    },
    youDo: [
      {
        ru: "На 7-й день спросите HR: e-Visa submitted? На 14-й — скачайте копию.",
        en: "On day 7 ask HR: e-Visa submitted? On day 14 download a copy.",
      },
      {
        ru: "Медицинский осмотр в одобренной клинике — по списку работодателя, не «любая клиника в Мале».",
        en: "Medical exam in an approved clinic — employer list, not “any Male' clinic”.",
      },
    ],
    employerDoes: [
      {
        ru: "Xpat → work permit → Visa tab → Apply for Visa → New Request + фото + bio page.",
        en: "Xpat → work permit → Visa tab → Apply for Visa → New Request + photo + bio page.",
      },
    ],
    doNot: [
      {
        ru: "Не игнорируйте просрочку. Просроченный work permit в системе делает визу недействительной.",
        en: "Do not ignore an overdue filing. An expired work-permit fee in the system makes the visa invalid.",
      },
    ],
    sources: ["immig-work", "immig-status", "xpat"],
  },
  {
    id: "money",
    title: {
      ru: "Деньги: basic + service charge, не «оклад из рекламы»",
      en: "Money: basic + service charge, not the ad salary",
    },
    summary: {
      ru: "На резорте типично: basic (часто скромный) + 10% service charge, распределяемый среди staff, + редкие чаевые. Цифры в агентских рекламах ($2000–5000 линейному официанту) не подтверждаются. Налог: MIRA EWT 0% до MVR 60 000/мес — поэтому у линейного персонала часто «на руки как есть». Жильё и еда обычно не вычитаются на резорте; на гестхаусах Маафуши — вычитают, это другой рынок.",
      en: "At a resort: modest basic + 10% service charge pooled to staff + occasional tips. Agency ads quoting $2,000–5,000 for a line waiter are not evidenced. Tax: MIRA EWT 0% up to MVR 60,000/month — that is why line staff often see “net = gross”. Housing and food are usually not deducted at a resort; Maafushi guesthouses often deduct — a different market.",
    },
    youDo: [
      {
        ru: "Просите average service charge за последние месяцы письменно.",
        en: "Ask for recent months’ average service charge in writing.",
      },
      {
        ru: "Фиксируйте валюту выплаты. Позиция TEAM: исторически USD в туризме; перевод в MVR — спорный.",
        en: "Lock the pay currency. TEAM’s position: tourism pay has historically been USD; a shift to MVR is contested.",
      },
    ],
    employerDoes: [
      {
        ru: "Должен платить вовремя. Задержки зарплаты — частая жалоба на Reddit, особенно вне крупных сетей.",
        en: "Must pay on time. Late pay is a recurring Reddit complaint, especially outside big brands.",
      },
    ],
    doNot: [
      {
        ru: "Не соглашайтесь, что visа/жильё «вычтут из зарплаты несколько месяцев», если это не было в контракте.",
        en: "Do not accept that visa/housing will be “deducted for a few months” unless it was in the contract.",
      },
    ],
    sources: ["mira", "team"],
  },
  {
    id: "life",
    title: {
      ru: "Staff island: это работа, не отпуск",
      en: "Staff island: a job, not a holiday",
    },
    summary: {
      ru: "Вы живёте в staff village, часто 2–4 в комнате, 6 дней, жара, форма, мало приватности. Гостевая часть острова вам не «пляж курорта». Интернет, алкоголь, свидания, религия — правила дома. Люксовый резорт ≠ люксовая жизнь сотрудника.",
      en: "You live in a staff village, often 2–4 to a room, 6-day weeks, heat, uniform, little privacy. The guest island is not “your beach”. Internet, alcohol, dating, religion — house rules. A luxury resort is not a luxury staff life.",
    },
    youDo: [
      {
        ru: "Заложите аптечку, офлайн-развлечения, резерв денег на 6 недель до первой зарплаты.",
        en: "Pack a medical kit, offline entertainment, and 6 weeks of cash until first payroll.",
      },
    ],
    employerDoes: [
      {
        ru: "Питание staff canteen, форма, прачечная — обычно да. Качество сильно плавает.",
        en: "Staff canteen, uniform, laundry — usually yes. Quality varies widely.",
      },
    ],
    doNot: [
      {
        ru: "Не гуляйте в гостевой зоне вне правил. Это увольнение.",
        en: "Do not wander the guest island against house rules. That is a firing offence.",
      },
    ],
    sources: ["jobmaldives"],
  },
  {
    id: "exit",
    title: {
      ru: "Выход: return ticket и не сжигайте work permit",
      en: "Exit: return ticket and do not burn the permit",
    },
    summary: {
      ru: "Return airfare после полного контракта часто в оффере. Досрочный разрыв — вы можете потерять билет и получить плохой reference на крошечном рынке. Продление — новый цикл work permit в Xpat, e-Visa не длиннее срока permit, renewals max 1 year.",
      en: "Return airfare after a completed contract is often in the offer. Early break — you may lose the ticket and a reference in a tiny market. Renewal is a new Xpat work-permit cycle; e-Visa cannot outlast the permit; renewals max 1 year.",
    },
    youDo: [
      {
        ru: "Храните копию e-Visa и контракта в облаке. Паспорт — ваш, не «в сейфе HR навсегда».",
        en: "Keep the e-Visa and contract in the cloud. The passport is yours, not “in HR’s safe forever”.",
      },
    ],
    employerDoes: [
      {
        ru: "Оформляет cancellation / repatriation по правилам Xpat.",
        en: "Files cancellation / repatriation under Xpat rules.",
      },
    ],
    doNot: [
      {
        ru: "Не оставайтесь на острове без статуса «на всякий случай».",
        en: "Do not overstay on the island “just in case”.",
      },
    ],
    sources: ["immig-work", "xpat"],
  },
];

export const documents = [
  { id: "passport", ru: "Загранпаспорт, ≥ 12 месяцев", en: "Passport, ≥ 12 months validity" },
  { id: "photo", ru: "Фото по стандарту Maldives Immigration", en: "Photo to Maldives Immigration standard" },
  { id: "cv", ru: "CV на английском, 1–2 стр., с фото", en: "English CV, 1–2 pages, with photo" },
  { id: "certs", ru: "Дипломы / hospitality certificates", en: "Diplomas / hospitality certificates" },
  { id: "refs", ru: "Рекомендательные письма / contacts", en: "Reference letters / contacts" },
  { id: "police", ru: "Police clearance / несудимость", en: "Police clearance" },
  { id: "med", ru: "Готовность к медкомиссии (по списку работодателя)", en: "Ready for medicals (employer clinic list)" },
  { id: "video", ru: "Видео 60–90 сек о себе", en: "60–90s intro video" },
  { id: "bank", ru: "Реквизиты для зарплаты (после оффера)", en: "Bank details (after offer)" },
  { id: "yellow", ru: "Жёлтая лихорадка — только если требуется по маршруту", en: "Yellow fever — only if required by routing" },
];

export const contractChecks = [
  { id: "letterhead", ru: "PDF на бланке компании, подпись", en: "Company-letterhead PDF, signed" },
  { id: "role", ru: "Должность = та, на которую квота", en: "Job title matches the quota title" },
  { id: "basic", ru: "Basic salary числом и валютой", en: "Basic salary as a number and currency" },
  { id: "sc", ru: "Service charge: как считается и как часто платится", en: "Service charge: formula and cadence" },
  { id: "ticket", ru: "Joining airfare: кто покупает, какой класс/маршрут", en: "Joining airfare: who buys, route/class" },
  { id: "return", ru: "Return / repatriation после полного контракта", en: "Return / repatriation after full contract" },
  { id: "visa", ru: "Work permit + e-Visa за счёт работодателя", en: "Work permit + e-Visa at employer cost" },
  { id: "housing", ru: "Staff housing + meals без вычета (или вычет прописан)", en: "Staff housing + meals with no deduction (or deduction stated)" },
  { id: "hours", ru: "График, off days, overtime", en: "Roster, off days, overtime" },
  { id: "probation", ru: "Испытательный срок и условия разрыва", en: "Probation and termination terms" },
  { id: "currency", ru: "Валюта выплаты USD или MVR — явно", en: "Pay currency USD or MVR — explicit" },
  { id: "passport", ru: "Паспорт остаётся у вас", en: "Passport stays with you" },
];

export type Role = {
  id: string;
  family: string;
  title: LocaleText;
  hire: "high" | "mid" | "low";
  english: "basic" | "conversational" | "fluent";
  basicUsd: string;
  perks: LocaleText;
  note: LocaleText;
  quotaRisk: "low" | "watch" | "high";
};

export const roles: Role[] = [
  {
    id: "waiter",
    family: "fb",
    title: { ru: "Waiter / Waitress / F&B attendant", en: "Waiter / Waitress / F&B attendant" },
    hire: "high",
    english: "conversational",
    basicUsd: "450–900",
    perks: {
      ru: "Service charge может удвоить базовую на люксе при высокой загрузке. Чаевые нестабильны.",
      en: "Service charge can rival basic in a busy luxury resort. Tips are lumpy.",
    },
    note: {
      ru: "Самый частый вход без «белого воротничка». Смены, подносы, жара.",
      en: "Most common entry without a white-collar CV. Shifts, trays, heat.",
    },
    quotaRisk: "low",
  },
  {
    id: "bartender",
    family: "fb",
    title: { ru: "Bartender / Barista", en: "Bartender / Barista" },
    hire: "mid",
    english: "conversational",
    basicUsd: "500–1100",
    perks: {
      ru: "Чаевые выше среднего F&B. Нужны навыки бара, не только улыбка.",
      en: "Tips above average F&B. Needs bar skill, not just a smile.",
    },
    note: {
      ru: "Мусульманская страна: алкоголь только в резортах с лицензией. Для части кандидатов — этический вопрос.",
      en: "Muslim country: alcohol only in licensed resorts. An ethics question for some candidates.",
    },
    quotaRisk: "low",
  },
  {
    id: "commis",
    family: "kitchen",
    title: { ru: "Commis / CDPs / Stewarding", en: "Commis / CDPs / Stewarding" },
    hire: "high",
    english: "basic",
    basicUsd: "400–1000",
    perks: {
      ru: "Stewarding — высокий спрос, низкий английский, тяжёлый физический труд.",
      en: "Stewarding — high demand, lower English bar, heavy physical work.",
    },
    note: {
      ru: "Кухня люкса требует сертификатов food safety. Подделки горят быстро.",
      en: "Luxury kitchens want food-safety certificates. Fakes burn fast.",
    },
    quotaRisk: "low",
  },
  {
    id: "hk",
    family: "housekeeping",
    title: { ru: "Room attendant / HK", en: "Room attendant / HK" },
    hire: "high",
    english: "basic",
    basicUsd: "400–800",
    perks: {
      ru: "Стабильный спрос. Физически тяжело. Service charge как у всех операционных.",
      en: "Steady demand. Physically hard. Service charge like other operations roles.",
    },
    note: {
      ru: "На Reddit часто советуют HK/F&B как реальный вход иностранцу.",
      en: "Reddit often names HK/F&B as the realistic foreigner entry.",
    },
    quotaRisk: "low",
  },
  {
    id: "spa",
    family: "spa",
    title: { ru: "Spa therapist / beautician", en: "Spa therapist / beautician" },
    hire: "mid",
    english: "conversational",
    basicUsd: "500–1200",
    perks: {
      ru: "Чаевые и treatment commission. Нужны лицензии.",
      en: "Tips and treatment commission. Licences matter.",
    },
    note: {
      ru: "Beautician в прессе — зона фазирования квот (~2 года). Therapist на резорте может жить дольше, но проверяйте PDF.",
      en: "Beautician is in the press phase-out (~2 years). A resort therapist may last longer — verify the PDF.",
    },
    quotaRisk: "watch",
  },
  {
    id: "fo",
    family: "front-office",
    title: { ru: "Front office / Guest relations", en: "Front office / Guest relations" },
    hire: "mid",
    english: "fluent",
    basicUsd: "600–1400",
    perks: {
      ru: "Выше basic, ниже чаевых F&B. Нужен сильный английский.",
      en: "Higher basic, lower F&B tips. Needs strong English.",
    },
    note: {
      ru: "English-speaking GRO в прессе — фазирование ~2 лет. FO manager — до ~5 лет. Не строить 10-летний план на GRO.",
      en: "English-speaking GRO is in the ~2 year press phase-out. FO manager ~5 years. Do not build a 10-year plan on GRO.",
    },
    quotaRisk: "high",
  },
  {
    id: "dive",
    family: "dive",
    title: { ru: "Dive instructor / dive master", en: "Dive instructor / dive master" },
    hire: "mid",
    english: "conversational",
    basicUsd: "700–1500",
    perks: {
      ru: "Сертификаты PADI/SSI обязательны. Сезонность загрузки.",
      en: "PADI/SSI certificates required. Occupancy is seasonal.",
    },
    note: {
      ru: "Divers в прессе — фазирование ~3 года. Не входите в профессию только ради Мальдив.",
      en: "Divers are in the ~3 year press phase-out. Do not enter the trade only for Maldives.",
    },
    quotaRisk: "watch",
  },
  {
    id: "eng",
    family: "engineering",
    title: { ru: "Engineering / technician", en: "Engineering / technician" },
    hire: "mid",
    english: "basic",
    basicUsd: "600–1600",
    perks: {
      ru: "Островам нужны электрики, HVAC, boat crew. Часть ролей под фазированием.",
      en: "Islands need electricians, HVAC, boat crew. Some titles are in phase-out.",
    },
    note: {
      ru: "Electrician ~2 года, electrical engineer ~4, captains — без новых квот (пресс). Читайте точный код профессии.",
      en: "Electrician ~2 years, electrical engineer ~4, captains — no new quotas (press). Read the exact occupation code.",
    },
    quotaRisk: "high",
  },
  {
    id: "anim",
    family: "entertainment",
    title: { ru: "Entertainment / recreation", en: "Entertainment / recreation" },
    hire: "mid",
    english: "conversational",
    basicUsd: "500–1100",
    perks: {
      ru: "Видимая роль, фото для соцсетей, но entertainer в прессе — без новых квот.",
      en: "Visible role, social-media photos, but “entertainer” is in the no-new-quota press list.",
    },
    note: {
      ru: "Не путать recreation attendant и entertainer в квоте.",
      en: "Do not confuse recreation attendant with entertainer on the quota form.",
    },
    quotaRisk: "high",
  },
  {
    id: "hr",
    family: "hr-admin",
    title: { ru: "HR / accounts / admin", en: "HR / accounts / admin" },
    hire: "low",
    english: "fluent",
    basicUsd: "700–1800",
    perks: {
      ru: "Офис в Мале или HR резорта. Accountant в прессе — ~2 года.",
      en: "Male' office or resort HR. Accountant is in the ~2 year press list.",
    },
    note: {
      ru: "Много вакансий MyCareer — локальные. Иностранцу без редкого профиля тяжело.",
      en: "Many MyCareer vacancies are local. Hard for a foreigner without a rare profile.",
    },
    quotaRisk: "high",
  },
  {
    id: "butler",
    family: "fb",
    title: { ru: "Butler / personal butler", en: "Butler / personal butler" },
    hire: "low",
    english: "fluent",
    basicUsd: "700–1500",
    perks: {
      ru: "Чаевые на люксе в горячий месяц могут затмить basic. Это не оклад и не обещание.",
      en: "Luxury-month tips can dwarf basic. That is not a salary and not a promise.",
    },
    note: {
      ru: "Самая конкурентная линейная роль в влогах. «$7–10k в сезон» — анекдот пика, уровень C. Не строить бюджет. Нужны свободный английский и реальный сервис.",
      en: "The most contested line role in vlogs. “$7–10k in season” is a peak anecdote, trust C. Do not budget on it. Needs fluent English and real service experience.",
    },
    quotaRisk: "low",
  },
  {
    id: "it",
    family: "it",
    title: { ru: "IT assistant / resort IT", en: "IT assistant / resort IT" },
    hire: "mid",
    english: "conversational",
    basicUsd: "900–2500",
    perks: {
      ru: "Меньше чаевых, чем F&B. Вилка assistant vs manager в сообществах расходится в разы.",
      en: "Fewer tips than F&B. Community bands for assistant vs manager differ by multiples.",
    },
    note: {
      ru: "Сообщества называют ~$1 000–1 200 для assistant и выше для manager. Уровень C, не оффер. Title в Xpat должен совпасть с бумагой.",
      en: "Communities quote ~$1,000–1,200 for assistants and more for managers. Trust C, not an offer. The Xpat title must match the paper.",
    },
    quotaRisk: "watch",
  },
];

export const islandLife: { id: string; title: LocaleText; text: LocaleText }[] = [
  {
    id: "isolation",
    title: { ru: "Островная изоляция", en: "Island isolation" },
    text: {
      ru: "Staff village на клочке земли. Часто нет «выйти в город после смены». Влоги описывают шок и выгорание. Это быт, не закон о бесплатном жилье.",
      en: "A staff village on a scrap of land. Often no “go out after shift”. Vlogs describe shock and burnout. Living conditions, not a free-housing statute.",
    },
  },
  {
    id: "hours",
    title: { ru: "Длинные смены в сезон", en: "Long peak-season shifts" },
    text: {
      ru: "Сообщества говорят про 12–16 часов в пик. Employment Act и LRA — про часы и overtime; roster только в контракте. Не верьте «всегда выходной».",
      en: "Communities describe 12–16 hour peak days. The Employment Act and LRA cover hours and overtime; the roster is only in your contract. Do not trust “always a day off”.",
    },
  },
  {
    id: "usd-cash",
    title: { ru: "Наличный USD", en: "Cash USD" },
    text: {
      ru: "Жалобы Reddit: физический доллар дефицитен. Валюта зарплаты — пункт контракта. TEAM 2025: не подписывать перевод выплат в руфии молча.",
      en: "Reddit reports: physical USD is scarce. Pay currency is a contract line. TEAM 2025: do not silently accept a Rufiyaa switch.",
    },
  },
  {
    id: "zones",
    title: { ru: "Staff vs guest зоны", en: "Staff vs guest zones" },
    text: {
      ru: "House rules часто закрывают гостевой пляж и ресторан вне смены. Это дисциплина работодателя, не «депортация за загар по закону».",
      en: "House rules often close the guest beach and restaurant off-shift. Employer discipline, not “deportation by statute for sunbathing”.",
    },
  },
];

export const scams = [
  {
    id: "pay-visa",
    severity: "high" as const,
    title: { ru: "«Оплати визу / work permit, потом оффер»", en: "“Pay the visa / work permit, then we hire you”" },
    text: {
      ru: "Work permit подаёт работодатель в Xpat. Вы не покупаете квоту государства на своё имя через посредника. Любая предоплата «за визу» до контракта — стоп.",
      en: "The employer files the work permit in Xpat. You do not buy a government quota in your own name through a middleman. Any visa prepayment before a contract is a stop.",
    },
  },
  {
    id: "tourist-convert",
    severity: "high" as const,
    title: { ru: "«Прилетай туристом, оформим на месте»", en: "“Fly in as a tourist, we’ll convert on arrival”" },
    text: {
      ru: "Работать по туристическому статусу нельзя. С 2025 новый работник должен иметь Entry Pass. Схема 2010-х жива в агентствах и опасна.",
      en: "You may not work in tourist status. From 2025 a new worker should hold an Entry Pass. The 2010s pattern is still sold by agencies and is unsafe.",
    },
  },
  {
    id: "guaranteed",
    severity: "high" as const,
    title: { ru: "«Гарантия трудоустройства $800–3000»", en: "“Guaranteed job for $800–3,000”" },
    text: {
      ru: "Резорт, которому вы нужны, не берёт с вас комиссию за оффер. Гарантия за деньги — продажа надежды. В плейлисте есть ролики агентств — это реклама, не инструкция.",
      en: "A resort that needs you does not charge you a placement fee. A paid guarantee is selling hope. Playlist agency videos are ads, not a playbook.",
    },
  },
  {
    id: "passport",
    severity: "high" as const,
    title: { ru: "«Пришли паспорт / оригинал диплома курьером»", en: "“Courier your passport / original diploma”" },
    text: {
      ru: "Сканы — да, после оффера. Оригинал паспорта — только вам в руки на границе и в HR по описи, не «на хранение агенту».",
      en: "Scans — yes, after an offer. The physical passport stays with you at the border and, if HR holds it, against an inventory — not “with an agent”.",
    },
  },
  {
    id: "whatsapp-hr",
    severity: "mid" as const,
    title: { ru: "HR только в WhatsApp, почта gmail", en: "HR only on WhatsApp, Gmail address" },
    text: {
      ru: "Настоящий HR пишет с домена отеля/группы. WhatsApp бывает как канал, но оффер — PDF на бланке. Проверьте имя в Jobsicle/сайте резорта.",
      en: "Real HR writes from the hotel/group domain. WhatsApp can be a channel; the offer is a letterhead PDF. Check the name on Jobsicle/the resort site.",
    },
  },
  {
    id: "salary-ad",
    severity: "mid" as const,
    title: { ru: "Зарплата $2000+ официанту «на руки»", en: "$2,000+ “in hand” for a waiter" },
    text: {
      ru: "Встречается как basic+SC+tips на топ-люксе в горячий месяц, не как гарантия. Требуйте average SC письменно. Реклама агентств СНГ систематически завышена.",
      en: "Possible as basic+SC+tips in a hot luxury month, not a guarantee. Demand average SC in writing. CIS agency ads are systematically inflated.",
    },
  },
  {
    id: "maafushi-deduct",
    severity: "mid" as const,
    title: { ru: "Гестхаус Маафуши: « visа и койка из зарплаты»", en: "Maafushi guesthouse: “visa and bunk from salary”" },
    text: {
      ru: "Это другой рынок, не island resort. На Reddit иностранцы жалуются на задержки зарплаты и вычеты. Не путать с контрактом 5* резорта.",
      en: "A different market from an island resort. Reddit reports late pay and deductions. Do not confuse it with a 5* resort contract.",
    },
  },
  {
    id: "work-travel-fee",
    severity: "mid" as const,
    title: { ru: "Программы «work and travel Maldives» за $1600", en: "“Work and travel Maldives” programmes at $1,600" },
    text: {
      ru: "Платный пакет за вход, который прямой найм часто даёт бесплатно (и с билетом). Считайте: fee vs joining ticket + agency-free offer.",
      en: "A paid pack for an entry that direct hire often gives free (and with a ticket). Compare the fee against joining ticket + an agency-free offer.",
    },
  },
];

export const redditDemand = [
  {
    demand: "high" as const,
    topic: {
      ru: "Как попасть на резорт напрямую, какие роли реально берут иностранцев",
      en: "How to get onto a resort directly, which roles actually hire foreigners",
    },
    evidence: {
      ru: "r/maldives: «How tf do i get a job at a resort» — советы: HK и F&B, писать, что готовы к island, рассылать широко.",
      en: "r/maldives: “How tf do i get a job at a resort” — advice: HK and F&B, say you will do island life, apply widely.",
    },
    app: {
      ru: "Мастер-путь + таблица ролей с hire=high.",
      en: "Master path + roles table with hire=high.",
    },
  },
  {
    demand: "high" as const,
    topic: {
      ru: "Правда о зарплате, service charge, кто платит билет",
      en: "Truth about pay, service charge, who pays the ticket",
    },
    evidence: {
      ru: "Плейлист (Living her own life, Мэри, Aigerim, GOBIG) и r/askhotels. Агентства обещают вилку, которой нет в контракте.",
      en: "Playlist (Living her own life, Mary, Aigerim, GOBIG) and r/askhotels. Agencies quote bands that never appear in the contract.",
    },
    app: {
      ru: "Шаг Money + Contract decoder.",
      en: "Money step + Contract decoder.",
    },
  },
  {
    demand: "high" as const,
    topic: {
      ru: "Агентство vs прямой найм / развод на деньги",
      en: "Agency vs direct hire / fee scams",
    },
    evidence: {
      ru: "Плейлист: «Как разводят агентства», «как казахов разводят». Reddit OFWs: agency or direct. Русскоязычные влоги 2024–2026 — основной спрос.",
      en: "Playlist: agency-scam episodes, Kazakh-scam episode. Reddit OFWs: agency or direct. Russian-language vlogs 2024–2026 are the demand core.",
    },
    app: {
      ru: "Раздел Scams и правило «не платить за оффер».",
      en: "Scams section and the “don’t pay for the offer” rule.",
    },
  },
  {
    demand: "mid" as const,
    topic: {
      ru: "Задержки зарплаты, удержание визы, вычеты за жильё",
      en: "Late pay, visa leverage, housing deductions",
    },
    evidence: {
      ru: "r/maldives: жалобы иностранца в Maafushi на задержки и вычеты visа/rent; отдельный тред про suspected job fraud (нет копии visa approval).",
      en: "r/maldives: Maafushi late pay and visa/rent deductions; a separate suspected job-fraud thread (no visa-approval copy).",
    },
    app: {
      ru: "Красные флаги + Verify Work Permit.",
      en: "Red flags + Verify Work Permit.",
    },
  },
  {
    demand: "mid" as const,
    topic: {
      ru: "Валюта зарплаты USD vs MVR",
      en: "Pay currency USD vs MVR",
    },
    evidence: {
      ru: "TEAM / Adhadhu 2025: призыв не подписывать перевод выплат в руфии.",
      en: "TEAM / Adhadhu 2025: do not sign a shift of pay into Rufiyaa.",
    },
    app: {
      ru: "Пункт currency в контракте.",
      en: "Currency line in the contract checklist.",
    },
  },
  {
    demand: "mid" as const,
    topic: {
      ru: "Sponsorship на ресторан / не-резорт",
      en: "Restaurant / non-resort sponsorship",
    },
    evidence: {
      ru: "Плейлист: Maldives Sponsorship Visa || Restaurant Job. Спрос есть, защита слабее, чем у сети резортов.",
      en: "Playlist: Maldives Sponsorship Visa || Restaurant Job. Demand exists; protection is weaker than a resort chain.",
    },
    app: {
      ru: "Предупреждение: тот же Xpat, но выше риск вычетов.",
      en: "Warning: same Xpat process, higher deduction risk.",
    },
  },
  {
    demand: "high" as const,
    topic: {
      ru: "Изоляция острова, staff village, запрет гостевых зон",
      en: "Island isolation, staff village, guest-zone bans",
    },
    evidence: {
      ru: "r/maldives: «what is it like for the workers»; влоги Aigerim — шок, слёзы, нет города. House rules часто закрывают гостевой пляж вне смены. Это быт, не «депортация за загар по закону».",
      en: "r/maldives: “what is it like for the workers”; Aigerim vlogs — shock, no town. House rules often close the guest beach off-shift. Living conditions, not “deportation by statute for sunbathing”.",
    },
    app: {
      ru: "Роли → быт острова. Не путать с законом о жилье.",
      en: "Roles → island life. Do not confuse with a housing statute.",
    },
  },
  {
    demand: "mid" as const,
    topic: {
      ru: "Наличный USD, конвертация MVR, длинные смены",
      en: "Cash USD, MVR conversion, long shifts",
    },
    evidence: {
      ru: "Сообщества: физический доллар дефицитен; 12–16 часов в пик. Employment Act/LRA — про часы; курс и банкомат — не право. TEAM 2025 — отдельно про валюту зарплаты в контракте.",
      en: "Communities: physical USD is scarce; 12–16 hour peak days. Employment Act/LRA cover hours; an ATM rate is not a right. TEAM 2025 is the separate pay-currency contract issue.",
    },
    app: {
      ru: "Калькулятор SC + пункт currency в оффере.",
      en: "SC estimator + currency tick on the offer.",
    },
  },
];

export const faqs: { q: LocaleText; a: LocaleText; sources: string[] }[] = [
  {
    q: {
      ru: "Можно ли прямо сейчас купить билет и уехать работать?",
      en: "Can I buy a ticket today and go work?",
    },
    a: {
      ru: "Нет, если нет работодателя с квотой, work permit и Entry Pass. Туристический въезд ≠ право работать. Легальный путь: оффер → permit → Entry Pass → рейс (часто за счёт резорта) → e-Visa за 15 дней.",
      en: "Not without an employer that holds quota, a work permit and an Entry Pass. Tourist entry is not the right to work. Legal path: offer → permit → Entry Pass → flight (often employer-paid) → e-Visa in 15 days.",
    },
    sources: ["immig-work", "xpat"],
  },
  {
    q: {
      ru: "Есть ли официальный сайт вакансий от государства для иностранцев?",
      en: "Is there an official government jobs site for foreigners?",
    },
    a: {
      ru: "MyCareer.gov.mv — официальный National Careers Service, в первую очередь рынок мальдивцев (офис в Мале и т.д.). Курортный найм иностранцев идёт через работодателя + Jobsicle / карьера резортов / Job-Maldives. Work permit всегда в Xpat у работодателя. Не существует кнопки «подал — государство трудоустроило иностранца».",
      en: "MyCareer.gov.mv is the official National Careers Service, primarily the Maldivian labour market (Male' offices, etc.). Foreigner resort hiring runs through the employer + Jobsicle / resort careers / Job-Maldives. Work permits always sit in the employer’s Xpat. There is no “apply and the state hires a foreigner” button.",
    },
    sources: ["mycareer", "jobsicle", "xpat"],
  },
  {
    q: {
      ru: "Правда ли зарплаты без налога?",
      en: "Is the salary really tax-free?",
    },
    a: {
      ru: "Нет как юрфакт. MIRA: налог на remuneration с 01.04.2020, EWT 0% до MVR 60 000 в месяц (~USD 3 890). Поэтому у официанта с basic $600 налог часто 0 — из-за порога, не из-за «офшора без налога».",
      en: "Not as a legal fact. MIRA: remuneration tax since 1 Apr 2020, EWT 0% up to MVR 60,000/month (~USD 3,890). A waiter on $600 basic often pays 0 because of the threshold, not because Maldives has no tax.",
    },
    sources: ["mira"],
  },
  {
    q: {
      ru: "Кто покупает самолёт?",
      en: "Who buys the plane ticket?",
    },
    a: {
      ru: "Только то, что написано в контракте. На островных резортах joining ticket + staff transfer — частая практика, return — после полного срока. Если пункта нет — билет ваш. Агентство, которое берёт с вас деньги «за билет, который оплатит отель», продаёт вам ваш же benefit.",
      en: "Only what the contract says. Island resorts often include joining ticket + staff transfer; return after a completed term. If the clause is missing, the ticket is yours. An agency that charges you for a ticket the hotel would have paid is selling you your own benefit.",
    },
    sources: ["immig-work"],
  },
  {
    q: {
      ru: "Сколько ждать оффер?",
      en: "How long until an offer?",
    },
    a: {
      ru: "При прямой рассылке линейной роли: недели–пара месяцев. После оффера work permit/Entry Pass — ещё дни–недели. Истории «вылетел через 5 дней» бывают у тех, у кого уже был готовый пакет и квота. Не обещайте себе «завтра».",
      en: "Direct-apply line roles: weeks to a couple of months. After the offer, work permit/Entry Pass can take days to weeks. “I flew in 5 days” stories belong to people with a complete file and a waiting quota. Do not promise yourself tomorrow.",
    },
    sources: ["jobsicle"],
  },
  {
    q: {
      ru: "Atoll Path — это агентство? Нужна лицензия?",
      en: "Is Atoll Path an agency? Does it need a licence?",
    },
    a: {
      ru: "Нет. Это бесплатная платформа самопомощи: инструкции, шаблоны, проверка текстов. Мы не представляем вас работодателю, не берём плату за трудоустройство и не выдаём визы. Лицензия employment agency оформляется работодателем/агентством через oneGov, если они занимаются размещением людей.",
      en: "No. It is a free self-help platform: instructions, templates, text checks. We do not represent you to an employer, charge a placement fee, or issue visas. An employment-agency licence is for businesses that place people, via oneGov.",
    },
    sources: ["onegov", "lra"],
  },
  {
    q: {
      ru: "Что значит шкала A / B / C / D?",
      en: "What does the A / B / C / D scale mean?",
    },
    a: {
      ru: "A — официальный сайт государства или самого работодателя. B — проверяемый борд с прямой ссылкой. C — Reddit, блог, YouTube: опыт, не закон. D — репост/Telegram без доказательства. Зарплата из C никогда не показывается как гарантия.",
      en: "A — official government or the employer’s own site. B — a verifiable board with a direct link. C — Reddit, blogs, YouTube: experience, not law. D — a Telegram/repost with no proof. A C-level salary is never shown as a guarantee.",
    },
    sources: ["immig", "xpat", "lra"],
  },
  {
    q: {
      ru: "Entry Pass действует 90 дней? Медсправка — 45?",
      en: "Is the Entry Pass 90 days? Medical 45?",
    },
    a: {
      ru: "Эти цифры стоят в сторонних гайдах и PDF. На странице Work Visa Immigration, которую мы сверяли, их нет как жёсткого правила. Не планируйте вылет по «90 дням из блога». Смотрите срок на вашем Entry Pass и список клиники работодателя.",
      en: "Those numbers sit in third-party guides and PDFs. They are not a hard rule on the Immigration Work Visa page we checked. Do not plan a flight on “90 days from a blog”. Read the term on your Entry Pass and the employer’s clinic list.",
    },
    sources: ["immig-work", "immig-dl"],
  },
  {
    q: {
      ru: "Резорт всегда даёт жильё, еду и билет по закону?",
      en: "Does the law always give housing, meals and a ticket?",
    },
    a: {
      ru: "Нет как общее правило. Квоту, work permit и сборы в Xpat платит работодатель. Жильё, canteen и joining ticket — пункты конкретного контракта. Если пункта нет — это не «государство обещало».",
      en: "Not as a blanket rule. Quota, work permit and Xpat fees are an employer cost. Housing, canteen and joining ticket are clauses in that contract. If a clause is missing, the state did not promise it.",
    },
    sources: ["immig-work", "xpat", "lra"],
  },
  {
    q: {
      ru: "Что такое IM30 и кто его подаёт?",
      en: "What is IM30 and who files it?",
    },
    a: {
      ru: "IM30 — официальная анкета соискателя визы на immigration.gov.mv/downloads. Работодатель загружает данные в Xpat. Вы готовите сканы и факты. Самому «подать IM30 вместо визы» нельзя.",
      en: "IM30 is the official visa-applicant form on immigration.gov.mv/downloads. The employer uploads data in Xpat. You prepare scans and facts. You cannot “file IM30 instead of a visa”.",
    },
    sources: ["im30", "xpat", "efaas"],
  },
  {
    q: {
      ru: "Можно ли откладывать 90–95% зарплаты?",
      en: "Can I save 90–95% of pay?",
    },
    a: {
      ru: "Только если в вашем контракте реально есть жильё и стол — и вы почти ничего не тратите. Это не ставка закона и не «$10–25k за год всем». Считайте свой basic+SC, а не чужой январь люкса.",
      en: "Only if your contract actually includes housing and meals — and you spend almost nothing. Not a legal rate, and not “$10–25k a year for everyone”. Count your basic+SC, not someone else’s luxury January.",
    },
    sources: ["mira", "lra"],
  },
  {
    q: {
      ru: "Service charge — всегда 10% и поровну всем?",
      en: "Is service charge always 10% and equal for everyone?",
    },
    a: {
      ru: "У LRA есть Service Charge Regulation. Формула пула, равенство долей и сезонность — практика конкретного резорта, не гарантия. Просите средний SC за 3 месяца письменно. Таблицу Velaa $3 649 за январь мы не публикуем как факт.",
      en: "LRA has a Service Charge Regulation. Pool formula, equal shares and seasonality are that resort’s practice, not a guarantee. Ask for a 3-month average in writing. We do not publish the Velaa $3,649 January table as fact.",
    },
    sources: ["lra-reg"],
  },
  {
    q: {
      ru: "Персоналу нельзя на гостевой пляж — это закон?",
      en: "Are staff banned from the guest beach by law?",
    },
    a: {
      ru: "Обычно это house rules работодателя: staff и guest зоны разделены. Нарушение — дисциплина контракта, вплоть до увольнения и отзыва permit. Это не отдельная статья «депортация за загар». Читайте правила резорта.",
      en: "Usually house rules: staff and guest zones are split. A breach is contract discipline, up to dismissal and permit cancellation. It is not a separate “deportation for sunbathing” statute. Read the resort rules.",
    },
    sources: ["lra"],
  },
  {
    q: {
      ru: "Когда появится реклама и нужно ли по ней кликать?",
      en: "When will ads appear, and do I have to click them?",
    },
    a: {
      ru: "Слоты after-success, mid и footer уже размечены. Живые объявления Google AdSense включатся только после одобрения сайта (Site Ready). Пока на их месте плейсхолдеры. Реклама не читает CV в браузере. Мы не просим кликать объявления — это нарушение правил Google и нам не помогает. На /privacy, /terms, /about, /contact и в редакторе документов баннеров нет.",
      en: "The after-success, mid and footer slots are already marked. Live Google AdSense units turn on only after Site Ready. Until then you see placeholders. Ads do not read the in-browser CV. We do not ask you to click ads — that breaks Google policy and does not help us. There are no units on /privacy, /terms, /about, /contact or in the document editor.",
    },
    sources: [],
  },
];

export const fetchAllowlist = [
  "immigration.gov.mv",
  "www.immigration.gov.mv",
  "xpat.egov.mv",
  "mycareer.gov.mv",
  "www.mira.gov.mv",
  "mira.gov.mv",
  "jobsicle.mv",
  "www.jobsicle.mv",
  "www.job-maldives.com",
  "job-maldives.com",
  "gov.mv",
  "www.gov.mv",
  "foreign.gov.mv",
  "www.sunsiyam.com",
  "careers.fourseasons.com",
  "careers.marriott.com",
  "villaresorts.com",
  "www.catererglobal.com",
  "adhadhu.com",
  "atolltimes.mv",
  "lra.gov.mv",
  "www.lra.gov.mv",
  "one.gov.mv",
  "jobcenter.mv",
  "www.jobcenter.mv",
  "careers.atmospherecore.com",
  "jobs.hilton.com",
  "careers.accor.com",
  "efaas.egov.mv",
  "maldivesjobs.info",
  "www.maldivesjobs.info",
  "www.crownandchamparesorts.com",
];

export function t(lang: "ru" | "en", text: LocaleText) {
  return text[lang];
}

export function sourceById(id: string) {
  return sources.find((s) => s.id === id);
}
