import type { TestimonialsBlockData } from '../types'

/**
 * Рендерер блоку Testimonials (Відгуки клієнтів).
 */
export function testimonials(data: TestimonialsBlockData): HTMLElement {
  const section = document.createElement('section')
  section.className = 'section block-testimonials'
  section.id = 'testimonials'

  const title = data.sectionTitle || 'Відгуки наших клієнтів'

  const itemsHtml = (data.items || [])
    .map((item) => {
      const starsCount = Math.min(5, Math.max(1, item.rating || 5))
      const stars = '★'.repeat(starsCount) + '☆'.repeat(5 - starsCount)

      const avatarHtml = item.authorPhoto?.url
        ? `<img src="${item.authorPhoto.url}" alt="${escapeHtml(item.authorName)}" class="testimonial-card__author-avatar" />`
        : `<div class="testimonial-card__author-avatar">${escapeHtml(item.authorName.charAt(0) || '👤')}</div>`

      const posHtml = item.authorPosition
        ? `<div class="testimonial-card__author-pos">${escapeHtml(item.authorPosition)}</div>`
        : ''

      return `
        <div class="testimonial-card">
          <div class="testimonial-card__rating">${stars}</div>
          <p class="testimonial-card__quote">"${escapeHtml(item.quote)}"</p>
          <div class="testimonial-card__author">
            ${avatarHtml}
            <div>
              <div class="testimonial-card__author-name">${escapeHtml(item.authorName)}</div>
              ${posHtml}
            </div>
          </div>
        </div>
      `
    })
    .join('')

  section.innerHTML = `
    <div class="container">
      <div class="section__header">
        <h2 class="section__title">${escapeHtml(title)}</h2>
      </div>
      <div class="block-testimonials__grid">
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
