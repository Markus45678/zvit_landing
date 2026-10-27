import './styles/base.css'
import { getCommon, getPage } from './api'
import { renderBlocks } from './renderBlocks'
import { renderHeader } from './components/header'
import { renderFooter } from './components/footer'
import type { CommonData, PageApiResponse } from './types'

// DOM контейнери
const headerEl = document.querySelector<HTMLElement>('#site-header')
const appEl = document.querySelector<HTMLElement>('#app')
const footerEl = document.querySelector<HTMLElement>('#site-footer')

/**
 * Відображає стан завантаження
 */
function showLoading() {
  if (!appEl) return
  appEl.innerHTML = `
    <div class="loading-state">
      <div class="spinner"></div>
      <p>Завантаження контенту PharmaStor...</p>
    </div>
  `
}

/**
 * Відображає зрозуміле повідомлення про помилку з можливістю повторити запит
 */
function showError(errorMessage: string, onRetry: () => void) {
  if (!appEl) return
  appEl.innerHTML = `
    <div class="container">
      <div class="error-state">
        <div class="error-state__icon">⚠️</div>
        <h2 class="error-state__title">Не вдалося завантажити дані</h2>
        <p class="error-state__message">${escapeHtml(errorMessage)}</p>
        <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
          <button id="retry-btn" class="btn btn--primary">Спробувати знову</button>
          <button id="mock-btn" class="btn btn--secondary">Завантажити демо-дані</button>
        </div>
      </div>
    </div>
  `

  document.querySelector('#retry-btn')?.addEventListener('click', onRetry)
  document.querySelector('#mock-btn')?.addEventListener('click', () => {
    loadMockData()
  })
}

/**
 * Оновлення метаданих сторінки (SEO)
 */
function updateMetadata(page: PageApiResponse) {
  if (page.seo?.metaTitle) {
    document.title = page.seo.metaTitle
  } else if (page.title) {
    document.title = `${page.title} — PharmaStor`
  }

  if (page.seo?.metaDescription) {
    let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!metaDesc) {
      metaDesc = document.createElement('meta')
      metaDesc.name = 'description'
      document.head.appendChild(metaDesc)
    }
    metaDesc.content = page.seo.metaDescription
  }
}

/**
 * Рендеринг контенту сторінки
 */
function renderPageContent(common: CommonData, page: PageApiResponse) {
  // 1. Хедер
  if (headerEl && common.header) {
    headerEl.innerHTML = ''
    headerEl.appendChild(renderHeader(common.header))
  }

  // 2. Блоки сторінки
  if (appEl && page.blocks) {
    appEl.innerHTML = ''
    const blockElements = renderBlocks(page.blocks)
    blockElements.forEach((el) => appEl.appendChild(el))
  }

  // 3. Футер
  if (footerEl && common.footer) {
    footerEl.innerHTML = ''
    footerEl.appendChild(renderFooter(common.footer))
  }

  // 4. Оновлюємо SEO
  updateMetadata(page)
}

/**
 * Головна точка входу з Promise.all та обробкою try...catch
 */
async function start() {
  showLoading()

  try {
    const currentPath = window.location.pathname || '/'

    // Паралельний запит загальних даних (хедер/футер) та сторінки (блоки)
    const [common, page] = await Promise.all([
      getCommon(),
      getPage(currentPath),
    ])

    renderPageContent(common, page)
  } catch (error) {
    console.error('[start] Помилка завантаження даних:', error)
    const msg =
      error instanceof Error
        ? `${error.message}. Переконайтеся, що бекенд Payload CMS запущено на http://localhost:3001`
        : 'Невідома помилка мережі'
    showError(msg, start)
  }
}

/**
 * Демо-дані для миттєвого попереднього перегляду у разі відсутності підключення до CMS
 */
