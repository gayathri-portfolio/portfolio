import type { CaseStudyContent } from './caseStudyTypes'
import { ultragymPro } from './ultragymPro'
import { ultragymUxStudy } from './ultragymUxStudy'

/** Full case study content by slug, so one study's page can show another's
 * visuals (e.g. the hero visual on the "Next case study" card). */
export const caseStudyContent: Record<string, CaseStudyContent> = {
  [ultragymPro.slug]: ultragymPro,
  [ultragymUxStudy.slug]: ultragymUxStudy,
}
