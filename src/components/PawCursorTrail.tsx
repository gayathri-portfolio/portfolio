import { useEffect, useRef, useState } from 'react'
import { PawIcon } from './PawIcon'

interface Print {
  id: number
  x: number
  y: number
  rotate: number
  side: 1 | -1
}

const MIN_DISTANCE = 46 // px between prints, roughly a walking stride
const STEP_OFFSET = 7 // lateral offset so prints alternate left/right of the path
const LIFETIME = 4000 // ms, matches the paw-fade keyframe duration
const MAX_PRINTS = 20

let uid = 0

export function PawCursorTrail() {
  const [prints, setPrints] = useState<Print[]>([])
  const lastPoint = useRef<{ x: number; y: number } | null>(null)
  const side = useRef<1 | -1>(1)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches
    if (reduceMotion || coarsePointer) return

    function handlePointerMove(e: PointerEvent) {
      const { clientX: x, clientY: y } = e
      const last = lastPoint.current

      if (last) {
        const dx = x - last.x
        const dy = y - last.y
        if (Math.hypot(dx, dy) < MIN_DISTANCE) return

        const travelAngle = Math.atan2(dy, dx)
        side.current = side.current === 1 ? -1 : 1
        const px = x + Math.cos(travelAngle + Math.PI / 2) * STEP_OFFSET * side.current
        const py = y + Math.sin(travelAngle + Math.PI / 2) * STEP_OFFSET * side.current

        const id = ++uid
        setPrints((prev) => {
          const next = [...prev, { id, x: px, y: py, rotate: (travelAngle * 180) / Math.PI + 90, side: side.current }]
          return next.length > MAX_PRINTS ? next.slice(next.length - MAX_PRINTS) : next
        })
        window.setTimeout(() => {
          setPrints((prev) => prev.filter((p) => p.id !== id))
        }, LIFETIME)
      }

      lastPoint.current = { x, y }
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden="true">
      {prints.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{ left: p.x, top: p.y, transform: `translate(-50%, -50%) rotate(${p.rotate}deg)` }}
        >
          <PawIcon
            className={`h-3.5 w-3.5 animate-paw-fade ${p.side === 1 ? 'text-accent' : 'text-accent-2'}`}
          />
        </div>
      ))}
    </div>
  )
}
