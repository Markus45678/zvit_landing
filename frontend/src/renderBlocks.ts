import type { AnyBlock } from './types'
import { hero } from './blocks/hero'
import { features } from './blocks/features'
import { about } from './blocks/about'
import { pricing } from './blocks/pricing'
import { team } from './blocks/team'
import { testimonials } from './blocks/testimonials'
import { faq } from './blocks/faq'
import { contact } from './blocks/contact'

// Словник відповідності типів блоків та їх функцій рендерингу
type RendererFn = (data: any) => HTMLElement

const renderers: Record<string, RendererFn> = {
  hero,
  features,
  about,
  pricing,
  team,
  testimonials,
  faq,
  contact,
}

/**
 * renderBlocks — оркестратор блоків лендінгу (за зразком bosco_landing_lesson).
 * Приймає масив блоків з Payload API та викликає відповідний рендерер для кожного типу.
 *
 * @param blocks - Масив блоків сторінки
 * @returns Масив згенерованих DOM HTMLElement
 */
export function renderBlocks(blocks: AnyBlock[]): HTMLElement[] {
  if (!Array.isArray(blocks) || blocks.length === 0) {
    return []
  }

  const elements: HTMLElement[] = []

  for (const block of blocks) {
    const blockObj = block as unknown as Record<string, any>
    const blockType = (blockObj.type || blockObj.blockType) as string

    const renderer = renderers[blockType]

    if (typeof renderer === 'function') {
      try {
        const el = renderer(block)
        if (el instanceof HTMLElement) {
          elements.push(el)
        }
      } catch (err) {
        console.error(`[renderBlocks] Помилка рендерингу блоку "${blockType}":`, err)
      }
    } else {
      console.warn(`[renderBlocks] Невідомий або непідтримуваний тип блоку: "${blockType}"`)
    }
  }

  return elements
}
