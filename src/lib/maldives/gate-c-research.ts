import type { GuideCopy } from "./gate-c-guides";

export const researchGuide: Record<"ru" | "en", GuideCopy> = {
  ru: {
    title: "Как исследовать официальные источники, а не скрин из Telegram",
    nodes: [
      { type: "p", text: "Страница исследования Atoll Path — не «весь интернет» и не чат-бот, который выдумывает пошлины. Сначала поиск по проверенному графу источников со шкалой A–D. Затем живой fetch только с allowlist. Модель отвечает только по этому пакету. Если в пакете нет цифры — ответ «неизвестно», а не «обычно $400»." },
      { type: "p", text: "Мы не зеркалим immigration.gov.mv целиком. Мы объясняем, как читать официальную страницу, куда не ходить, и что считать уровнем C: влог, Reddit, агент в WhatsApp. Цифра без даты проверки и без ссылки уровня A — не цифра." },
      { type: "h2", text: "Шкала A–D" },
      { type: "ul", items: [
        "A — портал государства: immigration.gov.mv, xpat.egov.mv, gazette, MIRA, LRA, MyCareer как госборд.",
        "B — карьера бренда на корпоративном домене, письмо HR с того же домена, Jobsicle как объявление, не как закон.",
        "C — Reddit, влоги, staff house, средний service charge у друзей. Ориентир, не оферта.",
        "D — PDF в Telegram, виза без оффера, предоплата незнакомцу. Для билета D не существует.",
      ] },
      { type: "p", text: "Xpat eGov — кабинет работодателя. Соискатель туда не регистрируется вместо визы. Если сайт просит логин Xpat и оплату квоты — это не тот портал или это скам. MyCareer часто показывает роли для граждан; Maldivians only — другой рынок." },
      { type: "h2", text: "Allowlist fetch" },
      { type: "p", text: "Fetch ходит только на разрешённые хосты gov.mv и борды из графа. Мы не тянем произвольный URL и не копируем чужой ATS. Atoll Path добавляет шкалу доверия и «чего не делать»." },
      { type: "p", text: "Сценарий: читаете /path, спрашиваете, можно ли прилететь туристом. Открываете эту страницу, ищете в графе, затем fetch immigration.gov.mv если он в allowlist. Если страница недоступна — граф и честное «неизвестно». Не закрывайте дыру цифрой из Reels." },
      { type: "h2", text: "Ловушки, которые сжигают недели" },
      { type: "p", text: "Запрос maldives work visa fee 2026. Первые сайты часто агрегаторы с устаревшей цифрой. Пошлина без даты и без ссылки A не годится для билета." },
      { type: "p", text: "Один влог как закон про service charge. LRA регулирует SC, формула пула — практика резорта. Спросите средний SC за три месяца письменно. Вилки на /roles — ориентир." },
      { type: "p", text: "Нейросеть сказала, что налога нет. MIRA EWT 0% до MVR 60 000 в месяц — порог, не офшор. Если пакета нет — ответ «неизвестно», mira.gov.mv." },
      { type: "p", text: "Скрин Xpat из кабинета агента. Не входите в Xpat под чужим логином. Требование «пришлите логин, мы продвинем» — скам." },
      { type: "h2", text: "Когда можно остановить поиск" },
      { type: "p", text: "Писать в резорт сегодня: /roles, /boards, шаблон на /documents. Покупать билет: /contract — кто подаёт permit, есть ли Entry Pass, что написано про билет, дом и еду. Агентство или прямой найм: /scams и one.gov.mv." },
      { type: "p", text: "Реклама после Ready — mid/footer, не на поле запроса. Пока Ready нет — плейсхолдер. Связанные URL: /path, /sources, /faq, /about. Тема сайта — прямой найм на резорт, не конвертер файлов." },
    ],
  },
  en: {
    title: "How to research official sources instead of a Telegram screenshot",
    nodes: [
      { type: "p", text: "Atoll Path research is not the whole internet and not a chatbot that invents fees. Search the verified graph first. Then fetch only from the allowlist. The model may answer only from that pack. If the pack has no number, the answer is unknown, not usually $400." },
      { type: "p", text: "We do not mirror immigration.gov.mv whole. A figure without a checked-at date and an A link is not a figure." },
      { type: "h2", text: "Trust A–D" },
      { type: "ul", items: [
        "A — state portal: immigration.gov.mv, xpat.egov.mv, gazette, MIRA, LRA, MyCareer.",
        "B — brand career page, HR mail from that host, Jobsicle as an ad.",
        "C — Reddit, vlogs, a friend’s service charge. Compass, not an offer.",
        "D — Telegram PDF, visa without an offer. Not a reason to buy a ticket.",
      ] },
      { type: "p", text: "Xpat is the employer desk. A candidate does not register there instead of a visa. A site that asks for an Xpat login and a quota payment is the wrong portal or a scam." },
      { type: "h2", text: "When to stop searching" },
      { type: "p", text: "Write today: /roles, /boards, /documents. Buy a ticket: /contract — who files the permit, Entry Pass, ticket, housing, meals. Agency vs direct hire: /scams and one.gov.mv. Related: /path, /sources, /faq, /about." },
    ],
  },
};
