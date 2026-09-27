import { motion } from 'framer-motion'
import aboutBg from '../assets/about-bg.png'

const paragraphs = [
  "My architecture background taught me to think in structures, relationships, constraints, and people. Product design gave me a different scale to apply that thinking — where a small interaction can change how someone experiences an entire product.",
  "For the past 2.5+ years, I've been designing B2C and B2B products end-to-end, working across mobile apps, connected devices, and commercial fitness experiences.",
  "At Portl Technologies, I've worked on UltraGym, UltraGym Pro, and Portl Studio Mirror — simplifying complex workflows, shaping new experiences, and designing for both the person using the product and the business behind it.",
]

export function AboutIntro() {
  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden px-5 py-24 sm:py-32">
      {/* illustrated background — same treatment as the Hero section:
          the artwork leaves the left side empty for text */}
      <div className="pointer-events-none absolute inset-0">
        <img src={aboutBg} alt="" className="h-full w-full object-cover object-right" />
      </div>

      <LeafSprig className="pointer-events-none absolute -left-4 bottom-6 hidden h-36 w-36 text-accent-2 opacity-20 sm:block" />
      <LeafSprig className="pointer-events-none absolute bottom-0 left-24 hidden h-24 w-24 text-accent-2 opacity-15 sm:block" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto w-full max-w-6xl text-left"
      >
        <h2 className="max-w-xl font-serif text-3xl font-semibold leading-[1.15] tracking-tight text-text sm:text-4xl">
          I trained as an architect. Somewhere along the way, I started designing products instead of buildings.
        </h2>
        <div className="mt-6 max-w-xl space-y-4 text-text-muted">
          {paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

const sprigLeaves = [
  { y: 122, side: 1, size: 1 },
  { y: 100, side: -1, size: 0.92 },
  { y: 78, side: 1, size: 0.84 },
  { y: 56, side: -1, size: 0.74 },
  { y: 34, side: 1, size: 0.62 },
]

function LeafSprig({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 140" fill="currentColor" stroke="none" className={className} aria-hidden="true">
      <path d="M50 136 C49 96 49 56 50 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="50" cy="8" rx="8" ry="2.4" transform="rotate(90 50 8)" />
      {sprigLeaves.map(({ y, side, size }) => {
        const cx = 50 + side * 9 * size
        const cy = y - 2 * size
        const angle = side * 40
        return <ellipse key={y} cx={cx} cy={cy} rx={9 * size} ry={2.8 * size} transform={`rotate(${angle} ${cx} ${cy})`} />
      })}
    </svg>
  )
}
