# SEARCH CONSOLE CANON — Atoll Path

**Навсегда.** Агент обязан применять этот файл при любой задаче про индексацию, sitemap, robots, canonical, Search Console, «чтобы сайт был в Google». Тот же статус, что у `ADSENSE.md`.

Пользователь больше **не обязан** повторно присылать коды подтверждения и приветственное письмо GSC.

## Этот сайт

| Поле | Значение |
|---|---|
| Property type | URL-prefix (не domain) |
| Resource | `https://atoll-path.vercel.app/` |
| Resource id | `https://atoll-path.vercel.app/` |
| GSC | [Search Console](https://search.google.com/search-console?resource_id=https://atoll-path.vercel.app/) |
| Sitemaps UI | [Sitemaps](https://search.google.com/search-console/sitemaps?resource_id=https://atoll-path.vercel.app/) |
| Users UI | [Users](https://search.google.com/search-console/users?resource_id=https://atoll-path.vercel.app/) |
| Welcome mail | 24 авг. 2026, campaign **WNC-376106** |
| Ownership | HTML-файл, подтверждено владельцем 24 авг. 2026 |
| Verification file | `/google9cea52a5e8c8a836.html` → `public/google9cea52a5e8c8a836.html` |
| File body (ровно) | `google-site-verification: google9cea52a5e8c8a836.html` |
| Sitemap | `https://atoll-path.vercel.app/sitemap.xml` |
| Sitemap status | **Успешно**, 24 авг. 2026, **14 страниц**, 0 видео |
| robots.txt | `https://atoll-path.vercel.app/robots.txt` |

Не удалять verification HTML. Не менять имя файла. Не добавлять лишний перевод строки, если Google отдал файл без него.

## Приветствие Google (WNC-376106) — что делать, а что нет

1. **Все URL в Search Console.** Google предлагает domain-свойство или http + https + www + без www.
   - Domain-свойство для `*.vercel.app` **невозможно** (DNS `vercel.app` нам не принадлежит).
   - Живой канон **один**: `https://atoll-path.vercel.app`.
   - **Запрещено** заводить в GSC `http://…` и `www.atoll-path.vercel.app` — этих адресов нет, это дубли и мусор.
   - Domain-свойство — только после своего домена + DNS TXT.
2. **Пользователи.** Коллег не добавлять, пока владелец явно не попросил.
3. **Sitemap.** Уже отправлен, статус Успешно, 14 URL. Повторно слать только если **изменился список URL**.
4. **Гайд GSC.** Ниже. Официально: [краткое руководство](https://support.google.com/webmasters/answer/6258314?hl=ru).

## 14 URL в sitemap (ровно INDEXABLE)

`/` `/path` `/sources` `/boards` `/roles` `/documents` `/contract` `/scams` `/research` `/reddit` `/faq` `/privacy` `/terms` `/about`

**Никогда в sitemap / всегда noindex:** `/documents/editor` и любые `/documents/editor/*` (PII, черновики).

## Обязательный стек на каждом Free App (как три метода AdSense)

После продакшен-домена агент сам, без запроса кодов:

1. Уникальные `title` / `description` / `canonical` (абсолютный https) на каждую индексную страницу.
2. `html lang` = язык контента по умолчанию (`ru` здесь).
3. JSON-LD: WebSite + BreadcrumbList; FAQPage на FAQ; HowTo на пошаговые.
4. `robots.txt`: `Allow: /`, Disallow только то, что noindex; `Sitemap: https://<prod>/sitemap.xml`.
5. `User-agent: Googlebot`, `Mediapartners-Google`, `AdsBot-Google` — Allow.
6. `sitemap.xml` с **продакшен-origin**, lastmod, changefreq, priority. Не origin превью.
7. HTML-файл верификации в `public/` как только владелец его дал. Хранить вечно.
8. Не авторствовать `og:*` / `twitter:card` в `__root.tsx` (их пишет grok-pwa). Свои — в `src/lib/og/site.json`.

## Что владелец жмёт в UI (агент это не может)

После деплоя, **до** кнопки «Запросить проверку» в AdSense:

1. URL-prefix property = `https://<prod>/` → подтвердить HTML-файлом.
2. Sitemaps → отправить `https://<prod>/sitemap.xml` → дождаться **Успешно**.
3. Проверка URL → `https://<prod>/` → **Запросить индексирование**. То же для 2–3 главных URL (здесь `/path`, `/faq`).
4. Только после пункта 2 — AdSense: подтвердить сайт и запросить проверку (см. `ADSENSE.md`).
5. Sitemap повторно не слать, пока список URL тот же.

Индексация ≠ позиция. Дни, не минуты.

**Почему GSC раньше AdSense (канон 24.08.2026):** Atoll Path — единственный Free App, где колонка ads.txt в AdSense стала «Разрешено» в тот же день. На нём сначала ушёл sitemap в GSC (14 URL, Успешно), потом AdSense. На Nota / Fit / QR / HEIC / Folio / Shift / Crush / Strip / Bind файл ads.txt уже 200, но в кабинете «Не найдено» — GSC-шаг не был первым. Без проиндексированного sitemap робот ads.txt часто не находит файл.

## Запреты

- Не плодить http/www свойства под vercel.app.
- Не класть editor / спасибо-страницы / превью-хосты в sitemap.
- Не выдумывать `google-site-verification` meta token — только тот, что выдал GSC, или HTML-файл.
- Не включать Auto ads «чтобы Googlebot увидел рекламу».
- Не ждать, что AdSense проверка = GSC проверка. Это разные роботы.

## Ссылки из письма 24 авг. 2026

- [Начало работы](https://support.google.com/webmasters/answer/10431861?hl=ru)
- [Подтверждение права](https://support.google.com/webmasters/answer/9008080?hl=ru)
- [Пользователи](https://support.google.com/webmasters/answer/7687615?hl=ru)
- [Sitemap](https://support.google.com/webmasters/answer/156184?hl=ru)
- [Краткое руководство](https://support.google.com/webmasters/answer/6258314?hl=ru)
- [Форум](https://support.google.com/webmasters/community/?hl=ru) — категория письма `[WNC-376106]`
