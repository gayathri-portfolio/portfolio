import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, ListOrdered, X } from 'lucide-react'
import type { Block, CaseStudyContent, CaseStudySection } from '../data/caseStudyTypes'
import { BlockRenderer } from './CaseStudyBlocks'
import { isFullBleed, isWide, LABEL } from '../lib/caseStudyBlocks'
import { usePageTitle } from '../lib/usePageTitle'
import { DeviceVisual } from './DeviceVisual'
import { LightboxProvider } from './Lightbox'
import { PawIcon } from './PawIcon'
import { caseStudies } from '../data/projects'

type Run =
  | { kind: 'text'; blocks: Block[] }
  | { kind: 'wide'; block: Block }
  | { kind: 'full-bleed'; block: Block }

/** Groups consecutive text blocks into one column; screens and diagrams get
 * a wider container; highlights span the whole section. */
function groupBlocks(blocks: Block[]): Run[] {
  const runs: Run[] = []
  for (const block of blocks) {
    if (isFullBleed(block)) runs.push({ kind: 'full-bleed', block })
    else if (isWide(block)) runs.push({ kind: 'wide', block })
    else {
      const last = runs[runs.length - 1]
      if (last && last.kind === 'text') last.blocks.push(block)
      else runs.push({ kind: 'text', blocks: [block] })
    }
  }
  return runs
}

const COLUMN = 'mx-auto w-full max-w-3xl px-6'
const chapterId = (s: CaseStudySection) => `chapter-${s.number}`

function SectionBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {groupBlocks(blocks).map((run, i) => {
        if (run.kind === 'full-bleed') return <BlockRenderer key={i} block={run.block} />
        if (run.kind === 'wide') {
          return (
            <div key={i} className="px-6">
              <BlockRenderer block={run.block} />
            </div>
          )
        }
        return (
          <div key={i} className={`${COLUMN} space-y-7`}>
            {run.blocks.map((block, j) => (
              <BlockRenderer key={j} block={block} />
            ))}
          </div>
        )
      })}
    </>
  )
}

function Chapter({ section, index }: { section: CaseStudySection; index: number }) {
  const first = section.blocks[0]
  const intro = first?.kind === 'p' ? first.text : undefined
  const rest = intro ? section.blocks.slice(1) : section.blocks
  const id = chapterId(section)
  return (
    // alternate bands are a neutral stage, not beige, so cool product screens keep their colour
    <section id={id} aria-labelledby={`${id}-title`} className={`scroll-mt-16 ${index % 2 === 1 ? 'bg-stage' : ''}`}>
      <div className="space-y-12 py-20 sm:py-28">
        <header className={`${COLUMN} relative`}>
          <span
            aria-hidden
            className="block font-serif text-4xl font-semibold leading-none text-text-faint lg:absolute lg:right-full lg:top-1.5 lg:mr-4 lg:text-5xl"
          >
            {section.number}
          </span>
          {section.eyebrow && <p className={`mt-5 lg:mt-0 ${LABEL}`}>{section.eyebrow}</p>}
          <h2
            id={`${id}-title`}
            tabIndex={-1}
            className={`outline-none font-serif text-3xl font-semibold leading-[1.08] tracking-tight text-text sm:text-5xl ${section.eyebrow ? 'mt-2' : 'mt-4 lg:mt-0'}`}
          >
            {section.title}
          </h2>
          {intro && <p className="mt-6 max-w-[62ch] text-xl leading-relaxed text-text/80">{intro}</p>}
        </header>
        <SectionBlocks blocks={rest} />
      </div>
    </section>
  )
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className={LABEL}>{label}</dt>
      <dd className="mt-1 text-sm text-text">{value}</dd>
    </div>
  )
}

