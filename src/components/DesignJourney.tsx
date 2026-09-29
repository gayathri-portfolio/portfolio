import { motion } from 'framer-motion'
import { SectionLabel } from './SectionLabel'
import { DraftingToolsArt } from './ArchitectureArt'
import { designJourney } from '../data/projects'

export function DesignJourney() {
  return (
    <section id="journey" className="relative overflow-hidden px-5 py-24 sm:py-32">
      <div className="pointer-events-none absolute left-0 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-accent-2/10 blur-3xl" />
      <DraftingToolsArt className="pointer-events-none absolute right-0 top-8 hidden h-40 w-40 text-text-faint opacity-40 sm:block" />

      <div className="relative mx-auto max-w-6xl">
        <SectionLabel>DESIGN JOURNEY</SectionLabel>
        <h2 className="mt-4 max-w-xl font-display text-3xl font-semibold tracking-tight sm:text-5xl">
          Where the thinking comes from
        </h2>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {designJourney.map((item, i) => (
            <motion.div
              key={item.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="glass-strong flex flex-col rounded-3xl p-6 sm:p-7"
            >
              <span className="font-serif text-5xl font-semibold text-accent/30">{item.period}</span>

              <h3 className="mt-4 font-display text-xl font-semibold text-text">{item.company}</h3>
              <span className="mt-1 text-sm text-accent">{item.role}</span>

              <p className="mt-4 flex-1 text-text-muted">{item.description}</p>

              <span className="mt-6 border-t border-border/60 pt-4 text-sm text-text-faint">{item.link}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
