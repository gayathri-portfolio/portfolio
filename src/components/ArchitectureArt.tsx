import type { CSSProperties } from 'react'

/**
 * Decorative line-art: a floor plan with a cat mid-stride through the doorway —
 * a literal nod to the Intro copy ("people don't read floor plans, they walk
 * through them"). Pure stroke, no fill, so it reads as a blueprint sketch.
 */
export function FloorPlanCatArt({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg
      viewBox="0 0 240 160"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* outer walls */}
      <rect x="20" y="20" width="200" height="120" rx="3" />
      {/* partition wall with a doorway gap */}
      <path d="M120 20 V75 M120 95 V140" />
      {/* door leaf, swung open */}
      <path d="M120 95 H98 M98 95 A22 22 0 0 1 120 73" strokeDasharray="3 3.5" />
      {/* left-room furniture: a bed */}
      <rect x="34" y="98" width="42" height="26" rx="3" />
      <path d="M34 108 H76" />
      {/* right-room furniture: a round table */}
      <circle cx="172" cy="52" r="15" />
      <rect x="150" y="100" width="46" height="20" rx="2" />
      {/* window ticks on the top wall */}
      <path d="M55 20 V13 M65 20 V13" />
      <path d="M175 20 V13 M185 20 V13" />

      {/* cat mid-stride in the doorway, facing right — solid silhouette so it reads clearly at small sizes */}
      <g transform="translate(98, 62)" strokeWidth="1">
        <ellipse cx="14" cy="22" rx="13" ry="7.5" fill="currentColor" stroke="none" />
        <circle cx="30" cy="12" r="6.5" fill="currentColor" stroke="none" />
        <path d="M26 7 L28.4 7 L26.6 1.5 Z" fill="currentColor" stroke="none" />
        <path d="M32 7 L34.4 7 L34.8 2 Z" fill="currentColor" stroke="none" />
        <path d="M2 20 C-6 18 -7 8 -1 4" fill="none" strokeWidth="2.4" />
        <ellipse cx="8" cy="28.5" rx="2.6" ry="2" fill="currentColor" stroke="none" />
        <ellipse cx="18" cy="28.5" rx="2.6" ry="2" fill="currentColor" stroke="none" />
        <ellipse cx="26" cy="18.5" rx="2" ry="2.4" fill="currentColor" stroke="none" />
      </g>
    </svg>
  )
}

/**
 * Decorative line-art: drafting compass + T-square, with a small paw print
 * tucked beside it — a light architecture-meets-cat accent for sections
 * about process/craft rather than the floor-plan narrative specifically.
 */
export function DraftingToolsArt({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg
      viewBox="0 0 140 140"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* T-square */}
      <path d="M14 30 H90 M14 30 V20 M30 30 V24 M46 30 V24 M62 30 V24 M78 30 V24" />

      {/* compass */}
      <circle cx="70" cy="34" r="3" />
      <path d="M70 34 L48 112" />
      <path d="M70 34 L94 108" />
      <circle cx="48" cy="112" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="94" cy="108" r="1.6" fill="currentColor" stroke="none" />
      <path d="M27 118 A44 8 0 0 0 113 108" strokeDasharray="2.5 4" />

      {/* small paw print, drafted like it wandered onto the page */}
      <g transform="translate(20, 78) rotate(-18)" fill="currentColor" stroke="none">
        <ellipse cx="9" cy="12" rx="4.6" ry="3.9" />
        <ellipse cx="3.6" cy="6.6" rx="2" ry="2.3" />
        <ellipse cx="14.4" cy="6.6" rx="2" ry="2.3" />
        <ellipse cx="6.6" cy="3" rx="1.7" ry="2.1" />
        <ellipse cx="11.4" cy="3" rx="1.7" ry="2.1" />
      </g>
    </svg>
  )
}
