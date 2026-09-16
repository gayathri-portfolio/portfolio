import { useEffect, useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor-pointer]'

const REST_ANGLE = 90 // tail hanging straight down, i.e. gravity's resting pose
const IDLE_MS = 180 // how long the pointer must sit still before the tail settles back down

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const tailAngle = useSpring(REST_ANGLE, { stiffness: 140, damping: 6, mass: 0.7 })

  useEffect(() => {
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches
    if (coarsePointer) return

    document.documentElement.classList.add('custom-cursor-active')

    let lastPoint: { x: number; y: number } | null = null
    let idleTimer: number | undefined

    function handleMove(e: PointerEvent) {
      setVisible(true)
      const el = dotRef.current
      if (el) {
        // ball center sits at (17, 17) of a 34x40 viewBox — offset the anchor
        // to that point (not the box midpoint) so the tail hangs below it
        el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -42.5%)`
      }

      const target = e.target as Element | null
      setHovering(!!target?.closest?.(INTERACTIVE_SELECTOR))

      if (lastPoint) {
        const dx = e.clientX - lastPoint.x
        // the tail trails opposite the direction of travel, clamped to a believable swing
        const swing = Math.max(-55, Math.min(55, -dx * 3.2))
        tailAngle.set(REST_ANGLE + swing)
      }
      lastPoint = { x: e.clientX, y: e.clientY }

      window.clearTimeout(idleTimer)
      idleTimer = window.setTimeout(() => tailAngle.set(REST_ANGLE), IDLE_MS)
    }

    window.addEventListener('pointermove', handleMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', handleMove)
      window.clearTimeout(idleTimer)
      document.documentElement.classList.remove('custom-cursor-active')
    }
  }, [tailAngle])

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] transition-opacity duration-200"
      style={{ opacity: visible ? 1 : 0, willChange: 'transform' }}
    >
      {hovering ? <PawCursor /> : <YarnBallCursor tailAngle={tailAngle} />}
    </div>
  )
}

function YarnBallCursor({ tailAngle }: { tailAngle: ReturnType<typeof useSpring> }) {
  return (
    <svg width="34" height="40" viewBox="0 0 34 40" style={{ overflow: 'visible' }}>
      <defs>
        <clipPath id="yarn-ball-clip">
          <circle cx="17" cy="17" r="13" />
        </clipPath>
      </defs>

      {/* single loose thread hanging off the bottom of the ball — swings with
          movement, settles straight down from "gravity" when the pointer sits still */}
      <motion.path
        d="M17 30 Q20 33.5 17.5 37.5"
        fill="none"
        stroke="var(--accent-pink)"
        strokeWidth="2.2"
        strokeLinecap="round"
        style={{ rotate: tailAngle, transformOrigin: '17px 30px' }}
      />

      {/* ball body, wound in irregular, randomly-angled threads (not a tidy grid) */}
      <circle cx="17" cy="17" r="13" fill="#f1e4cd" stroke="#000" strokeWidth="1.5" />
      <g clipPath="url(#yarn-ball-clip)" strokeLinecap="round" fill="none">
        <path d="M5 11 Q15 5 27 9" stroke="var(--accent)" strokeWidth="1.5" opacity="0.85" />
        <path d="M4 17 Q17 23 30 13" stroke="var(--accent-pink)" strokeWidth="1.3" opacity="0.7" />
        <path d="M7 26 Q13 14 8 4" stroke="var(--accent-2)" strokeWidth="1.6" opacity="0.9" />
        <path d="M28 6 Q19 17 25 29" stroke="var(--accent)" strokeWidth="1.2" opacity="0.65" />
        <path d="M3 21 Q19 30 29 21" stroke="var(--accent-2)" strokeWidth="1.4" opacity="0.8" />
        <path d="M9 4 Q11 18 12 30" stroke="var(--accent-pink)" strokeWidth="1.5" opacity="0.85" />
        <path d="M25 3 Q22 15 22 29" stroke="var(--accent-2)" strokeWidth="1.2" opacity="0.7" />
        <path d="M4 9 Q18 3 29 12" stroke="var(--accent-pink)" strokeWidth="1.4" opacity="0.75" />
        <path d="M6 29 Q20 31 27 17" stroke="var(--accent)" strokeWidth="1.3" opacity="0.8" />
        <path d="M2 14 Q10 8 6 23" stroke="var(--accent-2)" strokeWidth="1.1" opacity="0.6" />
        <path d="M31 18 Q23 25 28 7" stroke="var(--accent)" strokeWidth="1.4" opacity="0.75" />
        <path d="M15 2 Q26 11 16 20 Q9 27 18 32" stroke="var(--accent-pink)" strokeWidth="1.2" opacity="0.65" />
      </g>
    </svg>
  )
}

function PawCursor() {
  return (
    <svg width="34" height="40" viewBox="0 0 34 40" style={{ overflow: 'visible' }}>
      <g transform="translate(4 4)" fill="#f4a6bd" stroke="#000" strokeWidth="1">
        <ellipse cx="13" cy="18.5" rx="6.3" ry="5.4" />
        <ellipse cx="4.5" cy="10.5" rx="2.7" ry="3.2" />
        <ellipse cx="21.5" cy="10.5" rx="2.7" ry="3.2" />
        <ellipse cx="10" cy="5.2" rx="2.4" ry="2.9" />
        <ellipse cx="16" cy="5.2" rx="2.4" ry="2.9" />
      </g>
    </svg>
  )
}
