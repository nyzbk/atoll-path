import type { GuideCopy } from "./gate-c-guides";

export const aboutExtra: Record<"ru" | "en", string[]> = {
  ru: [
    "Почему этот гид двуязычный. Русскоязычный линейный персонал часто читает влоги на русском и пишет HR по-английски. Мы держим оба языка на одних URL, без отдельного ru-поддомена и без копипаста соседних Free Apps про HEIC или PDF. Задача страницы — прямой найм на резорт, не конвертер файлов.",
    "Почему мы не обещаем оффер. Квота, Xpat и Entry Pass — действия работодателя. Даже идеальное CV не создаёт слот, которого нет. Честный гид, который это говорит вслух, полезнее «гарантии вылета за пять дней». Если Google AdSense одобрит сайт, реклама оплатит хостинг; до Ready слоты пустые. Мы не сеть doorway-доменов: соседние инструменты того же издателя упоминаются один раз, без сетки «все конвертеры».",
    "Что Atoll Path делает руками. Карта из четырнадцати шагов на /path, граф официальных дверей на /sources, редактор CV и писем на этом устройстве, проверка оффера на /contract, список схем на /scams, исследование только по allowlist на /research. Что не делает: не подаёт work permit, не бронирует билет, не ставит квоту, не хранит паспорт в облаке.",
  ],
  en: [
    "Why the guide is bilingual. Russian-speaking line staff often watch vlogs in Russian and write HR in English. Both languages live on the same URLs. There is no extra ru-subdomain and no pasted HEIC or PDF FAQ from a sibling Free App. The job of this site is direct-hire resort work, not a file converter.",
    "Why we do not promise an offer. Quota, Xpat and the Entry Pass are the employer’s moves. A perfect CV does not create a slot that does not exist. A guide that says this out loud is more useful than a five-day flight guarantee. If Google AdSense approves the site, ads pay hosting; until Ready the slots stay empty. We are not a doorway network: sibling tools of the same publisher get one mention, not a grid of converters.",
    "What Atoll Path does by hand. A fourteen-step map on /path, a graph of official doors on /sources, a CV editor on this device, an offer check on /contract, a pattern list on /scams, allowlisted research on /research. What it does not do: file a work permit, book a ticket, create quota, or store a passport in the cloud.",
  ],
};

