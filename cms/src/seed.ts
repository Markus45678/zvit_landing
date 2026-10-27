import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { loadEnvConfig } = require('@next/env') as typeof import('@next/env')

const richText = (text: string) => ({
  root: {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        children: [
          { type: 'text', version: 1, text, format: 0, detail: 0, mode: 'normal', style: '' },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
})

/**
 * seed.ts — Скрипт початкового наповнення бази даних Neon PostgreSQL.
 * Запуск: npm run seed (або через npx tsx src/seed.ts)
 */
async function seed() {
  // Load the CMS .env file before importing payload.config.ts, because the
  // Payload secret and database connection are read while that config loads.
  loadEnvConfig(process.cwd())
  const [{ getPayload }, { default: configPromise }] = await Promise.all([
    import('payload'),
    import('./payload.config'),
  ])

  console.log('🌱 Початок наповнення бази даних PharmaStor...')

  const payload = await getPayload({ config: configPromise })

  // Контентний seed не створює адміністратора з вбудованим паролем.
  // Адміністратора слід створити окремо через Payload Admin.

  // 1. Наповнюємо Header Global
  console.log('🌿 Оновлення Header Global...')
  await payload.updateGlobal({
    slug: 'header',
    data: {
      logo: {
        text: 'PharmaStor',
      },
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
  })

  // 2. Наповнюємо Footer Global
  console.log('🌿 Оновлення Footer Global...')
  await payload.updateGlobal({
    slug: 'footer',
    data: {
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
  })

  // 3. Створюємо головну сторінку з усіма 8 блоками
  console.log('📄 Створення головної сторінки з 8 блоками...')
  const existingPage = await payload.find({
    collection: 'pages',
    where: { path: { equals: '/' } },
    limit: 1,
  })

  const pageData = {
    title: 'Головна сторінка PharmaStor',
    path: '/',
    seo: {
      metaTitle: 'PharmaStor — Розумна система обліку аптечного складу',
      metaDescription: 'Автоматизація контролю партій, термінів придатності, температурних режимів за стандартами GDP.',
    },
    layout: [
      {
        blockType: 'hero',
        badge: 'Спеціалізовано для фармацевтичного бізнесу',
        headline: 'Розумна система обліку та контролю аптечного складу',
        subheadline: 'Повний контроль залишків, партій, термінів придатності та температурних режимів за стандартами GDP. Знижуйте втрати від прострочки до 95%.',
        ctaLabel: 'Отримати 14 днів демо',
        ctaUrl: '#contact',
      },
      {
        blockType: 'features',
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
        sectionTitle: 'Відповіді на популярні запитання',
        items: [
          {
            question: 'Чи відповідає система вимогам Держлікслужби України?',
            answer: richText('Так, PharmaStor повністю відповідає Наказу МОЗ №95 про належну практику дистрибуції (GDP) та підтримує ведення реєстру сертифікатів якості і розпоряджень про заборону обігу.'),
          },
          {
            question: 'Скільки часу займає впровадження системи на складі?',
            answer: richText('Базове розгортання та перенесення залишків займає від 3 до 7 робочих днів. Навчання персоналу складу проводиться за 1-2 сесії.'),
          },
          {
            question: 'Чи можна інтегрувати PharmaStor з нашою поточною 1C / BAS?',
            answer: richText('Так, у системі передбачено готовий REST API та модуль інтеграції з конфігураціями «BAS Аптека», «1С:Підприємство» та іншими обліковими системами.'),
          },
          {
            question: 'Як працює сповіщення про порушення температури зберігання?',
            answer: richText('При відхиленні показників датчиків від норми (наприклад +2..+8°C для вакцин) відповідальні особи миттєво отримують SMS, сповіщення в Telegram та дзвінок черговому.'),
          },
        ],
      },
      {
        blockType: 'contact',
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

  if (existingPage.docs.length > 0) {
    console.log('🔄 Оновлення існуючої сторінки...')
    await payload.update({
      collection: 'pages',
      id: existingPage.docs[0].id,
      data: pageData as any,
    })
  } else {
    console.log('✨ Створення нової сторінки...')
    await payload.create({
      collection: 'pages',
      data: pageData as any,
    })
  }

  console.log('🎉 Базу даних успішно наповнено початковими даними!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Помилка наповнення бази даних:', err)
  process.exit(1)
})
