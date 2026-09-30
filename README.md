# Проектная группа «ЛИДЕР» — сайт

Сайт проектной группы «ЛИДЕР»: архитектурно-строительное проектирование, техническое обследование зданий,
инженерные изыскания, сохранение объектов культурного наследия, комплексное управление объектами.
Next.js 16 (App Router, static export) + Tailwind v4 + framer-motion + lucide-react.

## Запуск

```bash
npm install
npm run dev
```

## Сборка и деплой

`npm run build` создаёт статический сайт в `out/`. Деплой на GitHub Pages
выполняется автоматически при push в `main` командой `npm run deploy` (собирает `out/` и пушит в ветку `gh-pages`). Пример workflow для Actions — `deploy.yml.example`.

## Где что менять

- `src/lib/site.ts` — название, телефон, e-mail, адрес, услуги, кейсы, отзывы, FAQ, статьи.
  `formEndpoint` — URL, куда POST-ом уходят заявки (Formspree, n8n, Telegram-бот и т.д.).
  Пока он пустой, формы работают в демо-режиме.
- `next.config.ts` — `basePath` (`/pg-lider`) при переезде на свой домен убрать.
- `public/img`, `public/video` — визуалы (визуализации объектов из презентации компании).
- `src/components/sections/*` — секции страницы, `src/components/ui/ModalProvider.tsx` — модальные формы.
