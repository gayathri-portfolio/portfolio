import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { CaseStudyContent } from '../data/caseStudyTypes'
import { BlockRenderer } from './CaseStudyBlocks'
import { PawIcon } from './PawIcon'
import { caseStudies } from '../data/projects'

export function CaseStudyLayout({ content }: { content: CaseStudyContent }) {
  const otherStudy = caseStudies.find((c) => c.slug !== content.slug)

  return (
    <article className="overflow-x-clip">
      <header className="relative overflow-hidden pb-16 pt-32 sm:pt-40">
        <div className="mx-auto max-w-6xl px-5">
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
              className="flex flex-col gap-5 border-t border-border pt-6 lg:border-t-0 lg:pt-1"
            >
              <MetaRow label="Role" value={content.meta.role} />
              <MetaRow label="Team" value={content.meta.team} />
              <MetaRow label="Company" value={content.meta.company} />
              <MetaRow label="Industry" value={content.meta.industry} />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-text-faint">Responsibilities</p>
                <p className="mt-2 text-sm leading-relaxed text-text">
                  {content.meta.responsibilities.join(' · ')}
                </p>
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
              className="max-h-[480px] w-auto rounded-2xl object-contain sm:max-h-[600px]"
            />
          </div>
        </motion.div>
      </header>

      <div className="mx-auto max-w-5xl space-y-28 px-5 pb-24 sm:space-y-36">
        {content.sections.map((section) => (
          <section key={section.number} className="grid gap-6 sm:grid-cols-[110px_1fr] sm:gap-10">
            <span className="font-serif text-5xl font-semibold text-accent/25 sm:text-6xl">{section.number}</span>
            <div className="space-y-8">
              <h2 className="max-w-2xl font-serif text-3xl font-semibold tracking-tight text-text sm:text-4xl">
                {section.title}
              </h2>
              <div className="space-y-8">
                {section.blocks.map((block, i) => (
                  <BlockRenderer key={i} block={block} />
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="grid gap-6 sm:grid-cols-[110px_1fr] sm:gap-10">
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
