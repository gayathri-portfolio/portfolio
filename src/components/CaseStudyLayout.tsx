import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { Block, CaseStudyContent } from '../data/caseStudyTypes'
import { BlockRenderer } from './CaseStudyBlocks'
import { PawIcon } from './PawIcon'
import { caseStudies } from '../data/projects'

/** Blocks that break out full-bleed and therefore need their direct DOM
 * parent to be a viewport-centered element — not the numeral/content
 * grid column, which is offset right and would make the breakout drift
 * off-center. */
function isFullBleed(block: Block) {
  return block.kind === 'highlight' || (block.kind === 'image' && block.wide)
}

/** Mobile-screen image rows read as a showcase, not body copy, so they're
 * centered on the section's full width rather than the (numeral-offset)
 * text column — otherwise they visibly drift right of true page-center. */
function isPageCentered(block: Block) {
  return block.kind === 'image-grid'
}

type Run =
  | { kind: 'group'; blocks: Block[] }
  | { kind: 'full-bleed'; block: Block }
  | { kind: 'page-centered'; block: Block }

function groupBlocks(blocks: Block[]): Run[] {
  const runs: Run[] = []
  for (const block of blocks) {
    if (isFullBleed(block)) {
      runs.push({ kind: 'full-bleed', block })
      continue
    }
    if (isPageCentered(block)) {
      runs.push({ kind: 'page-centered', block })
      continue
    }
    const last = runs[runs.length - 1]
    if (last && last.kind === 'group') last.blocks.push(block)
    else runs.push({ kind: 'group', blocks: [block] })
  }
  return runs
}

export function CaseStudyLayout({ content }: { content: CaseStudyContent }) {
  const otherStudy = caseStudies.find((c) => c.slug !== content.slug)

  return (
    <article className="overflow-x-clip">
      <header className="relative overflow-hidden pb-16 pt-32 sm:pt-40">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-40 h-64 w-64 rounded-full bg-accent-2/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-5">
          <Link
            to="/#work"
            className="inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-text"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to work
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_260px] lg:gap-16">
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
                className="mt-4 font-serif text-[clamp(2.6rem,7vw,5.2rem)] font-semibold leading-[0.98] tracking-tight text-text"
              >
                {content.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-4 max-w-2xl font-serif text-2xl italic leading-snug text-text-muted sm:text-3xl"
              >
                {content.tagline}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="mt-6 max-w-xl text-lg leading-relaxed text-text-muted"
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
              <MetaRow label="Role" value={content.meta.role} />
              <MetaRow label="Team" value={content.meta.team} />
              <MetaRow label="Company" value={content.meta.company} />
              <MetaRow label="Industry" value={content.meta.industry} />
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
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="relative mx-auto mt-16 max-w-6xl px-5"
        >
          <div className="flex justify-center">
            <img
              src={content.heroImage}
              alt={content.title}
              className="max-h-[480px] w-auto rounded-2xl object-contain shadow-[0_32px_64px_-32px_rgb(var(--shadow-color)/0.5)] sm:max-h-[600px]"
            />
          </div>
        </motion.div>
      </header>

      <div className="mx-auto max-w-5xl space-y-28 px-5 pb-24 sm:space-y-36">
        {content.sections.map((section, sIdx) => {
          const runs = groupBlocks(section.blocks)
          const numeralColor = sIdx % 2 === 0 ? 'text-accent/25' : 'text-accent-2/25'
          let groupIndex = -1
          return (
            <section key={section.number} className="space-y-8">
              {runs.map((run, i) => {
                if (run.kind === 'full-bleed') {
                  return <BlockRenderer key={i} block={run.block} />
                }
                if (run.kind === 'page-centered') {
                  return (
                    <div key={i} className="flex justify-center">
                      <BlockRenderer block={run.block} />
                    </div>
                  )
                }
                groupIndex += 1
                const isFirstGroup = groupIndex === 0
                return (
                  <div key={i} className="grid gap-6 sm:grid-cols-[110px_1fr] sm:gap-10">
                    <span className={`font-serif text-5xl font-semibold sm:text-6xl ${numeralColor}`}>
                      {isFirstGroup ? section.number : ''}
                    </span>
                    <div className="space-y-8">
                      {isFirstGroup && (
                        <h2 className="max-w-2xl font-serif text-3xl font-semibold tracking-tight text-text sm:text-4xl">
                          {section.title}
                        </h2>
                      )}
                      <div className="space-y-8">
                        {run.blocks.map((block, j) => (
                          <BlockRenderer key={j} block={block} />
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </section>
          )
        })}

        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-accent-2/10 blur-3xl" />
          <div className="glass-strong relative grid gap-6 rounded-3xl p-6 sm:grid-cols-[110px_1fr] sm:gap-10 sm:p-8">
            <PawIcon className="h-9 w-9 text-accent/40" />
            <div className="space-y-6">
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-text sm:text-4xl">Reflection</h2>
              {content.reflection.paragraphs?.map((p, i) => (
                <p key={i} className="max-w-2xl text-lg leading-relaxed text-text-muted">
                  {p}
                </p>
              ))}
              {content.reflection.points && (
                <ul className="max-w-2xl space-y-3.5">
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
        </section>
      </div>

      {otherStudy && (
        <div className="border-t border-border">
          <Link
            to={`/work/${otherStudy.slug}`}
            className="group mx-auto flex max-w-6xl flex-col justify-between gap-4 px-5 py-16 sm:flex-row sm:items-center"
          >
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-text-faint">Next case study</p>
              <p className="mt-3 font-serif text-3xl font-semibold text-text sm:text-4xl">{otherStudy.title}</p>
              <p className="mt-2 text-text-muted">{otherStudy.tagline}</p>
            </div>
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-border transition-all group-hover:border-accent group-hover:bg-accent group-hover:text-bg-elevated">
              <ArrowRight className="h-5 w-5" />
            </span>
          </Link>
        </div>
      )}
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
