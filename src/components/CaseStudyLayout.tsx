import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { Block, CaseStudyContent } from '../data/caseStudyTypes'
import { BlockRenderer } from './CaseStudyBlocks'
import { PawIcon } from './PawIcon'
import { caseStudies } from '../data/projects'

/** Blocks that break out full-bleed and therefore need their direct DOM
 * parent to be the slide's own full-width element, not the narrow
 * centered text column — otherwise the breakout drifts off-center. */
function isFullBleed(block: Block) {
  return block.kind === 'highlight' || (block.kind === 'image' && block.wide)
}

/** Mobile-screen image rows need more than the narrow text column's width
 * to lay out multiple frames side by side. */
function isWide(block: Block) {
  return block.kind === 'image-grid'
}

type Run =
  | { kind: 'group'; blocks: Block[] }
  | { kind: 'full-bleed'; block: Block }
  | { kind: 'wide'; block: Block }

function groupBlocks(blocks: Block[]): Run[] {
  const runs: Run[] = []
  for (const block of blocks) {
    if (isFullBleed(block)) {
      runs.push({ kind: 'full-bleed', block })
      continue
    }
    if (isWide(block)) {
      runs.push({ kind: 'wide', block })
      continue
    }
    const last = runs[runs.length - 1]
    if (last && last.kind === 'group') last.blocks.push(block)
    else runs.push({ kind: 'group', blocks: [block] })
  }
  return runs
}

function SlideBlocks({ blocks }: { blocks: Block[] }) {
  const runs = groupBlocks(blocks)
  return (
    <>
      {runs.map((run, i) => {
        if (run.kind === 'full-bleed') return <BlockRenderer key={i} block={run.block} />
        if (run.kind === 'wide') {
          return (
            <div key={i} className="mx-auto w-full max-w-4xl">
              <BlockRenderer block={run.block} />
            </div>
          )
        }
        return (
          <div key={i} className="mx-auto w-full max-w-2xl space-y-8">
            {run.blocks.map((block, j) => (
              <BlockRenderer key={j} block={block} />
            ))}
          </div>
        )
      })}
    </>
  )
}

