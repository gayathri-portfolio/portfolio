import { useEffect, useRef, useState } from 'react'

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor-pointer]'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches
    if (coarsePointer) return

    document.documentElement.classList.add('custom-cursor-active')

    function handleMove(e: PointerEvent) {
      setVisible(true)
      const el = dotRef.current
      if (el) {
        el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`
      }
      const target = e.target as Element | null
      setHovering(!!target?.closest?.(INTERACTIVE_SELECTOR))
    }

    window.addEventListener('pointermove', handleMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', handleMove)
      document.documentElement.classList.remove('custom-cursor-active')
    }
  }, [])

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] transition-opacity duration-200"
      style={{ opacity: visible ? 1 : 0, willChange: 'transform' }}
    >
      {hovering ? <PawCursor /> : <YarnBallCursor />}
    </div>
  )
}

function YarnBallCursor() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="var(--accent)" stroke="#000" strokeWidth="1.5" />
      <g stroke="#000" strokeWidth="1" strokeLinecap="round" opacity="0.55" fill="none">
        <path d="M3.5 9c4.5 2.2 12.5 2.2 17 0" />
        <path d="M2.6 13.5c5.2 2 13.6 2 18.8 0" />
        <path d="M7.5 4c1.2 5.2 1.2 10.8 0 16" />
        <path d="M16.5 4c-1.2 5.2-1.2 10.8 0 16" />
      </g>
    </svg>
  )
}

function PawCursor() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24">
      <g fill="var(--accent)" stroke="#000" strokeWidth="1">
        <ellipse cx="12" cy="15.5" rx="5.6" ry="4.8" />
        <ellipse cx="4.4" cy="9" rx="2.4" ry="2.8" />
        <ellipse cx="19.6" cy="9" rx="2.4" ry="2.8" />
        <ellipse cx="9" cy="4.6" rx="2.1" ry="2.6" />
        <ellipse cx="15" cy="4.6" rx="2.1" ry="2.6" />
      </g>
    </svg>
  )
}
