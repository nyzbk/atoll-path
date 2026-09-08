import type { GuideCopy } from "./gate-c-guides";
import { documentsGuide } from "./gate-c-guides";

export const scamsExtra = documentsGuide;

export const aboutExtra: Record<"ru" | "en", string[]> = {
  ru: [
    "Почему этот гид двуязычный. Русскоязычный линейный персонал часто читает влоги на русском и пишет HR по-английски. Мы держим оба языка на одних URL, без отдельного «ru-поддомена» и без копипаста соседних Free Apps про HEIC или PDF. Задача страницы — прямой найм на резорт, не конвертер файлов.",
    "Почему мы не обещаем оффер. Квота, Xpat и Entry Pass — действия работодателя. Даже идеальное CV не создаёт слот, которого нет. Честный гид, который это говорит вслух, полезнее «гарантии вылета за пять дней». Если Google AdSense одобрит сайт, реклама оплатит хостинг; до Ready слоты пустые. Мы не сеть doorway-доменов: соседние инструменты того же издателя упоминаются один раз, без сетки «все конвертеры».",
  ],
  en: [
    "Why the guide is bilingual. Russian-speaking line staff often watch vlogs in Russian and write HR in English. Both languages live on the same URLs. There is no extra ru-subdomain and no pasted HEIC or PDF FAQ from a sibling Free App. The job of this site is direct-hire resort work, not a file converter.",
    "Why we do not promise an offer. Quota, Xpat and the Entry Pass are the employer’s moves. A perfect CV does not create a slot that does not exist. A guide that says this out loud is more useful than a “five-day flight guarantee”. If Google AdSense approves the site, ads pay hosting; until Ready the slots stay empty. We are not a doorway network: sibling tools of the same publisher get one mention, not a grid of converters.",
  ],
};

export const contactGuide: Record<"ru" | "en", GuideCopy> = {
  ru: {
    title: "Куда писать и чего не прикладывать",
    nodes: [
      { type: "p", text: "Почта оператора Atoll Path: ultaultimatum@gmail.com" },
      { type: "p", text: "Это ящик гида самопомощи, не линия Maldives Immigration, не MIRA, не LRA, не HR резорта и не «агент, который подаст Xpat». Мы не бронируем билет, не ставим квоту и не подписываем Entry Pass. Вопросы «есть ли у Sun Siyam слот на commis в октябре» принадлежат карьерной почте резорта." },
      { type: "p", text: "Пишите, если сломана ссылка на /sources, шаг на /path расходится с immigration.gov.mv, редактор теряет файл, или опечатка в шкале A–D. Не прикладывайте разворот паспорта, IM30, полный контракт, предоплату или «разошлите резюме по резортам» — мы не агентство и не Immigration." },
      { type: "p", text: "Рекламы на этой странице нет. Почта ultaultimatum@gmail.com." },
    ],
  },
  en: {
    title: "Where to write, and what not to attach",
    nodes: [
      { type: "p", text: "Operator mail: ultaultimatum@gmail.com" },
      { type: "p", text: "This is the self-help guide inbox, not Maldives Immigration, not MIRA, not LRA, not resort HR, and not the agent who will file Xpat. We do not book tickets, create quota, or sign Entry Passes." },
      { type: "p", text: "Write if a /sources link is dead, a /path step disagrees with immigration.gov.mv, the editor drops a file, or a trust mark is wrong. Do not attach a passport, IM30, a full contract, a prepayment, or a blast résumé. We are not a licensed agency." },
      { type: "p", text: "This page has no ads. Mail: ultaultimatum@gmail.com." },
    ],
  },
};

export const privacyExtra = documentsGuide;
export const termsExtra = documentsGuide;
export const contractExtra = documentsGuide;
export const redditExtra = documentsGuide;
export const faqExtras: { q: { ru: string; en: string }; a: { ru: string; en: string }; sources: string[] }[] = [];
