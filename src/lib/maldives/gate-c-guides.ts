export type GuideNode =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };
export type GuideCopy = { title: string; nodes: GuideNode[] };

export const documentsGuide: Record<"ru" | "en", GuideCopy> = {
  ru: {
    title: "Какой пакет документов резорт реально просит — и что агентство продаёт вам повторно",
    nodes: [
      { type: "p", text: "Atoll Path держит редактор CV, письма HR, трекера откликов и разбора оффера на этом устройстве. Это не «виза под ключ» и не загрузка паспорта в облако. Work permit по-прежнему подаёт работодатель в Xpat. Ниже — карта пакета, которую ревьюер AdSense и соискатель должны прочитать в сыром HTML, без гидрации." },
      { type: "p", text: "Резорт, который нанимает иностранца на линейную роль (F&B, housekeeping, кухня, spa, dive), собирает файл не «для Telegram», а для Xpat eGov. Типичный список: цветное фото паспорта, фото на белом фоне, CV на английском, скан диплома если роль это требует, полицейская справка, иногда медсправка. Точный набор пишет работодатель. IM30 — бланк на immigration.gov.mv/downloads; его загружает работодатель в Xpat, а не вы «вместо визы»." },
      { type: "p", text: "Агентство, которое берёт $300–3000 «за документы и визу», чаще всего продаёт три вещи из открытого доступа: шаблон CV, письмо dear hiring manager, чеклист сканов. Четвёртая вещь — доступ к вакансии, которую резорт уже публикует. Пятая — обещание «мы подадим work permit». Подать work permit может только работодатель с квотой." },
      { type: "h2", text: "CV, которое читает HR резорта" },
      { type: "p", text: "Линейный HR на атолле читает быстро: роль, даты, язык, готовность к staff house, опыт смены. Английский CV из одной страницы бьёт трёхстраничный дизайнерский PDF. Пишите должность так, как в объявлении. Даты месяцами. Готовность к острову — отдельной строкой. Шаблон собирается на устройстве. Мы не храним серию паспорта." },
      { type: "p", text: "Письмо HR с корпоративного домена отеля — нормальный канал. Gmail «я ваш новый HR, оплатите бронь за визу» — красный флаг. В шаблоне не обещайте, что виза уже готова. Просите письменно: кто подаёт work permit, есть ли joining ticket, staff house, canteen, средний service charge за три месяца." },
      { type: "h2", text: "Трекер откликов" },
      { type: "p", text: "Трекер на этом сайте — таблица в браузере: борд или career URL, дата, роль, ответ, следующий шаг. Это не CRM агентства. Если кто-то просит предоплату «чтобы поставить вас в очередь Xpat» — это не услуга государства. Xpat — кабинет работодателя." },
      { type: "p", text: "Физический пакет сканов отметьте чекбоксами на этой странице. Отметка живёт в localStorage. Не кладите разворот паспорта в письмо на ultaultimatum@gmail.com. IM30 не заполняется до оффера: без работодателя его некуда загрузить." },
      { type: "h2", text: "Что не является документом на визу" },
      { type: "p", text: "Туристический штамп, бронь отеля и обратный билет — пакет туриста. Туристический въезд права работать не даёт. Work e-Visa цифровой, его оформляют в течение 15 дней после прибытия. Entry Pass работодатель получает до вылета. Если пункта joining ticket нет, государство его за вас не допишет." },
      { type: "p", text: "Полицейская справка и апостиль — требования конкретного резорта и страны гражданства. Не копируйте сумму пошлины из влога: это уровень C. Сверяйте письмо HR и immigration.gov.mv." },
      { type: "h2", text: "Как пользоваться редактором" },
      { type: "ol", items: [
        "Ыыберите язык шаблона: English для HR, русский для пометок, bilingual если нужны оба блока.",
        "Соберите пакет отклика или откройте один шаблон. Файл появится в «Мои файлы» на этом устройстве.",
        "Не вставляйте номер паспорта, ID и банковский счёт «на будущее». В CV достаточно города и почты.",
        "Печать и HTML-экспорт вы делаете сами. Мы не шлём PDF в Xpat.",
        "Редактор /documents/editor скрыт от индекса (robots Disallow). Туда не ходят ни Googlebot, ни реклама.",
      ] },
      { type: "p", text: "Реклама Google AdSense, если Google одобрит сайт, оплачивает хостинг. Пока Site Ready нет — пустые плейсхолдеры. Мы не просим кликать рекламу." },
      { type: "p", text: "Если коротко: документы здесь — чтобы вы не платили агентству за Word-файл. Квоту, work permit и Entry Pass делает резорт. Официальные входы — immigration.gov.mv, xpat.egov.mv, письмо HR. Эта страница не лицензированное агентство и не Maldives Immigration." },
    ],
  },
  en: {
    title: "The file a resort actually asks for — and what an agency resells you",
    nodes: [
      { type: "p", text: "Atoll Path keeps a CV editor, an HR letter, an application tracker and an offer check on this device. It is not a visa in a box and not a passport upload. The employer still files the work permit in Xpat. These paragraphs must exist in the first HTML so AdSense can read them without hydration." },
      { type: "p", text: "A resort hiring a foreigner for a line role builds a file for Xpat eGov, not for Telegram. Typical list after an offer: passport spread, photo on white, English CV, diploma if needed, police clearance, sometimes a medical. The employer writes the exact set. IM30 is a blank on immigration.gov.mv/downloads; the employer uploads it in Xpat." },
      { type: "p", text: "An agency that charges $300–3,000 for documents and the visa usually resells a CV template, a hiring-manager letter and a scan checklist, plus access to a vacancy the resort already posts. Only an employer with quota can file a work permit." },
      { type: "h2", text: "A CV a resort HR can open" },
      { type: "p", text: "Line HR reads fast: role, dates, language, staff-house readiness. A one-page English CV beats a designer PDF. Name the job as the ad names it. The template stays on this device. We do not store a passport number." },
      { type: "p", text: "Mail from a hotel domain is a normal channel. Gmail that asks for a visa deposit is a red flag. Do not write that the visa is ready. Ask in writing who files the work permit and what the contract says about ticket, housing and canteen." },
      { type: "h2", text: "A tracker so you do not pay to skip the queue" },
      { type: "p", text: "The tracker is a browser table: board URL, date, role, reply, next step. Anyone who asks for a prepayment to put you in the Xpat queue is not selling a state service." },
      { type: "p", text: "Tick the scans HR will ask for Xpat. Ticks live in localStorage. Do not mail a passport to ultaultimatum@gmail.com. Do not fill IM30 before an offer." },
      { type: "h2", text: "What is not a work-visa document" },
      { type: "p", text: "A tourist stamp is not the right to work. The Work e-Visa is digital, within 15 days of arrival. The employer obtains the Entry Pass before you fly. If the joining-ticket clause is missing, the state will not write it in." },
      { type: "p", text: "Police clearance and apostille are that resort requirement, not a universal 2026 fee. Do not copy a fee from a vlog. That is trust C. Check the HR letter and immigration.gov.mv." },
      { type: "h2", text: "How to use the editor on this page" },
      { type: "ol", items: [
        "Pick template language: English for HR, Russian for notes, bilingual for both blocks.",
        "Build an application pack or open one template. The file appears under My files on this device.",
        "Do not paste a passport number into the template. City and email are enough on a CV.",
        "You print or export HTML. We do not send a PDF to Xpat.",
        "The editor at /documents/editor is not indexed. Googlebot and ads stay out.",
      ] },
      { type: "p", text: "Google AdSense, if Google approves the site, pays hosting. Until Site Ready you see empty placeholders. We do not ask you to click ads." },
      { type: "p", text: "Documents here exist so you do not pay an agency for a Word file. Quota, work permit and Entry Pass still belong to the resort. Official doors: immigration.gov.mv, xpat.egov.mv, the HR letter. This page is not a licensed employment agency and not Maldives Immigration." },
    ],
  },
};

export const researchGuide = documentsGuide;
