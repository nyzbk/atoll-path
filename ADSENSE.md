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

## Три метода подтверждения (все три, всегда, на каждом Free App)

1. **Скрипт в SSR `<head>`** (не `useEffect` — робот читает HTML):

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7636435144500691"
     crossorigin="anonymous"></script>
```

2. **ads.txt** в корне, ровно одна строка:

```
google.com, pub-7636435144500691, DIRECT, f08c47fec0942fa0
```

3. **Meta** в `<head>`:

```html
<meta name="google-adsense-account" content="ca-pub-7636435144500691">
```

Робот AdSense ≠ Googlebot Search. Если сниппет-проверка падает — сначала `ads.txt`, он отдаётся как статика.

## Куда ставить слоты

- `mid` — в середине контента, не рядом с главным CTA.
- `after-success` — только после результата (оффер вставлен, вакансия разобрана).
- `footer` — под основным контентом, над дисклеймером.
- **Никогда:** `/privacy` `/terms` `/about`, редактор документов (PII), вплотную к «Open the path» / Send.

Iframe live-preview и localhost: клиентский лоадер не дублирует, если скрипт уже в head.

## Юридические страницы

Privacy / Terms / About обязательны до заявки на рекламу. Реклама не читает документы пользователя.
