import { useEffect, useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor-pointer]'

// the tail path is authored pointing straight down already, so 0deg IS the
// vertical, gravity-resting pose — movement adds/removes swing around it
const REST_ANGLE = 0
const IDLE_MS = 180 // how long the pointer must sit still before the tail settles back down

// --- toy mouse (the classic cat toy) ----------------------------------------
// A top-down felt mouse, nose pointing up: whiskers fanning from the tip,
// dot eyes, drooping ears lower at the shoulders, a round body, and a
// curling tail that swings with pointer movement. Matches the reference
// pose exactly (not mirrored).
const BODY_COLOR = '#e9e2d0'
const EAR_INNER_COLOR = 'var(--accent-pink)'
const NOSE_COLOR = 'var(--accent-pink)'
const TAIL_ANCHOR = { x: 20, y: 39 }
const TAIL_COLOR = '#e0607a'
const TAIL_WIDTH = 1.8
// curls right then hooks up at the tip — swings with movement, settles
// straight down from "gravity" when the pointer stops
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

      {/* body — narrow at the head, bulging at the shoulders where the ears
          attach, tapering to a rounded bottom */}
      <path
        d="M8 18 C8 10 13 6 18 6 C23 6 28 10 28 18 C28 26 26 34 18 39 C10 34 8 26 8 18 Z"
        fill={BODY_COLOR}
        stroke="#000"
        strokeWidth="1.4"
      />

      {/* ears — lower, at shoulder level, drooping outward, pink inner ear */}
      <ellipse cx="7" cy="19" rx="5.5" ry="7" transform="rotate(-35 7 19)" fill={BODY_COLOR} stroke="#000" strokeWidth="1.2" />
      <ellipse cx="7.5" cy="20" rx="2.5" ry="4" transform="rotate(-35 7.5 20)" fill={EAR_INNER_COLOR} />
      <ellipse cx="29" cy="19" rx="5.5" ry="7" transform="rotate(35 29 19)" fill={BODY_COLOR} stroke="#000" strokeWidth="1.2" />
      <ellipse cx="28.5" cy="20" rx="2.5" ry="4" transform="rotate(35 28.5 20)" fill={EAR_INNER_COLOR} />

      {/* whiskers — fan from the nose tip, three each side */}
      <path d="M17 8 L11 3" stroke="#000" strokeWidth="0.7" strokeLinecap="round" />
      <path d="M17 9 L10 7" stroke="#000" strokeWidth="0.7" strokeLinecap="round" />
      <path d="M17 10 L11 11" stroke="#000" strokeWidth="0.7" strokeLinecap="round" />
      <path d="M21 8 L27 3" stroke="#000" strokeWidth="0.7" strokeLinecap="round" />
      <path d="M21 9 L28 7" stroke="#000" strokeWidth="0.7" strokeLinecap="round" />
      <path d="M21 10 L27 11" stroke="#000" strokeWidth="0.7" strokeLinecap="round" />

      {/* face */}
      <circle cx="15" cy="14" r="1.1" fill="#000" />
      <circle cx="23" cy="14" r="1.1" fill="#000" />
      <circle cx="19" cy="6" r="1.3" fill={NOSE_COLOR} stroke="#000" strokeWidth="0.6" />
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
