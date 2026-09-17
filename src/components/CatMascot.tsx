export function CatMascot({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 96" fill="none" className={className} aria-hidden="true">
      {/* tail, curling behind */}
      <path
        d="M20 78c-14-4-16-24-2-30"
        stroke="var(--text)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />

      {/* yarn ball */}
      <circle cx="24" cy="34" r="17" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="2" />
      <g stroke="var(--accent)" strokeWidth="1.3" strokeLinecap="round" opacity="0.8" fill="none">
        <path d="M9 28c8 4 22 4 30 0" />
        <path d="M8 35c9 3.4 23 3.4 32 0" />
        <path d="M15 20c2 9 2 19 0 28" />
        <path d="M33 20c-2 9-2 19 0 28" />
      </g>

      {/* cat body, sitting */}
      <path
        d="M35 90c0-19 12-32 27-32s27 13 27 32"
        fill="var(--text)"
        opacity="0.85"
      />
      {/* ears */}
      <path d="M46 55 38 39l14 6.5Z" fill="var(--text)" opacity="0.85" />
      <path d="M78 55l8-16-14 6.5Z" fill="var(--text)" opacity="0.85" />
      {/* head */}
      <circle cx="62" cy="58" r="19" fill="var(--text)" opacity="0.85" />

      {/* face */}
      <circle cx="55" cy="57" r="2.2" fill="var(--bg)" />
      <circle cx="69" cy="57" r="2.2" fill="var(--bg)" />
      <path d="M62 62v2.5" stroke="var(--bg)" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M62 64.5c-1.6 1.8-4 1.8-5 0M62 64.5c1.6 1.8 4 1.8 5 0"
        stroke="var(--bg)"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
      <g stroke="var(--bg)" strokeWidth="1" strokeLinecap="round" opacity="0.7">
        <path d="M42 56h9M42 60h8" />
        <path d="M82 56h-9M82 60h-8" />
      </g>

      {/* paw resting on the yarn ball */}
      <ellipse cx="38" cy="70" rx="7" ry="5" fill="var(--text)" opacity="0.85" />
    </svg>
  )
}
