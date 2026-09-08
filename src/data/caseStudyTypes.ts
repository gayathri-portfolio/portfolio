export interface CaseStudyMeta {
  role: string
  team: string
  responsibilities: string[]
  company: string
  industry: string
}

export type Block =
  | { kind: 'p'; text: string }
  | { kind: 'callout'; label: string; text: string }
  | { kind: 'quote'; text: string }
  | { kind: 'cards'; items: { icon: string; title: string; text: string }[] }
  | { kind: 'image'; src: string; caption?: string; wide?: boolean }
  | { kind: 'compare'; before: string[]; after: string[] }
  | { kind: 'list'; items: string[] }
  | { kind: 'stat-grid'; items: { label: string; value: string }[] }
  | { kind: 'highlight'; text: string }

export interface CaseStudySection {
  number: string
  title: string
  blocks: Block[]
}

export interface CaseStudyContent {
  slug: string
  title: string
  tagline: string
  intro: string
  heroImage: string
  meta: CaseStudyMeta
  sections: CaseStudySection[]
  reflection: string
  learnings: string
}
