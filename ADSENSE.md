# ADSENSE CANON — Atoll Path

**Навсегда.** Агент обязан применять этот файл при любой задаче про AdSense, ads.txt, баннеры, «монетизация Google». Пара к `SEARCH_CONSOLE.md`.

Пользователь больше **не обязан** повторно присылать publisher id, сниппет, ads.txt, meta.

## Издатель

| Поле | Значение |
|---|---|
| Publisher | `ca-pub-7636435144500691` |
| Site | `https://atoll-path.vercel.app` |
| Auto ads | **OFF** |
| AMP | OFF |
| Units | только ручные Display: `after-success` / `mid` / `footer` |
| Live ads | только после Site Ready **и** `VITE_ADSENSE_LIVE=true` + slot IDs в Vercel env |
| До Ready | плейсхолдеры `Ad · slot` |
| `.env` в репо | **запрещён** |

## Порядок (канон 24.08.2026 — доказано Atoll Path)

Скрин AdSense «Управление сайтами»: Atoll Path — единственный, у кого колонка ads.txt = **Разрешено**. Остальные Free Apps — **Не найдено**, хотя `ads.txt` у них уже 200.

Порядок, который сработал в тот же день:

1. Задеплоить сайт (snippet + meta + ads.txt + sitemap + robots).
2. **Сначала Google Search Console:** URL-prefix → HTML-подтверждение → отправить `sitemap.xml` → статус **Успешно**.
3. **Потом AdSense:** добавить сайт → подтвердить собственность (сниппет / ads.txt / meta) → **Запросить проверку**.
4. Колонка ads.txt становится **Разрешено**. Статус сайта ещё «Выполняется проверка» — это нормально, Site Ready придёт позже.
5. `VITE_ADSENSE_LIVE` **не** включать, пока нет Site Ready.

**Запрещено** слать сайт в AdSense review, пока sitemap в GSC не «Успешно». Без GSC робот ads.txt часто пишет «Не найдено» неделями, даже если файл лежит.

Колонка «Статус файла ads.txt» ≠ колонка «Статус рассмотрения». Разрешено по ads.txt ≠ можно включать живые баннеры.

## Три метода подтверждения (все три, всегда, на каждом Free App)

1. **Скрипт в SSR `<head>`** (не `useEffect` — робот читает HTML):

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7636435144500691"
     crossorigin="anonymous"></script>
```

2. **ads.txt** в корне, ровно одна строка, без комментариев сверху:

```
google.com, pub-7636435144500691, DIRECT, f08c47fec0942fa0
```

3. **Meta** в `<head>`:

```html
<meta name="google-adsense-account" content="ca-pub-7636435144500691">
```

Робот AdSense ≠ Googlebot Search. Если сниппет-проверка падает — `ads.txt` как статика. Если ads.txt в кабинете «Не найдено» при живом файле — сначала GSC sitemap Success, потом обновить проверку в AdSense.

## Куда ставить слоты

- `mid` — в середине контента, не рядом с главным CTA.
- `after-success` — только после результата (оффер вставлен, вакансия разобрана).
- `footer` — под основным контентом, над дисклеймером.
- **Никогда:** `/privacy` `/terms` `/about`, редактор документов (PII), вплотную к «Open the path» / Send.

Iframe live-preview и localhost: клиентский лоадер не дублирует, если скрипт уже в head.

## Юридические страницы

Privacy / Terms / About обязательны до заявки на рекламу. Реклама не читает документы пользователя.

## Atoll Path — факт 24 авг. 2026 13:07 GMT+5

Сайт в AdSense: выполняется проверка. ads.txt: **Разрешено**. Live ads: ещё нет.

## Ворота контента (28.08.2026, план 187)

Рецензент валит tool-SPA на тонком тексте, даже если ads.txt Allowed. На Atoll Path после этого деплоя:

- Homepage: полные абзацы how-it-works + limits в **сыром HTML**.
- How-to = `/path` (14 шагов).
- FAQ 14 вопросов, включая рекламу.
- About ≥ 400 слов, одна ссылка на соседний tool.
- Contact: `ultaultimatum@gmail.com`, без формы загрузки.
- Footer: Путь · FAQ · Privacy · Terms · About · Contact.
- `/contact` без баннеров. Editor вне sitemap.
- Auto ads OFF. `VITE_ADSENSE_LIVE` не включать. Request review сегодня **не** жать.

Жёлтый баннер кабинета (платёжка/телефон) закрывает только владелец в UI AdSense.
