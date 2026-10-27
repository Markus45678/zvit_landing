import type { GlobalConfig } from 'payload'

/**
 * Header Global — глобальні дані для хедеру (логотип, навігація, CTA).
 */
export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Хедер',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'group',
      label: 'Логотип',
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Текст логотипу',
          defaultValue: 'PharmaStor',
        },
        {
          name: 'image',
          type: 'upload',
          label: 'Зображення логотипу',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'navLinks',
      type: 'array',
      label: 'Пункти навігації',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Назва',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL (anchor або шлях)',
          required: true,
        },
      ],
    },
    {
      name: 'ctaLabel',
      type: 'text',
      label: 'Текст кнопки CTA в хедері',
      defaultValue: 'Замовити демо',
    },
    {
      name: 'ctaUrl',
      type: 'text',
      label: 'URL кнопки CTA',
      defaultValue: '#contact',
    },
  ],
}
