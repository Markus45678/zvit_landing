# 🌿 PharmaStor — Односторінковий лендінг (Vite + TS + Payload CMS v3 + Neon + Vercel)

Повноцінний production-ready проєкт лендінгу для системи керування аптечним складом (**PharmaStor**), побудований за архітектурним патерном референсу `bosco_landing_lesson`, але повністю типізований, розширений до 8 блоків, оптимізований та підготовлений до деплою на Vercel з базою даних **PostgreSQL у хмарі Neon**.

---

## 🏗 Архітектура та структура проєкту

Проєкт організовано як монорепозиторій з двома незалежними сервісами:

```
pharma-landing/
├── package.json              # Скрипти верхнього рівня для монорепо
├── vercel.json               # Конфігурація Vercel (маршрутизація CMS та фронтенду)
├── .gitignore                # Правила ігнорування git (.env, node_modules, dist тощо)
│
├── cms/                      # ⚙️ Payload CMS v3 (Next.js 15 App Router runtime)
│   ├── src/
│   │   ├── app/              # Next.js App Router (тільки для адмінки та API роутів)
│   │   │   └── (payload)/
│   │   │       ├── admin/    # Автоматична адмін-панель Payload (/admin)
│   │   │       └── api/      # REST API хендлери (/api/*)
│   │   ├── collections/      # Колекції бази даних
│   │   │   ├── Users.ts      # Користувачі та авторизація
│   │   │   ├── Media.ts      # Завантаження медіа (зображення, логотипи)
│   │   │   └── Pages.ts      # Сторінки з блоковим конструктором (layout)
│   │   ├── blocks/           # Схеми блоків для CMS
│   │   │   ├── HeroBlock.ts
│   │   │   ├── FeaturesBlock.ts
│   │   │   ├── AboutBlock.ts
│   │   │   ├── PricingBlock.ts
│   │   │   ├── TeamBlock.ts
│   │   │   ├── TestimonialsBlock.ts
│   │   │   ├── FaqBlock.ts
│   │   │   └── ContactBlock.ts
│   │   ├── globals/          # Наскрізні налаштування сайту
│   │   │   ├── Header.ts     # Логотип, навігація, CTA
│   │   │   └── Footer.ts     # Копірайт, посилання, соцмережі
│   │   ├── endpoints/        # Кастомні оптимізовані REST ендпоінти
│   │   │   ├── pageEndpoint.ts   # GET /api/page?path=/ (плоский JSON з блоками)
│   │   │   └── commonEndpoint.ts # GET /api/common (хедер + футер в один запит)
│   │   ├── seed.ts           # Скрипт наповнення бази реальними даними
│   │   └── payload.config.ts # Головний конфіг Payload CMS + Postgres адаптер
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
└── frontend/                 # 🚀 Швидкий фронтенд на Vite + Vanilla TypeScript
    ├── src/
    │   ├── blocks/           # DOM-рендерери кожного блоку
    │   │   ├── hero.ts
    │   │   ├── features.ts
    │   │   ├── about.ts
    │   │   ├── pricing.ts
    │   │   ├── team.ts
    │   │   ├── testimonials.ts
    │   │   ├── faq.ts        # Інтерактивний акордеон
    │   │   └── contact.ts    # Форма зворотного зв'язку
    │   ├── components/       # Глобальні компоненти
    │   │   ├── header.ts
    │   │   └── footer.ts
    │   ├── styles/
    │   │   └── base.css      # Земляна палітра (Earth & Sage), відступи, адаптивність
    │   ├── api.ts            # Типізовані обгортки fetch (getCommon, getPage)
    │   ├── types.ts          # Повна типізація даних з API
    │   ├── renderBlocks.ts   # Оркестратор динамічного рендерингу блоків
    │   └── main.ts           # Точка входу: Promise.all, try/catch, fallback mock data
    ├── index.html
    ├── vite.config.ts        # Налаштування Vite та proxy на порт CMS (3001)
    ├── tsconfig.json
    └── package.json
```

---

## 🎨 Дизайн-система (Земляна / Натуральна палітра)

- **Лісовий зелений (`#2D6A4F`, `#1B4332`)**: кнопки, заголовки, футер, відчуття стабільності та медичної надійності.
- **Свіжа м'ята (`#52B788`, `#D8F3DC`)**: бейджі, акцентні плашки, іконки.
- **Теплий бежевий/кремовий (`#FAF7F2`, `#F0EBE1`)**: основний фон сторінки та чергування фонів секцій.
- **Картки (`#FFFFFF`, `#E5E0D8`)**: легка тінь, контрастні елементи, читабельність.

---

## 🧩 8 Блоків Лендінгу PharmaStor

