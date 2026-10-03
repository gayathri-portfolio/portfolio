import { useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useTransform, useMotionValueEvent, type MotionValue } from 'framer-motion'
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react'
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
  render: (entranceProgress: MotionValue<number>) => ReactNode
}

/** The hero photo additionally slides left-to-right on top of the scale
 * every slide already gets from Panel — a small extra counter-motion
 * layered onto the panel's own right-to-left cover slide, unique to this
 * one full-bleed photo. */
function HeroImageSlide({
  src,
  alt,
  entranceProgress,
}: {
  src: string
  alt: string
  entranceProgress: MotionValue<number>
}) {
  const x = useTransform(entranceProgress, [0, 1], ['-10%', '0%'])
  return (
    <div className="relative h-dvh w-full overflow-hidden bg-bg-elevated">
      <motion.img
        src={src}
        alt={alt}
        style={{ x }}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  )
}

/** Screen/wireframe grids get their own dedicated slide, full-size and
 * uncrowded by surrounding paragraph text, instead of a row of small
 * thumbnails squeezed between blocks — so viewers can actually see them. */
function ImageGridSlide({
  images,
  sectionNumber,
  sectionTitle,
  numeralColor,
}: {
  images: { src: string; caption?: string }[]
  sectionNumber: string
  sectionTitle: string
  numeralColor: string
}) {
  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center justify-center gap-12 overflow-hidden px-6 py-24 sm:px-12">
      <div className="pointer-events-none absolute -bottom-24 left-1/2 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative flex items-center gap-3">
        <span className={`font-serif text-2xl font-semibold ${numeralColor}`}>{sectionNumber}</span>
        <span className="text-xs font-medium uppercase tracking-wide text-text-faint">{sectionTitle}</span>
      </div>
      <div className="relative flex flex-wrap items-start justify-center gap-8 sm:gap-12">
        {images.map((img, i) => (
          <figure key={i} className="group flex w-[200px] shrink-0 flex-col items-center sm:w-[260px]">
            <img
              src={img.src}
              alt={img.caption ?? ''}
              loading="lazy"
              className="h-auto w-full rounded-2xl shadow-[0_32px_64px_-32px_rgb(var(--shadow-color)/0.5)] transition-transform duration-300 ease-out group-hover:-translate-y-2 group-hover:scale-[1.03]"
            />
            {img.caption && (
              <figcaption className="mt-4 text-center text-xs uppercase tracking-wide text-text-faint">
                {img.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </div>
  )
}

type TextSegment = { kind: 'text'; blocks: Block[] }
type ImageSegment = { kind: 'images'; images: { src: string; caption?: string }[] }

/** Walks a section's blocks and pulls every image-grid out into its own
 * segment, so it can become its own slide instead of sitting inline. */
function splitSectionSegments(blocks: Block[]): (TextSegment | ImageSegment)[] {
  const segments: (TextSegment | ImageSegment)[] = []
  let buffer: Block[] = []
  for (const block of blocks) {
    if (block.kind === 'image-grid') {
      segments.push({ kind: 'text', blocks: buffer })
      segments.push({ kind: 'images', images: block.images })
      buffer = []
    } else {
      buffer.push(block)
    }
  }
  segments.push({ kind: 'text', blocks: buffer })
  return segments
}

function buildSlideDefs(content: CaseStudyContent, otherStudy: { slug: string; title: string; tagline: string } | undefined): SlideDef[] {
  const defs: SlideDef[] = []

  defs.push({
    key: 'hero-text',
    render: () => (
      <div className="relative flex min-h-dvh w-full flex-col justify-center overflow-hidden px-6 py-28 sm:px-2">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-40 h-64 w-64 rounded-full bg-accent-2/10 blur-3xl" />

        <div className="relative mx-auto grid w-full max-w-5xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-[104px]">
          <div className="flex flex-col items-start text-left lg:w-[calc(100%+28px)]">
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

          <div className="glass-strong flex w-full max-w-md flex-col items-start gap-5 rounded-3xl p-6 text-left">
            <div className="grid w-full grid-cols-2 gap-5 text-left">
              <MetaRow label="Role" value={content.meta.role} />
              <MetaRow label="Team" value={content.meta.team} />
              <MetaRow label="Company" value={content.meta.company} />
              <MetaRow label="Industry" value={content.meta.industry} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-faint">Responsibilities</p>
              <div className="mt-2.5 flex flex-wrap justify-start gap-1.5">
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
    render: (entranceProgress) => (
      <HeroImageSlide src={content.heroImage} alt={content.title} entranceProgress={entranceProgress} />
    ),
  })

  content.sections.forEach((section, sIdx) => {
    const numeralColor = sIdx % 2 === 0 ? 'text-accent/30' : 'text-accent-2/30'
    const firstBlock = section.blocks[0]
    const introText = firstBlock?.kind === 'p' ? firstBlock.text : undefined
    const restBlocks = introText ? section.blocks.slice(1) : section.blocks

    const segments = splitSectionSegments(restBlocks)
    let headerRendered = false

    segments.forEach((seg, segIdx) => {
      if (seg.kind === 'images') {
        defs.push({
          key: `section-${section.number}-images-${segIdx}`,
          render: () => (
            <ImageGridSlide
              images={seg.images}
              sectionNumber={section.number}
              sectionTitle={section.title}
              numeralColor={numeralColor}
            />
          ),
        })
        return
      }

      if (seg.blocks.length === 0 && headerRendered) return

      const showHeader = !headerRendered
      headerRendered = true

      defs.push({
        key: `section-${section.number}-text-${segIdx}`,
        render: () => (
          <div className="relative flex min-h-dvh w-full flex-col justify-center gap-10 overflow-hidden px-6 py-28 sm:px-12">
            {showHeader && (
              <div className="mx-auto grid w-full max-w-4xl gap-6 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-14">
                <span className={`font-serif text-6xl font-semibold leading-none sm:text-7xl ${numeralColor}`}>
                  {section.number}
                </span>
                <div>
                  <h2 className="font-serif text-3xl font-semibold leading-[1.05] tracking-tight text-text sm:text-5xl">
                    {section.title}
                  </h2>
                  {introText && (
                    <p className="mt-5 max-w-xl text-lg leading-relaxed text-text-muted">{introText}</p>
                  )}
                </div>
              </div>
            )}
            <SlideBlocks blocks={seg.blocks} />
          </div>
        ),
      })
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
  children: (entranceProgress: MotionValue<number>) => ReactNode
}) {
  const xFrom = entranceEndFrac > startFrac ? startFrac : startFrac - 0.001
  const x = useTransform(globalProgress, [xFrom, entranceEndFrac], ['100%', '0%'])
  // 0..1 across just this panel's own entrance window, for content (like
  // the hero image) that layers its own counter-motion on top of the
  // panel's cover slide — clamped, so it reads as a steady 0 before the
  // panel's turn and a steady 1 once it's settled in.
  const entranceProgress = useTransform(globalProgress, [xFrom, entranceEndFrac], [0, 1])
  // Every slide scales up from smaller to full size as it enters, in sync
  // with the same window. This sits on its own viewport-sized wrapper
  // (not the possibly-taller reveal-scroll content below) so it scales
  // around the true center of the screen rather than the center of
  // content that may extend well past the bottom of the viewport.
  const scale = useTransform(entranceProgress, [0, 1], [0.2, 1])
  const yFrom = endFrac > entranceEndFrac ? entranceEndFrac : entranceEndFrac - 0.001
  const innerY = useTransform(globalProgress, [yFrom, endFrac], [0, -revealDistance])

  return (
    <motion.div
      style={{ x, zIndex: index + 1, boxShadow: index > 0 ? "-28px 0 48px -16px rgb(var(--shadow-color) / 0.45)" : undefined }}
      className="absolute inset-0 h-dvh w-full overflow-hidden bg-bg"
    >
      {index > 0 && <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1.5 bg-accent" />}
      <motion.div style={{ scale }} className="h-full w-full">
        <motion.div ref={innerRef} style={{ y: innerY }}>
          {children(entranceProgress)}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

const ENTRANCE_VH_FRACTION = 0.4
// scroll distance (in viewports) the current slide is held still before the next one starts entering, so there is time to finish reading it
const DWELL_VH_FRACTION = 0.9

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
      if (i < n - 1) cursor += viewportH * DWELL_VH_FRACTION
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

  // Only a window of DOT_WINDOW dots is ever shown, sliding to keep the
  // active slide roughly second-from-top — otherwise a 25+ slide deck
  // turns the rail into a long, unreadable strip.
  const DOT_WINDOW = 4
  const dotWindowSize = Math.min(DOT_WINDOW, n)
  const windowStart = Math.max(0, Math.min(active - 1, n - dotWindowSize))
  const visibleDots = Array.from({ length: dotWindowSize }, (_, k) => windowStart + k)
  const hasMoreAbove = windowStart > 0
  const hasMoreBelow = windowStart + dotWindowSize < n

  return (
    <article className="relative">
      <Link
        to="/#work"
        className="glass fixed left-5 top-5 z-40 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-text-muted transition-all hover:text-text sm:left-8 sm:top-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to work
      </Link>

      <div className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-2 sm:right-8 sm:flex">
        <span className="mb-1 text-[10px] uppercase tracking-wide text-text-faint">
          {String(active + 1).padStart(2, '0')}
        </span>
        <ChevronUp
          className={`h-3 w-3 text-text-faint transition-opacity ${hasMoreAbove ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="flex flex-col items-center gap-2.5">
          <AnimatePresence initial={false}>
            {visibleDots.map((i) => (
              <motion.button
                key={i}
                layout
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.4 }}
                transition={{ duration: 0.2 }}
                onClick={() => scrollToSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="group flex w-4 items-center justify-center py-0.5"
              >
                <span
                  className={`w-1.5 rounded-full transition-all duration-300 ${
                    i === active ? 'h-7 bg-accent' : 'h-1.5 bg-border-strong group-hover:bg-text-faint'
                  }`}
                />
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
        <ChevronDown
          className={`h-3 w-3 text-text-faint transition-opacity ${hasMoreBelow ? 'opacity-100' : 'opacity-0'}`}
        />
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
              {def.render}
            </Panel>
          ))}
        </div>
      </div>
    </article>
  )
}
