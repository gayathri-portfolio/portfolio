import type { CaseStudyContent } from '../data/caseStudyTypes'
import { imageDims } from '../lib/caseStudyBlocks'

/** The case study hero's product visual: one framed photo, or two device
 * screens offset from each other. */
export function DeviceVisual({ visual }: { visual: CaseStudyContent['heroVisual'] }) {
  if (visual.length === 1) {
    return (
      <div className="mx-auto aspect-[3/5] w-full max-w-[340px] overflow-hidden rounded-[2rem] bg-white shadow-[0_40px_80px_-40px_rgb(var(--shadow-color)/0.45)]">
        <img
          src={visual[0].src}
          alt={visual[0].alt}
          {...imageDims(visual[0].src)}
          className="h-full w-full object-cover object-bottom"
        />
      </div>
    )
  }
  return (
    <div className="mx-auto flex w-full max-w-md items-start justify-center gap-5 sm:gap-7">
      {visual.map((v, i) => (
        <img
          key={v.src}
          src={v.src}
          alt={v.alt}
          {...imageDims(v.src)}
          className={`h-auto w-1/2 max-w-[220px] drop-shadow-[0_30px_40px_rgb(var(--shadow-color)/0.35)] ${i === 1 ? 'mt-14' : ''}`}
        />
      ))}
    </div>
  )
}