function Hero({ content, appLink }: { content: CaseStudyContent; appLink?: string }) {
  return (
    <header className="relative overflow-hidden px-6 pb-16 pt-28 sm:px-10 sm:pb-20 sm:pt-32">
      <div className="pointer-events-none absolute -top-32 left-1/3 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-40 h-64 w-64 rounded-full bg-accent-2/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
        <div>
          <p className={LABEL}>
            {content.meta.company} · {content.meta.industry}
          </p>
          <h1 className="mt-4 font-serif text-[clamp(2.4rem,5vw,3.75rem)] font-semibold leading-[1.02] tracking-tight text-text">
            {content.title}
          </h1>
          <p className="mt-4 max-w-xl font-serif text-2xl italic leading-snug text-text-muted sm:text-3xl">{content.tagline}</p>
          <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-text/80">{content.intro}</p>

          <dl className="mt-8 grid max-w-xl grid-cols-2 gap-x-6 gap-y-4">
            <MetaItem label="Role" value={content.meta.role} />
            <MetaItem label="Team" value={content.meta.team} />
          </dl>
          <ul className="mt-5 flex max-w-xl flex-wrap gap-1.5" aria-label="Responsibilities">
            {content.meta.responsibilities.map((r) => (
              <li key={r} className="rounded-full border border-border bg-bg/50 px-2.5 py-1 text-xs font-medium text-text-muted">
                {r}
              </li>
            ))}
          </ul>
          {appLink && (
            <a
              href={appLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-1.5 rounded-full border border-border-strong px-4 py-2 text-sm font-medium text-text transition-colors hover:border-accent hover:text-accent"
            >
              View on Google Play
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>

        <DeviceVisual visual={content.heroVisual} />
      </div>

      <dl className="relative mx-auto mt-16 grid max-w-6xl gap-6 border-t border-border pt-8 sm:grid-cols-3 sm:gap-10">
        {(
          [
            ['The problem', content.glance.problem],
            ['My role', content.glance.role],
            ['What changed', content.glance.changed],
          ] as const
        ).map(([label, text]) => (
          <div key={label}>
            <dt className={LABEL}>{label}</dt>
            <dd className="mt-2 leading-relaxed text-text">{text}</dd>
          </div>
        ))}
      </dl>
    </header>
  )
}

/** Tracks which chapter is being read: the last one whose top has passed
 * 40% of the viewport. */
function useActiveChapter(ids: string[]) {
  const [active, setActive] = useState<string | null>(null)
  const key = ids.join('|')
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.4
      let current: string | null = null
      for (const id of key.split('|')) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      setActive(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [key])
  return active
}

function goToChapter(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ block: 'start' })
  el.querySelector<HTMLElement>('h2')?.focus({ preventScroll: true })
}

function ChapterRail({ sections, active }: { sections: CaseStudySection[]; active: string | null }) {
  return (
    <nav aria-label="Chapters" className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
      <ol className="flex flex-col items-end gap-1.5">
        {sections.map((s) => {
          const id = chapterId(s)
          const isActive = id === active
          return (
            <li key={id} className="group relative flex items-center">
              <span
                aria-hidden
                className="pointer-events-none absolute right-full mr-3 max-w-[16rem] truncate rounded-full bg-text px-3 py-1 text-xs text-bg opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
              >
                {s.title}
              </span>
              <button
                type="button"
                onClick={() => goToChapter(id)}
                aria-label={`Chapter ${s.number}: ${s.title}`}
                aria-current={isActive ? 'true' : undefined}
                className={`flex h-8 w-8 items-center justify-center rounded-full font-serif text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  isActive ? 'bg-accent text-bg-elevated' : 'text-text-faint hover:bg-surface hover:text-text'
                }`}
              >
                {s.number}
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

function ChapterMenu({ sections, active }: { sections: CaseStudySection[]; active: string | null }) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [open])

  return (
    // not `relative`: the menu panel anchors to the fixed top-left toolbar, so
    // it starts at the screen's left gutter instead of overflowing to the right
    <div ref={wrapRef} className="xl:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="chapter-menu"
        className="glass inline-flex h-[38px] items-center gap-2 rounded-full px-3 text-sm text-text-muted transition-colors hover:text-text sm:px-4"
      >
        {open ? <X className="h-4 w-4" /> : <ListOrdered className="h-4 w-4" />}
        <span className="sr-only sm:not-sr-only">Chapters</span>
      </button>
      {open && (
        <nav
          id="chapter-menu"
          aria-label="Chapters"
          className="glass-strong absolute left-0 top-12 w-[min(21rem,calc(100vw-2.5rem))] rounded-2xl p-2"
        >
          <ol className="max-h-[60dvh] overflow-y-auto">
            {sections.map((s) => {
              const id = chapterId(s)
              const isActive = id === active
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false)
                      goToChapter(id)
                    }}
                    aria-current={isActive ? 'true' : undefined}
                    className={`flex w-full items-baseline gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors hover:bg-surface-hover ${
                      isActive ? 'bg-surface text-text' : 'text-text-muted'
                    }`}
                  >
                    <span className={`font-serif font-semibold ${isActive ? 'text-accent' : 'text-text-faint'}`}>{s.number}</span>
                    <span className="leading-snug">{s.title}</span>
                  </button>
                </li>
              )
            })}
          </ol>
        </nav>
      )}
    </div>
  )
}

function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      aria-hidden
      style={{ scaleX: scrollYProgress }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-accent"
    />
  )
}

