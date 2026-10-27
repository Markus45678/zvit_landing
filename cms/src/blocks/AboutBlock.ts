import type { Block } from 'payload'

/**
 * AboutBlock — секція "Про нас / Про продукт" з текстом та зображенням.
 */
export const AboutBlock: Block = {
  slug: 'about',
  labels: {
    singular: 'Про продукт',
    plural: 'Про продукт',
  },
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Заголовок',
      defaultValue: 'Про PharmaStor',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Контент (Rich Text)',
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Зображення',
      relationTo: 'media',
    },
    {
      name: 'imagePosition',
      type: 'select',
      label: 'Позиція зображення',
      defaultValue: 'right',
      options: [
        { label: 'Праворуч', value: 'right' },
        { label: 'Ліворуч', value: 'left' },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Статистика',
      maxRows: 4,
      fields: [
        {
          name: 'value',
          type: 'text',
          label: 'Значення (напр. "500+")',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Підпис (напр. "Аптек-клієнтів")',
          required: true,
        },
      ],
    },
  ],
}
