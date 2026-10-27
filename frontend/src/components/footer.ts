import type { FooterData } from '../types'

/**
 * Рендерер глобального компоненту Footer.
 */
export function renderFooter(data: FooterData): HTMLElement {
  const container = document.createElement('div')
  container.className = 'site-footer'

  const copyright = data.copyright || '© 2026 PharmaStor. Всі права захищені.'

  const linksHtml = (data.footerLinks || [])
    .map(
      (link) => `
      <a href="${link.url}" class="site-footer__link">${escapeHtml(link.label)}</a>
    `
    )
    .join('')

  const socialsHtml = (data.socialLinks || [])
    .map((s) => {
      const icon = getSocialIcon(s.platform)
      return `
        <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="site-footer__social-link" title="${s.platform}">
          ${icon}
        </a>
      `
    })
    .join('')

  container.innerHTML = `
    <div class="container site-footer__container">
      <div class="site-footer__top">
        <div class="site-footer__brand">🌿 PharmaStor</div>
        <nav class="site-footer__links">
          ${linksHtml}
        </nav>
      </div>
      <div class="site-footer__bottom">
        <div>${escapeHtml(copyright)}</div>
        <div class="site-footer__socials">
          ${socialsHtml}
        </div>
      </div>
    </div>
  `

  return container
}

function getSocialIcon(platform: string): string {
  switch (platform) {
    case 'facebook':
      return 'FB'
    case 'instagram':
      return 'IG'
    case 'linkedin':
      return 'IN'
    case 'telegram':
      return 'TG'
    case 'youtube':
      return 'YT'
    default:
      return '🔗'
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
