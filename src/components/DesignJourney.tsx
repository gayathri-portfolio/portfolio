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
        <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:whitespace-nowrap sm:text-5xl">
          Where the thinking comes from
        </h2>

        <div className="relative mt-14">
          {/* the connecting line — centered on the 40px (w-10) markers below */}
          <div className="pointer-events-none absolute left-5 top-5 bottom-5 w-px bg-border" />

          <div className="space-y-12">
            {designJourney.map((item, i) => (
              <motion.div
                key={item.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="relative flex gap-6 sm:gap-8"
              >
                <span className="glass-strong relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-sm font-semibold text-accent">
                  {item.period}
                </span>

                <div className="flex-1 pb-1 pt-1.5">
                  <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-3">
                    <h3 className="font-display text-xl font-semibold text-text">{item.company}</h3>
                    <span className="text-sm text-accent">{item.role}</span>
                  </div>
                  <p className="mt-2 max-w-2xl text-text-muted">{item.description}</p>
                  <a
                    href={`https://${item.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm text-text-faint underline underline-offset-4 transition-colors hover:text-accent"
                  >
                    {item.link}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
