import type { LocaleText } from "./knowledge";
import type { FieldMark } from "./trust";

export type Flag = {
  id: string;
  severity: "high" | "mid" | "low";
  title: { ru: string; en: string };
  detail: { ru: string; en: string };
};

export type OfferFieldKey =
  | "legalName"
  | "position"
  | "startDate"
  | "salary"
  | "hours"
  | "housing"
  | "meals"
  | "deductions"
  | "airfare"
  | "candidateFee"
  | "emailDomain"
  | "workPermit";

export type OfferField = {
  mark: FieldMark;
  risk?: boolean;
  note: LocaleText;
};

export const OFFER_FIELD_LABEL: Record<OfferFieldKey, LocaleText> = {
  legalName: { ru: "Юрлицо / бренд резорта", en: "Legal name / resort brand" },
  position: { ru: "Должность", en: "Job title" },
  startDate: { ru: "Дата начала", en: "Start date" },
  salary: { ru: "Зарплата и валюта", en: "Salary and currency" },
  hours: { ru: "Часы / график", en: "Hours / roster" },
  housing: { ru: "Жильё", en: "Housing" },
  meals: { ru: "Питание", en: "Meals" },
  deductions: { ru: "Удержания из зарплаты", en: "Salary deductions" },
  airfare: { ru: "Кто платит билет", en: "Who pays airfare" },
  candidateFee: { ru: "Плата с кандидата", en: "Fee from the candidate" },
  emailDomain: { ru: "Почта = домен работодателя", en: "Email matches employer domain" },
  workPermit: { ru: "Номер Work Permit / Approval", en: "Work Permit / Approval number" },
};

const PERSONAL_MAIL = /@(gmail|yahoo|hotmail|outlook|mail\.ru|yandex|icloud|proton)\./i;

function present(re: RegExp, text: string): boolean {
  return re.test(text);
}

