import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { SectionLabel } from './SectionLabel'

const text =
  "I care about the feel of products in use. Not just as they appear on display screens. It's the space between actions, the clarity of information, the rhythm of interactions — those are the details that typically make an experience feel smooth or frustrating."

export function Intro() {
  const words = text.split(' ')
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.25'],
  })

  return (
    <section className="mx-auto max-w-4xl px-5 py-24 sm:py-32">
      <SectionLabel className="justify-center">INTRO</SectionLabel>
      <p ref={ref} className="mt-8 text-center font-display text-2xl font-medium leading-snug tracking-tight sm:text-4xl">
        {words.map((word, i) => {
          const start = i / words.length
          const end = start + 1 / words.length
          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          )
        })}
      </p>
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
