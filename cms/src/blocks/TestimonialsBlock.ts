import type { Block } from 'payload'

/**
 * TestimonialsBlock — секція з відгуками клієнтів.
 */
export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  labels: {
    singular: 'Відгуки',
    plural: 'Відгуки',
  },
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Заголовок секції',
      defaultValue: 'Що кажуть наші клієнти',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Відгуки',
      minRows: 1,
      maxRows: 9,
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          label: 'Текст відгуку',
          required: true,
        },
        {
          name: 'authorName',
          type: 'text',
          label: 'Ім\'я автора',
          required: true,
        },
        {
          name: 'authorPosition',
          type: 'text',
          label: 'Посада / Компанія',
        },
        {
          name: 'authorPhoto',
          type: 'upload',
          label: 'Фото автора',
          relationTo: 'media',
        },
        {
          name: 'rating',
          type: 'number',
          label: 'Рейтинг (1-5)',
          min: 1,
          max: 5,
          defaultValue: 5,
        },
      ],
    },
  ],
}
