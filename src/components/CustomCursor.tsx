import { useEffect, useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'
import mouseToy from '../assets/mouse-toy.png'
import pawCutout from '../assets/paw-cutout.png'

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor-pointer]'

// the toy swings as if held from a string near its head — 0deg is the
// vertical, gravity-resting pose; movement adds/removes swing around it
const REST_ANGLE = 0
const IDLE_MS = 180 // how long the pointer must sit still before it settles back down

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const swingAngle = useSpring(REST_ANGLE, { stiffness: 140, damping: 6, mass: 0.7 })

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
        // anchors the toy's nose (near its top-left corner in the photo) to
        // the actual pointer position, not the image's own top-left corner
        el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-8%, -11%)`
      }

      const target = e.target as Element | null
      setHovering(!!target?.closest?.(INTERACTIVE_SELECTOR))

      if (lastPoint) {
        const dx = e.clientX - lastPoint.x
        // swings opposite the direction of travel, clamped to a believable arc
        const swing = Math.max(-20, Math.min(20, -dx * 1.4))
        swingAngle.set(REST_ANGLE + swing)
      }
      lastPoint = { x: e.clientX, y: e.clientY }

      window.clearTimeout(idleTimer)
      idleTimer = window.setTimeout(() => swingAngle.set(REST_ANGLE), IDLE_MS)
    }

    window.addEventListener('pointermove', handleMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', handleMove)
      window.clearTimeout(idleTimer)
      document.documentElement.classList.remove('custom-cursor-active')
    }
  }, [swingAngle])

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] transition-opacity duration-200"
      style={{ opacity: visible ? 1 : 0, willChange: 'transform' }}
    >
      {hovering ? <PawCursor /> : <ToyMouseCursor swingAngle={swingAngle} />}
    </div>
  )
}

function ToyMouseCursor({ swingAngle }: { swingAngle: ReturnType<typeof useSpring> }) {
  return (
    <motion.img
      src={mouseToy}
      alt=""
      draggable={false}
      style={{ rotate: swingAngle, transformOrigin: '8% 11%' }}
      className="w-[50px] select-none"
    />
  )
}

// stacked zero-blur drop-shadows in 8 directions trace a crisp outline
// around the cutout's alpha silhouette — a border-image can't do this
// since the PNG's edge isn't a rectangle, and a single drop-shadow only
// offsets in one direction rather than ringing the whole shape
const PAW_OUTLINE_FILTER = [0, 45, 90, 135, 180, 225, 270, 315]
  .map((deg) => {
    const rad = (deg * Math.PI) / 180
    const x = (1.4 * Math.cos(rad)).toFixed(2)
    const y = (1.4 * Math.sin(rad)).toFixed(2)
    return `drop-shadow(${x}px ${y}px 0 #000)`
  })
  .join(' ')

function PawCursor() {
  return (
    <img
      src={pawCutout}
      alt=""
      draggable={false}
      className="w-9 select-none"
      style={{ filter: PAW_OUTLINE_FILTER }}
    />
  )
}
