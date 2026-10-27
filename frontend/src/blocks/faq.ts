import type { FaqBlockData } from '../types'

/**
 * Рендерер блоку FAQ (Часті запитання з інтерактивним акордеоном).
 */
export function faq(data: FaqBlockData): HTMLElement {
  const section = document.createElement('section')
  section.className = 'section section--alt block-faq'
  section.id = 'faq'

  const title = data.sectionTitle || 'Часті запитання'

  const itemsHtml = (data.items || [])
    .map((item, index) => {
      // Простий рендер відповіді (якщо це рядок або об'єкт)
      const answerText =
        typeof item.answer === 'string'
          ? item.answer
          : 'Детальна інформація доступна в інструкції користувача або за запитом до служби підтримки.'

      return `
        <div class="faq-item ${index === 0 ? 'faq-item--open' : ''}" data-faq-index="${index}">
          <button type="button" class="faq-item__header" aria-expanded="${index === 0}">
            <span>${escapeHtml(item.question)}</span>
            <span class="faq-item__icon">+</span>
          </button>
          <div class="faq-item__body">
            <p>${escapeHtml(answerText)}</p>
          </div>
        </div>
      `
    })
    .join('')

  section.innerHTML = `
    <div class="container">
      <div class="section__header">
        <h2 class="section__title">${escapeHtml(title)}</h2>
        <p class="section__subtitle">Відповіді на найпопулярніші запитання щодо впровадження та роботи з системою</p>
      </div>
      <div class="block-faq__list">
        ${itemsHtml}
      </div>
    </div>
  `

  // Додаємо інтерактивні кліки для акордеона
  const headers = section.querySelectorAll('.faq-item__header')
  headers.forEach((header) => {
    header.addEventListener('click', () => {
      const parent = header.closest('.faq-item')
      if (!parent) return

      const isOpen = parent.classList.contains('faq-item--open')
      
      // Закриваємо всі сусідні (опціонально: акордеон режим)
      section.querySelectorAll('.faq-item').forEach((item) => {
        item.classList.remove('faq-item--open')
        item.querySelector('.faq-item__header')?.setAttribute('aria-expanded', 'false')
      })

      if (!isOpen) {
        parent.classList.add('faq-item--open')
        header.setAttribute('aria-expanded', 'true')
      }
    })
  })

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
