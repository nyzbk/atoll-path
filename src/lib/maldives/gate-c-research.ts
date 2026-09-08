import type { GuideCopy } from "./gate-c-guides";

export const researchGuide: Record<"ru" | "en", GuideCopy> = {
  ru: {
    title: "Как исследовать официальные источники, а не скрин из Telegram",
    nodes: [
      { type: "p", text: "Страница исследования Atoll Path — не «весь интернет» и не чат-бот, который выдумывает пошлины. Сначала поиск по проверенному графу источников со шкалой A–D. Затем живой fetch только с allowlist государственных и известных доменов, которые вы сами запросили. Модель отвечает только по этому пакету. Если в пакете нет цифры — ответ «неизвестно», а не «обычно $400»." },
      { type: "p", text: "Это важно для соискателя и для ревьюера одинаково. Мы не зеркалим immigration.gov.mv целиком. Мы объясняем, как читать официальную страницу, куда не ходить, и что считать уровнем C: влог, Reddit, агент в WhatsApp. Цифра без даты проверки и без ссылки уровня A — не цифра. Не копируйте FAQ соседних конвертеров: у Мальдив другая задача." },
      { type: "h2", text: "Шкала A–D, которой пользуется этот гид" },
      { type: "ul", items: [
        "A — текст закона или портала государства: immigration.gov.mv, xpat.egov.mv, gazette, MIRA, LRA, MyCareer как госборд. Даты проверки — на карточках /sources.",
        "B — карьера бренда на корпоративном домене, письмо HR с того же домена, страница Jobsicle как объявление, не как закон.",
        "C — Reddit, влоги, отзывы staff house, средний service charge у друзей. Ориентир, не оферта.",
        "D — анонимный PDF в Telegram, виза без оффера, предоплата незнакомцу. Для решения купить билет D не существует.",
      ] },
      { type: "p", text: "Xpat eGov — кабинет работодателя. Соискатель туда не регистрируется вместо визы. Если сайт просит с вас логин Xpat и оплату квоты — это не тот портал или это скам. MyCareer часто показывает роли для граждан; пометка Maldivians only — другой рынок, не ошибка фильтра." },
      { type: "h2", text: "Allowlist fetch: что страница имеет право скачать" },
      { type: "p", text: "Живой fetch ходит только на заранее разрешённые хосты: gov.mv и известные борды из графа. Мы не тянем произвольный URL, не обходим paywall и не копируем чужой ATS. Atoll Path добавляет комментарий, шкалу доверия и «чего не делать» — это ценность, не зеркало чужого сайта." },
      { type: "p", text: "Типичный сценарий. Вы читаете /path. Возникает вопрос: можно ли прилететь туристом и переоформиться. Вы открываете эту страницу, ищете в графе tourist / work visa, затем запрашиваете живую страницу immigration.gov.mv, если она в allowlist. Модель отвечает по тексту страницы плюс граф. Если живая страница недоступна — остаётся граф и честное «неизвестно». Не заполняйте дыру суммой из Reels." },
      { type: "h2", text: "Частые ловушки, которые сжигают недели" },
      { type: "p", text: "Запрос maldives work visa fee 2026 в общей выдаче. Первые сайты часто агрегаторы с рекламой и устаревшей цифрой. Пошлина без даты проверки и без ссылки A не годится для решения купить билет." },
      { type: "p", text: "Пересказ одного влога как закон про service charge. LRA регулирует service charge, формула пула — практика резорта. Спросите средний SC за три месяца письменно. Если влог обещает фиксированные $800 линейному F&B — это уровень C. Вилки на /roles помечены как ориентир, не как контракт." },
      { type: "p", text: "Нейросеть сказала, что налога нет. MIRA EWT 0% до порога MVR 60 000 в месяц — это порог, не офшор. Модель на этой странице не имеет права дописать порог, если его нет в пакете графа. Если пакет молчит — ответ «неизвестно», смотрите mira.gov.mv." },
      { type: "p", text: "Скриншот Xpat из закрытого кабинета агента. Вы не обязаны входить в Xpat под чужим логином. Работодатель видит статус заявления. Соискатель видит письмо HR и Entry Pass, когда резорт их присылает. Требование «пришлите логин Xpat, мы продвинем» — скам, не исследование." },
      { type: "h2", text: "Когда исследование достаточно, чтобы остановиться" },
      { type: "p", text: "Чтобы решить, писать ли в этот резорт сегодня: карточка роли на /roles, URL карьеры или борда на /boards, шаблон письма в /documents. Этого хватает, чтобы отправить CV. Не ждите идеальной цифры SC из Reddit." },
      { type: "p", text: "Чтобы решить, покупать ли билет: факты с /contract — кто подаёт work permit, есть ли Entry Pass, что написано про joining ticket, жильё и еду. Пока их нет — исследование не закончено." },
      { type: "p", text: "Чтобы решить, агентство или прямой найм: /scams плюс вопрос лицензии на one.gov.mv. Если продают доступ к вакансии, которую резорт публикует сам, вы покупаете очередь, которой нет." },
      { type: "p", text: "Реклама, когда её одобрят, стоит mid/footer и не перекрывает поле запроса. Пока Site Ready нет — плейсхолдер. Fetch не является открытым краулером интернета. Итог: исследование здесь нужно, чтобы не принимать решение по скриншоту агента. Закон пишет государство. Квоту пишет работодатель. Связанные страницы: /path, /sources, /faq, /about." },
    ],
  },
  en: {
    title: "How to research official sources instead of a Telegram screenshot",
    nodes: [
      { type: "p", text: "Atoll Path research is not the whole internet and not a chatbot that invents fees. Search the verified source graph first. Then live-fetch only from an allowlist. The model may answer only from that pack. If the pack has no number, the answer is unknown, not usually $400." },
      { type: "p", text: "We do not mirror immigration.gov.mv whole. We explain how to read an official page and what counts as trust C. A figure without a checked-at date and an A link is not a figure." },
      { type: "h2", text: "Trust A–D" },
      { type: "ul", items: [
        "A — state portal: immigration.gov.mv, xpat.egov.mv, gazette, MIRA, LRA, MyCareer.",
        "B — brand career page, HR mail from that host, Jobsicle as an ad.",
        "C — Reddit, vlogs, a friend service charge. Compass, not an offer.",
        "D — Telegram PDF, visa without an offer. Not a reason to buy a ticket.",
      ] },
      { type: "p", text: "Xpat is the employer desk. A candidate does not register there instead of a visa. A site that asks for an Xpat login and a quota payment is the wrong portal or a scam." },
      { type: "p", text: "To write a resort today use /roles, /boards and /documents. To buy a ticket use /contract. Agency versus direct hire: /scams and one.gov.mv. Related: /path, /sources, /faq, /about." },
    ],
  },
};
