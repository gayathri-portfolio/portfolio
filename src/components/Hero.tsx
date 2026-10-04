import { motion } from 'framer-motion'
import { RotatingWord } from './RotatingWord'
import { HoverLetters } from './HoverLetters'
import heroBg from '../assets/hero-bg.webp'
import heroBgDark from '../assets/hero-bg-dark.webp'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-6 pt-24 md:pb-20 md:pt-44 lg:flex lg:min-h-screen lg:items-center lg:py-24">
      {/* illustrated background — on desktop the artwork sits full-bleed behind
          the text, which leaves the left side empty. On phones that overlaps
          the text, so the artwork becomes a band above it instead. Separate
          light/dark-theme artwork (not just a filter on one image) since the
          dark version is a genuinely different repaint, not a tinted copy. */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <img src={heroBg} alt="" className="block h-full w-full object-cover object-right dark:hidden" />
        <img src={heroBgDark} alt="" className="hidden h-full w-full object-cover object-right dark:block" />
      </div>
      <div className="pointer-events-none relative mb-8 h-[34vh] min-h-56 w-full overflow-hidden md:hidden">
        <img src={heroBg} alt="" className="block h-full w-full object-cover object-center dark:hidden" />
        <img src={heroBgDark} alt="" className="hidden h-full w-full object-cover object-center dark:block" />
      </div>

      {/* ambient blobs */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-40 h-64 w-64 rounded-full bg-accent-2/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-6xl px-5">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-serif text-xl italic text-accent"
        >
          Hi, I'm Gayathri
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-2 font-display text-[clamp(1.9rem,calc(8vw-0.2rem),5.2rem)] font-semibold leading-[0.95] tracking-tight text-text"
        >
          <HoverLetters text="Product Designer" />
          <br />
          <HoverLetters text="who" /> <RotatingWord />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-md text-lg text-text-muted"
        >
          Background in architecture, now crafting intuitive interfaces and
          meaningful user experiences — one careful interaction at a time.
        </motion.p>
      </div>
    </section>
  )
}
