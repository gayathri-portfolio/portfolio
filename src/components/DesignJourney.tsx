import { motion } from 'framer-motion'
import { SectionLabel } from './SectionLabel'
import { designJourney } from '../data/projects'

export function DesignJourney() {
  return (
    <section id="journey" className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <SectionLabel>DESIGN JOURNEY</SectionLabel>
      <h2 className="mt-4 max-w-xl font-display text-3xl font-semibold tracking-tight sm:text-5xl">
        Where the thinking comes from
      </h2>

      <div className="mt-14 divide-y divide-border border-y border-border">
        {designJourney.map((item, i) => (
          <motion.div
            key={item.company}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="grid gap-3 py-9 sm:grid-cols-[80px_1fr_auto] sm:items-start sm:gap-8"
          >
            <span className="font-display text-sm text-text-faint">{item.period}</span>
            <div>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-display text-xl font-semibold text-text">{item.company}</h3>
                <span className="text-sm text-accent">{item.role}</span>
              </div>
              <p className="mt-2 max-w-2xl text-text-muted">{item.description}</p>
            </div>
            <span className="text-sm text-text-faint sm:text-right">{item.link}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
