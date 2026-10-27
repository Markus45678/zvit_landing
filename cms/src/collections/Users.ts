import type { CollectionConfig } from 'payload'

/**
 * Колекція Users — стандартна, автоматично підключається до Payload Admin Panel.
 */
export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: "Ім'я",
    },
  ],
}
