import type { HeroBlockData } from '../types'

/**
 * Рендерер блоку Hero (Головний банер).
 */
export function hero(data: HeroBlockData): HTMLElement {
  const section = document.createElement('section')
  section.className = 'section block-hero'
  section.id = 'hero'

  const badgeHtml = data.badge
    ? `<div class="badge"><span>💊</span> ${escapeHtml(data.badge)}</div>`
    : ''

  const subheadlineHtml = data.subheadline
    ? `<p class="block-hero__subheadline">${escapeHtml(data.subheadline)}</p>`
    : ''

  const ctaLabel = data.ctaLabel || 'Спробувати безкоштовно'
  const ctaUrl = data.ctaUrl || '#contact'

  const imageHtml = data.backgroundImage?.url
    ? `<img src="${data.backgroundImage.url}" alt="${escapeHtml(data.backgroundImage.alt || 'PharmaStor Dashboard')}" class="block-hero__image-preview" />`
    : `
      <div class="block-hero__placeholder">
        <div class="block-hero__placeholder-icon">🏥</div>
        <h3>PharmaStor 3.0</h3>
        <p>Автоматизація складського обліку ліків та фармпрепаратів</p>
      </div>
    `

  section.innerHTML = `
    <div class="container">
      <div class="block-hero__grid">
        <div class="block-hero__content">
          ${badgeHtml}
          <h1 class="block-hero__headline">${escapeHtml(data.headline)}</h1>
          ${subheadlineHtml}
          <div class="block-hero__actions">
            <a href="${ctaUrl}" class="btn btn--primary">${escapeHtml(ctaLabel)}</a>
            <a href="#about" class="btn btn--outline">Дізнатися більше</a>
          </div>
        </div>
        <div class="block-hero__media">
          <div class="block-hero__image-box">
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
