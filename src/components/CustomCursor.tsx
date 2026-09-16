import { useEffect, useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor-pointer]'

const REST_ANGLE = 90 // tail hanging straight down, i.e. gravity's resting pose
const IDLE_MS = 180 // how long the pointer must sit still before the tail settles back down

// --- yarn ball thread field -------------------------------------------------
// ~100 randomly-angled, randomly-curved strands wound around the ball, plus one
// strand that's built in two connected pieces sharing an endpoint at the ball's
// bottom edge: an inner (clipped, static) half and an outer (animated) half that
// becomes the dangling tail — same color/width, so it reads as one strand of
// yarn that happens to wind through the ball before hanging loose.

const BALL_CENTER = 17
const BALL_RADIUS = 13
const TAIL_ANCHOR = { x: 17, y: 30 } // where the ball's edge meets the loose end
// a genuinely multicolor scrap-yarn mix — the theme's three accents plus a few
// extra hues so the ball doesn't read as "mostly orange with flecks"
const THREAD_COLORS = [
  'var(--accent)',
  'var(--accent-2)',
  'var(--accent-pink)',
  '#4d7ec9',
  '#d1a537',
  '#8a5fb8',
  '#c0483f',
]

function mulberry32(seed: number) {
  let s = seed
  return () => {
    s |= 0
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function pointOnBall(angle: number) {
  return [BALL_CENTER + BALL_RADIUS * Math.cos(angle), BALL_CENTER + BALL_RADIUS * Math.sin(angle)] as const
}

function chord(a1: number, a2: number, bulge: number) {
  const [x1, y1] = pointOnBall(a1)
  const [x2, y2] = pointOnBall(a2)
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.hypot(dx, dy) || 1
  const cx = mx + (-dy / len) * bulge
  const cy = my + (dx / len) * bulge
  return `M${x1.toFixed(1)} ${y1.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`
}

// a slightly lumpy closed outline instead of a perfect circle — yarn balls
// aren't geometrically round, they bulge a bit wherever a wound thread sits
// proud of the rest
function buildBlobPath(seed: number, pointCount = 11, jitter = 1.3): string {
  const rand = mulberry32(seed)
  const points: [number, number][] = []
  for (let i = 0; i < pointCount; i++) {
    const angle = (i / pointCount) * Math.PI * 2
    const r = BALL_RADIUS + (rand() - 0.5) * 2 * jitter
    points.push([BALL_CENTER + r * Math.cos(angle), BALL_CENTER + r * Math.sin(angle)])
  }
  const n = points.length
  let d = `M${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n]
    const p1 = points[i]
    const p2 = points[(i + 1) % n]
    const p3 = points[(i + 2) % n]
    const c1x = p1[0] + (p2[0] - p0[0]) / 6
    const c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6
    const c2y = p2[1] - (p3[1] - p1[1]) / 6
    d += ` C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`
  }
  return d + ' Z'
}

const BLOB_PATH = buildBlobPath(7)

interface Strand {
  d: string
  color: string
  width: number
  opacity: number
}

function buildStrands(count: number, seed: number): Strand[] {
  const rand = mulberry32(seed)
  const strands: Strand[] = []
  for (let i = 0; i < count; i++) {
    const a1 = rand() * Math.PI * 2
    const a2 = a1 + Math.PI * (0.3 + rand() * 1) * (rand() < 0.5 ? 1 : -1)
    strands.push({
      d: chord(a1, a2, (rand() - 0.5) * 16),
      color: THREAD_COLORS[Math.floor(rand() * THREAD_COLORS.length)],
      width: 0.7 + rand() * 0.7,
      opacity: 0.55 + rand() * 0.4,
    })
  }
  return strands
}

const STRANDS = buildStrands(99, 42)

// the 100th strand — its inner half ends exactly at TAIL_ANCHOR, on the ball's
// bottom edge, so the animated tail piece can pick up from that same point
const TAIL_INNER_D = chord(Math.PI * 1.18, Math.PI / 2, 5.5)
const TAIL_COLOR = '#e0607a'
const TAIL_WIDTH = 2
// a longer, S-curved strand that curls at the tip — reads as an actual dangling
// tail rather than a short stub
const TAIL_OUTER_D = `M${TAIL_ANCHOR.x} ${TAIL_ANCHOR.y} Q${TAIL_ANCHOR.x + 4} ${TAIL_ANCHOR.y + 5} ${TAIL_ANCHOR.x + 0.5} ${TAIL_ANCHOR.y + 10} Q${TAIL_ANCHOR.x - 2} ${TAIL_ANCHOR.y + 13.5} ${TAIL_ANCHOR.x + 2} ${TAIL_ANCHOR.y + 15.5}`

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
      {hovering ? <PawCursor /> : <YarnBallCursor tailAngle={tailAngle} />}
    </div>
  )
}

function YarnBallCursor({ tailAngle }: { tailAngle: ReturnType<typeof useSpring> }) {
  return (
    <svg width="34" height="50" viewBox="0 0 34 50" style={{ overflow: 'visible' }}>
      <defs>
        <clipPath id="yarn-ball-clip">
          <path d={BLOB_PATH} />
        </clipPath>
      </defs>

      {/* the loose end of the 100th strand — same color/width as its inner half
          below, continuing from the exact point that half ends at. Swings with
          movement, settles straight down from "gravity" when the pointer stops. */}
      <motion.path
        d={TAIL_OUTER_D}
        fill="none"
        stroke={TAIL_COLOR}
        strokeWidth={TAIL_WIDTH}
        strokeLinecap="round"
        style={{ rotate: tailAngle, transformOrigin: `${TAIL_ANCHOR.x}px ${TAIL_ANCHOR.y}px` }}
      />

      {/* ball body — a lumpy blob, not a perfect circle — wound in ~100 irregular,
          randomly-angled threads */}
      <path d={BLOB_PATH} fill="#f1e4cd" />
      <g clipPath="url(#yarn-ball-clip)" strokeLinecap="round" fill="none">
        {STRANDS.map((s, i) => (
          <path key={i} d={s.d} stroke={s.color} strokeWidth={s.width} opacity={s.opacity} />
        ))}
        {/* the inner half of the strand whose loose end becomes the tail above */}
        <path d={TAIL_INNER_D} stroke={TAIL_COLOR} strokeWidth={TAIL_WIDTH} opacity={0.9} />
      </g>
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
