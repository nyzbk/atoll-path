import { CHECKED_AT, type LocaleText } from "./knowledge";
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

export type VacancyKind = "employer-desk" | "board-signal" | "decoded";

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
    checkedAt: CHECKED_AT,
    trust: "A",
    kind: "employer-desk",
    foreigners: "clarify",
    fields: blankFields(),
    note: {
      ru: "Прямой ATS мальдивской группы. Каждая роль читается отдельно: иностранцы, билет и SC на групповой странице не обещаны.",
      en: "Direct ATS of a Maldivian group. Read each role: foreigners, airfare and SC are not promised at group level.",
    },
  },
  {
    id: "desk-villa",
    employer: "Villa Resorts",
    role: { ru: "Карьерная страница группы", en: "Group careers page" },
    sourceId: "villa",
    sourceUrl: "https://villaresorts.com/careers/",
    checkedAt: CHECKED_AT,
    trust: "A",
    kind: "employer-desk",
    foreigners: "clarify",
    fields: blankFields(),
    note: {
      ru: "Nautica, Park, Royal Island и др. Пишите на домен группы, не на Gmail посредника.",
      en: "Nautica, Park, Royal Island and others. Write to the group domain, not a middleman’s Gmail.",
    },
  },
  {
    id: "desk-atmosphere",
    employer: "Atmosphere Core",
    role: { ru: "Карьерная страница (VARU и др. в группе)", en: "Careers page (VARU and others in the group)" },
    sourceId: "atmosphere",
    sourceUrl: "https://careers.atmospherecore.com/jobs",
    checkedAt: CHECKED_AT,
    trust: "A",
    kind: "employer-desk",
    foreigners: "clarify",
    fields: blankFields(),
    note: {
      ru: "Официальный ATS Atmosphere Core. Не копируем названия ролей с чужих бордов — открывайте первоисточник.",
      en: "Official Atmosphere Core ATS. We do not copy role titles from third-party boards — open the primary source.",
    },
  },
  {
    id: "desk-marriott",
    employer: "Marriott International",
    role: { ru: "Глобальный поиск, фильтр Maldives", en: "Global search, filter Maldives" },
    sourceId: "marriott",
    sourceUrl: "https://careers.marriott.com/jobs",
    checkedAt: CHECKED_AT,
    trust: "A",
    kind: "employer-desk",
    foreigners: "clarify",
    fields: blankFields(),
    note: {
      ru: "JW, W, St. Regis, Le Méridien и др. HR пишет с домена Marriott. Relocation/visa — только если это в конкретной карточке.",
      en: "JW, W, St. Regis, Le Méridien and others. HR writes from a Marriott domain. Relocation/visa only if that posting says so.",
    },
  },
  {
    id: "desk-fourseasons",
    employer: "Four Seasons",
    role: { ru: "Глобальный поиск, фильтр Maldives", en: "Global search, filter Maldives" },
    sourceId: "fourseasons",
    sourceUrl: "https://careers.fourseasons.com/us/en/",
    checkedAt: CHECKED_AT,
    trust: "A",
    kind: "employer-desk",
    foreigners: "clarify",
    fields: blankFields(),
    note: {
      ru: "Официальный ATS сети. Не путать с агентскими «гарантиями Four Seasons».",
      en: "Official brand ATS. Do not confuse with agency “Four Seasons guarantees”.",
    },
  },
  {
    id: "desk-hilton",
    employer: "Hilton",
    role: { ru: "Глобальный поиск, фильтр Maldives", en: "Global search, filter Maldives" },
    sourceId: "hilton",
    sourceUrl: "https://jobs.hilton.com/",
    checkedAt: CHECKED_AT,
    trust: "A",
    kind: "employer-desk",
    foreigners: "clarify",
    fields: blankFields(),
    note: {
      ru: "Официальный ATS Hilton. Условия work permit смотрите в карточке, не в Telegram-пересказе.",
      en: "Official Hilton ATS. Read work-permit terms in the posting, not in a Telegram recap.",
    },
  },
  {
    id: "desk-accor",
    employer: "Accor",
    role: { ru: "Глобальный поиск, фильтр Maldives", en: "Global search, filter Maldives" },
    sourceId: "accor",
    sourceUrl: "https://careers.accor.com/",
    checkedAt: CHECKED_AT,
    trust: "A",
    kind: "employer-desk",
    foreigners: "clarify",
    fields: blankFields(),
    note: {
      ru: "Raffles, Pullman, Mövenpick и другие бренды Accor на Мальдивах — только через этот ATS или сайт отеля.",
      en: "Raffles, Pullman, Mövenpick and other Accor brands in Maldives — through this ATS or the hotel site.",
    },
  },
  {
    id: "board-jobmaldives",
    employer: "Job-Maldives.com (борд)",
    role: { ru: "Гостеприимство, лента резортов", en: "Hospitality, resort feed" },
    sourceId: "jobmaldives",
    sourceUrl: "https://www.job-maldives.com/",
    checkedAt: "2026-08-22",
    trust: "B",
    kind: "board-signal",
    foreigners: "clarify",
    fields: blankFields(),
    note: {
      ru: "На 22.08.2026 в ленте были материалы, связанные с VARU by Atmosphere и Sun Siyam Vilu Reef. Это сигнал борда, не скопированный оффер и не зарплата.",
      en: "As of 22 Aug 2026 the feed showed items tied to VARU by Atmosphere and Sun Siyam Vilu Reef. A board signal — not a copied offer and not a salary.",
    },
    warn: {
      ru: "Зарплату и «берут иностранцев» нельзя считать, пока вы не открыли саму карточку.",
      en: "Do not treat pay or “foreigners hired” as fact until you open the posting itself.",
    },
  },
  {
    id: "board-jobsicle",
    employer: "Jobsicle.mv (борд)",
    role: { ru: "Локальный + туристический рынок", en: "Local + tourism market" },
    sourceId: "jobsicle",
    sourceUrl: "https://www.jobsicle.mv/",
    checkedAt: CHECKED_AT,
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
      ru: "Крупнейший частный борд. Не госсайт. Work permit всё равно делает работодатель в Xpat.",
      en: "Largest private board. Not government. The employer still files the work permit in Xpat.",
    },
  },
  {
    id: "desk-mycareer",
    employer: "MyCareer / JobCenter",
    role: { ru: "Государственная карьерная служба", en: "National Careers Service" },
    sourceId: "mycareer",
    sourceUrl: "https://mycareer.gov.mv/en/jobs",
    checkedAt: CHECKED_AT,
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
      ru: "Официальный портал. Это не кнопка «государство трудоустроило экспата на резорт».",
      en: "Official portal. It is not a button that hires an expatriate onto a resort.",
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
    /(?:company|employer|resort|hotel|property)\s*[:\-]\s*([^\n]{3,80})/i,
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
  const labeled = text.match(/(?:role|position|vacancy|job title|должность)\s*[:\-]\s*([^\n]{3,80})/i);
  if (labeled?.[1]) return labeled[1].trim();
  const roles =
    /(waiter|waitress|hostess|host\b|bartender|barista|commis|steward|housekeep|room attendant|guest relation|receptionist|front office|spa therapist|recreation|butcher|chef de partie|cdp|sous chef|f&b|fnb)/i;
  const m = text.match(roles);
  return m?.[1] ? m[1] : "Role not extracted";
}

export function decodeVacancy(raw: string, sourceUrl = ""): Vacancy {
  const text = raw.replace(/\s+/g, " ").trim();
  const salary = field(
    /(\$|usd|mvr|rufiyaa)\s*[\d,.]+(?:\s*[-–to]+\s*[\d,.]+)?|basic\s*(salary)?\s*[:\-]?\s*[\d,.]+/i,
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
