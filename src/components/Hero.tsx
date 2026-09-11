import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { HeroPortrait } from './HeroPortrait'
import { PawIcon } from './PawIcon'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-36 sm:pt-44">
      {/* ambient blobs */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-40 h-64 w-64 rounded-full bg-accent-2/10 blur-3xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass mb-6 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium text-text-muted"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-2 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-2" />
            </span>
            Available for work
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-serif text-xl italic text-accent"
          >
            Hi, I'm Gayathri
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-2 font-display text-[clamp(2.6rem,8vw,5.2rem)] font-semibold leading-[0.95] tracking-tight text-text"
          >
            Product
            <br />
            Designer
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

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-text px-6 py-3 text-sm font-medium text-bg transition-transform hover:scale-[1.03]"
            >
              Explore Projects
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="glass group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-text transition-transform hover:scale-[1.03]"
            >
              Let's Connect
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <HeroPortrait />
          <FloatingPaws />
        </div>
      </div>
    </section>
  )
}

function FloatingPaws() {
  const paws = [
    { top: '6%', left: '4%', size: 16, delay: 0, rotate: -18 },
    { top: '68%', left: '0%', size: 12, delay: 0.6, rotate: 10 },
    { top: '30%', left: '92%', size: 14, delay: 1.1, rotate: -8 },
  ]
  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block">
      {paws.map((p, i) => (
        <motion.div
          key={i}
          className="absolute text-accent-2/50"
          style={{ top: p.top, left: p.left }}
          animate={{ y: [0, -8, 0], rotate: [p.rotate, p.rotate + 6, p.rotate] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
        >
          <PawIcon style={{ width: p.size, height: p.size }} />
        </motion.div>
      ))}
    </div>
  )
}
