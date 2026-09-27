import { useEffect, useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor-pointer]'

// the tail path is authored pointing straight down already, so 0deg IS the
// vertical, gravity-resting pose — movement adds/removes swing around it
const REST_ANGLE = 0
const IDLE_MS = 180 // how long the pointer must sit still before the tail settles back down

// --- toy mouse (the classic cat toy) ----------------------------------------
// A top-down felt mouse — round drooping ears, dot eyes, a pink nose,
// whiskers, and a long curling tail that swings with pointer movement.
// Mirrored left-right from the reference art (whiskers/string trail left
// instead of right, tail curls left instead of right).
const BODY_COLOR = '#e9e2d0'
const EAR_INNER_COLOR = 'var(--accent-pink)'
const NOSE_COLOR = 'var(--accent-pink)'
const TAIL_ANCHOR = { x: 17, y: 37 }
const TAIL_COLOR = '#e0607a'
const TAIL_WIDTH = 1.8
// mirrors the previous rightward dangling curl — swings with movement,
// settles straight down from "gravity" when the pointer stops
const TAIL_OUTER_D = `M${TAIL_ANCHOR.x} ${TAIL_ANCHOR.y} Q${TAIL_ANCHOR.x - 1.2} ${TAIL_ANCHOR.y + 5} ${TAIL_ANCHOR.x} ${TAIL_ANCHOR.y + 10} Q${TAIL_ANCHOR.x + 1.2} ${TAIL_ANCHOR.y + 13.5} ${TAIL_ANCHOR.x - 1.5} ${TAIL_ANCHOR.y + 15.5}`

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

      {/* the long thread/string trailing from the head, swooping up and to
          the left — mirrors the reference's up-and-right swoop */}
      <path d="M12 10 Q5 3 1 -8" fill="none" stroke="#000" strokeWidth="1" strokeLinecap="round" />

      {/* body — a teardrop, wide at the shoulders and narrowing toward the tail */}
      <path
        d="M7 20 C7 12 12 8 17 8 C22 8 27 12 27 20 C27 28 24 34 17 37 C10 34 7 28 7 20 Z"
        fill={BODY_COLOR}
        stroke="#000"
        strokeWidth="1.4"
      />

      {/* ears — drooping outward, pink inner ear, on top of the body */}
      <ellipse cx="8" cy="11" rx="5" ry="6.5" transform="rotate(-25 8 11)" fill={BODY_COLOR} stroke="#000" strokeWidth="1.2" />
      <ellipse cx="8.5" cy="12" rx="2.3" ry="3.5" transform="rotate(-25 8.5 12)" fill={EAR_INNER_COLOR} />
      <ellipse cx="26" cy="11" rx="5" ry="6.5" transform="rotate(25 26 11)" fill={BODY_COLOR} stroke="#000" strokeWidth="1.2" />
      <ellipse cx="25.5" cy="12" rx="2.3" ry="3.5" transform="rotate(25 25.5 12)" fill={EAR_INNER_COLOR} />

      {/* whiskers — fan left from the nose, mirroring the reference's rightward fan */}
      <path d="M14 20 L8 18" stroke="#000" strokeWidth="0.7" strokeLinecap="round" />
      <path d="M14 21.5 L7 22" stroke="#000" strokeWidth="0.7" strokeLinecap="round" />
      <path d="M14 23 L8 26" stroke="#000" strokeWidth="0.7" strokeLinecap="round" />

      {/* face */}
      <circle cx="13" cy="17" r="1.1" fill="#000" />
      <circle cx="21" cy="17" r="1.1" fill="#000" />
      <circle cx="17" cy="20" r="1.2" fill={NOSE_COLOR} stroke="#000" strokeWidth="0.6" />
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
