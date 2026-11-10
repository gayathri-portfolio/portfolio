import type { Block } from '../data/caseStudyTypes'
import { imageSizes } from '../data/imageSizes'

/** The one style for every small label on the case study pages (eyebrows,
 * captions, callout and note labels). Colour is never carried by labels. */
export const LABEL = 'text-xs font-semibold uppercase tracking-[0.08em] text-text-muted'

/** width/height attributes for a case study image, so the browser reserves
 * its space before it loads and the page doesn't shift while scrolling. */
export function imageDims(src: string): { width?: number; height?: number } {
  const base = import.meta.env.BASE_URL
  const key = src.startsWith(base) ? src.slice(base.length) : src.replace(/^\//, '')
  const size = imageSizes[key]
  return size ? { width: size[0], height: size[1] } : {}
}

/** Blocks that span the full width of their section (outside any column). */
export function isFullBleed(block: Block) {
  return block.kind === 'highlight'
}

/** Blocks that need more room than the text column: screens and diagrams. */
export function isWide(block: Block) {
  return (
    block.kind === 'image-grid' ||
    block.kind === 'compare-images' ||
    block.kind === 'image' ||
    block.kind === 'steps' ||
    block.kind === 'flow'
  )
}
