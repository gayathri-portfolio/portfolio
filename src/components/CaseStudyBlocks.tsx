import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ChevronRight,
  History,
  ListChecks,
  RefreshCcw,
  SlidersHorizontal,
  Smartphone,
  Users,
  X,
} from 'lucide-react'
import type { Block, CardIcon, CaseStudyImage } from '../data/caseStudyTypes'
import { Zoomable } from './Lightbox'
import { imageDims, LABEL } from '../lib/caseStudyBlocks'

const CARD_ICONS: Record<CardIcon, typeof History> = {
  decisions: ListChecks,
  sliders: SlidersHorizontal,
  history: History,
  phone: Smartphone,
  users: Users,
}

const BODY = 'max-w-[68ch] text-lg leading-relaxed text-text/80'
// drop-shadow (not box-shadow) so the shadow follows the device outline in
// the transparent PNG instead of drawing a rectangle around it
const SCREEN_SHADOW = 'drop-shadow-[0_22px_28px_rgb(var(--shadow-color)/0.28)]'

export function BlockRenderer({ block }: { block: Block }) {
  switch (block.kind) {
    case 'p':
      return (
        <Reveal>
          <p className={BODY}>{block.text}</p>
        </Reveal>
      )

    case 'subheading':
      return (
        <Reveal>
          <div className="pt-8">
            {block.eyebrow && <p className={LABEL}>{block.eyebrow}</p>}
            <h3
              className={`max-w-[34ch] font-serif text-2xl font-semibold leading-snug tracking-tight text-text sm:text-3xl ${block.eyebrow ? 'mt-2' : ''}`}
            >
              {block.text}
            </h3>
          </div>
        </Reveal>
      )

    case 'highlight':
      return (
        <Reveal>
          <div className="bg-[#18140f] px-6 py-16 text-[#f6efe1] sm:py-20 dark:bg-accent-soft dark:text-text">
            <p className="mx-auto max-w-3xl text-center font-serif text-2xl italic leading-snug sm:text-4xl">
              {block.text}
            </p>
          </div>
        </Reveal>
      )

    case 'callout':
      return (
        <Reveal>
          {/* a question or problem: soft peach. Green is kept for learnings (notes). */}
          <div className="max-w-2xl rounded-2xl bg-accent-soft/60 px-6 py-6 sm:px-8 sm:py-7">
            {block.label && <p className={LABEL}>{block.label}</p>}
            <p className={`font-serif text-xl leading-snug text-text sm:text-[1.375rem] ${block.label ? 'mt-3' : ''}`}>
              {block.text}
            </p>
          </div>
        </Reveal>
      )

    case 'note':
      return (
        <Reveal>
          {/* an observation, insight or principle: something learned, so green */}
          <figure className="max-w-2xl border-l-2 border-accent-2 py-1 pl-6">
            <figcaption className={LABEL}>{block.label}</figcaption>
            <p className="mt-2 font-serif text-lg leading-snug text-text sm:text-xl">{block.text}</p>
          </figure>
        </Reveal>
      )

    case 'cards':
      return (
        <Reveal>
          <div className="glass-strong max-w-3xl divide-y divide-border/60 rounded-3xl px-6 sm:px-8">
            {block.items.map((item, i) => {
              const Icon = item.icon ? CARD_ICONS[item.icon] : null
              return (
                <div key={i} className="flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:gap-8">
                  <div className="flex items-start gap-3 sm:w-64 sm:shrink-0">
                    {Icon && <Icon aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-text-muted" />}
                    <h3 className="text-base font-semibold leading-snug text-text">{item.title}</h3>
                  </div>
                  <p className="max-w-xl text-text/80">{item.text}</p>
                </div>
              )
            })}
          </div>
        </Reveal>
      )

    case 'image-grid':
      return block.dark ? <DarkPanel images={block.images} /> : <ScreenGrid images={block.images} />

    case 'compare-images':
      return <CompareImages before={block.before} after={block.after} />

    case 'image': {
      const images: CaseStudyImage[] = [{ src: block.src, alt: block.alt, caption: block.caption }]
      return (
        <Reveal>
          <figure className="mx-auto max-w-3xl">
            <Zoomable images={images} index={0}>
              <img src={block.src} alt={block.alt} loading="lazy" {...imageDims(block.src)} className="h-auto w-full rounded-2xl" />
            </Zoomable>
            {block.caption && (
              <figcaption className={`mt-4 text-center ${LABEL}`}>{block.caption}</figcaption>
            )}
          </figure>
        </Reveal>
      )
    }

    case 'list':
      return (
        <Reveal>
          <ul className="max-w-[68ch] space-y-3.5">
            {block.items.map((item, i) => (
              <li key={i} className="flex gap-3.5 text-lg leading-relaxed text-text/80">
                <span aria-hidden className="mt-3.5 h-px w-4 shrink-0 bg-text-faint/60" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      )

    case 'stat-grid':
      return (
        <Reveal>
          <dl className="grid max-w-2xl gap-4 sm:grid-cols-2">
            {block.items.map((item, i) => (
              <div key={i} className="glass-strong rounded-2xl px-6 py-5">
                <dt className={LABEL}>{item.label}</dt>
                <dd className="mt-1 font-serif text-3xl font-semibold text-text sm:text-4xl">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      )

    case 'steps':
      return <Steps items={block.items} note={block.note} />

    case 'flow':
      return <Flow block={block} />

    default:
      return null
  }
}

/** Device screens at a size you can actually read, sized by how many sit in a row. */
function ScreenGrid({ images }: { images: CaseStudyImage[] }) {
  const n = images.length
  const width = n >= 4 ? 'max-w-6xl' : n === 3 ? 'max-w-5xl' : n === 2 ? 'max-w-3xl' : 'max-w-sm'
  const cols = n >= 4 ? 'lg:grid-cols-4' : n === 3 ? 'lg:grid-cols-3' : n === 2 ? '' : ''
  return (
    <Reveal>
      <div className={`mx-auto grid ${width} grid-cols-2 items-start gap-x-5 gap-y-10 sm:gap-x-8 ${cols}`}>
        {images.map((img, i) => (
          <figure key={i} className={`flex flex-col items-center ${n === 3 && i === 2 ? 'col-span-2 mx-auto w-1/2 lg:col-span-1 lg:w-full' : ''} ${n === 1 ? 'col-span-2' : ''}`}>
            <Zoomable images={images} index={i}>
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                {...imageDims(img.src)}
                className={`h-auto w-full rounded-2xl transition-transform duration-300 ease-out hover:-translate-y-1 ${SCREEN_SHADOW}`}
              />
            </Zoomable>
            <ImageCaption img={img} />
          </figure>
        ))}
      </div>
    </Reveal>
  )
}

function ImageCaption({ img, tone = 'default' }: { img: CaseStudyImage; tone?: 'default' | 'dark' }) {
  if (!img.caption && !img.note) return null
  return (
    <figcaption className="mt-4 max-w-[30ch] text-center">
      {img.caption && (
        <span
          className={`block ${tone === 'dark' ? 'text-xs font-semibold uppercase tracking-[0.08em] text-white/70' : LABEL}`}
        >
          {img.caption}
        </span>
      )}
      {img.note && (
        <span className={`mt-1.5 block text-sm leading-snug ${tone === 'dark' ? 'text-white/80' : 'text-text-muted'}`}>
          {img.note}
        </span>
      )}
    </figcaption>
  )
}

/** Light-on-dark UI fragments (like the tempo explorations) on their own dark
 * panel. The last image is the final design and sits below the variations. */
function DarkPanel({ images }: { images: CaseStudyImage[] }) {
  const variations = images.slice(0, -1)
  const final = images[images.length - 1]
  return (
    <Reveal>
      <div className="mx-auto max-w-5xl rounded-3xl bg-[#1b1a18] px-6 py-10 sm:px-10 sm:py-12">
        <div className="grid items-end gap-10 sm:grid-cols-3">
          {variations.map((img, i) => (
            <figure key={i} className="flex flex-col items-center">
              {/* fixed-height cell so the panel doesn't grow as the images load */}
              <Zoomable images={images} index={i} className="flex h-64 items-end justify-center">
                <img src={img.src} alt={img.alt} loading="lazy" className="max-h-full w-auto max-w-full object-contain" />
              </Zoomable>
              <ImageCaption img={img} tone="dark" />
            </figure>
          ))}
        </div>
        <div className="my-10 h-px bg-white/10" />
        <figure className="flex flex-col items-center">
          <Zoomable images={images} index={images.length - 1} className="max-w-sm">
            <img src={final.src} alt={final.alt} loading="lazy" {...imageDims(final.src)} className="mx-auto h-auto w-full" />
          </Zoomable>
          <ImageCaption img={final} tone="dark" />
        </figure>
      </div>
    </Reveal>
  )
}

function CompareImages({ before, after }: { before: CaseStudyImage; after: CaseStudyImage }) {
  const images = [before, after]
  return (
    <Reveal>
      <div className="mx-auto grid max-w-3xl grid-cols-2 items-start gap-x-5 sm:gap-x-10">
        {images.map((img, i) => (
          <figure key={i} className="relative flex flex-col items-center">
            <span
              className={`mb-4 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] ${
                i === 0 ? 'border border-border-strong bg-bg-elevated text-text-muted' : 'bg-accent-text text-bg-elevated'
              }`}
            >
              {img.caption}
            </span>
            <Zoomable images={images} index={i}>
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                {...imageDims(img.src)}
                className={`h-auto w-full rounded-2xl ${SCREEN_SHADOW} ${i === 0 ? 'opacity-85 saturate-[0.7]' : ''}`}
              />
            </Zoomable>
            {img.note && <p className="mt-4 max-w-[30ch] text-center text-sm leading-snug text-text-muted">{img.note}</p>}
            {i === 0 && (
              <ArrowRight
                aria-hidden
                className="absolute -right-4 top-1/2 hidden h-5 w-5 -translate-y-1/2 translate-x-1/2 text-text-faint sm:block"
              />
            )}
          </figure>
        ))}
      </div>
    </Reveal>
  )
}

function Steps({ items, note }: { items: string[]; note?: string }) {
  return (
    <Reveal>
      <div className="mx-auto max-w-6xl">
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-flow-col lg:auto-cols-fr lg:grid-cols-none lg:gap-6">
          {items.map((item, i) => (
            <li
              key={i}
              className="relative flex items-center gap-3 rounded-2xl border border-border bg-bg-elevated/70 px-4 py-4 lg:flex-col lg:items-start lg:gap-2"
            >
              <span className="font-serif text-lg font-semibold text-text-muted">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-sm font-medium leading-snug text-text">{item}</span>
              {i < items.length - 1 && (
                <ChevronRight
                  aria-hidden
                  className="absolute -right-[1.2rem] top-1/2 hidden h-4 w-4 -translate-y-1/2 text-text-faint lg:block"
                />
              )}
            </li>
          ))}
        </ol>
        {note && (
          <p className="mt-5 flex max-w-3xl items-start gap-2.5 text-text-muted">
            <RefreshCcw aria-hidden className="mt-1 h-4 w-4 shrink-0 text-text-muted" />
            {note}
          </p>
        )}
      </div>
    </Reveal>
  )
}

function Flow({ block }: { block: Extract<Block, { kind: 'flow' }> }) {
  return (
    <Reveal>
      <figure className="mx-auto max-w-6xl rounded-3xl border border-border bg-bg-elevated/70 px-5 py-8 sm:px-8">
        <ol className="grid gap-3 lg:grid-cols-5 lg:gap-6">
          {block.steps.map((s, i) => (
            <li key={i} className="relative rounded-2xl bg-surface px-4 py-4">
              <span className="font-serif text-lg font-semibold text-text-muted">{String(i + 1).padStart(2, '0')}</span>
              <p className="mt-1 font-semibold text-text">{s.title}</p>
              <p className="mt-1 text-sm leading-snug text-text-muted">{s.text}</p>
              {i < block.steps.length - 1 && (
                <ChevronRight
                  aria-hidden
                  className="absolute -right-[1.2rem] top-1/2 hidden h-4 w-4 -translate-y-1/2 text-text-faint lg:block"
                />
              )}
            </li>
          ))}
        </ol>

        <p className="mt-4 flex items-center justify-center gap-2 rounded-full border border-dashed border-border-strong px-4 py-2 text-sm text-text-muted">
          <RefreshCcw aria-hidden className="h-4 w-4 text-text-muted" />
          {block.loop}
        </p>

        <div className="mt-8 grid items-center gap-4 lg:grid-cols-[1fr_auto_1fr]">
          {/* the fail branch is the one place orange marks content: it's the warning path */}
          <div className="rounded-2xl border border-accent/40 bg-accent-soft/40 px-5 py-5">
            <p className={LABEL}>{block.branch.title}</p>
            <ul className="mt-3 space-y-2">
              {block.branch.conditions.map((c, i) => (
                <li key={i} className="flex gap-2.5 text-sm leading-snug text-text">
                  <X aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <ArrowRight aria-hidden className="mx-auto hidden h-5 w-5 text-accent lg:block" />
          <ArrowDown aria-hidden className="mx-auto h-5 w-5 text-accent lg:hidden" />
          <div className="rounded-2xl bg-surface px-5 py-5">
            <p className={LABEL}>Then</p>
            <p className="mt-2 font-semibold leading-snug text-text">{block.branch.outcome}</p>
          </div>
        </div>

        {block.note && (
          <figcaption className="mx-auto mt-8 max-w-2xl text-center leading-relaxed text-text-muted">
            {block.note}
          </figcaption>
        )}
      </figure>
    </Reveal>
  )
}

function Reveal({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion()
  if (reduceMotion) return <div>{children}</div>
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
