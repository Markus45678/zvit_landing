import type { Block } from 'payload'

/**
 * HeroBlock — головний банер з заголовком, підзаголовком, CTA-кнопкою та фоновим зображенням.
 */
export const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero Банер',
    plural: 'Hero Банери',
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
      label: 'Заголовок',
      required: true,
    },
    {
      name: 'subheadline',
      type: 'textarea',
      label: 'Підзаголовок',
    },
    {
      name: 'ctaLabel',
      type: 'text',
      label: 'Текст кнопки CTA',
      defaultValue: 'Спробувати безкоштовно',
    },
    {
      name: 'ctaUrl',
      type: 'text',
      label: 'URL кнопки CTA',
      defaultValue: '#contact',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      label: 'Фонове зображення',
      relationTo: 'media',
    },
    {
      name: 'badge',
      type: 'text',
      label: 'Бейдж (напр. "✓ Довіряють 500+ аптек")',
    },
  ],
}
