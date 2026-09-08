import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { CaseStudyContent } from '../data/caseStudyTypes'
import { BlockRenderer } from './CaseStudyBlocks'
import { SectionLabel } from './SectionLabel'
import { PawIcon } from './PawIcon'
import { caseStudies } from '../data/projects'

export function CaseStudyLayout({ content }: { content: CaseStudyContent }) {
  const otherStudy = caseStudies.find((c) => c.slug !== content.slug)

  return (
    <article>
      <header className="relative overflow-hidden pb-16 pt-32 sm:pt-40">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-5">
          <Link
            to="/#work"
            className="inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-text"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to work
          </Link>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 font-serif text-lg italic text-accent"
          >
            {content.meta.company} · {content.meta.industry}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-2 font-display text-[clamp(2.2rem,6vw,4rem)] font-semibold leading-[1.02] tracking-tight text-text"
          >
            {content.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-3 max-w-2xl text-xl text-text-muted"
          >
            {content.tagline}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-text"
          >
            {content.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 grid gap-6 rounded-2xl border border-border bg-surface p-6 sm:grid-cols-3"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-faint">Role</p>
              <p className="mt-1.5 text-sm text-text">{content.meta.role}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-faint">Team</p>
              <p className="mt-1.5 text-sm text-text">{content.meta.team}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-faint">Responsibilities</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {content.meta.responsibilities.map((r) => (
                  <span key={r} className="rounded-full bg-bg-elevated px-2.5 py-1 text-xs text-text-muted">
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="relative mx-auto mt-14 max-w-5xl px-5"
        >
          <div className="overflow-hidden rounded-3xl border border-border bg-bg-elevated">
            <img src={content.heroImage} alt={content.title} className="w-full" />
          </div>
        </motion.div>
      </header>

      <div className="mx-auto max-w-3xl space-y-24 px-5 pb-16">
        {content.sections.map((section) => (
          <section key={section.number} className="space-y-7">
            <div>
              <SectionLabel>{`SECTION ${section.number}`}</SectionLabel>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-text sm:text-3xl">
                {section.title}
              </h2>
            </div>
            <div className="space-y-7">
              {section.blocks.map((block, i) => (
                <BlockRenderer key={i} block={block} />
              ))}
            </div>
          </section>
        ))}

        <section className="space-y-6 rounded-3xl border border-border bg-surface p-8 sm:p-10">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-bg-elevated">
            <PawIcon className="h-5 w-5" />
          </div>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-text">Reflection</h2>
          <p className="text-lg leading-relaxed text-text-muted">{content.reflection}</p>
          <p className="border-t border-border pt-5 font-serif text-lg italic text-accent">{content.learnings}</p>
        </section>
      </div>

      {otherStudy && (
        <div className="border-t border-border">
          <Link
            to={`/work/${otherStudy.slug}`}
            className="group mx-auto flex max-w-5xl flex-col justify-between gap-3 px-5 py-14 sm:flex-row sm:items-center"
          >
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-text-faint">Next case study</p>
              <p className="mt-2 font-display text-2xl font-semibold text-text sm:text-3xl">{otherStudy.title}</p>
              <p className="mt-1 text-text-muted">{otherStudy.tagline}</p>
            </div>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border transition-all group-hover:border-accent group-hover:bg-accent group-hover:text-bg-elevated">
              <ArrowRight className="h-5 w-5" />
            </span>
          </Link>
        </div>
      )}
    </article>
  )
}
