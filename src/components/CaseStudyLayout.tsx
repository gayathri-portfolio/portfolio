import { useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useMotionValueEvent, type MotionValue } from 'framer-motion'
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

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-text-faint">{label}</p>
      <p className="mt-1.5 text-sm text-text">{value}</p>
    </div>
  )
}

interface SlideDef {
  key: string
  render: () => ReactNode
}

function buildSlideDefs(content: CaseStudyContent, otherStudy: { slug: string; title: string; tagline: string } | undefined): SlideDef[] {
  const defs: SlideDef[] = []

  defs.push({
    key: 'hero-text',
    render: () => (
      <div className="relative flex min-h-dvh w-full flex-col justify-center overflow-hidden px-6 py-28 sm:px-12">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-40 h-64 w-64 rounded-full bg-accent-2/10 blur-3xl" />

        <div className="relative mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1fr_320px] lg:items-start lg:gap-16">
          <div>
            <p className="font-display text-sm font-medium uppercase tracking-wide text-text-faint">
              {content.meta.company} · {content.meta.industry}
            </p>
            <h1 className="mt-4 font-serif text-[clamp(2.6rem,6vw,4.8rem)] font-semibold leading-[0.98] tracking-tight text-text">
              {content.title}
            </h1>
            <p className="mt-4 max-w-xl font-serif text-2xl italic leading-snug text-text-muted sm:text-3xl">
              {content.tagline}
            </p>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-text-muted">{content.intro}</p>
          </div>

          <div className="glass-strong flex flex-col gap-5 rounded-3xl p-6">
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
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 text-xs uppercase tracking-wide text-text-faint">
          Scroll
        </div>
      </div>
    ),
  })

  defs.push({
    key: 'hero-image',
    render: () => (
      <div className="relative h-dvh w-full overflow-hidden bg-bg-elevated">
        <img src={content.heroImage} alt={content.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
      </div>
    ),
  })

  content.sections.forEach((section, sIdx) => {
    const numeralColor = sIdx % 2 === 0 ? 'text-accent/30' : 'text-accent-2/30'
    defs.push({
      key: `section-${section.number}`,
      render: () => (
        <div className="relative flex min-h-dvh w-full flex-col justify-center gap-10 overflow-hidden px-6 py-28 sm:px-12">
          <div className="mx-auto w-full max-w-2xl">
            <span className={`font-serif text-6xl font-semibold sm:text-7xl ${numeralColor}`}>{section.number}</span>
            <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-text sm:text-5xl">
              {section.title}
            </h2>
          </div>
          <SlideBlocks blocks={section.blocks} />
        </div>
      ),
    })
  })

  defs.push({
    key: 'reflection',
    render: () => (
      <div className="relative flex min-h-dvh w-full flex-col justify-center gap-8 overflow-hidden px-6 py-28 sm:px-12">
        <div className="pointer-events-none absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-accent-2/10 blur-3xl" />
        <div className="relative mx-auto w-full max-w-2xl">
          <PawIcon className="h-9 w-9 text-accent/40" />
          <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-text sm:text-5xl">Reflection</h2>
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
      </div>
    ),
  })

  defs.push({
    key: 'closing',
    render: () => (
      <div className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden px-6 py-28 sm:px-12">
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
      </div>
    ),
  })

  return defs
}

/** One full-viewport panel in the slide deck. All panels sit absolutely
 * stacked at the same position (inset:0), z-index by DOM order. The panel
 * for the slide the user is about to enter sits parked off-screen to the
 * right (x: 100%) and slides to x: 0% as scroll progress passes through
 * its entrance window — covering whatever panel is underneath, which
 * never has to move. Scrolling back reverses the same transform, so the
 * covering panel slides back out and the one beneath is revealed again.
 * If a panel's own content is taller than one viewport, once it's fully
 * covering the screen its *inner* wrapper pans upward (translateY) across
 * the rest of its scroll window, so long sections still just scroll. */
function Panel({
  index,
  globalProgress,
  startFrac,
  entranceEndFrac,
  endFrac,
  revealDistance,
  innerRef,
  children,
}: {
  index: number
  globalProgress: MotionValue<number>
  startFrac: number
  entranceEndFrac: number
  endFrac: number
  revealDistance: number
  innerRef: (el: HTMLDivElement | null) => void
  children: ReactNode
}) {
  const xFrom = entranceEndFrac > startFrac ? startFrac : startFrac - 0.001
  const x = useTransform(globalProgress, [xFrom, entranceEndFrac], ['100%', '0%'])
  const yFrom = endFrac > entranceEndFrac ? entranceEndFrac : entranceEndFrac - 0.001
  const innerY = useTransform(globalProgress, [yFrom, endFrac], [0, -revealDistance])

  return (
    <motion.div style={{ x, zIndex: index + 1 }} className="absolute inset-0 h-dvh w-full overflow-hidden bg-bg">
      <motion.div ref={innerRef} style={{ y: innerY }}>
        {children}
      </motion.div>
    </motion.div>
  )
}

const ENTRANCE_VH_FRACTION = 0.4

export function CaseStudyLayout({ content }: { content: CaseStudyContent }) {
  const otherStudy = caseStudies.find((c) => c.slug !== content.slug)
  const slideDefs = useMemo(() => buildSlideDefs(content, otherStudy), [content, otherStudy])
  const n = slideDefs.length

  const containerRef = useRef<HTMLDivElement>(null)
  const innerRefs = useRef<(HTMLDivElement | null)[]>([])
  const [viewportH, setViewportH] = useState(() => (typeof window !== 'undefined' ? window.innerHeight : 900))
  const [contentHeights, setContentHeights] = useState<number[]>(() => new Array(n).fill(0))

  useLayoutEffect(() => {
    function measure() {
      setViewportH(window.innerHeight)
      setContentHeights(innerRefs.current.map((el) => el?.scrollHeight ?? 0))
    }
    measure()
    window.addEventListener('resize', measure)
    const ro = new ResizeObserver(() => measure())
    innerRefs.current.forEach((el) => el && ro.observe(el))
    return () => {
      window.removeEventListener('resize', measure)
      ro.disconnect()
    }
  }, [n])

  // The deck has ONE sticky viewport-height window shared by every panel —
  // that first viewportH is "free" (covered by the sticky trick itself),
  // so only each panel's entrance + overflow-reveal actually consumes real
  // extra scroll distance. useScroll's ['start start','end end'] offset
  // tracks progress over exactly that extra distance (container height
  // minus one viewportH, since it measures to the container's *bottom*
  // edge reaching the viewport's bottom, not its top) — so both the
  // container's CSS height and every fraction below must be built the
  // same way, or the two fall out of sync and transitions fire at the
  // wrong scroll position (or never complete for the last slide).
  const geometry = useMemo(() => {
    const entranceDistance = viewportH * ENTRANCE_VH_FRACTION
    let cursor = 0
    const starts: number[] = []
    const entranceEnds: number[] = []
    const ends: number[] = []
    const reveals: number[] = []
    for (let i = 0; i < n; i++) {
      const reveal = Math.max(0, (contentHeights[i] ?? 0) - viewportH)
      const entrance = i === 0 ? 0 : entranceDistance
      starts.push(cursor)
      cursor += entrance
      entranceEnds.push(cursor)
      cursor += reveal
      ends.push(cursor)
      reveals.push(reveal)
    }
    const scrollRange = Math.max(cursor, 1)
    return { starts, entranceEnds, ends, reveals, scrollRange, total: viewportH + scrollRange }
  }, [contentHeights, viewportH, n])

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })

  const [active, setActive] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const y = v * geometry.scrollRange
    let idx = 0
    for (let i = 0; i < n; i++) {
      if (y >= geometry.starts[i] - 1) idx = i
    }
    setActive(idx)
  })

  const scrollToSlide = (i: number) => {
    const top = (containerRef.current?.offsetTop ?? 0) + geometry.starts[i]
    window.scrollTo({ top, behavior: 'smooth' })
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
        {Array.from({ length: n }).map((_, i) => (
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
        <span className="mt-1 text-[10px] uppercase tracking-wide text-text-faint">{String(n).padStart(2, '0')}</span>
      </div>

      <div ref={containerRef} className="relative" style={{ height: geometry.total }}>
        <div className="sticky top-0 h-dvh w-full overflow-hidden">
          {slideDefs.map((def, i) => (
            <Panel
              key={def.key}
              index={i}
              globalProgress={scrollYProgress}
              startFrac={geometry.starts[i] / geometry.scrollRange}
              entranceEndFrac={geometry.entranceEnds[i] / geometry.scrollRange}
              endFrac={geometry.ends[i] / geometry.scrollRange}
              revealDistance={geometry.reveals[i]}
              innerRef={(el) => {
                innerRefs.current[i] = el
              }}
            >
              {def.render()}
            </Panel>
          ))}
        </div>
      </div>
    </article>
  )
}