export function inspectOffer(input: {
  text: string;
  sender: string;
  company: string;
  url: string;
}): { flags: Flag[]; fields: Record<OfferFieldKey, OfferField> } {
  const blob = `${input.text} ${input.sender} ${input.company} ${input.url}`;
  const t = blob.toLowerCase();
  const flags: Flag[] = [];

  if (input.sender && PERSONAL_MAIL.test(input.sender)) {
    flags.push({
      id: "personal-mail",
      severity: "high",
      title: { ru: "Личная почта, не домен отеля", en: "Personal mailbox, not a hotel domain" },
      detail: {
        ru: "HR Marriott пишет с @marriott.com, Sun Siyam — со своего домена. Gmail/mail.ru — посредник, пока не доказано иное.",
        en: "Marriott HR writes from @marriott.com, Sun Siyam from its domain. Gmail/mail.ru is a middleman until proven otherwise.",
      },
    });
  }

  if (
    /pay (now|first|in advance)|предоплат|оплат\w+ (за )?виз|visa fee|processing fee|seat (booking|reservation)|гарант\w+ трудоустр|crypto|bitcoin|usdt|кошел[её]к/i.test(
      t,
    )
  ) {
    flags.push({
      id: "pay",
      severity: "high",
      title: { ru: "Просят деньги до оффера / за визу", en: "They ask for money before an offer / for a visa" },
      detail: {
        ru: "Квоту и work permit оплачивает работодатель в Xpat. Перевод на карту/крипту — стоп.",
        en: "Quota and work permit are an employer Xpat cost. A card/crypto transfer is a stop.",
      },
    });
  }

  if (/tourist visa|прилет\w+ турист|convert (later|on arrival)|на месте оформим|visit visa then work/i.test(t)) {
    flags.push({
      id: "tourist",
      severity: "high",
      title: { ru: "Схема «прилетай туристом»", en: "“Arrive as a tourist” scheme" },
      detail: {
        ru: "Рабочий въезд завязан на Entry Pass + work permit работодателя. Туристический штамп работу не даёт.",
        en: "Worker entry is tied to an Entry Pass + employer work permit. A tourist stamp is not permission to work.",
      },
    });
  }

  if (!input.company.trim() && !/limited|resort|hotel|pty|pvt|spa\b/i.test(input.text)) {
    flags.push({
      id: "nocompany",
      severity: "mid",
      title: { ru: "Нет юрлица / бренда резорта", en: "No legal entity / resort brand" },
      detail: {
        ru: "Оффер без названия свойства — нельзя сверить сайт и Xpat.",
        en: "An offer without a property name cannot be checked against a site or Xpat.",
      },
    });
  }

  if (/whatsapp only|только ватсап|send passport original|оригинал паспорт|courier.*passport/i.test(t)) {
    flags.push({
      id: "passport",
      severity: "high",
      title: { ru: "Паспорт или только WhatsApp", en: "Passport original or WhatsApp-only" },
      detail: {
        ru: "Скан — да, оригинал курьером незнакомцу — нет. Официальная переписка дублируется на корпоративную почту.",
        en: "A scan is fine; couriering the original to a stranger is not. Official mail is duplicated to a corporate inbox.",
      },
    });
  }

  if (!/\b(usd|mvr|\$|rufiyaa|salary|basic)\b/i.test(t) && input.text.length > 80) {
    flags.push({
      id: "nopay",
      severity: "mid",
      title: { ru: "Нет цифры зарплаты / валюты", en: "No salary figure / currency" },
      detail: {
        ru: "«До $3000» без basic — реклама. В контракте должно быть число и валюта.",
        en: "“Up to $3,000” without a basic is marketing. The contract needs a number and a currency.",
      },
    });
  }

  if (/guaranteed (job|visa|placement)|100% трудоустр/i.test(t)) {
    flags.push({
      id: "guarantee",
      severity: "mid",
      title: { ru: "«Гарантия трудоустройства»", en: "“Guaranteed job” language" },
      detail: {
        ru: "Резорт не продаёт гарантии незнакомцам. Это язык агентства.",
        en: "A resort does not sell guarantees to strangers. That is agency copy.",
      },
    });
  }

  if (input.text.trim().length > 40 && !/work permit|employment approval|entry pass|xpat/i.test(t)) {
    flags.push({
      id: "nopermit",
      severity: "mid",
      title: { ru: "Нет номера Work Permit / Entry Pass", en: "No Work Permit / Entry Pass number" },
      detail: {
        ru: "До покупки билета попросите подтверждение, что работодатель подал Employment Approval в Xpat. Это не «документы агентства».",
        en: "Before buying a ticket, ask for proof the employer filed Employment Approval in Xpat. That is not “agency paperwork”.",
      },
    });
  }

  if (flags.length === 0 && input.text.trim().length > 40) {
    flags.push({
      id: "ok",
      severity: "low",
      title: { ru: "Автофлагов нет — всё равно сверьте вручную", en: "No auto-flags — still verify by hand" },
      detail: {
        ru: "Откройте сайт отеля, позвоните в HR, сверьте домен, не покупайте билет до Entry Pass.",
        en: "Open the hotel site, call HR, match the domain, do not buy a ticket before an Entry Pass.",
      },
    });
  }

  const feeAsked = flags.some((f) => f.id === "pay");
  const personal = flags.some((f) => f.id === "personal-mail");
  const hasCompany =
    Boolean(input.company.trim()) || /limited|resort|hotel|pty|pvt|spa\b/i.test(input.text);

  const fields: Record<OfferFieldKey, OfferField> = {
    legalName: {
      mark: hasCompany ? "stated" : "missing",
      note: hasCompany
        ? { ru: "Название есть — откройте сайт и сверните домен.", en: "A name is present — open the site and match the domain." }
        : { ru: "Нет юрлица. Нельзя проверить Xpat.", en: "No legal entity. Cannot check Xpat." },
    },
    position: {
      mark: present(/position|job title|должн|waiter|hostess|commis|housekeep|therapist|receptionist/i, t)
        ? "stated"
        : "missing",
      note: {
        ru: "Должность в оффере должна совпасть с квотой в Xpat.",
        en: "The offer title must match the Xpat quota title.",
      },
    },
    startDate: {
      mark: present(/start date|joining date|report(ing)? date|дата выход/i, t) ? "stated" : "missing",
      note: {
        ru: "Без даты нельзя планировать билет. Билет — после Entry Pass, не «на всякий случай».",
        en: "Without a date you cannot plan a ticket. Ticket after Entry Pass, not “just in case”.",
      },
    },
    salary: {
      mark: present(/\b(usd|mvr|\$|rufiyaa|basic)\b/i, t) ? "stated" : "missing",
      note: {
        ru: "Нужны число, валюта и что не входит в basic (SC отдельно).",
        en: "Need a number, a currency, and what is not inside basic (SC separate).",
      },
    },
    hours: {
      mark: present(/hours|roster|off day|6\s*day|график|смен/i, t) ? "stated" : "clarify",
      note: {
        ru: "Островной график часто 6/1. Если не написано — спросите до подписи.",
        en: "Island rosters are often 6/1. If it is missing, ask before you sign.",
      },
    },
    housing: {
      mark: present(/accommodation|staff housing|staff room|проживан/i, t) ? "stated" : "missing",
      note: {
        ru: "Не закон «всем бесплатно». Только пункт контракта.",
        en: "Not a law that everyone gets free housing. Only a contract clause.",
      },
    },
    meals: {
      mark: present(/\bmeals?\b|duty meal|питан|столов/i, t) ? "stated" : "missing",
      note: {
        ru: "Staff meals обычно есть на резорте. Если вычет — это должно быть цифрой.",
        en: "Staff meals are common on resort. If deducted, it must be a number.",
      },
    },
    deductions: {
      mark: present(/deduct|withhold|вычет|удержан|rent from salary|visa cost recover/i, t)
        ? "stated"
        : "clarify",
      risk: present(/deduct|withhold|вычет|удержан|visa cost recover/i, t),
      note: {
        ru: "Любой вычет за визу/жильё — красный вопрос к HR, не «норма агентства».",
        en: "Any visa/housing deduction is a red question for HR, not “agency normal”.",
      },
    },
    airfare: {
      mark: present(/airfare|joining ticket|air ticket|авиабилет|перелёт|перелет/i, t) ? "stated" : "missing",
      note: {
        ru: "Кто покупает joining и return, какой маршрут, что если сорвёте probation.",
        en: "Who buys joining and return, which routing, what if you fail probation.",
      },
    },
    candidateFee: {
      mark: feeAsked ? "stated" : "missing",
      risk: feeAsked,
      note: feeAsked
        ? { ru: "С кандидата просят деньги — стоп.", en: "They ask the candidate for money — stop." }
        : { ru: "Платы с вас в тексте нет. Так и должно быть.", en: "No fee asked of you in the text. That is how it should be." },
    },
    emailDomain: {
      mark: !input.sender ? "missing" : personal ? "missing" : "stated",
      risk: personal,
      note: personal
        ? { ru: "Личный ящик. Сверьте с доменом отеля.", en: "Personal inbox. Match it to the hotel domain." }
        : input.sender
          ? { ru: "Домен указан — всё равно откройте сайт работодателя.", en: "A domain is present — still open the employer site." }
          : { ru: "Нет адреса отправителя.", en: "No sender address." },
    },
    workPermit: {
      mark: present(/work permit|employment approval|entry pass|xpat/i, t) ? "stated" : "missing",
      note: {
        ru: "Номер можно будет сверить в Xpat, когда работодатель его получит. До Entry Pass билет не покупайте.",
        en: "The number can be checked in Xpat once the employer has it. Do not buy a ticket before the Entry Pass.",
      },
    },
  };

  return { flags, fields };
}

export function analyseOffer(input: {
  text: string;
  sender: string;
  company: string;
  url: string;
}): Flag[] {
  return inspectOffer(input).flags;
}
