import { useMemo, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
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

function HeroImageSlide({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full overflow-hidden bg-bg-elevated md:h-dvh">
      <img
        src={src}
        alt={alt}
        className="block h-auto w-full md:absolute md:inset-0 md:h-full md:object-cover"
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
            <h1 className="mt-4 whitespace-nowrap font-serif text-[clamp(2.2rem,4vw,3.2rem)] font-semibold leading-[0.98] tracking-tight text-text">
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
    render: () => <HeroImageSlide src={content.heroImage} alt={content.title} />,
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

/** The case study as a normal top-to-bottom scrolling page on every screen
 * size. Alternate content sections are tinted so the numbered sections read
 * as separate blocks; the hero and closing stay untinted. */
export function CaseStudyLayout({ content }: { content: CaseStudyContent }) {
  const otherStudy = caseStudies.find((c) => c.slug !== content.slug)
  const slideDefs = useMemo(() => buildSlideDefs(content, otherStudy), [content, otherStudy])

  return (
    <article className="relative">
      <Link
        to="/#work"
        className="glass fixed left-5 top-5 z-40 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-text-muted transition-all hover:text-text sm:left-8 sm:top-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to work
      </Link>
      {slideDefs.map((def, i) => {
        const tinted = i >= 2 && i % 2 === 1 && def.key !== 'closing'
        return (
          <section key={def.key} className={tinted ? 'bg-surface' : undefined}>
            {def.render()}
          </section>
        )
      })}
    </article>
  )
}
