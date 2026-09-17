import { motion } from 'framer-motion'
import { CaseStudyCard, ExternalProjectCard } from './ProjectCards'
import { CatMascot } from './CatMascot'
import { caseStudies, externalProjects } from '../data/projects'

export function SelectedWork() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <p className="max-w-2xl text-text-muted">
        Two deep case studies where I owned the process end to end, plus a few more
        selected projects — from ridesharing to ecommerce.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="mt-12 flex items-center gap-4"
      >
        <CatMascot className="h-16 w-16 shrink-0 sm:h-20 sm:w-20" />
        <p className="font-serif text-lg italic text-text-muted sm:text-xl">
          I strongly recommend you look at these case studies&hellip;
        </p>
      </motion.div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {caseStudies.map((project, i) => (
          <CaseStudyCard key={project.slug} project={project} index={i} />
        ))}
      </div>

      <div className="mt-20">
        <p className="mb-6 text-sm font-medium uppercase tracking-wide text-text-faint">Other selected work</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {externalProjects.map((project, i) => (
            <ExternalProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