export function CaseStudyLayout({ content }: { content: CaseStudyContent }) {
  const otherStudy = caseStudies.find((c) => c.slug !== content.slug)

  const slideCount = content.sections.length + 4 // hero-text, hero-image, ...sections, reflection, closing
  const scrollRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLElement | null)[]>([])
  const [active, setActive] = useState(0)

  useEffect(() => {
    const root = scrollRef.current
    if (!root) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = slideRefs.current.indexOf(entry.target as HTMLElement)
            if (idx !== -1) setActive(idx)
          }
        }
      },
      { root, threshold: 0.55 },
    )
    slideRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [slideCount])

  const registerSlide = (i: number) => (el: HTMLElement | null) => {
    slideRefs.current[i] = el
  }

  // scroll-snap-type:mandatory snaps back toward the nearest slide on every
  // scrollTop change, not just the final one, so a programmatic smooth
  // scroll to a target more than one slide away can get fought the whole
  // way there (a documented Chromium snap-vs-smooth-scroll interaction).
  // Suspend snapping for the animation, then restore it once settled.
  // A timeout fallback force-corrects the final position regardless of
  // whether the browser ever fires 'scrollend' (missing support, reduced
  // motion, or a backgrounded tab pausing the compositor animation) so a
  // dot click always lands on the right slide even in the worst case.
  const scrollToSlide = (i: number) => {
    const el = slideRefs.current[i]
    const root = scrollRef.current
    if (!el || !root) return
    const target = el.offsetTop

    root.style.scrollSnapType = 'none'
    root.scrollTo({ top: target, behavior: 'smooth' })

    let settled = false
    const finish = () => {
      if (settled) return
      settled = true
      root.removeEventListener('scrollend', finish)
      root.scrollTop = target
      root.style.scrollSnapType = ''
    }
    root.addEventListener('scrollend', finish, { once: true })
    setTimeout(finish, 900)
  }

  return (
    <article className="relative">
      <Link
        to="/#work"
        className="glass fixed left-5 top-5 z-40 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-text-muted transition-all hover:text-text sm:left-8 sm:top-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to work
      </Link>

      <div className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-2.5 sm:right-8 sm:flex">
        <span className="mb-1 text-[10px] uppercase tracking-wide text-text-faint">
          {String(active + 1).padStart(2, '0')}
        </span>
        {Array.from({ length: slideCount }).map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="group flex w-4 items-center justify-center py-0.5"
          >
            <span
              className={`w-1.5 rounded-full transition-all duration-300 ${
                i === active ? 'h-7 bg-accent' : 'h-1.5 bg-border-strong group-hover:bg-text-faint'
              }`}
            />
          </button>
        ))}
        <span className="mt-1 text-[10px] uppercase tracking-wide text-text-faint">
          {String(slideCount).padStart(2, '0')}
        </span>
      </div>

      <div
        ref={scrollRef}
        className="h-dvh snap-y snap-mandatory overflow-x-clip overflow-y-auto"
      >
        {/* Slide 0 — hero text + meta */}
        <section
          ref={registerSlide(0)}
          className="relative flex min-h-dvh w-full snap-start flex-col justify-center overflow-hidden px-6 py-28 sm:px-12"
        >
          <div className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-40 h-64 w-64 rounded-full bg-accent-2/10 blur-3xl" />

          <div className="relative mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1fr_320px] lg:items-start lg:gap-16">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-display text-sm font-medium uppercase tracking-wide text-text-faint"
              >
                {content.meta.company} · {content.meta.industry}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="mt-4 font-serif text-[clamp(2.6rem,6vw,4.8rem)] font-semibold leading-[0.98] tracking-tight text-text"
              >
                {content.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-4 max-w-xl font-serif text-2xl italic leading-snug text-text-muted sm:text-3xl"
              >
                {content.tagline}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="mt-6 max-w-lg text-lg leading-relaxed text-text-muted"
              >
                {content.intro}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-strong flex flex-col gap-5 rounded-3xl p-6"
            >
              <div className="grid grid-cols-2 gap-5">
                <MetaRow label="Role" value={content.meta.role} />
                <MetaRow label="Team" value={content.meta.team} />
                <MetaRow label="Company" value={content.meta.company} />
                <MetaRow label="Industry" value={content.meta.industry} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-text-faint">Responsibilities</p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {content.meta.responsibilities.map((r) => (
                    <span
                      key={r}
                      className="rounded-full border border-border bg-bg/50 px-2.5 py-1 text-xs font-medium text-text-muted"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 text-xs uppercase tracking-wide text-text-faint"
          >
            Scroll
          </motion.div>
        </section>

        {/* Slide 1 — cinematic full-bleed hero image */}
        <section
          ref={registerSlide(1)}
          className="relative h-dvh w-full snap-start overflow-hidden bg-bg-elevated"
        >
          <img
            src={content.heroImage}
            alt={content.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
        </section>

        {/* Section slides */}
        {content.sections.map((section, sIdx) => {
          const slideIndex = sIdx + 2
          const numeralColor = sIdx % 2 === 0 ? 'text-accent/30' : 'text-accent-2/30'
          return (
            <section
              key={section.number}
              ref={registerSlide(slideIndex)}
              className="relative flex min-h-dvh w-full snap-start flex-col justify-center gap-10 overflow-hidden px-6 py-28 sm:px-12"
            >
              <div className="mx-auto w-full max-w-2xl">
                <span className={`font-serif text-6xl font-semibold sm:text-7xl ${numeralColor}`}>
                  {section.number}
                </span>
                <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-text sm:text-5xl">
                  {section.title}
                </h2>
              </div>
              <SlideBlocks blocks={section.blocks} />
            </section>
          )
        })}

        {/* Reflection slide */}
        <section
          ref={registerSlide(content.sections.length + 2)}
          className="relative flex min-h-dvh w-full snap-start flex-col justify-center gap-8 overflow-hidden px-6 py-28 sm:px-12"
        >
          <div className="pointer-events-none absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-accent-2/10 blur-3xl" />
          <div className="relative mx-auto w-full max-w-2xl">
            <PawIcon className="h-9 w-9 text-accent/40" />
            <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-text sm:text-5xl">
              Reflection
            </h2>
          </div>
          <div className="relative mx-auto w-full max-w-2xl space-y-6">
            {content.reflection.paragraphs?.map((p, i) => (
              <p key={i} className="text-lg leading-relaxed text-text-muted">
                {p}
              </p>
            ))}
            {content.reflection.points && (
              <ul className="space-y-3.5">
                {content.reflection.points.map((item, i) => (
                  <li key={i} className="flex gap-3.5 text-lg leading-relaxed text-text-muted">
                    <span className="mt-3.5 h-px w-4 shrink-0 bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Closing slide — next case study */}
        <section
          ref={registerSlide(content.sections.length + 3)}
          className="relative flex min-h-dvh w-full snap-start items-center justify-center overflow-hidden px-6 py-28 sm:px-12"
        >
          <div className="pointer-events-none absolute right-0 top-1/4 h-72 w-72 translate-x-1/3 rounded-full bg-accent/10 blur-3xl" />
          {otherStudy ? (
            <Link
              to={`/work/${otherStudy.slug}`}
              className="group relative mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center"
            >
              <p className="text-sm font-medium uppercase tracking-wide text-text-faint">Next case study</p>
              <p className="font-serif text-4xl font-semibold text-text transition-colors group-hover:text-accent sm:text-6xl">
                {otherStudy.title}
              </p>
              <p className="max-w-lg text-text-muted">{otherStudy.tagline}</p>
              <span className="mt-4 flex h-14 w-14 items-center justify-center rounded-full border border-border transition-all group-hover:scale-110 group-hover:border-accent group-hover:bg-accent group-hover:text-bg-elevated">
                <ArrowRight className="h-5 w-5" />
              </span>
            </Link>
          ) : (
            <Link to="/#work" className="font-serif text-3xl font-semibold text-text hover:text-accent">
              Back to all work
            </Link>
          )}
        </section>
      </div>
    </article>
  )
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-text-faint">{label}</p>
      <p className="mt-1.5 text-sm text-text">{value}</p>
    </div>
  )
}
