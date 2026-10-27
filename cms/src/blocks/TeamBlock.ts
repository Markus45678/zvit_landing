import type { Block } from 'payload'

/**
 * TeamBlock — секція з членами команди.
 */
export const TeamBlock: Block = {
  slug: 'team',
  labels: {
    singular: 'Команда',
    plural: 'Команда',
  },
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Заголовок секції',
      defaultValue: 'Наша команда',
    },
    {
      name: 'sectionSubtitle',
      type: 'textarea',
      label: 'Підзаголовок',
    },
    {
      name: 'members',
      type: 'array',
      label: 'Члени команди',
      minRows: 2,
      maxRows: 8,
      fields: [
        {
          name: 'name',
          type: 'text',
          label: "Ім'я",
          required: true,
        },
        {
          name: 'position',
          type: 'text',
          label: 'Посада',
          required: true,
        },
        {
          name: 'bio',
          type: 'textarea',
          label: 'Короткий опис',
        },
        {
          name: 'photo',
          type: 'upload',
          label: 'Фото',
          relationTo: 'media',
        },
        {
          name: 'linkedinUrl',
          type: 'text',
          label: 'LinkedIn URL',
        },
      ],
    },
  ],
}
