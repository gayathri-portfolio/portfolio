import { motion } from 'framer-motion'
import { HeroPortrait } from './HeroPortrait'
import { PawIcon } from './PawIcon'
import { RotatingWord } from './RotatingWord'
import { HoverLetters } from './HoverLetters'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-36 sm:pt-44 lg:flex lg:min-h-screen lg:items-center lg:py-24">
      {/* ambient blobs */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-40 h-64 w-64 rounded-full bg-accent-2/10 blur-3xl" />

      {/* single flex item (w-full, no auto margins) so the text block inside keeps
          its normal mx-auto centering instead of being shrink-wrapped by the flex
          cross-axis auto-margin rule. Deliberately NOT position:relative — the
          portrait's lg:absolute needs to anchor to the full-height <section>,
          not to this shorter, vertically-centered flex item. */}
      <div className="w-full">
        <div className="relative mx-auto max-w-6xl px-5">
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
            className="mt-12 max-w-md text-lg text-text-muted lg:max-w-sm"
          >
            Background in architecture, now crafting intuitive interfaces and
            meaningful user experiences — one careful interaction at a time.
          </motion.p>
        </div>

        {/* portrait — free from the text layout: normal flow (below the text) until lg,
            then absolute and sized to the full section height so it can sit at whatever
            size/position looks right without the text having to make room for it */}
        <div className="relative mt-12 flex justify-center px-5 lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:flex lg:items-stretch lg:justify-end lg:px-8 xl:px-14">
          <div className="relative w-full max-w-[280px] sm:max-w-[340px] lg:h-full lg:w-fit lg:max-w-none">
            <HeroPortrait />
            <FloatingPaws />
          </div>
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