function Results({ results }: { results: NonNullable<CaseStudyContent['results']> }) {
  return (
    <section id="results" aria-labelledby="results-title" className="scroll-mt-16 py-20 sm:py-28">
      <div className={COLUMN}>
        <h2 id="results-title" className="font-serif text-3xl font-semibold tracking-tight text-text sm:text-5xl">
          Results
        </h2>
        {results.status && <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-text/80">{results.status}</p>}
      </div>
      <dl className="mx-auto mt-10 grid max-w-5xl gap-4 px-6 sm:grid-cols-2 lg:grid-cols-3">
        {results.stats.map((s) => (
          <div key={s.label} className="glass-strong flex flex-col-reverse gap-2 rounded-2xl px-6 py-6">
            <dt className={LABEL}>{s.label}</dt>
            <dd className="font-serif text-4xl font-semibold text-text">{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export function CaseStudyLayout({ content }: { content: CaseStudyContent }) {
  const self = caseStudies.find((c) => c.slug === content.slug)
  const otherStudy = caseStudies.find((c) => c.slug !== content.slug)
  const active = useActiveChapter(content.sections.map(chapterId))
  // "UltraGym UX Study" already says study; don't make it "… Study case study"
  usePageTitle(/study$/i.test(content.title) ? content.title : `${content.title} case study`)
  const showResults = !!content.results && content.results.stats.length > 0

  return (
    <LightboxProvider>
      <article className="relative">
        <ReadingProgress />
        <div className="fixed left-5 top-5 z-40 flex items-center gap-2 sm:left-8 sm:top-8">
          <Link
            to="/#work"
            className="glass inline-flex h-[38px] items-center gap-2 rounded-full px-4 text-sm text-text-muted transition-all hover:text-text"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to work
          </Link>
          <ChapterMenu sections={content.sections} active={active} />
        </div>
        <ChapterRail sections={content.sections} active={active} />

        <Hero content={content} appLink={self?.appLink} />

        {content.sections.map((section, i) => (
          <Chapter key={section.number} section={section} index={i} />
        ))}

        {showResults && content.results && <Results results={content.results} />}

        <section aria-labelledby="reflection-title" className="py-20 sm:py-24">
          <div className={COLUMN}>
            <PawIcon className="h-8 w-8 text-text-faint" />
            <h2 id="reflection-title" className="mt-4 font-serif text-3xl font-semibold tracking-tight text-text sm:text-5xl">
              Reflection
            </h2>
            <div className="mt-8 space-y-5">
              {content.reflection.paragraphs?.map((p, i) => (
                <p key={i} className="max-w-[68ch] text-lg leading-relaxed text-text/80">
                  {p}
                </p>
              ))}
              {content.reflection.points && (
                <ul className="space-y-3.5">
                  {content.reflection.points.map((item, i) => (
                    <li key={i} className="flex max-w-[68ch] gap-3.5 text-lg leading-relaxed text-text/80">
                      <span aria-hidden className="mt-3.5 h-px w-4 shrink-0 bg-text-faint/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>

        {otherStudy && (
          <section aria-label="Next case study" className="px-6 pb-24">
            <Link
              to={`/work/${otherStudy.slug}`}
              className="group mx-auto grid max-w-5xl overflow-hidden rounded-3xl bg-surface transition-colors hover:bg-surface-hover sm:grid-cols-[1.1fr_1fr]"
            >
              {/* the same cover banner as the study's card on the home page */}
              <div className="overflow-hidden" style={{ aspectRatio: otherStudy.coverAspect }}>
                <img
                  src={otherStudy.cover}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-col justify-center gap-4 p-8 sm:p-10">
                <p className={LABEL}>Next case study</p>
                <p className="font-serif text-3xl font-semibold leading-tight text-text transition-colors group-hover:text-accent sm:text-4xl">
                  {otherStudy.title}
                </p>
                <p className="text-text-muted">{otherStudy.tagline}</p>
                <span className="mt-2 flex h-12 w-12 items-center justify-center rounded-full border border-border-strong transition-all group-hover:border-accent group-hover:bg-accent group-hover:text-bg-elevated">
                  <ArrowRight className="h-5 w-5" />
                </span>
              </div>
            </Link>
          </section>
        )}
      </article>
    </LightboxProvider>
  )
}
