import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const paragraphs = [
  {
    text: "Architecture taught me that people don't read floor plans, they walk through them. If they have to stop and think, the design has failed.",
    weight: 'font-bold',
    size: '',
  },
  {
    text: "For 2.5 years I've brought that into product design, with UltraGym for everyday workouts and UltraGym Pro for commercial gyms. My favorite part is the messy middle: untangling people, constraints, and context until the answer feels obvious.",
    weight: 'font-normal',
    size: '',
  },
]

const totalWords = paragraphs.reduce((sum, p) => sum + p.text.split(' ').length, 0)

export function Intro() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.25'],
  })

  let wordIndex = 0

  return (
    <section className="mx-auto flex min-h-screen max-w-6xl items-center px-5 py-24 sm:py-32">
      <div ref={ref} className="mx-auto w-[75%] space-y-6 text-center font-display text-[14px] leading-snug tracking-tight sm:text-[26px]">
        {paragraphs.map((paragraph, pi) => (
          <p key={pi} className={`${paragraph.weight} ${paragraph.size}`}>
            {paragraph.text.split(' ').map((word, wi) => {
              const start = wordIndex / totalWords
              const end = (wordIndex + 1) / totalWords
              wordIndex++
              return (
                <Word key={wi} progress={scrollYProgress} range={[start, end]}>
                  {word}
                </Word>
              )
            })}
          </p>
        ))}
      </div>
    </section>
  )
}

function Word({
  children,
  progress,
  range,
}: {
  children: string
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.15, 1])
  return (
    <motion.span style={{ opacity }} className="mr-[0.28em] inline-block text-text">
      {children}
    </motion.span>
  )
}
