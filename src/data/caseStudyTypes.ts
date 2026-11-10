export interface CaseStudyMeta {
  role: string
  team: string
  responsibilities: string[]
  company: string
  industry: string
}

/** Icons available to `cards` blocks, mapped to lucide icons in CaseStudyBlocks. */
export type CardIcon = 'decisions' | 'sliders' | 'history' | 'phone' | 'users'

export interface CaseStudyImage {
  src: string
  /** describes what the screen shows, for screen readers and the zoom view */
  alt: string
  caption?: string
  /** one line on what this variation does or why it changed */
  note?: string
}

export type Block =
  | { kind: 'p'; text: string }
  | { kind: 'subheading'; eyebrow?: string; text: string }
  | { kind: 'callout'; label?: string; text: string }
  /** the author's own observation, insight or a principle — labelled, never in quotation marks */
  | { kind: 'note'; label: string; text: string }
  | { kind: 'cards'; items: { icon?: CardIcon; title: string; text: string }[] }
  | { kind: 'image'; src: string; alt: string; caption?: string; wide?: boolean }
  | { kind: 'image-grid'; images: CaseStudyImage[]; dark?: boolean }
  | { kind: 'compare-images'; before: CaseStudyImage; after: CaseStudyImage }
  | { kind: 'list'; items: string[] }
  | { kind: 'stat-grid'; items: { label: string; value: string }[] }
  | { kind: 'highlight'; text: string }
  /** a linear process drawn as numbered steps, with an optional footnote */
  | { kind: 'steps'; items: string[]; note?: string }
  /** a looping flow with a failure branch */
  | {
      kind: 'flow'
      steps: { title: string; text: string }[]
      loop: string
      branch: { title: string; conditions: string[]; outcome: string }
      note?: string
    }

export interface CaseStudySection {
  number: string
  title: string
  /** small label above the title, e.g. "Solution 1 of 5" */
  eyebrow?: string
  blocks: Block[]
}

export interface CaseStudyReflection {
  paragraphs?: string[]
  points?: string[]
}

export interface CaseStudyGlance {
  problem: string
  role: string
  changed: string
}

/** Measured outcomes. The Results section only renders when stats are present. */
export interface CaseStudyResults {
  status?: string
  stats: { value: string; label: string }[]
}

export interface CaseStudyContent {
  slug: string
  title: string
  tagline: string
  intro: string
  /** the visual shown beside the hero text; one image, or two device screens */
  heroVisual: { src: string; alt: string }[]
  glance: CaseStudyGlance
  meta: CaseStudyMeta
  sections: CaseStudySection[]
  results?: CaseStudyResults
  reflection: CaseStudyReflection
}
