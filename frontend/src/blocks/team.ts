import type { TeamBlockData } from '../types'

/**
 * Рендерер блоку Team (Команда проєкту).
 */
export function team(data: TeamBlockData): HTMLElement {
  const section = document.createElement('section')
  section.className = 'section section--alt block-team'
  section.id = 'team'

  const title = data.sectionTitle || 'Наша команда'
  const subtitleHtml = data.sectionSubtitle
    ? `<p class="section__subtitle">${escapeHtml(data.sectionSubtitle)}</p>`
    : ''

  const membersHtml = (data.members || [])
    .map((member) => {
      const avatarHtml = member.photo?.url
        ? `<img src="${member.photo.url}" alt="${escapeHtml(member.name)}" class="team-card__avatar" />`
        : `<div class="team-card__avatar">${escapeHtml(member.name.charAt(0) || '👤')}</div>`

      const bioHtml = member.bio
        ? `<p class="team-card__bio">${escapeHtml(member.bio)}</p>`
        : ''

      const linkedinHtml = member.linkedinUrl
        ? `<div class="team-card__social"><a href="${member.linkedinUrl}" target="_blank" rel="noopener noreferrer">LinkedIn &rarr;</a></div>`
        : ''

      return `
        <div class="team-card">
          ${avatarHtml}
          <h3 class="team-card__name">${escapeHtml(member.name)}</h3>
          <div class="team-card__position">${escapeHtml(member.position)}</div>
          ${bioHtml}
          ${linkedinHtml}
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
      <div class="block-team__grid">
        ${membersHtml}
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
