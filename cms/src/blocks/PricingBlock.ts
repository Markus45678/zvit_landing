import type { Block } from 'payload'

/**
 * PricingBlock — секція з тарифами (Basic, Pro, Enterprise).
 */
export const PricingBlock: Block = {
  slug: 'pricing',
  labels: {
    singular: 'Тарифи',
    plural: 'Тарифи',
  },
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Заголовок секції',
      defaultValue: 'Обери свій план',
    },
    {
      name: 'sectionSubtitle',
      type: 'textarea',
      label: 'Підзаголовок секції',
    },
    {
      name: 'plans',
      type: 'array',
      label: 'Тарифні плани',
      minRows: 2,
      maxRows: 4,
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Назва плану',
          required: true,
        },
        {
          name: 'price',
          type: 'text',
          label: 'Ціна (напр. "₴2 500 / міс")',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Короткий опис',
        },
        {
          name: 'features',
          type: 'array',
          label: 'Що входить',
          fields: [
            {
              name: 'feature',
              type: 'text',
              label: 'Пункт',
              required: true,
            },
          ],
        },
        {
          name: 'ctaLabel',
          type: 'text',
          label: 'Текст кнопки',
          defaultValue: 'Обрати план',
        },
        {
          name: 'ctaUrl',
          type: 'text',
          label: 'URL кнопки',
          defaultValue: '#contact',
        },
        {
          name: 'isHighlighted',
          type: 'checkbox',
          label: 'Виділений план (Popular)',
          defaultValue: false,
        },
      ],
    },
  ],
}
