import type { Block } from 'payload'

/**
 * FeaturesBlock — секція з переліком ключових переваг (іконка + заголовок + опис).
 */
export const FeaturesBlock: Block = {
  slug: 'features',
  labels: {
    singular: 'Переваги',
    plural: 'Переваги',
  },
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Заголовок секції',
      defaultValue: 'Чому обирають PharmaStor?',
    },
    {
      name: 'sectionSubtitle',
      type: 'textarea',
      label: 'Підзаголовок секції',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Переваги',
      minRows: 3,
      maxRows: 6,
      fields: [
        {
          name: 'icon',
          type: 'text',
          label: 'Emoji або назва іконки (напр. "💊" або "shield")',
        },
        {
          name: 'title',
          type: 'text',
          label: 'Заголовок',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Опис',
          required: true,
        },
      ],
    },
  ],
}
