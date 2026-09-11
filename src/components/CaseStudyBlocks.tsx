import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import type { Block } from '../data/caseStudyTypes'
import { PawIcon } from './PawIcon'
import { Check, X } from 'lucide-react'

export function BlockRenderer({ block }: { block: Block }) {
  switch (block.kind) {
    case 'p':
      return (
        <Reveal>
          <p className="text-lg leading-relaxed text-text-muted">{block.text}</p>
        </Reveal>
      )

    case 'highlight':
      return (
        <Reveal>
          <p className="rounded-2xl bg-accent-2-soft px-6 py-5 text-lg font-medium text-accent-2">
            {block.text}
          </p>
        </Reveal>
      )

    case 'callout':
      return (
        <Reveal>
          <div className="rounded-2xl border border-accent/25 bg-accent-soft/60 p-6 backdrop-blur-md">
            <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-accent">
              <PawIcon className="h-3.5 w-3.5" />
              {block.label}
            </p>
            <p className="text-xl font-medium text-text">{block.text}</p>
          </div>
        </Reveal>
      )

    case 'quote':
      return (
        <Reveal>
          <blockquote className="border-l-2 border-accent py-1 pl-6 font-serif text-2xl italic leading-snug text-text sm:text-3xl">
            “{block.text}”
          </blockquote>
        </Reveal>
      )

    case 'cards':
      return (
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {block.items.map((item, i) => (
              <div key={i} className="glass rounded-2xl p-5">
                <span className="text-2xl">{item.icon}</span>
                <h4 className="mt-3 font-display text-base font-semibold text-text">{item.title}</h4>
                <p className="mt-1.5 text-sm text-text-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      )

    case 'image':
      return (
        <Reveal>
          <figure className="overflow-hidden rounded-2xl border border-border bg-bg-elevated">
            <img src={block.src} alt={block.caption ?? ''} loading="lazy" className="w-full" />
            {block.caption && (
              <figcaption className="border-t border-border px-5 py-3 text-center text-sm text-text-faint">
                {block.caption}
              </figcaption>
            )}
          </figure>
        </Reveal>
      )

    case 'compare':
      return (
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="glass rounded-2xl p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-text-faint">Before</p>
              <ul className="space-y-2.5">
                {block.before.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm text-text-muted">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-text-faint" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-accent/30 bg-accent-soft/40 p-5 backdrop-blur-md">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-accent">After</p>
              <ul className="space-y-2.5">
                {block.after.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm text-text">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      )

    case 'list':
      return (
        <Reveal>
          <ul className="space-y-3">
            {block.items.map((item, i) => (
              <li key={i} className="flex gap-3 text-text-muted">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-lg leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      )

    case 'stat-grid':
      return (
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            {block.items.map((item, i) => (
              <div key={i} className="glass rounded-2xl p-5 text-center">
                <p className="font-display text-3xl font-semibold text-accent">{item.value}</p>
                <p className="mt-1 text-sm text-text-muted">{item.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      )

    default:
      return null
  }
}

function Reveal({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
