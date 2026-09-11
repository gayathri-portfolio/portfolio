export function HoverLetters({
  text,
  className,
  letterClassName = 'hover:-translate-y-2 hover:text-accent',
}: {
  text: string
  className?: string
  letterClassName?: string
}) {
  return (
    <span className={className}>
      {text.split('').map((ch, i) => (
        <span
          key={i}
          className={`inline-block transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${letterClassName}`}
        >
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  )
}
