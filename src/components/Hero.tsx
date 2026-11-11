import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { RotatingWord } from './RotatingWord'
import { HoverLetters } from './HoverLetters'
import { profile } from '../data/profile'
import heroBg from '../assets/hero-bg.webp'
import heroBgDark from '../assets/hero-bg-dark.webp'
import mobileHeroBg from '../assets/mobile-hero.webp'
import mobileHeroBgDark from '../assets/mobile-hero-dark.webp'

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
      <div className="pointer-events-none relative mb-8 aspect-[5/4] w-full overflow-hidden md:hidden">
        <img src={mobileHeroBg} alt="" className="block h-full w-full object-cover dark:hidden" />
        <img src={mobileHeroBgDark} alt="" className="hidden h-full w-full object-cover dark:block" />
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

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          // from 1280px up: about the headline's width (a little narrower), so the
          // block reads headline → subtext → actions instead of a narrow column
          // under a wide title. Below that the illustration sits closer, so the
          // original narrower measure is kept.
          className="mt-6 max-w-md space-y-3 text-lg text-text-muted xl:max-w-[38rem]"
        >
          <p>
            I design digital experiences across apps, smart hardware and wearables — bringing together thoughtful
            interactions, intuitive interfaces and the realities of how people use products.
          </p>
          <p>
            An architect by training from NIT Trichy, now shaping products from the bigger picture down to the
            smallest interaction.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <Link
            to="/#work"
            className="inline-flex items-center gap-2 rounded-full bg-text px-5 py-3 text-sm font-medium text-bg transition-transform hover:scale-[1.03]"
          >
            View case studies
            <ArrowDown className="h-4 w-4" />
          </Link>
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="glass inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-text transition-colors hover:text-accent"
          >
            Resume
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          // a frosted pill so it stays legible where it overlaps the illustration
          className="glass mt-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm text-text"
        >
          <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-accent-2" />
          {profile.availability} · {profile.workModes}
        </motion.p>
      </div>
    </section>
  )
}
