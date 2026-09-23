import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import type { CaseStudyProject, ExternalProject } from '../data/projects'
import { PawIcon } from './PawIcon'

export function CaseStudyCard({ project, index }: { project: CaseStudyProject; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to={`/work/${project.slug}`} className="group block">
        <div
          className="relative overflow-hidden rounded-2xl border border-border bg-bg-elevated transition-colors group-hover:border-border-strong"
          style={{ aspectRatio: project.coverAspect }}
        >
          <img
            src={project.cover}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />

          {/* frosted-glass reveal on hover — plain text, no pill/border */}
          <div className="glass absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="flex translate-y-2 items-center gap-2 text-sm font-medium text-text transition-transform duration-300 group-hover:translate-y-0">
              Click me
              <PawIcon className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>

      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <Link
          to={`/work/${project.slug}`}
          className="font-display text-xl font-semibold tracking-tight text-text sm:text-2xl"
        >
          {project.title}
        </Link>
        {project.appLink && (
          <a
            href={project.appLink}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-sm font-medium text-accent underline underline-offset-4"
          >
            App Link
          </a>
        )}
      </div>
      <p className="mt-1.5 text-sm font-medium text-black/70">{project.tagline}</p>
      <p className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-text-muted">
        {project.highlights.map((h) => (
          <span key={h}>• {h}</span>
        ))}
      </p>
    </motion.div>
  )
}

export function ExternalProjectCard({ project, index }: { project: ExternalProject; index: number }) {
  const isWide = index === 0 || index === 3
  return (
    <motion.a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative block w-full overflow-hidden rounded-3xl border border-border bg-bg-elevated transition-colors hover:border-border-strong ${
        isWide
          ? 'aspect-[3/2] sm:aspect-auto sm:h-full sm:min-w-0 sm:flex-1'
          : 'aspect-square sm:h-full sm:w-auto sm:shrink-0'
      }`}
    >
      <img
        src={project.cover}
        alt={project.title}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
      />

      <span className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-bg/70 text-text-muted backdrop-blur transition-all group-hover:border-accent group-hover:text-accent">
        <ArrowUpRight className="h-4 w-4" />
      </span>

      <div className="glass absolute inset-0 flex flex-col items-center justify-center gap-1 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <h4 className="font-display text-[24px] font-bold text-text">{project.title}</h4>
        <p className="text-[18px] opacity-100" style={{ color: '#000000' }}>{project.tagline}</p>
      </div>
    </motion.a>
  )
}
