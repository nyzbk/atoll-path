import type { LocaleText } from "./knowledge";
import type { FieldMark, TrustLevel } from "./trust";

export type VacancyFieldKey =
  | "salary"
  | "serviceCharge"
  | "housing"
  | "meals"
  | "ticket"
  | "insurance"
  | "schedule"
  | "foreigners";

export type VacancyKind = "employer-desk" | "board-signal" | "verified-snapshot" | "decoded";

export type VacancyField = {
  mark: FieldMark;
  value?: LocaleText;
};

export type Vacancy = {
  id: string;
  employer: string;
  role: LocaleText;
  sourceId: string;
  sourceUrl: string;
  reference?: string;
  publishedAt?: string;
  checkedAt: string;
  trust: TrustLevel;
  kind: VacancyKind;
  foreigners: FieldMark;
  fields: Record<VacancyFieldKey, VacancyField>;
  note: LocaleText;
  warn?: LocaleText;
};

export const FIELD_LABEL: Record<VacancyFieldKey, LocaleText> = {
  salary: { ru: "Зарплата", en: "Salary" },
  serviceCharge: { ru: "Service charge", en: "Service charge" },
  housing: { ru: "Жильё", en: "Housing" },
  meals: { ru: "Питание", en: "Meals" },
  ticket: { ru: "Билет", en: "Airfare" },
  insurance: { ru: "Страховка", en: "Insurance" },
  schedule: { ru: "График", en: "Roster" },
  foreigners: { ru: "Иностранцы", en: "Foreigners" },
};

function blankFields(overrides?: Partial<Record<VacancyFieldKey, VacancyField>>): Record<VacancyFieldKey, VacancyField> {
  const base: Record<VacancyFieldKey, VacancyField> = {
    salary: { mark: "missing" },
    serviceCharge: { mark: "missing" },
    housing: { mark: "missing" },
    meals: { mark: "missing" },
    ticket: { mark: "missing" },
    insurance: { mark: "missing" },
    schedule: { mark: "missing" },
    foreigners: { mark: "clarify" },
  };
  return { ...base, ...overrides };
}