export const contactGuide: Record<"ru" | "en", GuideCopy> = {
  ru: {
    title: "Куда писать и чего не прикладывать",
    nodes: [
      { type: "p", text: "Почта оператора Atoll Path: ultaultimatum@gmail.com. Это ящик гида самопомощи. Это не линия Maldives Immigration, не MIRA, не LRA, не HR резорта и не «агент, который подаст Xpat». Письмо на этот адрес не запускает work permit и не бронирует joining ticket." },
      { type: "p", text: "Пишите, если сломана ссылка на /sources, шаг на /path расходится с immigration.gov.mv, редактор на /documents теряет файл, шкала A–D на карточке выглядит неверной, или в тексте опечатка. Приложите URL страницы Atoll Path и, если есть, URL официального источника. Этого достаточно, чтобы починить гид." },
      { type: "h2", text: "Чего в письме быть не должно" },
      { type: "ul", items: [
        "Разворот паспорта, серия, ID, банковский счёт, полный контракт с персональными данными.",
        "IM30 «на проверку» — бланк загружает работодатель в Xpat, не оператор гида.",
        "Просьба «разошлите резюме по резортам» — мы не агентство и не рассылка.",
        "Чек предоплаты агенту «чтобы вернули через нас» — мы не банк и не полиция.",
        "Вопрос «есть ли у конкретного бренда слот на commis в октябре» — это почта HR резорта, не этот ящик.",
      ] },
      { type: "h2", text: "Куда идти вместо этого ящика" },
      { type: "p", text: "Въезд, Work e-Visa, Entry Pass: immigration.gov.mv. Кабинет work permit: xpat.egov.mv — его открывает работодатель. Налог: mira.gov.mv. Труд и service charge: lra.gov.mv. Лицензия посредника: one.gov.mv. Вакансия: карьера бренда, Jobsicle, Job-Maldives — список на /boards." },
      { type: "p", text: "Если уже есть письмо с домена отеля — разберите его на /contract. Если просят деньги до бланка — сначала /scams. Если нужно собрать CV без оплаты агентству — /documents. Исследование по официальным страницам — /research. Карта шагов — /path." },
      { type: "h2", text: "Как мы отвечаем" },
      { type: "p", text: "Это один оператор, не колл-центр иммиграции. Ответ может занять день или несколько. Мы не работаем как срочная линия «вылет завтра». Языки ящика — русский и английский. Рекламы на этой странице нет: контакт не должен выглядеть как дожим баннера." },
      { type: "p", text: "Atoll Path не лицензированное employment agency и не Maldives Immigration. Почта ultaultimatum@gmail.com чинит гид. Квоту, permit и Entry Pass по-прежнему делает резорт." },
      { type: "h2", text: "Почему контакт вынесен на отдельный URL" },
      { type: "p", text: "Ревьюер и человек должны видеть издателя без формы «оставьте паспорт». Help по идентификации сайта требует понятного who-we-are и способа связаться. Поэтому /about говорит, зачем гид существует, а /contact говорит, куда писать и куда не писать. Две страницы, две задачи, без копипаста одной портянки на оба адреса." },
      { type: "p", text: "Мы не принимаем CV «в работу». Файл, который вы собрали на /documents, остаётся на вашем устройстве. Если редактор сломался — опишите браузер и шаг, не прикладывайте готовый PDF с серией паспорта. Если официальная страница государства изменилась — пришлите её URL, мы сверим карточку на /sources и дату проверки." },
      { type: "p", text: "Соседний инструмент того же издателя, HEIC Local, сюда не относится. Не пишите в этот ящик про конвертацию фото. Тема Atoll Path — прямой найм на мальдивский резорт через официальные двери. Всё, что вне этой темы, лучше не слать." },
    ],
  },
  en: {
    title: "Where to write, and what not to attach",
    nodes: [
      { type: "p", text: "Operator mail: ultaultimatum@gmail.com. This is the self-help guide inbox. It is not Maldives Immigration, not MIRA, not LRA, not resort HR, and not the agent who will file Xpat. Mail to this address does not start a work permit and does not book a joining ticket." },
      { type: "p", text: "Write if a /sources link is dead, a /path step disagrees with immigration.gov.mv, the /documents editor drops a file, a trust mark looks wrong, or there is a typo. Send the Atoll Path URL and, if you have it, the official source URL. That is enough to fix the guide." },
      { type: "h2", text: "What the letter must not contain" },
      { type: "ul", items: [
        "A passport spread, ID number, bank account, or a full contract with personal data.",
        "An IM30 for review — the employer uploads that blank in Xpat.",
        "Please blast my CV to resorts — we are not an agency and not a mailer.",
        "A receipt of a prepayment so you can get it back — we are not a bank and not the police.",
        "Does this brand have a commis slot in October — that is resort HR mail, not this inbox.",
      ] },
      { type: "h2", text: "Where to go instead of this inbox" },
      { type: "p", text: "Entry, Work e-Visa, Entry Pass: immigration.gov.mv. Work-permit cabinet: xpat.egov.mv — the employer opens it. Tax: mira.gov.mv. Labour and service charge: lra.gov.mv. Intermediary licence: one.gov.mv. Vacancies: brand careers, Jobsicle, Job-Maldives — listed on /boards." },
      { type: "p", text: "If you already have hotel-domain mail, parse it on /contract. If someone asked for money before letterhead, read /scams first. If you need a CV without paying an agency, use /documents. Official-page research lives on /research. The step map is /path." },
      { type: "h2", text: "How we reply" },
      { type: "p", text: "This is one operator, not an immigration call centre. A reply may take a day or several. We are not an emergency flight-tomorrow line. Inbox languages are Russian and English. This page has no ads: contact should not look like a banner squeeze." },
      { type: "p", text: "Atoll Path is not a licensed employment agency and not Maldives Immigration. ultaultimatum@gmail.com fixes the guide. Quota, permit and Entry Pass still belong to the resort." },
      { type: "h2", text: "Why contact is its own URL" },
      { type: "p", text: "A reviewer and a human should see the publisher without a leave-your-passport form. Site identity needs a clear who-we-are and a way to write. /about says why the guide exists. /contact says where to write and where not to write. Two pages, two jobs." },
      { type: "p", text: "We do not take a CV into work. The file you built on /documents stays on your device. If the editor breaks, describe the browser and the step; do not attach a PDF with a passport number. If a government page changed, send that URL so we can check the /sources card." },
      { type: "p", text: "A sibling tool from the same publisher, HEIC Local, does not belong here. Do not write to this inbox about photo conversion. Atoll Path topic is direct-hire Maldives resort work through official doors." },
    ],
  },
};

export const faqExtras: { q: { ru: string; en: string }; a: { ru: string; en: string }; sources: string[] }[] = [];
