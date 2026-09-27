import { motion } from 'framer-motion'
import { RotatingWord } from './RotatingWord'
import { HoverLetters } from './HoverLetters'
import heroBg from '../assets/hero-bg.png'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-36 sm:pt-44 lg:flex lg:min-h-screen lg:items-center lg:py-24">
      {/* illustrated background — the artwork itself leaves the left side
          empty for text, and the scrim (using the theme's own --bg color,
          so it works in both light and dark mode) fades that side further
          to guarantee legibility regardless of what's behind it there */}
      <div className="pointer-events-none absolute inset-0">
        <img src={heroBg} alt="" className="h-full w-full object-cover object-right" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-transparent" />
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
          className="mt-12 max-w-md text-lg text-text-muted"
        >
          Background in architecture, now crafting intuitive interfaces and
          meaningful user experiences — one careful interaction at a time.
        </motion.p>
      </div>
    </section>
  )
}