export const vacancySnapshots: Vacancy[] = [
  {
    id: "desk-sunsiyam",
    employer: "Sun Siyam Resorts",
    role: { ru: "Карьерная страница группы — не конкретная вакансия", en: "Group careers page — not a single posting" },
    sourceId: "sunsiyam",
    sourceUrl: "https://www.sunsiyam.com/about-sun-siyam/careers/",
    checkedAt: "2026-11-22",
    trust: "A",
    kind: "employer-desk",
    foreigners: "clarify",
    fields: blankFields(),
    note: {
      ru: "Общая страница направляет узнавать о текущих возможностях по careers@sunsiyam.com; сама не содержит конкретных объявлений. Открытые вакансии на дату проверки не подтверждены.",
      en: "The general page directs enquiries about current opportunities to careers@sunsiyam.com; it contains no individual postings. No open vacancy was confirmed on the check date.",
    },
  },
  {
    id: "desk-villa",
    employer: "Villa Resorts",
    role: { ru: "Карьерная страница группы", en: "Group careers page" },
    sourceId: "villa",
    sourceUrl: "https://villaresorts.com/careers/",
    checkedAt: "2026-11-22",
    trust: "A",
    kind: "employer-desk",
    foreigners: "clarify",
    fields: blankFields(),
    note: {
      ru: "Страница показывает раздел AVAILABLE JOBS, но список загружается динамически. У доступных карточек SmartRecruiters не удалось подтвердить открытый статус; проверяйте каждую роль в первоисточнике.",
      en: "The page shows an AVAILABLE JOBS section, but the list loads dynamically. Open status could not be confirmed on accessible SmartRecruiters cards; verify each role at its source.",
    },
  },
  {
    id: "desk-atmosphere",
    employer: "Atmosphere Core",
    role: { ru: "Карьерная страница (VARU и др. в группе)", en: "Careers page (VARU and others in the group)" },
    sourceId: "atmosphere",
    sourceUrl: "https://careers.atmospherecore.com/jobs",
    checkedAt: "2026-11-22",
    trust: "A",
    kind: "employer-desk",
    foreigners: "clarify",
    fields: blankFields(),
    note: {
      ru: "Официальный список при проверке показывал только загрузку; отдельная проверенная страница ответила Job not found. Активная вакансия на Мальдивах не подтверждена.",
      en: "The official listing showed only a loading state when checked; a tested individual page returned Job not found. No active Maldives vacancy was confirmed.",
    },
  },
  {
    id: "desk-marriott",
    employer: "Marriott International",
    role: { ru: "Глобальный поиск, фильтр Maldives", en: "Global search, filter Maldives" },
    sourceId: "marriott",
    sourceUrl: "https://careers.marriott.com/jobs",
    checkedAt: "2026-11-22",
    trust: "A",
    kind: "employer-desk",
    foreigners: "clarify",
    fields: blankFields(),
    note: {
      ru: "По доступным официальным страницам не удалось подтвердить открытое мальдивское объявление. Relocation, visa и другие условия — только если они указаны в конкретной карточке.",
      en: "The accessible official pages did not confirm an open Maldives posting. Relocation, visa, and other terms apply only when stated in an individual listing.",
    },
  },
  {
    id: "desk-fourseasons",
    employer: "Four Seasons",
    role: { ru: "Глобальный поиск, фильтр Maldives", en: "Global search, filter Maldives" },
    sourceId: "fourseasons",
    sourceUrl: "https://careers.fourseasons.com/us/en/",
    checkedAt: "2026-11-22",
    trust: "A",
    kind: "employer-desk",
    foreigners: "clarify",
    fields: blankFields(),
    note: {
      ru: "Официальный поиск по Maldives сообщил об отсутствии активных вакансий при проверке; страницы отдельных ролей не подтвердили, что отклик ещё открыт.",
      en: "The official Maldives search reported no active openings when checked; individual role pages did not confirm that applications were still open.",
    },
  },
  {
    id: "desk-hilton",
    employer: "Hilton",
    role: { ru: "Глобальный поиск, фильтр Maldives", en: "Global search, filter Maldives" },
    sourceId: "hilton",
    sourceUrl: "https://jobs.hilton.com/",
    checkedAt: "2026-11-22",
    trust: "A",
    kind: "employer-desk",
    foreigners: "clarify",
    fields: blankFields(),
    note: {
      ru: "Официальная выдача по Maldives загружается динамически; одна проверенная карточка была недоступна для чтения, другая прямо сообщала, что вакансия больше недоступна. Открытые позиции не подтверждены.",
      en: "The official Maldives results load dynamically; one checked listing was unreadable and another said the job was no longer available. No open role was confirmed.",
    },
  },
  {
    id: "desk-accor",
    employer: "Accor",
    role: { ru: "Глобальный поиск, фильтр Maldives", en: "Global search, filter Maldives" },
    sourceId: "accor",
    sourceUrl: "https://careers.accor.com/global/en/jobs?q=&options=&page=1&ln=Maldives&lr=1&li=MV&size=24",
    checkedAt: "2026-11-22",
    trust: "A",
    kind: "employer-desk",
    foreigners: "clarify",
    fields: blankFields(),
    note: {
      ru: "Официальная выдача Accor с фильтром Maldives. Ниже — датированные снимки трёх конкретных карточек, найденных в выдаче; срок истечения отображается некорректно, поэтому перепроверьте доступность перед откликом.",
      en: "Official Accor results filtered for Maldives. Below are dated snapshots of three individual listings found there; the expiry date is malformed, so recheck availability before applying.",
    },
  },
  {
    id: "accor-pool-technician-mercure-kooddoo",
    employer: "Mercure Maldives Kooddoo Resort",
    role: { ru: "Техник по обслуживанию бассейна", en: "Pool Technician" },
    sourceId: "accor",
    sourceUrl:
      "https://careers.accor.com/global/en/job/pool-technician-in-mercure-maldives-kooddoo-resort-mercure-maldives-k-jid-114938",
    reference: "REF123752X",
    checkedAt: "2026-11-22",
    trust: "A",
    kind: "verified-snapshot",
    foreigners: "clarify",
    fields: blankFields({
      schedule: {
        mark: "stated",
        value: {
          ru: "Полная занятость; гибкий график и готовность работать дольше при необходимости",
          en: "Full-time; flexible schedule and willingness to work extra hours when needed",
        },
      },
      foreigners: {
        mark: "clarify",
        value: {
          ru: "Допуск иностранцев не указан; уточните у HR",
          en: "Foreign-candidate eligibility not stated; ask HR",
        },
      },
    }),
    note: {
      ru: "Снимок официальной карточки Accor, найденной в выдаче по Мальдивам 22.11.2026. Указаны Full-Time и Permanent; требуется гибкость в расписании и готовность работать дольше при необходимости. Указанные льготы Accor: скидочная карта в отелях Accor, обучение через Academy Accor, возможности карьерного роста и участие в CSR-активностях. Дата истечения отображается как 01/01/0001 — проверьте, доступен ли отклик, перед подачей.",
      en: "Snapshot of an official Accor listing found in Maldives results on 22 Nov 2026. It states Full-Time and Permanent and requires schedule flexibility and willingness to work extra hours when needed. Listed Accor benefits include a discount card at Accor hotels, training through Academy Accor, career opportunities, and CSR activities. The expiry date displays as 01/01/0001 — verify applications are still open before applying.",
    },
    warn: {
      ru: "Технически некорректная дата истечения: 01/01/0001. Это датированный снимок, не живая лента.",
      en: "Malformed expiry date: 01/01/0001. This is a dated snapshot, not a live feed.",
    },
  },
  {
    id: "accor-welfare-coordinator-mercure-kooddoo",
    employer: "Mercure Maldives Kooddoo Resort",
    role: { ru: "Координатор благополучия сотрудников", en: "Welfare Coordinator" },
    sourceId: "accor",
    sourceUrl:
      "https://careers.accor.com/global/en/job/welfare-coordinator-in-mercure-maldives-kooddoo-resort-mercure-maldives-k-jid-116869",
    reference: "REF125588Q",
    checkedAt: "2026-11-22",
    trust: "A",
    kind: "verified-snapshot",
    foreigners: "clarify",
    fields: blankFields({
      schedule: {
        mark: "stated",
        value: { ru: "Полная занятость; часы не указаны", en: "Full-time; hours not stated" },
      },
      foreigners: {
        mark: "clarify",
        value: {
          ru: "Допуск иностранцев не указан; уточните у HR",
          en: "Foreign-candidate eligibility not stated; ask HR",
        },
      },
    }),
    note: {
      ru: "Снимок официальной карточки Accor, найденной в выдаче по Мальдивам 22.11.2026. Указаны Full-Time и Permanent; опыт работы на Мальдивах — предпочтительный. Указанные льготы Accor: скидочная карта в отелях Accor, обучение через Academy Accor, возможности карьерного роста и участие в CSR-активностях. Дата истечения отображается как 01/01/0001 — проверьте, доступен ли отклик, перед подачей.",
      en: "Snapshot of an official Accor listing found in Maldives results on 22 Nov 2026. It states Full-Time and Permanent; Maldives experience is preferred. Listed Accor benefits include a discount card at Accor hotels, training through Academy Accor, career opportunities, and CSR activities. The expiry date displays as 01/01/0001 — verify applications are still open before applying.",
    },
    warn: {
      ru: "Технически некорректная дата истечения: 01/01/0001. Это датированный снимок, не живая лента.",
      en: "Malformed expiry date: 01/01/0001. This is a dated snapshot, not a live feed.",
    },
  },
  {
    id: "accor-telephone-operator-pullman-maamutaa",
    employer: "Pullman Maldives All-Inclusive Resort",
    role: { ru: "Оператор телефонной станции", en: "Telephone Operator" },
    sourceId: "accor",
    sourceUrl:
      "https://careers.accor.com/global/en/job/telephone-operator-in-pullman-maldives-all-inclusive-resort-pullman-maam-jid-116245",
    reference: "REF125001M",
    checkedAt: "2026-11-22",
    trust: "A",
    kind: "verified-snapshot",
    foreigners: "clarify",
    fields: blankFields({
      schedule: {
        mark: "stated",
        value: { ru: "Полная занятость; часы не указаны", en: "Full-time; hours not stated" },
      },
      foreigners: {
        mark: "clarify",
        value: {
          ru: "Допуск иностранцев не указан; уточните у HR",
          en: "Foreign-candidate eligibility not stated; ask HR",
        },
      },
    }),
    note: {
      ru: "Снимок официальной карточки Accor, найденной в выдаче по Мальдивам 22.11.2026. Место: остров Маамутаа, атолл Гаафу-Алифу; указаны Full-Time и Permanent. Дополнительные языки названы преимуществом. Указанные льготы Accor: скидочная карта в отелях Accor, обучение через Academy Accor, возможности карьерного роста и участие в CSR-активностях. Дата истечения отображается как 01/01/0001 — проверьте, доступен ли отклик, перед подачей.",
      en: "Snapshot of an official Accor listing found in Maldives results on 22 Nov 2026. Location: Maamutaa Island, Gaafu Alifu Atoll; it states Full-Time and Permanent. Additional languages are an advantage. Listed Accor benefits include a discount card at Accor hotels, training through Academy Accor, career opportunities, and CSR activities. The expiry date displays as 01/01/0001 — verify applications are still open before applying.",
    },
    warn: {
      ru: "Технически некорректная дата истечения: 01/01/0001. Это датированный снимок, не живая лента.",
      en: "Malformed expiry date: 01/01/0001. This is a dated snapshot, not a live feed.",
    },
  },
  {
    id: "board-jobmaldives",
    employer: "Job-Maldives.com (борд)",
    role: { ru: "Гостеприимство, лента резортов", en: "Hospitality, resort feed" },
    sourceId: "jobmaldives",
    sourceUrl: "https://www.job-maldives.com/",
    checkedAt: "2026-11-22",
    trust: "B",
    kind: "board-signal",
    foreigners: "clarify",
    fields: blankFields(),
    note: {
      ru: "На 22.11.2026 лента показывала датированные записи, включая Recreation Attendant — RAAYA by Atmosphere. В доступном тексте не удалось подтвердить, что конкретный набор ещё открыт; это сигнал борда, не проверенный оффер.",
      en: "On 22 Nov 2026 the feed showed dated posts, including Recreation Attendant — RAAYA by Atmosphere. The accessible text did not confirm that a specific application was still open; this is a board signal, not a verified offer.",
    },
    warn: {
      ru: "Перед откликом откройте карточку и проверьте, что набор не закрыт; зарплата и допуск иностранцев — только если прямо указаны в объявлении.",
      en: "Before applying, open the listing and check that applications are still open; pay and foreign-candidate eligibility count only when stated in the posting.",
    },
  },
  {
    id: "board-jobsicle",
    employer: "Jobsicle.mv (борд)",
    role: { ru: "Локальный + туристический рынок", en: "Local + tourism market" },
    sourceId: "jobsicle",
    sourceUrl: "https://www.jobsicle.mv/",
    checkedAt: "2026-11-22",
    trust: "B",
    kind: "board-signal",
    foreigners: "clarify",
    fields: blankFields({
      foreigners: {
        mark: "clarify",
        value: {
          ru: "Часть карточек — Maldivians only. Фильтр гражданства обязателен.",
          en: "Some cards are Maldivians-only. The nationality filter is mandatory.",
        },
      },
    }),
    note: {
      ru: "Частный борд, не госсайт. Главная показывала 157 открытых объявлений, но проверенные карточки содержали прошедшие сроки подачи; проверяйте дату и ограничение Maldivians only в каждой записи.",
      en: "A private board, not government. Its homepage showed 157 open listings, but the checked detail pages had past deadlines; verify each listing’s date and any Maldivians-only restriction.",
    },
  },
  {
    id: "desk-mycareer",
    employer: "MyCareer / JobCenter",
    role: { ru: "Государственная карьерная служба", en: "National Careers Service" },
    sourceId: "mycareer",
    sourceUrl: "https://mycareer.gov.mv/en/jobs",
    checkedAt: "2026-11-22",
    trust: "A",
    kind: "employer-desk",
    foreigners: "clarify",
    fields: blankFields({
      foreigners: {
        mark: "clarify",
        value: {
          ru: "В первую очередь рынок мальдивцев. «Открыто иностранцам» — только если это явно в объявлении.",
          en: "Primarily the Maldivian market. “Open to foreigners” only if the posting says so.",
        },
      },
    }),
    note: {
      ru: "Официальный портал со списком, который загружается динамически. Проверенные карточки сообщали, что подать заявку больше нельзя; открытая вакансия на дату проверки не подтверждена.",
      en: "Official portal with a dynamically loaded list. The checked detail pages said applications were no longer available; no open vacancy was confirmed on the check date.",
    },
  },
];

