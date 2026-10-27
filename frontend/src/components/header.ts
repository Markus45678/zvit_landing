import type { HeaderData } from '../types'

/**
 * Рендерер глобального компоненту Header.
 */
export function renderHeader(data: HeaderData): HTMLElement {
  const container = document.createElement('div')
  container.className = 'site-header'

  const logoText = data.logo?.text || 'PharmaStor'
  const logoImage = data.logo?.image?.url
    ? `<img src="${data.logo.image.url}" alt="${logoText}" style="height: 36px;" />`
    : `<span class="site-header__logo-icon">🌿</span> <span>${escapeHtml(logoText)}</span>`

  const navLinksHtml = (data.navLinks || [])
    .map(
      (link) => `
      <a href="${link.url}" class="site-header__nav-link">${escapeHtml(link.label)}</a>
    `
    )
    .join('')

  const ctaLabel = data.ctaLabel || 'Замовити демо'
  const ctaUrl = data.ctaUrl || '#contact'

  container.innerHTML = `
    <div class="container site-header__container">
      <a href="#hero" class="site-header__logo">
        ${logoImage}
      </a>
      <button class="site-header__menu-toggle" type="button" aria-label="Відкрити меню" aria-expanded="false" aria-controls="site-navigation">
        <span aria-hidden="true">☰</span>
      </button>
      <nav id="site-navigation" class="site-header__nav" aria-label="Головна навігація">
        ${navLinksHtml}
      </nav>
      <div class="site-header__actions">
        <a href="${ctaUrl}" class="btn btn--primary">${escapeHtml(ctaLabel)}</a>
      </div>
    </div>
  `

  const menuToggle = container.querySelector<HTMLButtonElement>('.site-header__menu-toggle')
  const nav = container.querySelector<HTMLElement>('.site-header__nav')

  menuToggle?.addEventListener('click', () => {
    const isOpen = nav?.classList.toggle('site-header__nav--open') ?? false
    menuToggle.setAttribute('aria-expanded', String(isOpen))
    menuToggle.setAttribute('aria-label', isOpen ? 'Закрити меню' : 'Відкрити меню')
  })

  nav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('site-header__nav--open')
      menuToggle?.setAttribute('aria-expanded', 'false')
      menuToggle?.setAttribute('aria-label', 'Відкрити меню')
    })
  })

  return container
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
