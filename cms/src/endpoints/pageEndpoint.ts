import type { Endpoint } from 'payload'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const richTextToPlainText = (value: unknown): string => {
  if (!value || typeof value !== 'object') return ''
  if (Array.isArray(value)) return value.map(richTextToPlainText).join('')

  const node = value as Record<string, unknown>
  if (typeof node.text === 'string') return node.text
  if (node.root) return richTextToPlainText(node.root)
  if (node.children) return richTextToPlainText(node.children)
  return ''
}

/**
 * GET /api/page?path=/
 *
 * Повертає плоский JSON з масивом блоків для вказаного шляху.
 * Це "кастомний" ендпоінт, що оминає надмірну вкладеність стандартного REST API Payload.
 *
 * Приклад відповіді:
 * {
 *   "seo": { "metaTitle": "...", "metaDescription": "..." },
 *   "blocks": [
 *     { "blockType": "hero", "headline": "...", ... },
 *     { "blockType": "features", "items": [...], ... }
 *   ]
 * }
 */
export const pageEndpoint: Endpoint = {
  path: '/page',
  method: 'get',
  handler: async (req) => {
    try {
      const url = new URL(req.url ?? '/', 'http://localhost')
      const path = url.searchParams.get('path') || '/'

      const payload = await getPayload({ config: configPromise })

      const result = await payload.find({
        collection: 'pages',
        where: {
          path: { equals: path },
        },
        depth: 2, // розкрити пов'язані media (зображення)
        limit: 1,
      })

      const page = result.docs[0]

      if (!page) {
        return Response.json(
          { error: `Сторінку за шляхом "${path}" не знайдено` },
          { status: 404 },
        )
      }

      // Формуємо плоский масив блоків — кожен блок вже містить `blockType`
      const blocks = (page.layout ?? []).map((block: Record<string, unknown>) => {
        const normalized: Record<string, unknown> = { ...block, type: block.blockType }

        // Перетворюємо Lexical rich text на рядки для простого frontend-рендера.
        if (block.blockType === 'faq' && Array.isArray(block.items)) {
          normalized.items = block.items.map((item) => {
            if (!item || typeof item !== 'object') return item
            const faqItem = item as Record<string, unknown>
            return { ...faqItem, answer: richTextToPlainText(faqItem.answer) }
          })
        }

        return normalized
      })

      return Response.json({
        title: page.title,
        path: page.path,
        seo: page.seo ?? {},
        blocks,
      })
    } catch (error) {
      console.error('[pageEndpoint] Error:', error)
      return Response.json(
        { error: 'Внутрішня помилка сервера' },
        { status: 500 },
      )
    }
  },
}
