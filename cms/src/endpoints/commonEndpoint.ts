import type { Endpoint } from 'payload'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

/**
 * GET /api/common
 *
 * Повертає глобальні дані: header та footer.
 * Фронтенд звертається до цього ендпоінту один раз при завантаженні.
 *
 * Приклад відповіді:
 * {
 *   "header": { "logo": { "text": "PharmaStor" }, "navLinks": [...], "ctaLabel": "..." },
 *   "footer": { "copyright": "...", "footerLinks": [...], "socialLinks": [...] }
 * }
 */
export const commonEndpoint: Endpoint = {
  path: '/common',
  method: 'get',
  handler: async () => {
    try {
      const payload = await getPayload({ config: configPromise })

      // Паралельно отримуємо header та footer globals
      const [header, footer] = await Promise.all([
        payload.findGlobal({ slug: 'header', depth: 1 }),
        payload.findGlobal({ slug: 'footer', depth: 1 }),
      ])

      return Response.json({ header, footer })
    } catch (error) {
      console.error('[commonEndpoint] Error:', error)
      return Response.json(
        { error: 'Внутрішня помилка сервера' },
        { status: 500 },
      )
    }
  },
}
