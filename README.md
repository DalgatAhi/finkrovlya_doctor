# Кровельный Доктор — Telegram Mini App

**Фирменный цифровой сервис диагностики крыши от ФИН КРОВЛЯ.**

Пользователь открывает бота → нажимает кнопку → внутри Telegram открывается мини-приложение → проходит диагностику за 2 минуты → получает предварительный разбор → специалист перезванивает.

---

## Быстрый старт

```bash
npm install
npm run dev
```

Приложение откроется на `http://localhost:5173`

Для тестирования полного Telegram-флоу (MainButton, BackButton, haptics) нужен HTTPS-туннель — см. ниже.

---

## Страницы

| URL | Описание |
|-----|----------|
| `/` | Главный экран — hero + features |
| `/quiz` | 6-шаговый wizard диагностики |
| `/result` | Экран с результатом / разбором |
| `/admin-leads` | Список заявок (dev) |

---

## Подключение к Telegram

### 1. Создать бота

```
/newbot
```

Следуйте инструкциям @BotFather — получите токен.

### 2. Создать Mini App

```
/newapp
```

Выберите бота, задайте название, иконку и **URL** приложения (HTTPS).

### 3. Настроить Menu Button (опционально)

```
/mybots → выберите бота → Bot Settings → Menu Button
```

Укажите URL mini app — кнопка появится в клавиатуре бота.

### 4. HTTPS-туннель для разработки

Telegram требует HTTPS. Используйте один из вариантов:

**ngrok:**
```bash
ngrok http 5173
# скопируйте https://xxxx.ngrok.io
```

**Cloudflare Tunnel:**
```bash
cloudflared tunnel --url http://localhost:5173
```

Полученный HTTPS-URL укажите в @BotFather как Web App URL.

---

## Переменные окружения

Создайте `.env.local`:

```env
# URL вашего backend для приёма заявок
# Если не указан — заявки сохраняются в localStorage (dev mode)
VITE_API_URL=https://your-backend.example.com
```

### Backend API

Приложение отправляет `POST ${VITE_API_URL}/api/leads` с телом:

```json
{
  "lead": {
    "id": "...",
    "createdAt": "ISO date",
    "telegramUser": { "id": 12345, "first_name": "...", ... },
    "answers": { "concern": "...", "location": "...", ... },
    "diagnosis": { "riskLevel": "high", "riskPercent": 84, ... }
  },
  "initData": "query_id=...&user=...&hash=..."
}
```

`initData` — строка для серверной верификации подлинности запроса от Telegram.
Документация: [Validating data from Telegram](https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app)

---

## Telegram SDK behaviour

| Контекст | Поведение |
|----------|-----------|
| Внутри Telegram | MainButton / BackButton нативные; haptic feedback; prefill имени из профиля |
| Обычный браузер | Inline-кнопки в UI; fallback без haptics; всё работает как SPA |

Детектор: `isTelegramWebApp()` проверяет `initData.length > 0` — это единственный надёжный способ отличить Telegram от браузера, поскольку SDK-скрипт создаёт `window.Telegram.WebApp` в обоих случаях.

---

## Структура

```
src/
  app/
    App.tsx          — роутинг, инициализация темы
    store.ts         — Zustand: ответы квиза + telegramUser
  components/
    ui/              — Button, Card, Input, Badge, Logo, ProgressBar
    quiz/            — OptionCard, PhotoUpload, ContactsForm
    result/          — ResultCard, RiskIndicator
    admin/           — LeadCard (с Telegram-данными)
  data/
    questions.ts     — вопросы и варианты ответов
  hooks/
    useTelegramButton.ts  — управление нативным MainButton
  lib/
    telegram.ts      — SDK: initTelegram, MainButton, BackButton, haptics, theme
    api.ts           — submitLead: backend / localStorage fallback
    diagnosis.ts     — логика расчёта диагноза по ответам
    storage.ts       — localStorage CRUD для заявок
    utils.ts         — generateId
  types/
    index.ts         — все TypeScript-типы
  pages/
    Home.tsx  Quiz.tsx  Result.tsx  AdminLeads.tsx
```

---

## Брендинг

- **Компания:** ФИН КРОВЛЯ / FIN KROVLYA
- **Продукт:** Кровельный Доктор
- **Фиолетовый:** `#ca61c9`
- **Синий:** `#121193`
- **Градиент:** `linear-gradient(135deg, #ca61c9, #121193)`
- **Шрифт:** Inter
