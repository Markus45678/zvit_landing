import type { CollectionConfig } from 'payload'

/**
 * Колекція Media — для завантаження зображень (аватари команди, фони блоків тощо).
 */
export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
  },
  upload: true,
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alt текст',
      required: true,
    },
  ],
}
