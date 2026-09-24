import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import type { Block } from '../data/caseStudyTypes'
import { Check, X } from 'lucide-react'

export function BlockRenderer({ block }: { block: Block }) {
  switch (block.kind) {
    case 'p':
      return (
        <Reveal>
          <p className="max-w-2xl text-lg leading-relaxed text-text-muted">{block.text}</p>
        </Reveal>
      )

    case 'highlight':
      return (
        <Reveal>
          <div className="relative left-1/2 w-screen -translate-x-1/2 bg-text py-16 sm:py-20">
            <p className="mx-auto max-w-3xl px-6 text-center font-serif text-2xl italic leading-snug text-bg sm:text-4xl">
              {block.text}
            </p>
          </div>
        </Reveal>
      )

    case 'callout':
      return (
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">{block.label}</p>
            <p className="mt-3 font-serif text-2xl italic leading-snug text-text sm:text-3xl">{block.text}</p>
          </div>
        </Reveal>
      )

    case 'quote':
      return (
        <Reveal>
          <blockquote className="max-w-2xl border-l-2 border-accent py-1 pl-6 font-serif text-2xl italic leading-snug text-text sm:text-3xl">
            “{block.text}”
          </blockquote>
        </Reveal>
      )

    case 'cards':
      return (
        <Reveal>
          <div className="divide-y divide-border border-t border-border">
            {block.items.map((item, i) => (
              <div key={i} className="flex flex-col gap-1.5 py-5 sm:flex-row sm:items-baseline sm:gap-8">
                <div className="flex items-center gap-2.5 sm:w-64 sm:shrink-0">
                  <span className="text-xl leading-none">{item.icon}</span>
                  <h4 className="font-display text-base font-semibold text-text">{item.title}</h4>
                </div>
                <p className="text-text-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      )

    case 'image':
      return (
        <Reveal>
          {block.wide ? (
            <figure className="relative left-1/2 w-screen -translate-x-1/2">
              <img src={block.src} alt={block.caption ?? ''} loading="lazy" className="w-full" />
              {block.caption && (
                <figcaption className="mt-4 text-center text-sm uppercase tracking-wide text-text-faint">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          ) : (
            <figure>
              <div className="overflow-hidden rounded-xl bg-bg-elevated">
                <img src={block.src} alt={block.caption ?? ''} loading="lazy" className="w-full" />
              </div>
              {block.caption && (
                <figcaption className="mt-4 text-center text-sm uppercase tracking-wide text-text-faint">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          )}
        </Reveal>
      )

    case 'compare':
      return (
        <Reveal>
          <div className="grid gap-8 border-t border-border pt-8 sm:grid-cols-2 sm:divide-x sm:divide-border">
            <div className="sm:pr-8">
              <p className="text-xs font-semibold uppercase tracking-wide text-text-faint">Before</p>
              <ul className="mt-4 space-y-3">
                {block.before.map((item, i) => (
                  <li key={i} className="flex gap-2.5 text-text-muted">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-text-faint" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="sm:pl-8">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">After</p>
              <ul className="mt-4 space-y-3">
                {block.after.map((item, i) => (
                  <li key={i} className="flex gap-2.5 text-text">
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
          <ul className="max-w-2xl space-y-3.5">
            {block.items.map((item, i) => (
              <li key={i} className="flex gap-3.5 text-lg leading-relaxed text-text-muted">
                <span className="mt-3.5 h-px w-4 shrink-0 bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      )

    case 'stat-grid':
      return (
        <Reveal>
          <div className="divide-y divide-border border-y border-border">
            {block.items.map((item, i) => (
              <div key={i} className="flex items-baseline justify-between gap-6 py-4">
                <span className="font-serif text-3xl font-semibold text-text">{item.value}</span>
                <span className="text-right text-sm text-text-muted">{item.label}</span>
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
