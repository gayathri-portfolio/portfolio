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
      <Link to={`/work/${project.slug}`} className="group block">
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-border transition-colors group-hover:border-border-strong">
          <img
            src={project.cover}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
          <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-white backdrop-blur-md">
            Case Study
          </div>

          {/* reveals on hover only */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/35 group-hover:opacity-100">
            <span className="glass flex translate-y-2 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white transition-transform duration-300 group-hover:translate-y-0">
              View Case Study
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="inline font-display text-xl font-semibold tracking-tight text-text underline decoration-2 underline-offset-4 sm:text-2xl">
            {project.title}
          </h3>
          <p className="mt-1.5 text-sm font-medium text-accent">{project.tagline}</p>
          <p className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-text-muted">
            {project.highlights.map((h) => (
              <span key={h}>• {h}</span>
            ))}
          </p>
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
      className="glass group flex flex-col justify-between rounded-2xl p-6 transition-transform hover:-translate-y-1"
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
