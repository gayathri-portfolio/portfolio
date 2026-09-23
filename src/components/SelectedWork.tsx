import { motion } from 'framer-motion'
import { CaseStudyCard, ExternalProjectCard } from './ProjectCards'
import { CatMascot } from './CatMascot'
import { caseStudies, externalProjects } from '../data/projects'

export function SelectedWork() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4"
      >
        <CatMascot className="h-32 w-32 shrink-0 sm:h-40 sm:w-40" />
        <div>
          <p className="font-serif text-[26px] italic text-text-muted sm:text-[28px]">
            I strongly recommend you look at these case studies&hellip;
          </p>
          <p className="mt-[1.05em] max-w-2xl text-text-muted">
            Two deep case studies where I owned the product design end to end — from
            research and defining the problem to shaping the user flows, UX, UI,
            prototyping, testing, and working with developers to bring the final
            product to life.
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
          <div className="flex flex-col gap-6 sm:h-[360px] sm:flex-row lg:h-[440px]">
            {externalProjects.slice(0, 2).map((project, i) => (
              <ExternalProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>
          <div className="flex flex-col gap-6 sm:h-[360px] sm:flex-row lg:h-[440px]">
            {externalProjects.slice(2, 4).map((project, i) => (
              <ExternalProjectCard key={project.title} project={project} index={i + 2} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