function loadMockData() {
  const mockCommon: CommonData = {
    header: {
      logo: { text: 'PharmaStor' },
      navLinks: [
        { label: 'Переваги', url: '#features' },
        { label: 'Про нас', url: '#about' },
        { label: 'Тарифи', url: '#pricing' },
        { label: 'Команда', url: '#team' },
        { label: 'FAQ', url: '#faq' },
        { label: 'Контакти', url: '#contact' },
      ],
      ctaLabel: 'Замовити демо',
      ctaUrl: '#contact',
    },
    footer: {
      copyright: '© 2026 PharmaStor UA. Усі права захищені.',
      footerLinks: [
        { label: 'Політика конфіденційності', url: '#' },
        { label: 'Умови використання', url: '#' },
        { label: 'Вимоги GDP', url: '#' },
      ],
      socialLinks: [
        { platform: 'facebook', url: 'https://facebook.com' },
        { platform: 'linkedin', url: 'https://linkedin.com' },
        { platform: 'telegram', url: 'https://t.me' },
      ],
    },
  }

  const mockPage: PageApiResponse = {
    title: 'Головна',
    path: '/',
    seo: {
      metaTitle: 'PharmaStor — Хмарна WMS для аптечних складів',
      metaDescription: 'Автоматизація складського обліку лікарських засобів, партій, термінів придатності та сертифікатів якості.',
    },
    blocks: [
      {
        blockType: 'hero',
        type: 'hero',
        badge: 'Спеціалізовано для фармацевтичного бізнесу',
        headline: 'Розумна система обліку та контролю аптечного складу',
        subheadline: 'Повний контроль залишків, партій, термінів придатності та температурних режимів за стандартами GDP. Знижуйте втрати від прострочки до 95%.',
        ctaLabel: 'Отримати 14 днів демо',
        ctaUrl: '#contact',
      },
      {
        blockType: 'features',
        type: 'features',
        sectionTitle: 'Чому провідні фарммережі обирають PharmaStor',
        sectionSubtitle: 'Архітектура системи враховує всі регуляторні вимоги Держлікслужби України',
        items: [
          {
            icon: '📦',
            title: 'Партійний облік FEFO/FIFO',
            description: 'Автоматичне списання ліків за принципом найближчого терміну придатності (First Expired, First Out).',
          },
          {
            icon: '🌡️',
            title: 'Моніторинг холодового ланцюга',
            description: 'Інтеграція з IoT-датчиками температури та вологості для контролю умов зберігання термолабільних препаратів.',
          },
          {
            icon: '🔍',
            title: 'Миттєвий пошук за серіями',
            description: 'Швидка перевірка серій за розпорядженнями Держлікслужби та миттєве блокування карантинних партій.',
          },
          {
            icon: '📱',
            title: 'Мобільний термінал ТЗД',
            description: 'Приймання, інвентаризація та комплектація замовлень за штрихкодами 2D DataMatrix прямо на складі.',
          },
          {
            icon: '⚡',
            title: 'Інтеграція з 1С / BAS / eHealth',
            description: 'Двостороння синхронізація накладних, контрагентів та роздрібних залишків у реальному часі.',
          },
          {
            icon: '🛡️',
            title: 'Відповідність GDP & 21 CFR',
            description: 'Нестираємий аудит-трейл (журнал дій), електронні підписи та диференційовані права доступу персоналу.',
          },
        ],
      },
      {
        blockType: 'about',
        type: 'about',
        sectionTitle: 'Створено фармацевтами для фармацевтів',
        imagePosition: 'right',
        stats: [
          { value: '500+', label: 'Аптечних складів та аптек' },
          { value: '99.9%', label: 'Точність інвентаризації' },
          { value: '45 хв', label: 'Час на повне навчання провізора' },
          { value: '-95%', label: 'Зменшення списання прострочки' },
        ],
      },
      {
        blockType: 'pricing',
        type: 'pricing',
        sectionTitle: 'Прозорі тарифи без прихованих платежів',
        sectionSubtitle: 'Оберіть план, що відповідає масштабу вашої аптечної мережі',
        plans: [
          {
            name: 'Старт (Локальний склад)',
            price: '₴2 900 / міс',
            description: 'Для невеликих складів при окремих аптеках або клініках',
            features: [
              { feature: 'До 2 000 найменувань (SKU)' },
              { feature: 'До 3 активних користувачів' },
              { feature: 'Контроль термінів придатності FEFO' },
              { feature: 'Базова підтримка в Telegram' },
            ],
            ctaLabel: 'Почати безкоштовно',
            ctaUrl: '#contact',
            isHighlighted: false,
          },
          {
            name: 'Мережевий Pro',
            price: '₴7 500 / міс',
            description: 'Оптимально для регіональних мереж від 5 до 30 аптек',
            features: [
              { feature: 'Необмежена кількість SKU' },
              { feature: 'До 15 робочих місць + ТЗД сканери' },
              { feature: 'Моніторинг холодового ланцюга IoT' },
              { feature: 'Авто-блокування заборонених серій' },
              { feature: 'Інтеграція з 1С / BAS' },
            ],
            ctaLabel: 'Обрати Pro',
            ctaUrl: '#contact',
            isHighlighted: true,
          },
          {
            name: 'Enterprise Дистрибуція',
            price: 'Індивідуально',
            description: 'Для великих національних фармдистриб\'юторів та логістичних центрів',
            features: [
              { feature: 'Конвеєрні та зональні лінії комплектації' },
              { feature: 'Необмежено користувачів та складів' },
              { feature: 'Повний аудит GDP та сертифікація' },
              { feature: 'Персональний акаунт-менеджер 24/7' },
              { feature: 'SLA доступності 99.99%' },
            ],
            ctaLabel: 'Зв\'язатися з нами',
            ctaUrl: '#contact',
            isHighlighted: false,
          },
        ],
      },
      {
        blockType: 'team',
        type: 'team',
        sectionTitle: 'Експерти з фармацевтичної логістики',
        sectionSubtitle: 'Наша команда поєднує 15+ років досвіду у фармації та IT-архітектурі',
        members: [
          {
            name: 'Вікторія Мельник',
            position: 'CEO & Співзасновниця',
            bio: 'Провізор вищої категорії, екс-директор з логістики національної фарммережі.',
          },
          {
            name: 'Тарас Грищенко',
            position: 'Chief Technology Officer',
            bio: 'Архітектор високонавантажених хмарних систем та IoT-моніторингу.',
          },
          {
            name: 'Олена Савчук',
            position: 'Керівник відділу валідації GDP',
            bio: 'Сертифікований аудитор стандартів належної практики дистрибуції.',
          },
        ],
      },
      {
        blockType: 'testimonials',
        type: 'testimonials',
        sectionTitle: 'Що кажуть керівники фармбізнесу',
        items: [
          {
            quote: 'Після впровадження PharmaStor ми за перший же квартал зберегли понад 400 000 грн завдяки автоматичному алгоритму FEFO та вчасному переміщенню ліків з критичними термінами.',
            authorName: 'Микола Романюк',
            authorPosition: 'Операційний директор «ФармАльянс»',
            rating: 5,
          },
          {
            quote: 'Інтеграція з терміналами збору даних скоротила час приймання машини з ліками з 4 годин до 45 хвилин. Помилки людського фактора зведені до нуля.',
            authorName: 'Світлана Дорошенко',
            authorPosition: 'Завідувачка центрального аптечного складу',
            rating: 5,
          },
        ],
      },
      {
        blockType: 'faq',
        type: 'faq',
        sectionTitle: 'Відповіді на популярні запитання',
        items: [
          {
            question: 'Чи відповідає система вимогам Держлікслужби України?',
            answer: 'Так, PharmaStor повністю відповідає Наказу МОЗ №95 про належну практику дистрибуції (GDP) та підтримує ведення реєстру сертифікатів якості і розпоряджень про заборону обігу.',
          },
          {
            question: 'Скільки часу займає впровадження системи на складі?',
            answer: 'Базове розгортання та перенесення залишків займає від 3 до 7 робочих днів. Навчання персоналу складу проводиться за 1-2 сесії.',
          },
          {
            question: 'Чи можна інтегрувати PharmaStor з нашою поточною 1C / BAS?',
            answer: 'Так, у системі передбачено готовий REST API та модуль інтеграції з конфігураціями «BAS Аптека», «1С:Підприємство» та іншими обліковими системами.',
          },
          {
            question: 'Як працює сповіщення про порушення температури зберігання?',
            answer: 'При відхиленні показників датчиків від норми (наприклад +2..+8°C для вакцин) відповідальні особи миттєво отримують SMS, сповіщення в Telegram та дзвінок черговому.',
          },
        ],
      },
      {
        blockType: 'contact',
        type: 'contact',
        sectionTitle: 'Готові оптимізувати роботу вашого складу?',
        sectionSubtitle: 'Заповніть коротку форму, і ми надамо персональний демо-доступ до тестової бази з вашими даними',
        email: 'sales@pharmastor.ua',
        phone: '+380 (44) 390-12-34',
        address: 'м. Київ, вул. Мечникова, 2А, БЦ «Парус»',
        formTitle: 'Замовити безкоштовну презентацію',
        submitLabel: 'Отримати консультацію та демо',
      },
    ],
  }

  renderPageContent(mockCommon, mockPage)
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// Запуск при завантаженні DOM
document.addEventListener('DOMContentLoaded', start)
