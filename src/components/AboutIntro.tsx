import { motion } from 'framer-motion'

const paragraphs = [
  "My architecture background taught me to think in structures, relationships, constraints, and people. Product design gave me a different scale to apply that thinking — where a small interaction can change how someone experiences an entire product.",
  "For the past 2.5+ years, I've been designing B2C and B2B products end-to-end, working across mobile apps, connected devices, and commercial fitness experiences.",
  "At Portl Technologies, I've worked on UltraGym, UltraGym Pro, and Portl Studio Mirror — simplifying complex workflows, shaping new experiences, and designing for both the person using the product and the business behind it.",
]

const photos = [
  { src: '/about/photo-2.webp', rotate: 6, className: 'left-[26%] -top-[4%] w-[46%] z-0' },
  { src: '/about/photo-1.webp', rotate: -11, className: '-left-[8%] top-[20%] w-[52%] z-10' },
  { src: '/about/photo-3.webp', rotate: 15, className: '-right-[6%] top-[24%] w-[50%] z-20' },
  { src: '/about/photo-4.webp', rotate: -4, className: 'left-[18%] top-[6%] w-[62%] z-30' },
]

export function AboutIntro() {
  return (
    <section className="relative overflow-hidden px-5 py-24 sm:py-32">
      <LeafSprig className="pointer-events-none absolute -left-4 bottom-6 hidden h-36 w-36 text-accent-2 opacity-20 sm:block" />
      <LeafSprig className="pointer-events-none absolute bottom-0 left-24 hidden h-24 w-24 text-accent-2 opacity-15 sm:block" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl font-semibold leading-[1.15] tracking-tight text-text sm:text-4xl">
            I trained as an architect. Somewhere along the way, I started designing products instead of buildings.
          </h2>
          <div className="mt-6 space-y-4 text-text-muted">
            {paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto aspect-[4/5] w-full max-w-md"
        >
          {photos.map((photo) => (
            <div
              key={photo.src}
              className={`absolute rounded-sm bg-white p-2.5 pb-8 shadow-xl ${photo.className}`}
              style={{ rotate: `${photo.rotate}deg` }}
            >
              <img src={photo.src} alt="" className="aspect-[4/5] w-full rounded-[2px] object-cover" />
            </div>
          ))}
        </motion.div>
      </div>
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
