import type { Block } from 'payload'

/**
 * ContactBlock — контактна форма та інформація про зв'язок.
 */
export const ContactBlock: Block = {
  slug: 'contact',
  labels: {
    singular: 'Контакти / Форма',
    plural: 'Контакти / Форма',
  },
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Заголовок секції',
      defaultValue: 'Зв\'яжіться з нами',
    },
    {
      name: 'sectionSubtitle',
      type: 'textarea',
      label: 'Підзаголовок',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email для зв\'язку',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Телефон',
    },
    {
      name: 'address',
      type: 'textarea',
      label: 'Адреса',
    },
    {
      name: 'formTitle',
      type: 'text',
      label: 'Заголовок форми',
      defaultValue: 'Надіслати запит',
    },
    {
      name: 'submitLabel',
      type: 'text',
      label: 'Текст кнопки відправки',
      defaultValue: 'Надіслати',
    },
  ],
}
