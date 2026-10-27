/**
 * api.ts — Fetch-обгортка для запитів до Payload CMS API.
 *
 * Використовує змінну `VITE_API_URL` з .env.
 * Кожен запит обгорнутий у try/catch на рівні виклику (у main.ts).
 */

import type { PageApiResponse, CommonData } from './types'

const API_URL = import.meta.env.VITE_API_URL ?? ''

/**
 * Базова функція для JSON-запитів.
 * Кидає помилку при HTTP-статусах != 2xx.
 */
async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(
      `HTTP ${response.status}: не вдалося завантажити ${path}`
    )
  }

  return response.json() as Promise<T>
}

/**
 * Отримує глобальні дані (header + footer).
 */
export function getCommon(): Promise<CommonData> {
  return getJson<CommonData>('/api/common')
}

/**
 * Отримує дані сторінки за шляхом (блоки, SEO тощо).
 * @param path — URL-шлях сторінки, напр. "/"
 */
export function getPage(path: string): Promise<PageApiResponse> {
  return getJson<PageApiResponse>(`/api/page?path=${encodeURIComponent(path)}`)
}
