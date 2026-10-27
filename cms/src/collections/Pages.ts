import type { CollectionConfig } from 'payload'
import { HeroBlock } from '../blocks/HeroBlock'
import { FeaturesBlock } from '../blocks/FeaturesBlock'
import { AboutBlock } from '../blocks/AboutBlock'
import { PricingBlock } from '../blocks/PricingBlock'
import { TeamBlock } from '../blocks/TeamBlock'
import { TestimonialsBlock } from '../blocks/TestimonialsBlock'
import { FaqBlock } from '../blocks/FaqBlock'
import { ContactBlock } from '../blocks/ContactBlock'

/**
 * Колекція Pages — одна сторінка = набір блоків.
 * Кожен документ має поле `path` (напр. "/") та масив `layout` (блоки).
 */
export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'path', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Назва сторінки',
      required: true,
    },
    {
      name: 'path',
      type: 'text',
      label: 'URL-шлях',
      required: true,
      unique: true,
      admin: {
        description: 'Напр. "/" для головної сторінки',
      },
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          label: 'Meta Title',
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Meta Description',
        },
      ],
    },
    // ── Block-based layout ─────────────────────────────────────────────────
    {
      name: 'layout',
      type: 'blocks',
      label: 'Секції сторінки',
      blocks: [
        HeroBlock,
        FeaturesBlock,
        AboutBlock,
        PricingBlock,
        TeamBlock,
        TestimonialsBlock,
        FaqBlock,
        ContactBlock,
      ],
    },
  ],
}
