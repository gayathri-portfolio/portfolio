import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import type { ReactNode } from 'react'
import { CaseStudyCard, ExternalProjectCard } from './ProjectCards'
import { CatMascot } from './CatMascot'
import { caseStudies, externalProjects } from '../data/projects'

function ScaleRow({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1])

  return (
    <motion.div
      ref={ref}
      style={{ scale, transformOrigin: 'center center' }}
      className="flex flex-col gap-6 sm:h-[360px] sm:flex-row lg:h-[440px]"
    >
      {children}
    </motion.div>
  )
}

export function SelectedWork() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-start gap-4 sm:flex-row sm:items-center"
      >
        <CatMascot className="h-20 w-20 shrink-0 sm:h-40 sm:w-40" />
        <div>
          <p className="font-serif text-[26px] italic text-text-muted sm:text-[28px]">
            I strongly recommend you look at these case studies&hellip;
          </p>
          <p className="mt-[1em] max-w-2xl text-text-muted">
            Two case studies where I owned the design end to end, from research and
            problem framing to flows, UI, testing, and shipping with developers.
          </p>
        </div>
      </motion.div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {caseStudies.map((project, i) => (
          <CaseStudyCard key={project.slug} project={project} index={i} />
        ))}
      </div>

      <div className="mt-20">
        <p className="mb-6 text-sm font-medium uppercase tracking-wide text-text-faint">Other selected work</p>
        <div className="space-y-6">
          <ScaleRow>
            {externalProjects.slice(0, 2).map((project, i) => (
              <ExternalProjectCard key={project.title} project={project} index={i} />
            ))}
          </ScaleRow>
          <ScaleRow>
            {externalProjects.slice(2, 4).map((project, i) => (
              <ExternalProjectCard key={project.title} project={project} index={i + 2} />
            ))}
          </ScaleRow>
        </div>
      </div>
    </section>
  )
}
