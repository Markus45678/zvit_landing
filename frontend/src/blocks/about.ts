import type { AboutBlockData } from '../types'

/**
 * Рендерер блоку About (Про систему / компанію зі статистикою).
 */
export function about(data: AboutBlockData): HTMLElement {
  const section = document.createElement('section')
  section.className = 'section section--alt block-about'
  section.id = 'about'

  const title = data.sectionTitle || 'Про нас'
  const isReverse = data.imagePosition === 'left'

  // Статистика
  const statsHtml =
    data.stats && data.stats.length > 0
      ? `
        <div class="block-about__stats">
          ${data.stats
            .map(
              (stat) => `
              <div class="stat-item">
                <div class="stat-item__value">${escapeHtml(stat.value)}</div>
                <div class="stat-item__label">${escapeHtml(stat.label)}</div>
              </div>
            `
            )
            .join('')}
        </div>
      `
      : ''

  // Зображення
  const imageHtml = data.image?.url
    ? `<img src="${data.image.url}" alt="${escapeHtml(data.image.alt || 'Про систему PharmaStor')}" style="width: 100%; height: 100%; object-fit: cover;" />`
    : `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; padding:40px; background:linear-gradient(135deg, #d8f3dc, #faf7f2); text-align:center;">
        <span style="font-size:3.5rem; margin-bottom:12px;">📊</span>
        <h4 style="color:#1b4332; font-size:1.25rem; font-weight:700;">100% Контроль складу</h4>
        <p style="color:#4b5563; font-size:0.9rem; margin-top:8px;">Від постачальника до вітрини аптеки в один клік</p>
      </div>
    `

  section.innerHTML = `
    <div class="container">
      <div class="block-about__grid ${isReverse ? 'block-about__grid--reverse' : ''}">
        <div class="block-about__content">
          <div class="badge">Про платформу</div>
          <h2 class="section__title">${escapeHtml(title)}</h2>
          <div class="block-about__text">
            <p>PharmaStor розроблено спеціально для фармацевтичної галузі з урахуванням суворих вимог GDP (Good Distribution Practice). Ми автоматизуємо облік серій, партій, термінів придатності та температурних режимів зберігання медикаментів.</p>
          </div>
          ${statsHtml}
        </div>
        <div class="block-about__media">
          <div class="block-about__image-wrapper">
            ${imageHtml}
          </div>
        </div>
      </div>
    </div>
  `

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