1. **Hero** — головний банер, бейдж перевірки, УТП для фармскладів, CTA-кнопки та прев'ю платформи.
2. **Features** — 6 ключових переваг: FEFO/FIFO, моніторинг холодового ланцюга IoT, пошук за забороненими серіями Держлікслужби, ТЗД сканери, інтеграція з 1С/BAS, стандарти GDP.
3. **About** — історія та місія продукту, позиціювання зображення (ліворуч/праворуч), 4 ключові метрики (500+ складів, 99.9% точність, -95% списань).
4. **Pricing** — 3 тарифи («Старт», «Мережевий Pro» з підсвічуванням, «Enterprise Дистрибуція») зі списками функцій.
5. **Team** — картки команди фахівців (CEO, CTO, керівник валідації GDP) з аватарами та LinkedIn.
6. **Testimonials** — відгуки реальних клієнтів із рейтингом зірочками (★ 5/5).
7. **FAQ** — інтерактивний акордеон із відповідями на регуляторні та технічні запитання.
8. **Contact** — контакти офісу (Київ) та інтерактивна валідована форма заявки на демо-доступ.

---

## 🚀 Покроковий запуск проєкту

### Крок 1. Налаштування PostgreSQL у хмарі Neon

1. Зареєструйтесь на [neon.tech](https://neon.tech).
2. Створіть новий проєкт: `pharmastor-db`.
3. У панелі Neon отримайте два рядки підключення (Dashboard -> Connection Details):
   - **Pooled connection string** (з `pooler` у хості) — використовується додатком для звичайних запитів:
     ```
     postgresql://neondb_owner:xxxx@ep-soft-pond-xxx-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
     ```
   - **Direct connection string** (без пулера) — потрібен для виконання міграцій DDL:
     ```
     postgresql://neondb_owner:xxxx@ep-soft-pond-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
     ```

### Крок 2. Змінні оточення

#### 1) Для CMS (`cms/.env`):
Скопіюйте `cms/.env.example` у `cms/.env`:
```env
DATABASE_URL=postgresql://neondb_owner:xxxx@ep-xxx-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
DIRECT_DATABASE_URL=postgresql://neondb_owner:xxxx@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
PAYLOAD_SECRET=df9487c6e7a2b91029384756c8b91a2e3f4d5c6b7a80918273645b6a7c8d9e0f
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

#### 2) Для Фронтенду (`frontend/.env`):
Скопіюйте `frontend/.env.example` у `frontend/.env`:
```env
VITE_API_URL=http://localhost:3001
```

---

### Крок 3. Встановлення залежностей

```bash
# 1. Залежності CMS
cd cms
npm install

# 2. Залежності Фронтенду
cd ../frontend
npm install
```

---

### Крок 4. Наповнення бази даних (Seed)

У папці `cms` виконайте скрипт `seed`:
```bash
cd cms
npm run seed
```
Цей скрипт автоматично:
- Створює першого адміністратора: `admin@pharmastor.ua` / `PharmaPassword2026!`
- Наповнює **Header** (логотип, посилання, CTA)
- Наповнює **Footer** (копірайт, соціальні мережі)
- Створює сторінку `/` з повноцінно заповненими **8 блоками** українською мовою.

---

### Крок 5. Запуск у режимі розробки

Відкрийте два термінали:

**Термінал 1 (Бекенд / Payload CMS на порту 3001):**
```bash
cd cms
npm run dev
```
- Адмін-панель доступна за адресою: [http://localhost:3001/admin](http://localhost:3001/admin)
- API доступні за адресами:
  - [http://localhost:3001/api/common](http://localhost:3001/api/common)
  - [http://localhost:3001/api/page?path=/](http://localhost:3001/api/page?path=/)

**Термінал 2 (Фронтенд / Vite на порту 5173):**
```bash
cd frontend
npm run dev
```
- Лендінг відкривається на: [http://localhost:5173](http://localhost:5173)

> **Примітка:** У `frontend/vite.config.ts` налаштовано вбудований проксі `/api -> http://localhost:3001`, що повністю усуває проблеми з CORS при локальній розробці! Також у фронтенді реалізовано кнопку **«Завантажити демо-дані»**, яка показує миттєвий результат навіть якщо CMS ще не підключено до інтернету.

---

## ☁️ Деплой на Vercel

У корені проєкту налаштовано файл `vercel.json`:
- Будує `cms` як серверний додаток Next.js (`@vercel/next`).
- Будує `frontend` як статичний Vite білд (`dist`).
- Маршрутизує запити `/api/*` та `/admin` на CMS, а всі інші запити — на статичний фронтенд.

### Кроки деплою:
1. Запушіть репозиторій на GitHub.
2. Підключіть репозиторій у [vercel.com](https://vercel.com).
3. Додайте Environment Variables у налаштуваннях проєкту на Vercel:
   - `DATABASE_URL` = Ваш Neon Pooled connection string
   - `DIRECT_DATABASE_URL` = Ваш Neon Direct connection string
   - `PAYLOAD_SECRET` = Ваш згенерований секретний ключ
   - `FRONTEND_URL` = URL вашого задеплоєного Vercel проєкту
4. Запустіть Deploy.
