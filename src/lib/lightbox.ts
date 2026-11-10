import { createContext, useContext } from 'react'
import type { CaseStudyImage } from '../data/caseStudyTypes'

export const LightboxContext = createContext<(images: CaseStudyImage[], index: number) => void>(() => {})

/** Opens the case study lightbox on `images`, starting at `index`. */
export function useLightbox() {
  return useContext(LightboxContext)
}
