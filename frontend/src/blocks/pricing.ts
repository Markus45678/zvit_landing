import type { PricingBlockData } from '../types'

/**
 * Рендерер блоку Pricing (Тарифні плани).
 */
export function pricing(data: PricingBlockData): HTMLElement {
  const section = document.createElement('section')
  section.className = 'section block-pricing'
  section.id = 'pricing'

  const title = data.sectionTitle || 'Тарифні плани'
  const subtitleHtml = data.sectionSubtitle
    ? `<p class="section__subtitle">${escapeHtml(data.sectionSubtitle)}</p>`
    : ''

  const plansHtml = (data.plans || [])
    .map((plan) => {
      const isPopular = plan.isHighlighted
      const badgeHtml = isPopular
        ? `<div class="pricing-card__badge">Популярний вибір</div>`
        : ''

      const featuresHtml = (plan.features || [])
        .map((f) => `<li>${escapeHtml(f.feature)}</li>`)
        .join('')

      const ctaLabel = plan.ctaLabel || 'Обрати тариф'
      const ctaUrl = plan.ctaUrl || '#contact'

      return `
        <div class="pricing-card ${isPopular ? 'pricing-card--highlighted' : ''}">
          ${badgeHtml}
          <h3 class="pricing-card__name">${escapeHtml(plan.name)}</h3>
          <div class="pricing-card__price">${escapeHtml(plan.price)}</div>
          <p class="pricing-card__desc">${escapeHtml(plan.description || '')}</p>
          <ul class="pricing-card__features">
            ${featuresHtml}
          </ul>
          <a href="${ctaUrl}" class="btn ${isPopular ? 'btn--primary' : 'btn--outline'}">
            ${escapeHtml(ctaLabel)}
          </a>
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
      <div class="block-pricing__grid">
        ${plansHtml}
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
