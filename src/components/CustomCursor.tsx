import { useEffect, useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor-pointer]'

// the tail path is authored pointing straight down already, so 0deg IS the
// vertical, gravity-resting pose — movement adds/removes swing around it
const REST_ANGLE = 0
const IDLE_MS = 180 // how long the pointer must sit still before the tail settles back down

// --- toy mouse (the classic cat toy) ----------------------------------------
// A little felt mouse, drawn side-on: round body, a snout bump with a pink
// nose, two ears, dot eyes, a few whiskers, and a long dangling tail that
// swings with pointer movement — reading as the toy trailing behind as it's
// dragged around, exactly like the yarn tail it replaces.
const BODY_COLOR = '#e9e2d0'
const EAR_INNER_COLOR = 'var(--accent-pink)'
const NOSE_COLOR = 'var(--accent-pink)'
const TAIL_ANCHOR = { x: 9, y: 25 }
const TAIL_COLOR = '#e0607a'
const TAIL_WIDTH = 2
// hangs essentially straight down (small lateral wobble, not a wide swoop) with
// a slight curl right at the very tip — reads as a vertical dangling tail
const TAIL_OUTER_D = `M${TAIL_ANCHOR.x} ${TAIL_ANCHOR.y} Q${TAIL_ANCHOR.x + 1.2} ${TAIL_ANCHOR.y + 5} ${TAIL_ANCHOR.x} ${TAIL_ANCHOR.y + 10} Q${TAIL_ANCHOR.x - 1.2} ${TAIL_ANCHOR.y + 13.5} ${TAIL_ANCHOR.x + 1.5} ${TAIL_ANCHOR.y + 15.5}`

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
        // ball/paw center sits at (17, 17) of a 34x50 viewBox — offset the anchor
        // to that point (not the box midpoint) so the tail hangs below it
        el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -34%)`
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
      {hovering ? <PawCursor /> : <ToyMouseCursor tailAngle={tailAngle} />}
    </div>
  )
}

function ToyMouseCursor({ tailAngle }: { tailAngle: ReturnType<typeof useSpring> }) {
  return (
    <svg width="34" height="50" viewBox="0 0 34 50" style={{ overflow: 'visible' }}>
      {/* tail — swings with movement, settles straight down from "gravity"
          when the pointer stops, same as the toy trailing on a string */}
      <motion.path
        d={TAIL_OUTER_D}
        fill="none"
        stroke={TAIL_COLOR}
        strokeWidth={TAIL_WIDTH}
        strokeLinecap="round"
        style={{ rotate: tailAngle, transformOrigin: `${TAIL_ANCHOR.x}px ${TAIL_ANCHOR.y}px` }}
      />

      {/* ears (back one first so the front one overlaps it correctly) */}
      <ellipse cx="11" cy="11" rx="4.2" ry="5.2" transform="rotate(-25 11 11)" fill={BODY_COLOR} stroke="#000" strokeWidth="1.2" />
      <ellipse cx="11.5" cy="12" rx="2" ry="2.8" transform="rotate(-25 11.5 12)" fill={EAR_INNER_COLOR} />
      <ellipse cx="18" cy="9.5" rx="3.8" ry="4.8" transform="rotate(8 18 9.5)" fill={BODY_COLOR} stroke="#000" strokeWidth="1.2" />
      <ellipse cx="18" cy="10.3" rx="1.8" ry="2.6" transform="rotate(8 18 10.3)" fill={EAR_INNER_COLOR} />

      {/* body + snout */}
      <ellipse cx="18" cy="20" rx="9" ry="7" transform="rotate(5 18 20)" fill={BODY_COLOR} stroke="#000" strokeWidth="1.4" />
      <ellipse cx="27" cy="21" rx="4.5" ry="3.8" transform="rotate(5 27 21)" fill={BODY_COLOR} stroke="#000" strokeWidth="1.4" />
      <circle cx="31.5" cy="21" r="1.4" fill={NOSE_COLOR} stroke="#000" strokeWidth="0.8" />

      {/* whiskers */}
      <path d="M29 20 L34 18.5" stroke="#000" strokeWidth="0.7" strokeLinecap="round" />
      <path d="M29.5 22 L34.5 22.5" stroke="#000" strokeWidth="0.7" strokeLinecap="round" />
      <path d="M29 24 L34 26" stroke="#000" strokeWidth="0.7" strokeLinecap="round" />

      {/* eyes */}
      <circle cx="22" cy="18.5" r="1" fill="#000" />
      <circle cx="26" cy="19.5" r="0.9" fill="#000" />
    </svg>
  )
}

function PawCursor() {
  return (
    <svg width="34" height="50" viewBox="0 0 34 50" style={{ overflow: 'visible' }}>
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
