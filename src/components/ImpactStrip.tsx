import { motion } from 'framer-motion'

/** Results from the resume (Portl Technologies, 2025–26). Keep these in step
 * with the resume, and label each one by what it actually measures. */
const METRICS = [
  { value: '2.5 → 4.5', label: 'UltraGym NPS, scaled to 5' },
  { value: '+30%', label: 'UltraGym 60-day retention' },
  { value: '2,035', label: 'Registered users, 432 monthly active' },
  { value: '280', label: 'Portl Studio smart mirrors sold' },
  { value: '~35%', label: 'Faster design delivery with a design system I built from scratch' },
]

/** A full-width black band with orange numbers and white labels, set apart
 * from the beige hero above it. Colours are fixed rather than theme tokens so
 * the band stays dark in both themes; in dark mode, where the page itself is
 * near-black, it uses the warm brown of the case-study highlight bands so it
 * doesn't disappear. */
export function ImpactStrip() {
  return (
    <section aria-labelledby="impact-title" className="bg-[#18140f] text-[#f6efe1] dark:bg-accent-soft">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-6xl px-5 py-10 sm:py-14"
      >
        <h2 id="impact-title" className="text-xs font-semibold uppercase tracking-[0.08em] text-[#f6efe1]/75">
          Impact at Portl Technologies · 2025–26
        </h2>
        <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-[#f6efe1]/15 pt-6 lg:grid-cols-5">
          {METRICS.map((m, i) => (
            // label first in the markup (dt before dd), shown below the value.
            // justify-end packs a reversed column to the top, so every value
            // lines up whatever its label's length
            <div
              key={m.label}
              className={`flex flex-col-reverse justify-end gap-2 ${i === METRICS.length - 1 ? 'col-span-2 lg:col-span-1' : ''}`}
            >
              <dt className="max-w-[22ch] text-sm leading-snug text-[#f6efe1]/85">{m.label}</dt>
              <dd className="font-serif text-3xl font-semibold tracking-tight text-[#ff9a42] sm:text-4xl">{m.value}</dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </section>
  )
}
