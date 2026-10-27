import type { ContactBlockData } from '../types'

/**
 * Рендерер блоку Contact (Контактна інформація та форма зворотного зв'язку).
 */
export function contact(data: ContactBlockData): HTMLElement {
  const section = document.createElement('section')
  section.className = 'section block-contact'
  section.id = 'contact'

  const title = data.sectionTitle || "Зв'яжіться з нами"
  const subtitleHtml = data.sectionSubtitle
    ? `<p class="section__subtitle">${escapeHtml(data.sectionSubtitle)}</p>`
    : ''

  const email = data.email || 'support@pharmastor.ua'
  const phone = data.phone || '+380 (44) 123-45-67'
  const address = data.address || 'м. Київ, вул. Госпітальна, 12, оф. 404'
  const formTitle = data.formTitle || 'Залишити заявку на демо-доступ'
  const submitLabel = data.submitLabel || 'Надіслати запит'

  section.innerHTML = `
    <div class="container">
      <div class="section__header">
        <h2 class="section__title">${escapeHtml(title)}</h2>
        ${subtitleHtml}
      </div>
      <div class="block-contact__grid">
        <div class="block-contact__info">
          <h3 class="block-contact__info-title">Консультація спеціаліста</h3>
          <p class="block-contact__info-text">
            Залиште заявку або зателефонуйте нам для отримання персональної демонстрації системи та розрахунку вартості впровадження.
          </p>
          <div class="block-contact__items">
            <div class="contact-meta">
              <div class="contact-meta__icon">📧</div>
              <div>
                <div class="contact-meta__label">Email</div>
                <a href="mailto:${email}" class="contact-meta__val">${escapeHtml(email)}</a>
              </div>
            </div>
            <div class="contact-meta">
              <div class="contact-meta__icon">📞</div>
              <div>
                <div class="contact-meta__label">Телефон</div>
                <a href="tel:${phone.replace(/[^\d+]/g, '')}" class="contact-meta__val">${escapeHtml(phone)}</a>
              </div>
            </div>
            <div class="contact-meta">
              <div class="contact-meta__icon">📍</div>
              <div>
                <div class="contact-meta__label">Адреса офісу</div>
                <div class="contact-meta__val">${escapeHtml(address)}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="block-contact__form-wrapper">
          <form class="contact-form" id="landing-contact-form">
            <h3 style="font-size:1.25rem; font-weight:700; color:var(--color-primary-dark); margin-bottom:8px;">
              ${escapeHtml(formTitle)}
            </h3>
            
            <div class="form-group">
              <label for="name">Ваше ім'я *</label>
              <input type="text" id="name" name="name" class="form-control" placeholder="Олександр Коваленко" required />
            </div>

            <div class="form-group">
              <label for="phone">Номер телефону *</label>
              <input type="tel" id="phone" name="phone" class="form-control" placeholder="+380 50 123 4567" required />
            </div>

            <div class="form-group">
              <label for="company">Назва аптечної мережі / складу</label>
              <input type="text" id="company" name="company" class="form-control" placeholder="Аптека Доброго Дня" />
            </div>

            <div class="form-group">
              <label for="message">Повідомлення або коментар</label>
              <textarea id="message" name="message" class="form-control" placeholder="Скільки у вас точок або складів?"></textarea>
            </div>

            <button type="submit" class="btn btn--primary" style="width: 100%; margin-top: 8px;">
              ${escapeHtml(submitLabel)}
            </button>
            <div id="form-feedback" style="display:none; padding:12px; border-radius:6px; font-size:0.9rem; text-align:center;"></div>
          </form>
        </div>
      </div>
    </div>
  `

  // Обробка форми з приємним UI-фідбеком
  const form = section.querySelector<HTMLFormElement>('#landing-contact-form')
  const feedback = section.querySelector<HTMLElement>('#form-feedback')

  if (form && feedback) {
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      const submitBtn = form.querySelector<HTMLButtonElement>('button[type="submit"]')
      if (submitBtn) submitBtn.disabled = true

      feedback.style.display = 'block'
      feedback.style.backgroundColor = '#d8f3dc'
      feedback.style.color = '#1b4332'
      feedback.textContent = 'Дякуємо! Ваша заявка успішно надіслана. Менеджер зв\'яжеться з вами найближчим часом.'
      
      form.reset()

      setTimeout(() => {
        if (submitBtn) submitBtn.disabled = false
      }, 3000)
    })
  }

  return section
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
