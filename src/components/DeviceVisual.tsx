import type { CaseStudyContent } from '../data/caseStudyTypes'
import { imageDims } from '../lib/caseStudyBlocks'

/** A study's product visual: one framed photo, or two device screens offset
 * from each other. Used by the case study hero ('hero') and by the "Next case
 * study" card ('card'). The card is decorative next to its title, so its
 * images get empty alt text. */
export function DeviceVisual({ visual, size }: { visual: CaseStudyContent['heroVisual']; size: 'hero' | 'card' }) {
  const hero = size === 'hero'
  if (visual.length === 1) {
    return (
      <div
        className={`mx-auto aspect-[3/5] w-full overflow-hidden rounded-[2rem] bg-white shadow-[0_40px_80px_-40px_rgb(var(--shadow-color)/0.45)] ${hero ? 'max-w-[340px]' : 'max-w-[190px] rounded-3xl'}`}
      >
        <img
          src={visual[0].src}
          alt={hero ? visual[0].alt : ''}
          {...imageDims(visual[0].src)}
          loading={hero ? undefined : 'lazy'}
          className="h-full w-full object-cover object-bottom"
        />
      </div>
    )
  }
  return (
    <div className={`mx-auto flex w-full items-start justify-center ${hero ? 'max-w-md gap-5 sm:gap-7' : 'max-w-[280px] gap-4'}`}>
      {visual.map((v, i) => (
        <img
          key={v.src}
          src={v.src}
          alt={hero ? v.alt : ''}
          {...imageDims(v.src)}
          loading={hero ? undefined : 'lazy'}
          className={`h-auto w-1/2 drop-shadow-[0_30px_40px_rgb(var(--shadow-color)/0.35)] ${hero ? 'max-w-[220px]' : 'max-w-[130px]'} ${
            i === 1 ? (hero ? 'mt-14' : 'mt-8') : ''
          }`}
        />
      ))}
    </div>
  )
}
