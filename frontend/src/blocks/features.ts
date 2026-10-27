import type { FeaturesBlockData } from '../types'

/**
 * Рендерер блоку Features (Переваги системи).
 */
export function features(data: FeaturesBlockData): HTMLElement {
  const section = document.createElement('section')
  section.className = 'section block-features'
  section.id = 'features'

  const title = data.sectionTitle || 'Ключові можливості PharmaStor'
  const subtitleHtml = data.sectionSubtitle
    ? `<p class="section__subtitle">${escapeHtml(data.sectionSubtitle)}</p>`
    : ''

  const itemsHtml = (data.items || [])
    .map((item) => {
      const icon = item.icon || '📦'
      return `
        <div class="feature-card">
          <div class="feature-card__icon">${escapeHtml(icon)}</div>
          <h3 class="feature-card__title">${escapeHtml(item.title)}</h3>
          <p class="feature-card__description">${escapeHtml(item.description)}</p>
        </div>
      `
    })
    .join('')

  section.innerHTML = `
    <div class="container">
      <div class="section__header">
        <h2 class="section__title">${escapeHtml(title)}</h2>
        ${subtitleHtml}
      </div>
      <div class="block-features__grid">
        ${itemsHtml}
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
