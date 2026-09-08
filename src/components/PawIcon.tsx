import type { CSSProperties } from 'react'

export function PawIcon({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} aria-hidden="true">
      <ellipse cx="12" cy="15.5" rx="5.4" ry="4.6" />
      <ellipse cx="4.6" cy="9.2" rx="2.3" ry="2.7" />
      <ellipse cx="19.4" cy="9.2" rx="2.3" ry="2.7" />
      <ellipse cx="9.2" cy="4.8" rx="2" ry="2.5" />
      <ellipse cx="14.8" cy="4.8" rx="2" ry="2.5" />
    </svg>
  )
}
