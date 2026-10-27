import type { Block } from 'payload'

/**
 * FaqBlock — секція часто задаваних питань (accordion).
 */
export const FaqBlock: Block = {
  slug: 'faq',
  labels: {
    singular: 'FAQ',
    plural: 'FAQ',
  },
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Заголовок секції',
      defaultValue: 'Часті запитання',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Питання та відповіді',
      minRows: 3,
      maxRows: 15,
      fields: [
        {
          name: 'question',
          type: 'text',
          label: 'Питання',
          required: true,
        },
        {
          name: 'answer',
          type: 'richText',
          label: 'Відповідь',
          required: true,
        },
      ],
    },
  ],
}