const PERSONAL_MAIL = /@(gmail|yahoo|hotmail|outlook|mail\.ru|yandex|icloud|proton)\./i;

function hit(re: RegExp, text: string): boolean {
  return re.test(text);
}

function snippet(re: RegExp, text: string): string | undefined {
  const m = text.match(re);
  if (!m) return undefined;
  const start = Math.max(0, (m.index ?? 0) - 24);
  return text.slice(start, start + 120).replace(/\s+/g, " ").trim();
}

function both(value: string): LocaleText {
  return { ru: value, en: value };
}

function field(re: RegExp, text: string): VacancyField {
  if (!hit(re, text)) return { mark: "missing" };
  const value = snippet(re, text);
  return value ? { mark: "stated", value: both(value) } : { mark: "stated" };
}

function extractEmployer(text: string): string {
  const company = text.match(
    /(?:company|employer|resort|hotel|property)\s*[:-]\s*([^\n]{3,80})/i,
  );
  if (company?.[1]) return company[1].trim();
  const named = text.match(
    /\b([A-Z][A-Za-z0-9&.’' -]{2,60}\s(?:Resort|Resorts|Hotel|Hotels|Spa|Maldives|Pvt|Limited|Ltd|Inn))\b/,
  );
  if (named?.[1]) return named[1].trim();
  const first = text.split("\n").map((l) => l.trim()).find((l) => l.length > 3 && l.length < 80);
  return first || "Unknown employer";
}

function extractRole(text: string): string {
  const labeled = text.match(/(?:role|position|vacancy|job title|должность)\s*[:-]\s*([^\n]{3,80})/i);
  if (labeled?.[1]) return labeled[1].trim();
  const roles =
    /(waiter|waitress|hostess|host\b|bartender|barista|commis|steward|housekeep|room attendant|guest relation|receptionist|front office|spa therapist|recreation|butcher|chef de partie|cdp|sous chef|f&b|fnb)/i;
  const m = text.match(roles);
  return m?.[1] ? m[1] : "Role not extracted";
}

export function decodeVacancy(raw: string, sourceUrl = ""): Vacancy {
  const text = raw.replace(/\s+/g, " ").trim();
  const salary = field(
    /(\$|usd|mvr|rufiyaa)\s*[\d,.]+(?:\s*[-–to]+\s*[\d,.]+)?|basic\s*(salary)?\s*[:-]?\s*[\d,.]+/i,
    text,
  );
  const serviceCharge = field(/service[\s-]?charge|\bsc\b|сервисн\w*\s+сбор/i, text);
  const housing = field(/accommodation|staff housing|staff room|housing provided|проживан|общежит/i, text);
  const meals = field(/\bmeals?\b|duty meal|staff cafeteria|питан|завтрак.*ужин/i, text);
  const ticket = field(/airfare|joining ticket|air ticket|flight ticket|авиабилет|перелёт|перелет/i, text);
  const insurance = field(/medical insurance|health insurance|страховк/i, text);
  const schedule = field(/roster|off days?|working hours|6\s*days|график|смен/i, text);

  let foreigners: VacancyField = { mark: "missing" };
  if (/maldivians?\s+only|locals?\s+only|только для граждан/i.test(text)) {
    foreigners = {
      mark: "stated",
      value: both("Maldivians only / locals only"),
    };
  } else if (/expat|expatriate|foreigner|work permit|sponsorship|иностран/i.test(text)) {
    foreigners = field(/expat|expatriate|foreigner|work permit|sponsorship|иностран/i, text);
  } else {
    foreigners = { mark: "clarify" };
  }

  const asksMoney = /pay (now|first|in advance)|processing fee|visa fee|гарант\w+ трудоустр|предоплат|usdt|bitcoin/i.test(
    text,
  );
  const personalMail = PERSONAL_MAIL.test(text) || PERSONAL_MAIL.test(sourceUrl);

  let trust: TrustLevel = "C";
  if (asksMoney || personalMail) trust = "D";
  else if (/\.mv\b|careers\.|jobs\.hilton|marriott\.com|accor\.com|fourseasons/i.test(sourceUrl))
    trust = "B";

  const warn: LocaleText | undefined = asksMoney
    ? {
        ru: "В тексте просят деньги. Это не вакансия резорта, пока не доказано иное.",
        en: "The text asks for money. This is not a resort vacancy until proven otherwise.",
      }
    : personalMail
      ? {
          ru: "Личная почта в объявлении. Сверьте домен работодателя.",
          en: "A personal mailbox is in the ad. Match it to the employer domain.",
        }
      : undefined;

  return {
    id: `decoded-${Date.now()}`,
    employer: extractEmployer(raw),
    role: both(extractRole(raw)),
    sourceId: "decoded",
    sourceUrl: sourceUrl || "",
    checkedAt: new Date().toISOString().slice(0, 10),
    trust,
    kind: "decoded",
    foreigners: foreigners.mark,
    fields: {
      salary,
      serviceCharge,
      housing,
      meals,
      ticket,
      insurance,
      schedule,
      foreigners,
    },
    note: {
      ru: "Разбор вставленного текста. Это не юридическое заключение и не подтверждение, что вакансия открыта.",
      en: "A parse of pasted text. Not a legal opinion and not proof the vacancy is open.",
    },
    warn,
  };
}
