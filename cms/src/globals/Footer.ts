import type { GlobalConfig } from 'payload'

/**
 * Footer Global — глобальні дані для футеру (копірайт, посилання, соцмережі).
 */
export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Футер',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'copyright',
      type: 'text',
      label: 'Текст копірайту',
      defaultValue: '© 2024 PharmaStor. Всі права захищені.',
    },
    {
      name: 'footerLinks',
      type: 'array',
      label: 'Посилання у футері',
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
          label: 'URL',
          required: true,
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Соціальні мережі',
      fields: [
        {
          name: 'platform',
          type: 'select',
          label: 'Платформа',
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Telegram', value: 'telegram' },
            { label: 'YouTube', value: 'youtube' },
          ],
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          required: true,
        },
      ],
    },
  ],
}
