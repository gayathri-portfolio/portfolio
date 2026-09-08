import { SectionLabel } from './SectionLabel'
import { CaseStudyCard, ExternalProjectCard } from './ProjectCards'
import { caseStudies, externalProjects } from '../data/projects'

export function SelectedWork() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <SectionLabel className="justify-center">SELECTED WORK</SectionLabel>
        <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
          Projects focused on clarity &amp; interaction
        </h2>
        <p className="mt-4 text-text-muted">
          Two deep case studies where I owned the process end to end, plus a few more
          selected projects — from ridesharing to ecommerce.
        </p>
      </div>

      <div className="mt-14 grid gap-6">
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
