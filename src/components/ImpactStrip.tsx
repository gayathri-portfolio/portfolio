import { motion } from 'framer-motion'
import { LABEL } from '../lib/caseStudyBlocks'

/** Results from the resume (Portl Technologies, 2025–26). Keep these in step
 * with the resume, and label each one by what it actually measures. */
const METRICS = [
  { value: '2.5 → 4.5', label: 'UltraGym NPS, scaled to 5' },
  { value: '+30%', label: 'UltraGym 60-day retention' },
  { value: '2,035', label: 'Registered users, 432 monthly active' },
  { value: '280', label: 'Portl Studio smart mirrors sold' },
  { value: '~35%', label: 'Faster design delivery with a design system I built from scratch' },
]

/** A full-width band in the soft sage of the palette (the hero's leaves and
 * the availability dot), so it stands apart from the beige hero above it
 * while still belonging to the same design. */
export function ImpactStrip() {
  return (
    <section aria-labelledby="impact-title" className="bg-accent-2-soft">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-6xl px-5 py-10 sm:py-14"
      >
        <h2 id="impact-title" className={LABEL}>
          Impact at Portl Technologies · 2025–26
        </h2>
        <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-accent-2/25 pt-6 lg:grid-cols-5">
          {METRICS.map((m, i) => (
            // label first in the markup (dt before dd), shown below the value.
            // justify-end packs a reversed column to the top, so every value
            // lines up whatever its label's length
            <div
              key={m.label}
              className={`flex flex-col-reverse justify-end gap-2 ${i === METRICS.length - 1 ? 'col-span-2 lg:col-span-1' : ''}`}
            >
              <dt className="max-w-[22ch] text-sm leading-snug text-text-muted">{m.label}</dt>
              <dd className="font-serif text-3xl font-semibold tracking-tight text-text sm:text-4xl">{m.value}</dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </section>
  )
}
