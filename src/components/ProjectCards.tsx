import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import type { CaseStudyProject, ExternalProject } from '../data/projects'

export function CaseStudyCard({ project, index }: { project: CaseStudyProject; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={`/work/${project.slug}`}
        className="group grid overflow-hidden rounded-3xl border border-border bg-surface transition-colors hover:border-border-strong sm:grid-cols-2"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-bg-elevated sm:aspect-auto">
          <img
            src={project.cover}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
          <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-white backdrop-blur-sm">
            Case Study
          </div>
        </div>

        <div className="flex flex-col justify-center p-7 sm:p-10">
          <div className="mb-3 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-bg-elevated px-2.5 py-1 text-xs text-text-muted">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="font-display text-2xl font-semibold tracking-tight text-text sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-1 text-sm font-medium text-accent">{project.tagline}</p>
          <p className="mt-4 text-text-muted">{project.summary}</p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-text">
            View case study
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

export function ExternalProjectCard({ project, index }: { project: ExternalProject; index: number }) {
  return (
    <motion.a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col justify-between rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong hover:bg-surface-hover"
    >
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-display text-lg font-semibold text-text">{project.title}</h4>
          <p className="mt-0.5 text-sm text-text-muted">{project.tagline}</p>
        </div>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-text-muted transition-all group-hover:border-accent group-hover:text-accent">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-bg-elevated px-2.5 py-1 text-xs text-text-muted">
            {tag}
          </span>
        ))}
      </div>
    </motion.a>
  )
}
