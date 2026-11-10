import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { CaseStudyImage } from '../data/caseStudyTypes'
import { LightboxContext, useLightbox } from '../lib/lightbox'

interface LightboxState {
  images: CaseStudyImage[]
  index: number
}

/** Full-screen view of a case study screen. Built as a fixed overlay rather
 * than a native modal <dialog>: the site hides the system cursor and draws
 * its own at z-[100], and a modal dialog's top layer would sit above it and
 * leave the pointer invisible. Focus is kept inside while open and handed
 * back to the thumbnail that opened it. */
export function LightboxProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LightboxState | null>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  const open = useCallback((images: CaseStudyImage[], index: number) => {
    returnFocusRef.current = document.activeElement as HTMLElement | null
    setState({ images, index })
  }, [])

  const close = useCallback(() => {
    setState(null)
    returnFocusRef.current?.focus()
  }, [])

  const step = useCallback((delta: number) => {
    setState((s) => (s ? { ...s, index: (s.index + delta + s.images.length) % s.images.length } : s))
  }, [])

  const isOpen = state !== null
  useEffect(() => {
    if (!isOpen) return
    closeRef.current?.focus()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
      } else if (e.key === 'ArrowRight') {
        step(1)
      } else if (e.key === 'ArrowLeft') {
        step(-1)
      } else if (e.key === 'Tab' && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>('button')
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [isOpen, close, step])

  const current = state?.images[state.index]
  const many = (state?.images.length ?? 0) > 1

  return (
    <LightboxContext.Provider value={open}>
      {children}
      {state && current && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={current.caption ? `${current.caption} — enlarged` : 'Enlarged screen'}
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center gap-5 bg-black/85 px-4 py-6 backdrop-blur-sm sm:px-16"
          onClick={(e) => {
            if (e.target === e.currentTarget) close()
          }}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Close enlarged view"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <X className="h-5 w-5" />
          </button>

          <img
            src={current.src}
            alt={current.alt}
            className="max-h-[calc(100dvh-10rem)] max-w-full rounded-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <div className="max-w-xl text-center text-white" onClick={(e) => e.stopPropagation()}>
            {current.caption && <p className="text-xs font-semibold uppercase tracking-wide text-white/70">{current.caption}</p>}
            {current.note && <p className="mt-1.5 text-sm text-white/85">{current.note}</p>}
            {many && (
              <p className="mt-2 text-xs text-white/60" aria-live="polite">
                {state.index + 1} / {state.images.length}
              </p>
            )}
          </div>

          {many && (
            <>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous screen"
                className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-5"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next screen"
                className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-5"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
      )}
    </LightboxContext.Provider>
  )
}

/** Wraps a thumbnail so it opens the lightbox on click/Enter. */
export function Zoomable({
  images,
  index,
  className,
  children,
}: {
  images: CaseStudyImage[]
  index: number
  className?: string
  children: ReactNode
}) {
  const open = useLightbox()
  return (
    <button
      type="button"
      onClick={() => open(images, index)}
      aria-label={`Enlarge: ${images[index].caption ?? images[index].alt}`}
      className={`w-full cursor-zoom-in rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${className ?? 'block'}`}
    >
      {children}
    </button>
  )
}
